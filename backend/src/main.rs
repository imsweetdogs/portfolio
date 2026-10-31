mod config;
mod db;
mod routes;
mod types;

use axum::Router;
use sqlx::PgPool;
use std::net::SocketAddr;
use std::sync::Arc;
use tower_http::cors::{Any, CorsLayer};

async fn start_app(cfg: &config::Config) -> Result<(), Box<dyn std::error::Error>> {
    let pool = db::init_pool(&cfg.database_url).await;
    let app = create_app(pool);
    let addr = SocketAddr::from(([0, 0, 0, 0], cfg.port));
    println!("🦀 Server running on http://{addr}");

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;
    Ok(())
}

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
async fn main() {
    let cfg = Arc::new(config::Config::load());

    // let bot_cfg = Arc::clone(&cfg);
    // tokio::spawn(async move {
    //     if let Err(e) = my_bot::start_bot(&bot_cfg).await {
    //         eprintln!("💥 Bot error: {e}");
    //     }
    // });

    if let Err(e) = start_app(&cfg).await {
        eprintln!("💥 Application error: {e}");
        std::process::exit(1);
    }
}