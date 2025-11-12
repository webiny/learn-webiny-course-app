#!/bin/bash

# Installation script for frontmatter support packages

echo "📦 Installing packages for frontmatter support..."
echo ""

# Check if pnpm is available
if command -v pnpm &> /dev/null
then
    echo "Using pnpm..."
    pnpm add gray-matter remark-frontmatter
elif command -v npm &> /dev/null
then
    echo "Using npm..."
    npm install gray-matter remark-frontmatter
else
    echo "❌ Error: Neither pnpm nor npm found. Please install Node.js and pnpm/npm."
    exit 1
fi

echo ""
echo "✅ Packages installed successfully!"
echo ""
echo "Next steps:"
echo "1. Run 'pnpm dev' or 'npm run dev' to start the development server"
echo "2. Navigate to any lesson page"
echo "3. Check the console for frontmatter data"
echo "4. Frontmatter should NOT appear in the rendered content"
echo ""

