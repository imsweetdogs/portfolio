// backend/src/db/schema/mod.rs
pub mod locales;
pub mod translations;

use sqlx::PgPool;

pub async fn init(pool: &PgPool) {
    locales::init(pool).await.expect("Failed to init locales");
    translations::init(pool).await.expect("Failed to init translations");
    println!("📚 All database schemas are verified");
}