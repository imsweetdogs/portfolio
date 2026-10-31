# ==========================================
# 1. ЭТАП СБОРКИ (BUILDER)
# ==========================================
FROM rust:1.82-bookworm AS builder

WORKDIR /app

# Системные пакеты для компиляции sqlx и openssl
RUN apt-get update && apt-get install -y --no-install-recommends \
    pkg-config \
    libssl-dev \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Копируем манифесты (Cargo.lock* со звездочкой, чтобы не падало, если локфайла нет)
COPY Cargo.toml Cargo.lock* ./

# Кэшируем зависимости: собираем фиктивный проект
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src

# Копируем реальные исходники
COPY src ./src

# Собираем реальный бинарник и АВТОМАТИЧЕСКИ копируем его как /app/server
RUN touch src/main.rs && cargo build --release && \
    BIN_NAME=$(awk -F '"' '/^name =/ {print $2; exit}' Cargo.toml) && \
    cp target/release/${BIN_NAME} /app/server

# ==========================================
# 2. МИНИМАЛЬНЫЙ РАНТАЙМ ОБРАЗ (~35-40 МБ)
# ==========================================
FROM debian:bookworm-slim AS runner

WORKDIR /app

# Сертификаты для защищенных коннектов к Postgres (Neon/Blitz)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

# Запуск от безопасного пользователя
RUN useradd -m -u 1001 appuser
USER appuser

# Копируем скомпилированный бинарник
COPY --from=builder /app/server /app/server

ENV PORT=8080
EXPOSE 8080

CMD ["/app/server"]