// backend/src/db/repository/locales.rs
use sqlx::PgPool;
use crate::types::locale::Locale;

pub async fn find_all(pool: &PgPool) -> Result<Vec<Locale>, sqlx::Error> {
    sqlx::query_as::<_, Locale>(
        "SELECT code, label, intl, is_default FROM locales ORDER BY is_default DESC, code ASC"
    )
    .fetch_all(pool)
    .await
}