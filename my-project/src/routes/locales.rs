// backend/src/routes/locales.rs
use axum::{extract::State, http::StatusCode, routing::get, Json, Router};
use sqlx::PgPool;
use crate::db::repository;
use crate::types::locale::Locale;

pub fn router() -> Router<PgPool> {
    Router::new().route("/", get(list_locales))
}

async fn list_locales(State(pool): State<PgPool>) -> Result<Json<Vec<Locale>>, StatusCode> {
    repository::locales::find_all(&pool)
        .await
        .map(Json)
        .map_err(|e| {
            eprintln!("Database error: {e}");
            StatusCode::INTERNAL_SERVER_ERROR
        })
}