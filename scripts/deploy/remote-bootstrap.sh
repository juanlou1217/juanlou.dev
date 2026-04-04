#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/juanlou-dev}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
ENV_FILE="${ENV_FILE:-.env.production}"

export DEBIAN_FRONTEND=noninteractive

install_package() {
  apt-get update
  apt-get install -y "$@"
}

compose_up() {
  if docker compose version >/dev/null 2>&1; then
    docker compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d --build --remove-orphans
    return
  fi

  if command -v docker-compose >/dev/null 2>&1; then
    docker-compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d --build --remove-orphans
    return
  fi

  echo "Docker Compose is not available" >&2
  exit 1
}

if ! command -v git >/dev/null 2>&1; then
  install_package git
fi

if ! command -v curl >/dev/null 2>&1; then
  install_package curl
fi

if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

if command -v systemctl >/dev/null 2>&1; then
  systemctl enable docker || true
  systemctl start docker || true
fi

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -f "$ENV_FILE" ]; then
  echo "$ENV_FILE is required before deployment" >&2
  exit 1
fi

compose_up
