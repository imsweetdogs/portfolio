// src/bin/local.rs
use axum::Router;
use backend::{config, db, routes};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

fn create_app(pool: sqlx::PgPool) -> Router {
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
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cfg = config::Config::load();
    let pool = db::init_pool(&cfg.database_url).await;
    let app = create_app(pool);

    let addr = SocketAddr::from(([127, 0, 0, 1], cfg.port));
    println!("🦀 Локальный Rust бэкенд запущен: http://{addr}");

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;
    Ok(())
}