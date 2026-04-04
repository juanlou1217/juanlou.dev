#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/juanlou-dev}"
COMPOSE_FILE="${COMPOSE_FILE:-docker-compose.prod.yml}"
ENV_FILE="${ENV_FILE:-.env.production}"
SWAPFILE_PATH="${SWAPFILE_PATH:-/swapfile}"
SWAPFILE_SIZE="${SWAPFILE_SIZE:-4G}"

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

ensure_swap() {
  if swapon --show | grep -q .; then
    return
  fi

  if [ ! -f "$SWAPFILE_PATH" ]; then
    if command -v fallocate >/dev/null 2>&1; then
      fallocate -l "$SWAPFILE_SIZE" "$SWAPFILE_PATH"
    else
      dd if=/dev/zero of="$SWAPFILE_PATH" bs=1M count=4096
    fi
    chmod 600 "$SWAPFILE_PATH"
    mkswap "$SWAPFILE_PATH"
  fi

  swapon "$SWAPFILE_PATH"

  if ! grep -q "^$SWAPFILE_PATH " /etc/fstab 2>/dev/null; then
    printf '%s none swap sw 0 0\n' "$SWAPFILE_PATH" >> /etc/fstab
  fi
}

if ! command -v git >/dev/null 2>&1; then
  install_package git
fi

if ! command -v curl >/dev/null 2>&1; then
  install_package curl
fi

ensure_container_runtime
ensure_swap

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
