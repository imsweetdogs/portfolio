<p align="center">
  <img src="./assets/preview.svg" alt="Typing SVG" />
</p>

## ⚡ Особенности

- **Canvas-first архитектура:** каждый контентный блок — независимый интерактивный холст.
- **Precision Age Ticker:** реалтайм-счётчик возраста с субсекундной точностью до сотых долей.
- **Интерактивный тикет-бот:** отправка сообщений с сайта прямо в Discord Forum Channel (каждое сообщение создает свой тред для общения). Псевдосессия через cookie, так как возможно я смогу ответить, тип по возвращению на сайт у вас будет открыт тот же тред.
- **Живая телеметрия:** статус в сети, текущая активность в Discord, играющий трек в Spotify, игры в Steam.

---
| Слой | Стек | Хостинг / Деплой |
| :--- | :--- | :--- |
| **Frontend** | Nuxt 3, Vue 3, Tailwind CSS | Cloudflare Pages |
| **Backend** | Rust, Axum, Tokio, Reqwest | blitz.cloud |
---

## 📁 Структура репозитория

```text
├── .github/              # Actions CI & CODEOWNERS
├── backend/              # Rust API сервер (Axum + Tokio)
│   ├── Cargo.toml
│   └── src/
├── frontend/
│   ├── components/
│   ├── pages/
│   └── assets/
├── .editorconfig
├── .gitignore
└── README.md