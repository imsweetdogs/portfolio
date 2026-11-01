// backend/src/db/repository/projects.rs
use sqlx::{PgPool, FromRow};
use serde_json::{Map, Value};
use crate::types::project::{ProjectItem, ProjectsResponse, ProjectQuery};
use crate::db::repository::translations::{deep_merge};

#[derive(FromRow)]
struct DbProject {
    id: String,
    year: String,
    image: String,
    link: Option<String>,
    github: Option<String>,
    tags: Vec<String>,
}

#[derive(FromRow)]
struct TranslationRow {
    locale_code: String,
    namespace: String,
    payload: Value,
}

pub async fn get_all_tags(pool: &PgPool) -> Result<Vec<String>, sqlx::Error> {
    let rows: Vec<(String,)> = sqlx::query_as(
        "SELECT DISTINCT unnest(tags) as tag FROM projects ORDER BY tag ASC"
    )
    .fetch_all(pool)
    .await?;

    Ok(rows.into_iter().map(|(t,)| t).collect())
}

pub async fn find_all(pool: &PgPool, query: ProjectQuery) -> Result<ProjectsResponse, sqlx::Error> {
    let page = query.page.unwrap_or(1).max(1);
    let limit = query.limit.unwrap_or(6).max(1);
    let offset = (page - 1) * limit;
    let target_lang = query.lang.unwrap_or_else(|| "ru".into());

    // 1. Динамически берем ОСНОВНОЙ язык из базы (is_default = true)
    let default_lang: String = sqlx::query_scalar(
        "SELECT code FROM locales WHERE is_default = TRUE LIMIT 1"
    )
    .fetch_optional(pool)
    .await?
    .unwrap_or_else(|| "ru".into());

    // 2. Строим чистую цепочку: [основной] -> [целевой]
    let mut chain = vec![default_lang.clone()];
    if target_lang != default_lang {
        chain.push(target_lang.clone());
    }

    let all_tags = get_all_tags(pool).await?;

    // 2. Считаем общее число проектов
    let total: i64 = if let Some(ref tag) = query.tag {
        sqlx::query_scalar("SELECT COUNT(*) FROM projects WHERE $1 = ANY(tags)")
            .bind(tag)
            .fetch_one(pool)
            .await?
    } else {
        sqlx::query_scalar("SELECT COUNT(*) FROM projects")
            .fetch_one(pool)
            .await?
    };

    // 3. Достаем срез карточек
    let rows: Vec<DbProject> = if let Some(ref tag) = query.tag {
        sqlx::query_as(
            r#"
            SELECT id, year, image, link, github, tags
            FROM projects
            WHERE $1 = ANY(tags)
            ORDER BY order_index ASC, created_at DESC
            LIMIT $2 OFFSET $3
            "#
        )
        .bind(tag)
        .bind(limit)
        .bind(offset)
        .fetch_all(pool)
        .await?
    } else {
        sqlx::query_as(
            r#"
            SELECT id, year, image, link, github, tags
            FROM projects
            ORDER BY order_index ASC, created_at DESC
            LIMIT $1 OFFSET $2
            "#
        )
        .bind(limit)
        .bind(offset)
        .fetch_all(pool)
        .await?
    };

    if rows.is_empty() {
        return Ok(ProjectsResponse {
            items: Vec::new(),
            total,
            page,
            limit,
            total_pages: 0,
            tags: all_tags,
        });
    }

    // 4. Формируем список неймспейсов для текущей пачки: ['project_01', 'project_02', ...]
    let namespaces: Vec<String> = rows.iter().map(|p| format!("project_{}", p.id)).collect();

    // 5. Забираем переводы из таблицы translations по цепочке языков
    let trans_rows: Vec<TranslationRow> = sqlx::query_as(
        r#"
        SELECT locale_code, namespace, payload
        FROM translations
        WHERE locale_code = ANY($1) AND namespace = ANY($2)
        "#
    )
    .bind(&chain)
    .bind(&namespaces)
    .fetch_all(pool)
    .await?;

    // 6. Наслаиваем перевод для каждого проекта через deep_merge
    let items = rows.into_iter().map(|p| {
        let ns = format!("project_{}", p.id);
        let mut localized = Value::Object(Map::new());

        for code in &chain {
            if let Some(tr) = trans_rows.iter().find(|r| r.namespace == ns && &r.locale_code == code) {
                deep_merge(&mut localized, tr.payload.clone());
            }
        }

        let title = localized.get("title")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string();

        let description = localized.get("description")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string();

        ProjectItem {
            id: p.id,
            year: p.year,
            title,
            description,
            tags: p.tags,
            image: p.image,
            link: p.link,
            github: p.github,
        }
    }).collect();

    let total_pages = if total == 0 { 0 } else { (total as f64 / limit as f64).ceil() as i64 };

    Ok(ProjectsResponse {
        items,
        total,
        page,
        limit,
        total_pages,
        tags: all_tags,
    })
}