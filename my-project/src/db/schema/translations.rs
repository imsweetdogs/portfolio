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
            "description": "На фронте использую <span class=\"text-zinc-200 font-medium\">Vue 3, Nuxt</span> и <span class=\"text-zinc-200 font-medium\">Tailwind</span>, а бэкенды пишу на <span class=\"text-zinc-200 font-medium\">Rust (Axum, Tokio)</span> или на <span class=\"text-zinc-200 font-medium\">Python</span> когда поджимает время. Использую <span class=\"text-cyan-300 font-medium\">NixOS</span> в повседневных делах.",
            "easterEggText": "не дрочить!",
            "tgBanner": "Следите за новыми проектами в моём Telegram канале",
            "rssTitle": "RSS / Блог",
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
        ('ru', 'projects', '{
            "title": "Каталог",
            "titleAccent": "проектов",
            "subtitle": "Библиография моих работ: сервисы на Rust, архитектурные решения и веб-приложения.",
            "allTag": "Все",
            "details": "Подробнее",
            "collectionPrefix": "Коллекция:",
            "collectionSuffix": "проектов",
            "modal": {
                "close": "Закрыть",
                "repo": "Репозиторий",
                "site": "Сайт",
                "privateCode": "NDA"
            }
        }'::jsonb)
        ON CONFLICT (locale_code, namespace) 
        DO UPDATE SET payload = EXCLUDED.payload;
        "#
    )
    .execute(pool)
    .await?;

    sqlx::query(
        r#"
        INSERT INTO translations (locale_code, namespace, payload)
        VALUES 
        ('ru', 'skills', '{
            "title": "Мои",
            "titleAccent": "навыки",
            "description": "Я создаю быстрые, надежные и масштабируемые веб-платформы. В работе с фронтендом использую TS, Vue и Nuxt, а на бэкенде пишу на Rust и Python. У меня есть опыт работы с CI/CD, контейнеризацией и современными средами развертывания, стремлюсь к эффективной и удобной в поддержке инфраструктуре на всех проектах. 🐻",
            "groups": [
                {
                    "id": "frontend",
                    "title": "разработка",
                    "titleAccent": "Фронтенд",
                    "icon": "lucide:sparkles",
                    "previewIcons": [
                        "simple-icons:typescript",
                        "simple-icons:vuedotjs",
                        "simple-icons:nuxtdotjs",
                        "simple-icons:tailwindcss"
                    ],
                    "description": "Я разрабатываю адаптивные и доступные сайты с упором на чистый дизайн, плавные взаимодействия и внимание к деталям.",
                    "skills": [
                        { "name": "HTML", "icon": "simple-icons:html5" },
                        { "name": "CSS", "icon": "simple-icons:css3" },
                        { "name": "TypeScript", "icon": "simple-icons:typescript" },
                        { "name": "Vue", "icon": "simple-icons:vuedotjs" },
                        { "name": "Nuxt", "icon": "simple-icons:nuxtdotjs" },
                        { "name": "Astro", "icon": "simple-icons:astro" },
                        { "name": "Tailwind", "icon": "simple-icons:tailwindcss" }
                    ]
                },
                {
                    "id": "backend",
                    "title": "разработка",
                    "titleAccent": "Бекенд",
                    "icon": "lucide:server",
                    "previewIcons": [
                        "simple-icons:rust",
                        "simple-icons:python",
                        "simple-icons:postgresql",
                        "simple-icons:redis"
                    ],
                    "description": "Я создаю стабильные и эффективные серверные системы, обеспечивающие надежную работу и легкую интеграцию с другими сервисами.",
                    "skills": [
                        { "name": "Rust", "icon": "simple-icons:rust" },
                        { "name": "Python", "icon": "simple-icons:python" },
                        { "name": "TypeScript", "icon": "simple-icons:typescript" },
                        { "name": "PostgreSQL", "icon": "simple-icons:postgresql" },
                        { "name": "Redis", "icon": "simple-icons:redis" },
                        { "name": "Node", "icon": "simple-icons:nodedotjs" },
                        { "name": "Bun", "icon": "simple-icons:bun" }
                    ]
                },
                {
                    "id": "devops",
                    "title": "и CI/CD",
                    "titleAccent": "Окружение",
                    "icon": "lucide:git-fork",
                    "previewIcons": [
                        "simple-icons:nixos",
                        "simple-icons:docker",
                        "simple-icons:github",
                        "simple-icons:nginx"
                    ],
                    "description": "Я использую современные инструменты, чтобы упростить разработку и развертывание, обеспечивая стабильную инфраструктуру и удобные процессы работы.",
                    "skills": [
                        { "name": "NixOS", "icon": "simple-icons:nixos" },
                        { "name": "Docker", "icon": "simple-icons:docker" },
                        { "name": "GitHub", "icon": "simple-icons:github" },
                        { "name": "Nginx", "icon": "simple-icons:nginx" },
                        { "name": "Caddy", "icon": "simple-icons:caddy" }
                    ]
                }
            ]
        }'::jsonb)
        ON CONFLICT (locale_code, namespace) 
        DO UPDATE SET payload = EXCLUDED.payload;
        "#
    )
    .execute(pool)
    .await?;

    sqlx::query(
        r#"
        INSERT INTO translations (locale_code, namespace, payload)
        VALUES 
        ('ru', 'about', '{
            "title": "Немного обо",
            "titleAccent": "мне",
            "description": "Я могу описать себя как жизнерадостного и оптимистичного человека с кучей идей и планов в разных направлениях. Сейчас я всё ещё учусь в школе и постоянно стараюсь развиваться. Моя главная цель заключается в том чтобы сделать веб лучше и красивее. Помимо программирования, я экспериментирую с рисованием. 🐻",
            "spotify": {
                "title": "Сейчас слушаю",
                "idle": "Сейчас ничего не играет",
                "idleSub": "Тут мог быть классный исполнитель"
            },
            "coding": {
                "title": "Сейчас работаю",
                "idle": "Не активен",
                "idleSub": "Отдыхает от кода",
                "lastActivity": "Последняя активность"
            },
            "discord": {
                "dnd": "Не беспокоить",
                "online": "В сети",
                "idle": "Не активен",
                "offline": "Не в сети"
            },
            "steam": {
                "title": "Steam",
                "online": "В сети",
                "offline": "Не в сети",
                "inGame": "В игре",
                "notInGame": "Не в игре",
                "level": "Уровень профиля",
                "topGames": "Любимые игры",
                "achievements": "достижений"
            },
            "system": {
                "title": "Окружение",
                "os": "NixOS (unstable)",
                "wm": "Hyprland / Wayland",
                "uptime": "Uptime",
                "packages": "пакетов"
            },
            "github": {
                "title": "GitHub Activity",
                "commits": "коммитов",
                "streak": "дней подряд",
                "sub": "Публичный вклад за год"
            }
        }'::jsonb)
        ON CONFLICT (locale_code, namespace) 
        DO UPDATE SET payload = EXCLUDED.payload;
        "#
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
