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

    // 1. DATA (Профиль): DO NOTHING
    sqlx::query(
        r#"
        INSERT INTO translations (locale_code, namespace, payload)
        VALUES 
        ('ru', 'data', '{
            "birthDate": "2005-09-16T00:00:00Z",
            "timezone": "Europe/Moscow",
            "timezoneIdentifier": "MSK"
        }'::jsonb)
        ON CONFLICT (locale_code, namespace) DO NOTHING;
        "#
    )
    .execute(pool)
    .await?;

    // 2. LINKS (Ссылки): DO NOTHING (Fixed with r##" ... "##)
    sqlx::query(
        r##"
        INSERT INTO translations (locale_code, namespace, payload)
        VALUES 
        ('ru', 'links', '{
            "tg": "https://t.me/notsweetdogs",
            "rss": "https://blog.sweetdogs.ru/data/rss",
            "github": "https://github.com/imsweetdogs",
            "email": "offers@sweetdogs.ru",
            "discord": "https://discord.gg/eggDdRqRu3",
            "steam": "https://steamcommunity.com/id/sweetdogs",
            "projectsAnchor": "#projects"
        }'::jsonb)
        ON CONFLICT (locale_code, namespace) DO NOTHING;
        "##
    )
    .execute(pool)
    .await?;

    // 3. MEDIA (Реальные ссылки Neon): DO NOTHING
    sqlx::query(
        r#"
        INSERT INTO translations (locale_code, namespace, payload)
        VALUES 
        ('ru', 'media', '{
            "videoUrl": "https://br-bold-forest-b953969w.storage.c-7.eu-central-1.aws.neon.tech/portfolio/background.mp4",
            "stickerUrl": "https://br-bold-forest-b953969w.storage.c-7.eu-central-1.aws.neon.tech/portfolio/stickers/-WqiGJ3j.webm",
            "easterStickerUrl": "https://br-bold-forest-b953969w.storage.c-7.eu-central-1.aws.neon.tech/portfolio/stickers/ie-hBfC-.webm",
            "avatarUrl": "https://br-bold-forest-b953969w.storage.c-7.eu-central-1.aws.neon.tech/portfolio/logo.svg",
            "ogImageUrl": "https://br-bold-forest-b953969w.storage.c-7.eu-central-1.aws.neon.tech/portfolio/logo.svg",
            "faviconUrl": "https://br-bold-forest-b953969w.storage.c-7.eu-central-1.aws.neon.tech/portfolio/logo.svg",
            "stickers": [
                "https://br-bold-forest-b953969w.storage.c-7.eu-central-1.aws.neon.tech/portfolio/stickers/-WqiGJ3j.webm",
                "https://br-bold-forest-b953969w.storage.c-7.eu-central-1.aws.neon.tech/portfolio/stickers/ie-hBfC-.webm",
                "https://br-bold-forest-b953969w.storage.c-7.eu-central-1.aws.neon.tech/portfolio/stickers/pueQB29u.webm"
            ]
        }'::jsonb)
        ON CONFLICT (locale_code, namespace) DO NOTHING;
        "#
    )
    .execute(pool)
    .await?;

    // 4. HEADER & HERO: DO UPDATE (тексты обновляются из кода)
    sqlx::query(
        r###"
        INSERT INTO translations (locale_code, namespace, payload)
        VALUES 
        ('ru', 'header', '{
            "menu": "Меню",
            "close": "Закрыть",
            "action": "Связаться",
            "textureTitle": "Переключить текстуру шума",
            "nav": [
                { "name": "Проекты", "href": "#projects", "icon": "lucide:box" },
                { "name": "Навыки", "href": "#skills", "icon": "lucide:wrench" },
                { "name": "Обо мне", "href": "#about", "icon": "lucide:sparkles" }
            ]
        }'::jsonb),

        ('ru', 'hero', '{
            "greeting": "Привет! Я",
            "rolePrefix": "Full-stack",
            "roleSuffix": "разработчик.",
            "description": "На фронте использую <b>Vue 3, Nuxt</b> и <b>Tailwind</b>, а бэкенды пишу на <b>Rust (Axum, Tokio)</b> или на <b>Python</b> когда поджимает время. Использую <b>NixOS</b> в повседневных делах.",
            "easterEggText": "пасхалка найдена!",
            "tgBanner": "Следите за новыми проектами в моём Telegram канале",
            "buttons": {
                "works": "Мои работы",
                "github": "GitHub",
                "contact": "Связаться со мной"
            },
            "ambient": {
                "ambientOn": "Эмбиент: Вкл",
                "ambientOff": "Эмбиент: Выкл",
                "soundOn": "Звук: 7%",
                "soundMuted": "Звук: Выкл"
            }
        }'::jsonb)
        ON CONFLICT (locale_code, namespace) 
        DO UPDATE SET payload = EXCLUDED.payload;
        "###
    )
    .execute(pool)
    .await?;

    sqlx::query(
        r#"
        INSERT INTO translations (locale_code, namespace, payload)
        VALUES 
        ('ru', 'footer', '{
            "certified": "F07 certified",
            "certifiedSub": "(сертифицировано диагнозом F07)."
        }'::jsonb)
        ON CONFLICT (locale_code, namespace) 
        DO UPDATE SET payload = EXCLUDED.payload;
        "#
    )
    .execute(pool)
    .await?;

    Ok(())
}