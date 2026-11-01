// backend/src/routes/projects.rs
use axum::{
    extract::{Query, State},
    http::StatusCode,
    routing::get,
    Json, Router,
};
use sqlx::PgPool;
use crate::db::repository;
use crate::types::project::{ProjectQuery, ProjectsResponse};

pub fn router() -> Router<PgPool> {
    Router::new()
        .route("/", get(list_projects))
        .route("/tags", get(list_tags)) // <-- Отдельный быстрый запрос тегов
}

async fn list_projects(
    Query(query): Query<ProjectQuery>,
    State(pool): State<PgPool>,
) -> Result<Json<ProjectsResponse>, StatusCode> {
    repository::projects::find_all(&pool, query)
        .await
        .map(Json)
        .map_err(|e| {
            eprintln!("Database error in projects: {e}");
            StatusCode::INTERNAL_SERVER_ERROR
        })
}

async fn list_tags(State(pool): State<PgPool>) -> Result<Json<Vec<String>>, StatusCode> {
    repository::projects::get_all_tags(&pool)
        .await
        .map(Json)
        .map_err(|e| {
            eprintln!("Database error in tags: {e}");
            StatusCode::INTERNAL_SERVER_ERROR
        })
}