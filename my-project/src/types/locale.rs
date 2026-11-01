// backend/src/types/locale.rs
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, sqlx::FromRow)]
#[serde(rename_all = "camelCase")]
pub struct Locale {
    pub code: String,
    pub label: String,
    pub intl: String,
    pub is_default: bool,
}