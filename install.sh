#!/bin/bash

set -e

REPO="space-metrics-ai/engineering-delivery-playbook"
BRANCH="main"
TARGET_DIR="."

echo "Engineering Delivery Playbook"
echo "=============================="
echo ""

# Check if profiles folder already exists
if [ -d "$TARGET_DIR/profiles" ]; then
  read -p "profiles/ folder already exists. Overwrite? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
  rm -rf "$TARGET_DIR/profiles"
fi

echo "Downloading profiles..."

# Create temp directory
TMP_DIR=$(mktemp -d)
trap "rm -rf $TMP_DIR" EXIT

# Download and extract
curl -sL "https://github.com/$REPO/archive/$BRANCH.tar.gz" | tar -xz -C "$TMP_DIR"

# Copy profiles folder
cp -r "$TMP_DIR/engineering-delivery-playbook-$BRANCH/profiles" "$TARGET_DIR/"

# Copy .AGENT/ memory architecture (skip if exists)
if [ ! -d "$TARGET_DIR/.AGENT" ]; then
  if [ -d "$TMP_DIR/engineering-delivery-playbook-$BRANCH/.AGENT" ]; then
    cp -r "$TMP_DIR/engineering-delivery-playbook-$BRANCH/.AGENT" "$TARGET_DIR/"
    echo "✓ Installed .AGENT/ memory architecture"
  fi
else
  echo ".AGENT/ already exists, skipping memory setup"
fi

echo ""
echo "Done! Profiles installed to ./profiles/"
echo ""
echo "Files:"
find "$TARGET_DIR/profiles" -name "*.md" -type f | head -20
echo ""

# Check if OpenSpec is available
if command -v openspec &> /dev/null; then
  read -p "Initialize OpenSpec? (Y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    openspec init
    echo ""
    echo "OpenSpec initialized!"
  fi
else
  echo "Tip: Install OpenSpec for spec-driven development:"
  echo "  npm install -g @fission-ai/openspec@latest"
fi

echo ""
echo "Next steps:"
echo "  1. Configure your AI tool with a profile"
echo "  2. Start with: /opsx:propose \"your feature\""
echo ""
echo "Docs: https://github.com/$REPO"
