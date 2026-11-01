// backend/src/db/schema/mod.rs
pub mod locales;
pub mod translations;
pub mod projects;

use sqlx::PgPool;

pub async fn init(pool: &PgPool) {
    locales::init(pool).await.expect("Failed to init locales");
    translations::init(pool).await.expect("Failed to init translations");
    projects::init(pool).await.expect("Failed to init projects");
    println!("📚 All database schemas are verified");
}