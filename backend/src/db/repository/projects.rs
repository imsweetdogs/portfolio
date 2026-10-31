// backend/src/db/repository/projects.rs
use sqlx::{PgPool, FromRow};
use serde_json::Value;
use crate::types::project::{ProjectItem, ProjectsResponse, ProjectQuery};

#[derive(FromRow)]
struct DbProject {
    id: String,
    year: String,
    title: Value,
    description: Value,
    tags: Vec<String>,
    image: String,
    link: Option<String>,
    github: Option<String>,
}

// 1. Получить ТОЛЬКО список всех доступных тегов со всей базы
pub async fn get_all_tags(pool: &PgPool) -> Result<Vec<String>, sqlx::Error> {
    let rows: Vec<(String,)> = sqlx::query_as(
        "SELECT DISTINCT unnest(tags) as tag FROM projects ORDER BY tag ASC"
    )
    .fetch_all(pool)
    .await?;

    Ok(rows.into_iter().map(|(t,)| t).collect())
}

// 2. Получить пагинированный список проектов
pub async fn find_all(pool: &PgPool, query: ProjectQuery) -> Result<ProjectsResponse, sqlx::Error> {
    let page = query.page.unwrap_or(1).max(1);
    let limit = query.limit.unwrap_or(6).max(1);
    let offset = (page - 1) * limit;
    let lang = query.lang.unwrap_or_else(|| "ru".into());

    let all_tags = get_all_tags(pool).await?;

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

    let rows: Vec<DbProject> = if let Some(ref tag) = query.tag {
        sqlx::query_as(
            r#"
            SELECT id, year, title, description, tags, image, link, github
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
            SELECT id, year, title, description, tags, image, link, github
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

    let items = rows.into_iter().map(|p| {
        let title_str = p.title.get(&lang)
            .or_else(|| p.title.get("ru"))
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string();

        let desc_str = p.description.get(&lang)
            .or_else(|| p.description.get("ru"))
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string();

        ProjectItem {
            id: p.id,
            year: p.year,
            title: title_str,
            description: desc_str,
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