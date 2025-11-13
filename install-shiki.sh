#!/bin/bash

# Install Shiki for CodeBlock component
echo "Installing Shiki syntax highlighter..."

# Check if pnpm is available
if command -v pnpm &> /dev/null; then
    echo "Using pnpm..."
    pnpm add shiki
elif command -v npm &> /dev/null; then
    echo "Using npm..."
    npm install shiki
else
    echo "Error: Neither pnpm nor npm found. Please install Node.js package manager."
    exit 1
fi

echo "✅ Shiki installed successfully!"
echo ""
echo "The CodeBlock component is now ready to use with professional syntax highlighting."
echo "Run your development server to see the improvements!"

