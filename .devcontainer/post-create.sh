#!/bin/bash
set -e

echo "=== Post-create setup ==="

# 1. 시스템 타임존 설정
echo "[1/7] 시스템 설정..."
sudo ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
echo "Asia/Seoul" | sudo tee /etc/timezone > /dev/null

# 2. Git 설정
echo "[2/7] Git 설정..."
git config pull.rebase true
git config init.defaultBranch main

if git show-ref --verify --quiet refs/remotes/origin/main; then
  git remote set-head origin main 2>/dev/null || true
fi
git fetch origin main 2>/dev/null || true

if git show-ref --verify --quiet refs/heads/master; then
  CURRENT_BRANCH=$(git branch --show-current)
  if [ "$CURRENT_BRANCH" = "master" ]; then
    git checkout -B main origin/main
    git branch -D master 2>/dev/null || true
  else
    git branch -D master 2>/dev/null || true
  fi
fi

# 3. Node.js PATH 보정
echo "[3/7] Node.js PATH 보정..."
if command -v node &>/dev/null; then
  NODE_BIN_DIR=$(dirname "$(which node)")
  if [ "$NODE_BIN_DIR" != "/usr/local/bin" ] && [ "$NODE_BIN_DIR" != "/usr/bin" ]; then
    sudo ln -sf "$NODE_BIN_DIR/node" /usr/local/bin/node 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npm" /usr/local/bin/npm 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npx" /usr/local/bin/npx 2>/dev/null || true
  fi
fi

# 4. GitHub CLI (gh) 설치 확인
echo "[4/7] GitHub CLI 확인..."
if ! command -v gh &>/dev/null; then
  GH_VERSION="2.67.0"
  curl -fsSL "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.tar.gz" -o /tmp/gh.tar.gz \
    && tar xzf /tmp/gh.tar.gz -C /tmp \
    && sudo cp "/tmp/gh_${GH_VERSION}_linux_amd64/bin/gh" /usr/local/bin/gh \
    && rm -rf /tmp/gh.tar.gz "/tmp/gh_${GH_VERSION}_linux_amd64"
fi

# 5. Claude Code CLI 전역 설치
echo "[5/7] Claude Code CLI 설치..."
npm install -g @anthropic-ai/claude-code

# 6. Frontend 의존성 설치
echo "[6/7] Frontend npm install..."
cd frontend && npm install && cd ..

# 7. Backend 의존성 설치
echo "[7/7] Backend pip install..."
cd backend && pip install -e ".[dev]" && cd ..

echo "=== Setup 완료! ==="
echo ""
echo "사용 가능한 명령어:"
echo "  cd frontend && npm run dev  → Next.js 개발 서버 (http://localhost:3000)"
echo "  cd backend && uvicorn app.main:app --reload  → FastAPI (http://localhost:8000)"
echo "  docker compose up           → 전체 스택 실행"
echo "  claude                      → Claude Code CLI"
