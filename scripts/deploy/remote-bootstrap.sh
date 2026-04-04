#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/juanlou-dev}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
ENV_FILE="${ENV_FILE:-.env.production}"

export DEBIAN_FRONTEND=noninteractive

install_package() {
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update
    apt-get install -y "$@"
    return
  fi

  if command -v dnf >/dev/null 2>&1; then
    dnf install -y "$@"
    return
  fi

  if command -v yum >/dev/null 2>&1; then
    yum install -y "$@"
    return
  fi

  echo "No supported package manager found" >&2
  exit 1
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

  if command -v podman-compose >/dev/null 2>&1; then
    podman-compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up -d --build
    return
  fi

  echo "Docker Compose is not available" >&2
  exit 1
}

ensure_container_runtime() {
  if docker compose version >/dev/null 2>&1 || command -v docker-compose >/dev/null 2>&1 || command -v podman-compose >/dev/null 2>&1; then
    return
  fi

  if command -v apt-get >/dev/null 2>&1; then
    if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1; then
      if ! curl -fsSL https://get.docker.com | sh; then
        install_package docker.io docker-compose-plugin || install_package docker.io docker-compose
      fi
    fi
    return
  fi

  if command -v dnf >/dev/null 2>&1 || command -v yum >/dev/null 2>&1; then
    install_package podman podman-compose
    return
  fi

  echo "No supported container runtime installation path found" >&2
  exit 1
}

if ! command -v git >/dev/null 2>&1; then
  install_package git
fi

if ! command -v curl >/dev/null 2>&1; then
  install_package curl
fi

ensure_container_runtime

if command -v systemctl >/dev/null 2>&1; then
  if systemctl list-unit-files | grep -q '^docker.service'; then
    systemctl enable docker || true
    systemctl start docker || true
  fi
fi

mkdir -p "$APP_DIR"
cd "$APP_DIR"

if [ ! -f "$ENV_FILE" ]; then
  echo "$ENV_FILE is required before deployment" >&2
  exit 1
fi

compose_up
