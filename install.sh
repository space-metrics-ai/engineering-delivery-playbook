#!/bin/bash

set -e

REPO="space-metrics-ai/engineering-delivery-playbook"
BRANCH="main"
TARGET_DIR="."

echo "Engineering Delivery Playbook"
echo "=============================="
echo ""

# Check if agents folder already exists
if [ -d "$TARGET_DIR/agents" ]; then
  read -p "agents/ folder already exists. Overwrite? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
  fi
  rm -rf "$TARGET_DIR/agents"
fi

echo "Downloading agents..."

# Create temp directory
TMP_DIR=$(mktemp -d)
trap "rm -rf $TMP_DIR" EXIT

# Download and extract
curl -sL "https://github.com/$REPO/archive/$BRANCH.tar.gz" | tar -xz -C "$TMP_DIR"

# Copy agents folder
cp -r "$TMP_DIR/engineering-delivery-playbook-$BRANCH/agents" "$TARGET_DIR/"

echo ""
echo "Done! Agents installed to ./agents/"
echo ""
echo "Files:"
find "$TARGET_DIR/agents" -name "*.md" -type f | head -20
echo ""

# Check if spec-kit is available
if command -v specify &> /dev/null; then
  read -p "Initialize spec-kit? (Y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Nn]$ ]]; then
    specify init . --here --ai claude
    echo ""
    echo "Spec-kit initialized!"
  fi
else
  echo "Tip: Install spec-kit for spec-driven development:"
  echo "  uv tool install specify-cli --from git+https://github.com/github/spec-kit.git"
fi

echo ""
echo "Next steps:"
echo "  1. Configure your AI tool with an agent prompt"
echo "  2. Start with: /speckit.specify \"your feature\""
echo ""
echo "Docs: https://github.com/$REPO"
