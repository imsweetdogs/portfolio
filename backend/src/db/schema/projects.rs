// backend/src/db/schema/projects.rs
use sqlx::PgPool;

pub async fn init(pool: &PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS projects (
            id VARCHAR(32) PRIMARY KEY,
            year VARCHAR(8) NOT NULL,
            image TEXT NOT NULL,
            link TEXT,
            github TEXT,
            tags TEXT[] NOT NULL DEFAULT '{}',
            order_index INT NOT NULL DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        "#
    )
    .execute(pool)
    .await?;

    Ok(())
}