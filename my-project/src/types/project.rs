// backend/src/types/project.rs
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct ProjectQuery {
    pub page: Option<i64>,
    pub limit: Option<i64>,
    pub tag: Option<String>,
    pub lang: Option<String>,
}

// То, что ожидает фронт в types.ts
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectItem {
    pub id: String,
    pub title: String,
    pub year: String,
    pub description: String,
    pub tags: Vec<String>,
    pub image: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub link: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub github: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct ProjectsResponse {
    pub items: Vec<ProjectItem>,
    pub total: i64,
    pub page: i64,
    pub limit: i64,
    pub total_pages: i64,
    pub tags: Vec<String>,
}