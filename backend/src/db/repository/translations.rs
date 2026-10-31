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
        // 1. Мердж объектов {}
        (Value::Object(base_map), Value::Object(override_map)) => {
            for (k, v) in override_map {
                deep_merge(base_map.entry(k).or_insert(Value::Null), v);
            }
        }

        // 2. Мердж массивов [] (для nav и любых списков элементов)
        (Value::Array(base_list), Value::Array(override_list)) => {
            // Проверяем, содержат ли элементы уникальный ключ: "href" или "id"
            let has_identifiers = base_list.iter().any(|item| {
                item.as_object()
                    .map_or(false, |obj| obj.contains_key("href") || obj.contains_key("id"))
            });

            if has_identifiers {
                for override_item in override_list {
                    if let Some(override_obj) = override_item.as_object() {
                        let identifier = override_obj
                            .get("href")
                            .or_else(|| override_obj.get("id"));

                        if let Some(id_val) = identifier {
                            // Ищем совпадение в базовом списке по href/id
                            if let Some(base_item) = base_list.iter_mut().find(|b| {
                                b.as_object().map_or(false, |b_obj| {
                                    b_obj.get("href") == Some(id_val)
                                        || b_obj.get("id") == Some(id_val)
                                })
                            }) {
                                // Нашли: мерджим поля внутри этого конкретного элемента
                                deep_merge(base_item, override_item);
                                continue;
                            }
                        }
                    }
                    // Если элемента с таким href/id ещё не было — добавляем в конец
                    base_list.push(override_item);
                }
            } else {
                // Если массив простых строк/чисел без id — перезаписываем
                *base_list = override_list;
            }
        }

        // 3. Скаляры (строки, булевы, числа)
        (base_slot, override_val) => {
            *base_slot = override_val;
        }
    }
}

pub async fn resolve_fallback_chain(pool: &PgPool, target_lang: &str) -> Result<Vec<String>, sqlx::Error> {
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

const LANDING_NAMESPACES: &[&str] = &[
    "data",
    "links",
    "media",
    "header",
    "hero",
    "projects",
    "skills",
    "about",
    "footer",
];

// Забирает ВСЕ секции со слоеным мерджем
pub async fn find_all_by_lang(pool: &PgPool, lang: &str) -> Result<Value, sqlx::Error> {
    let chain = resolve_fallback_chain(pool, lang).await?;

    // База отдает СТРОГО только секции из белого списка:
    let rows = sqlx::query_as::<_, SectionRow>(
        r#"
        SELECT locale_code, namespace, payload 
        FROM translations 
        WHERE locale_code = ANY($1) 
          AND namespace = ANY($2)
        "#
    )
    .bind(&chain)
    .bind(LANDING_NAMESPACES)
    .fetch_all(pool)
    .await?;

    let mut namespaces: Vec<String> = rows.iter().map(|r| r.namespace.clone()).collect();
    namespaces.sort();
    namespaces.dedup();

    let mut result_map = Map::new();

    for ns in namespaces {
        let mut merged = Value::Object(Map::new());

        // Для media и data исключаем промежуточный intl:
        // Цепочка строго [default] -> [target]
        let sub_chain: Vec<&String> = if ns == "media" || ns == "data" {
            let mut list = Vec::new();
            if let Some(first) = chain.first() {
                list.push(first);
            }
            if let Some(last) = chain.last() {
                if last != chain.first().unwrap() {
                    list.push(last);
                }
            }
            list
        } else {
            chain.iter().collect()
        };

        for code in sub_chain {
            if let Some(row) = rows.iter().find(|r| r.namespace == ns && &r.locale_code == code) {
                deep_merge(&mut merged, row.payload.clone());
            }
        }
        result_map.insert(ns, merged);
    }

    Ok(Value::Object(result_map))
}