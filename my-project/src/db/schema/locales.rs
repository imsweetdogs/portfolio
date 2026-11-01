// backend/src/db/schema/locales.rs
use sqlx::PgPool;

pub async fn init(pool: &PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS locales (
            code VARCHAR(16) PRIMARY KEY,
            label VARCHAR(32) NOT NULL,
            intl VARCHAR(16) NOT NULL,
            is_default BOOLEAN DEFAULT FALSE
        );
        "#
    )
    .execute(pool)
    .await?;

    // Только основной дефолтный язык
    sqlx::query(
        r#"
        INSERT INTO locales (code, label, intl, is_default)
        VALUES ('ru', 'RU', 'ru', TRUE)
        ON CONFLICT (code) DO NOTHING;
        "#
    )
    .execute(pool)
    .await?;

    Ok(())
}