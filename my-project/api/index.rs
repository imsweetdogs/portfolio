use axum::Router;
use backend::{config, db, routes};
use sqlx::postgres::PgPoolOptions;
use sqlx::PgPool;
use std::time::Duration;
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer};
use vercel_runtime::axum::VercelLayer;
use vercel_runtime::Error;

fn create_app(pool: PgPool) -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        .nest("/api/v1/locales", routes::locales::router())
        .nest("/api/v1/translations", routes::translations::router())
        .nest("/api/v1/projects", routes::projects::router())
        .layer(cors)
        .with_state(pool)
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    let cfg = config::Config::load();

    let pool = PgPoolOptions::new()
        .max_connections(3)
        .acquire_timeout(Duration::from_secs(5))
        .idle_timeout(Duration::from_secs(30))
        .connect(&cfg.database_url)
        .await
        .expect("Failed to connect to database");

    // Создаем схемы таблиц при первом старте
    db::schema::init(&pool).await;

    let router = create_app(pool);

    // Оборачиваем Axum-роутер в слой Vercel
    let app = ServiceBuilder::new()
        .layer(VercelLayer::new())
        .service(router);

    vercel_runtime::run(app).await
}