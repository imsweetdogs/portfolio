use std::env;

pub struct Config {
    pub database_url: String,
    pub port: u16,
}

impl Config {
    pub fn load() -> Self {
        let _ = dotenvy::dotenv();

        let database_url = env::var("DATABASE_URL")
            .expect("DATABASE_URL must be set");

        let port = env::var("PORT")
            .unwrap_or_else(|_| "8080".into())
            .parse()
            .expect("PORT must be a valid number");

        Self { database_url, port }
    }
}