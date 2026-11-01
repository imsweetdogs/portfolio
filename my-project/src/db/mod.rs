// backend/src/db/mod.rs
pub mod repository;
pub mod schema;

use std::time::Duration;
use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;

pub async fn init_pool(database_url: &str) -> PgPool {
    println!("🔌 Connecting to database...");

    let pool = PgPoolOptions::new()
        .max_connections(10)
        .acquire_timeout(Duration::from_secs(10))
        .idle_timeout(Duration::from_secs(60))
        .connect(database_url)
        .await
        .expect("Failed to connect to database");

    println!("✅ Database connection established");

    schema::init(&pool).await;
    pool
}