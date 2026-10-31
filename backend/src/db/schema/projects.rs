// backend/src/db/schema/projects.rs
use sqlx::PgPool;

pub async fn init(pool: &PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS projects (
            id VARCHAR(32) PRIMARY KEY,
            year VARCHAR(8) NOT NULL,
            title JSONB NOT NULL,
            description JSONB NOT NULL,
            tags TEXT[] NOT NULL DEFAULT '{}',
            image TEXT NOT NULL,
            link TEXT,
            github TEXT,
            order_index INT NOT NULL DEFAULT 0,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
        "#
    )
    .execute(pool)
    .await?;

    Ok(())
}