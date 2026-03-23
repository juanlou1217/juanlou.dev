#!/bin/bash
set -e

echo "🔧 Step 1: Running Prisma migrations..."
# Prisma 7 需要通过环境变量传递数据库 URL
if [ -z "$POSTGRES_URL" ]; then
  echo "⚠️  Warning: POSTGRES_URL environment variable is not set"
  echo "⚠️  Skipping database migrations (will use existing schema)"
else
  prisma migrate deploy
fi

echo "🔧 Step 2: Generating Prisma Client..."
prisma generate

echo "🔧 Step 3: Patching Prisma Client imports..."
node scripts/postgenerate.mjs

echo "🔧 Step 4: Building Contentlayer..."
NODE_OPTIONS='--no-deprecation' contentlayer2 build

echo "🔧 Step 5: Building Next.js..."
next build

echo "✅ Build completed successfully!"
