#!/bin/bash
set -euo pipefail

# Only run in remote (Claude Code on the web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Install npm dependencies (idempotent, leverages cached node_modules)
npm install

# Install Playwright browsers for E2E tests (non-fatal if network is unavailable)
npx playwright install --with-deps chromium || echo "Warning: Playwright browser installation failed (network may be unavailable)"
