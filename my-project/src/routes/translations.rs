// backend/src/routes/translations.rs
use axum::{
    extract::{Path, State},
    http::StatusCode,
    routing::get,
    Json, Router,
};
use serde_json::Value;
use sqlx::PgPool;
use crate::db::repository;

pub fn router() -> Router<PgPool> {
    Router::new()
        .route("/", get(get_default_translations))
        .route("/{lang}", get(get_translations))
}

async fn get_default_translations(State(pool): State<PgPool>) -> Result<Json<Value>, StatusCode> {
    repository::translations::find_all_by_lang(&pool, "ru")
        .await
        .map(Json)
        .map_err(|e| {
            eprintln!("Database error: {e}");
            StatusCode::INTERNAL_SERVER_ERROR
        })
}

async fn get_translations(
    Path(lang): Path<String>,
    State(pool): State<PgPool>,
) -> Result<Json<Value>, StatusCode> {
    let clean_lang = lang.trim();
    let target = if clean_lang.is_empty() { "ru" } else { clean_lang };

    repository::translations::find_all_by_lang(&pool, target)
        .await
        .map(Json)
        .map_err(|e| {
            eprintln!("Database error: {e}");
            StatusCode::INTERNAL_SERVER_ERROR
        })
}