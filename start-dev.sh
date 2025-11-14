#!/bin/bash

# Development startup script
# This ensures the registry is up-to-date before starting development

echo "🚀 Starting Webiny Learn development environment..."
echo ""

# First, generate the MDX registry if it's empty or outdated
echo "📝 Generating MDX registry..."
npm run generate-mdx-registry

echo ""
echo "✅ Registry generated!"
echo ""

# Start the dev server with file watcher
echo "🔥 Starting Next.js dev server with auto-regeneration..."
echo ""
npm run dev:watch

