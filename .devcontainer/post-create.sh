#!/bin/bash
set -e

echo "=== Post-create setup ==="

# 1. 시스템 패키지 + VNC 설치 (Dockerfile 제거로 여기서 설치)
echo "[1/8] 시스템 패키지 설치 (VNC/noVNC)..."
sudo ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
echo "Asia/Seoul" | sudo tee /etc/timezone > /dev/null

sudo apt-get update && sudo apt-get install -y --no-install-recommends \
  xvfb \
  x11vnc \
  fluxbox \
  xterm \
  net-tools \
  procps \
  && sudo apt-get clean && sudo rm -rf /var/lib/apt/lists/*

# noVNC 설치
NOVNC_VERSION=1.4.0
WEBSOCKIFY_VERSION=0.11.0
sudo mkdir -p /opt/noVNC/utils/websockify
wget -qO- "https://github.com/novnc/noVNC/archive/refs/tags/v${NOVNC_VERSION}.tar.gz" \
  | sudo tar xz --strip-components=1 -C /opt/noVNC
wget -qO- "https://github.com/novnc/websockify/archive/refs/tags/v${WEBSOCKIFY_VERSION}.tar.gz" \
  | sudo tar xz --strip-components=1 -C /opt/noVNC/utils/websockify
sudo ln -sf /opt/noVNC/vnc.html /opt/noVNC/index.html

# start-vnc.sh 설치
sudo cp .devcontainer/start-vnc.sh /usr/local/bin/start-vnc.sh
sudo chmod +x /usr/local/bin/start-vnc.sh

# 2. Git 설정 - divergent branches 오류 방지
echo "[2/8] Git 설정..."
git config pull.rebase true
git config init.defaultBranch main

# origin/main fetch 및 origin/HEAD 설정
if git show-ref --verify --quiet refs/remotes/origin/main; then
  git remote set-head origin main 2>/dev/null || true
fi

# 최신 origin/main 가져오기
git fetch origin main 2>/dev/null || true

# master 브랜치 정리
if git show-ref --verify --quiet refs/heads/master; then
  CURRENT_BRANCH=$(git branch --show-current)
  if [ "$CURRENT_BRANCH" = "master" ]; then
    echo "  master → main 전환 (origin/main으로 리셋)..."
    git checkout -B main origin/main
    git branch -D master 2>/dev/null || true
  else
    echo "  불필요한 master 브랜치 삭제..."
    git branch -D master 2>/dev/null || true
  fi
fi

# main 브랜치를 origin/main과 강제 동기화
if git show-ref --verify --quiet refs/remotes/origin/main; then
  CURRENT_BRANCH=$(git branch --show-current)
  if ! git show-ref --verify --quiet refs/heads/main; then
    echo "  main 브랜치 생성 (origin/main 기준)..."
    git branch main origin/main
  else
    echo "  main 브랜치를 origin/main으로 동기화..."
    if [ "$CURRENT_BRANCH" = "main" ]; then
      git reset --hard origin/main
    else
      git branch -f main origin/main
    fi
  fi
  git branch --set-upstream-to=origin/main main 2>/dev/null || true
fi

# 3. Node.js PATH 보정
echo "[3/8] Node.js PATH 보정..."
if command -v node &>/dev/null; then
  NODE_BIN_DIR=$(dirname "$(which node)")
  if [ "$NODE_BIN_DIR" != "/usr/local/bin" ] && [ "$NODE_BIN_DIR" != "/usr/bin" ]; then
    echo "  nvm Node 경로: $NODE_BIN_DIR → /usr/local/bin 링크 생성"
    sudo ln -sf "$NODE_BIN_DIR/node" /usr/local/bin/node 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npm" /usr/local/bin/npm 2>/dev/null || true
    sudo ln -sf "$NODE_BIN_DIR/npx" /usr/local/bin/npx 2>/dev/null || true
  fi
fi

# 4. GitHub CLI (gh) 설치 확인
echo "[4/8] GitHub CLI 확인..."
if ! command -v gh &>/dev/null; then
  echo "  gh가 없습니다. 직접 설치합니다..."
  GH_VERSION="2.67.0"
  curl -fsSL "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.tar.gz" -o /tmp/gh.tar.gz \
    && tar xzf /tmp/gh.tar.gz -C /tmp \
    && sudo cp "/tmp/gh_${GH_VERSION}_linux_amd64/bin/gh" /usr/local/bin/gh \
    && rm -rf /tmp/gh.tar.gz "/tmp/gh_${GH_VERSION}_linux_amd64" \
    && echo "  gh $(gh --version | head -1) 설치 완료"
else
  echo "  gh $(gh --version | head -1) 이미 설치됨"
fi

# 5. Claude Code CLI 전역 설치
echo "[5/8] Claude Code CLI 설치..."
npm install -g @anthropic-ai/claude-code

# 6. npm 의존성 설치
echo "[6/8] npm install..."
npm install

# 7. Husky git hooks 활성화
echo "[7/8] Husky hooks 설정..."
npx husky

# 8. Python 의존성 (requirements.txt가 있으면)
if [ -f requirements.txt ]; then
  echo "[8/8] Python 패키지 설치..."
  pip install -r requirements.txt
else
  echo "[8/8] requirements.txt 없음, 건너뜀"
fi

echo "=== Setup 완료! ==="
echo ""
echo "사용 가능한 명령어:"
echo "  npm run dev          → Vite 개발 서버 (http://localhost:5173)"
echo "  npm run check-all    → 전체 검증 (format + typecheck + lint + test)"
echo "  claude               → Claude Code CLI"
echo "  noVNC 접속           → http://localhost:6080/vnc.html"
