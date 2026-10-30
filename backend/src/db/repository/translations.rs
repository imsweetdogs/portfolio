// backend/src/db/repository/translations.rs
use serde_json::{Map, Value};
use sqlx::PgPool;

#[derive(sqlx::FromRow)]
struct SectionRow {
    locale_code: String,
    namespace: String,
    payload: Value,
}

pub fn deep_merge(base: &mut Value, override_val: Value) {
    match (base, override_val) {
        (Value::Object(base_map), Value::Object(override_map)) => {
            for (k, v) in override_map {
                deep_merge(base_map.entry(k).or_insert(Value::Null), v);
            }
        }
        (base_slot, override_val) => {
            *base_slot = override_val;
        }
    }
}

async fn resolve_fallback_chain(pool: &PgPool, target_lang: &str) -> Result<Vec<String>, sqlx::Error> {
    let default_lang: String = sqlx::query_scalar(
        "SELECT code FROM locales WHERE is_default = TRUE LIMIT 1"
    )
    .fetch_optional(pool)
    .await?
    .unwrap_or_else(|| "ru".into());

    let intl_lang: Option<String> = sqlx::query_scalar(
        "SELECT intl FROM locales WHERE code = $1"
    )
    .bind(target_lang)
    .fetch_optional(pool)
    .await?;

    let mut chain = Vec::new();
    chain.push(default_lang);

    if let Some(intl) = intl_lang {
        if !chain.contains(&intl) {
            chain.push(intl);
        }
    }

    let target = target_lang.to_string();
    if !chain.contains(&target) {
        chain.push(target);
    }

    Ok(chain)
}

// Забирает ВСЕ секции (включая media) со слоеным мерджем
pub async fn find_all_by_lang(pool: &PgPool, lang: &str) -> Result<Value, sqlx::Error> {
    let chain = resolve_fallback_chain(pool, lang).await?;

    let rows = sqlx::query_as::<_, SectionRow>(
        "SELECT locale_code, namespace, payload FROM translations WHERE locale_code = ANY($1)"
    )
    .bind(&chain)
    .fetch_all(pool)
    .await?;

    let mut namespaces: Vec<String> = rows.iter().map(|r| r.namespace.clone()).collect();
    namespaces.sort();
    namespaces.dedup();

    let mut result_map = Map::new();

    for ns in namespaces {
        let mut merged = Value::Object(Map::new());
        for code in &chain {
            if let Some(row) = rows.iter().find(|r| r.namespace == ns && &r.locale_code == code) {
                deep_merge(&mut merged, row.payload.clone());
            }
        }
        result_map.insert(ns, merged);
    }

    Ok(Value::Object(result_map))
}