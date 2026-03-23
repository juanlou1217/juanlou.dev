#!/bin/bash
set -e

echo "🔧 Step 1: Running Prisma migrations..."
prisma migrate deploy

echo "🔧 Step 2: Generating Prisma Client..."
prisma generate

echo "🔧 Step 3: Patching Prisma Client imports..."
node scripts/postgenerate.mjs

echo "🔧 Step 4: Building Contentlayer..."
NODE_OPTIONS='--no-deprecation' contentlayer2 build

echo "🔧 Step 5: Building Next.js..."
next build

echo "✅ Build completed successfully!"
