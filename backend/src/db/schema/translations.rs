// backend/src/db/schema/translations.rs
use sqlx::PgPool;

pub async fn init(pool: &PgPool) -> Result<(), sqlx::Error> {
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS translations (
            id SERIAL PRIMARY KEY,
            locale_code VARCHAR(16) REFERENCES locales(code) ON DELETE CASCADE,
            namespace VARCHAR(32) NOT NULL,
            payload JSONB NOT NULL,
            updated_at TIMESTAMPTZ DEFAULT NOW(),
            UNIQUE(locale_code, namespace)
        );
        "#
    )
    .execute(pool)
    .await?;

    // Сидим русский базовый эталон (header, hero, media)
    sqlx::query(
        r#"
        INSERT INTO translations (locale_code, namespace, payload)
        VALUES 
        ('ru', 'media', '{
            "posterUrl": "https://cdn.sweetdogs.ru/media/poster.webp",
            "videoUrl": "https://cdn.sweetdogs.ru/media/ambient.webm",
            "stickerUrl": "https://cdn.sweetdogs.ru/stickers/avatar.webp",
            "easterStickerUrl": "https://cdn.sweetdogs.ru/stickers/easter.webp",
            "avatarUrl": "https://cdn.sweetdogs.ru/brand/avatar.webp",
            "ogImageUrl": "https://cdn.sweetdogs.ru/brand/og.webp",
            "faviconUrl": "https://cdn.sweetdogs.ru/brand/favicon.svg"
        }'::jsonb),

        ('ru', 'header', '{
            "menu": "Меню",
            "close": "Закрыть",
            "action": "Связаться",
            "textureTitle": "Переключить текстуру шума"
        }'::jsonb),

        ('ru', 'hero', '{
            "greeting": "Привет! Я",
            "rolePrefix": "Full-stack",
            "roleSuffix": "разработчик.",
            "description": "На фронте использую <b>Vue 3, Nuxt</b> и <b>Tailwind</b>, а бэкенды пишу на <b>Rust (Axum, Tokio)</b> или на <b>Python</b> когда поджимает время. Использую <b>NixOS</b> в повседневных делах.",
            "stickerTitle": "sweetdogs avatar",
            "easterEggText": "пасхалка найдена!",
            "tgBanner": "Следите за новыми проектами в моём Telegram канале",
            "buttons": {
                "works": "Мои работы",
                "github": "GitHub",
                "contact": "Связаться со мной"
            },
            "ambient": {
                "title": "Эмбиент",
                "enabled": "Вкл",
                "disabled": "Выкл",
                "soundTitle": "Звук"
            }
        }'::jsonb)
        ON CONFLICT (locale_code, namespace) DO NOTHING;
        "#
    )
    .execute(pool)
    .await?;

    Ok(())
}