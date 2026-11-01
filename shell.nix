{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # 1. Rust инструменты
    rustc
    cargo
    rust-analyzer
    clippy

    # 2. Системные библиотеки (критично для сборки sqlx и сетевых библиотек Rust)
    pkg-config
    openssl

    # 3. Фронтенд (Node.js 22 и пакетные менеджеры)
    bun
    nodejs_22

    proxychains
  ];

  # Прокидываем пути для сборщика Rust, чтобы cargo видел OpenSSL в NixOS
  shellHook = ''
    export PKG_CONFIG_PATH="${pkgs.openssl.dev}/lib/pkgconfig"
    echo "🦀 Nix dev-environment ready! (Rust + Node.js + Vercel CLI)"
  '';
}