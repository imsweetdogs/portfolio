{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    pkg-config
  ];

  buildInputs = with pkgs; [
    # --- Backend (Rust) ---
    rustc
    cargo
    rustfmt
    clippy
    rust-analyzer
    openssl

    # --- Frontend (Node / Nuxt) ---
    bun

    # --- Deploy & Utils ---
    # nodePackages.wrangler
  ];

  # Фикс для OpenSSL в Rust под NixOS
  PKG_CONFIG_PATH = "${pkgs.openssl.dev}/lib/pkgconfig";
  RUST_BACKTRACE = "1";

  shellHook = ''
    echo "Dev Environment Ready!"
    echo "• Rust: $(rustc --version)"
    echo "• Bun: $(bun --version)"
  '';
}