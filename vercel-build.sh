#!/bin/bash
set -e

echo "Running Prisma migrations..."
pnpm prisma migrate deploy

echo "Generating Prisma client..."
pnpm prisma generate

echo "Building Next.js app..."
pnpm build
