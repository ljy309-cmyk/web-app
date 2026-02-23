#!/bin/bash
# 컨테이너 시작 시마다 실행 (postStartCommand)

echo "=== Post-start setup ==="

# 1. Git 설정 - divergent branches 오류 방지
echo "[1/3] Git 설정..."
git config pull.rebase true
git config init.defaultBranch main
git remote set-head origin main 2>/dev/null || true

# master → main 브랜치 정리
if git show-ref --verify --quiet refs/heads/master; then
  CURRENT_BRANCH=$(git branch --show-current)
  if ! git show-ref --verify --quiet refs/heads/main; then
    if [ "$CURRENT_BRANCH" = "master" ]; then
      git checkout -B main origin/main 2>/dev/null && git branch -D master 2>/dev/null || true
    else
      git branch -D master 2>/dev/null || true
      git branch main origin/main 2>/dev/null || true
    fi
  else
    if [ "$CURRENT_BRANCH" != "master" ]; then
      git branch -D master 2>/dev/null || true
    fi
  fi
fi

# main 브랜치 upstream 설정
if git show-ref --verify --quiet refs/heads/main && git show-ref --verify --quiet refs/remotes/origin/main; then
  git branch --set-upstream-to=origin/main main 2>/dev/null || true
fi

# main이 origin/main보다 뒤처져 있으면 fast-forward
CURRENT_BRANCH=$(git branch --show-current)
if git show-ref --verify --quiet refs/heads/main && git show-ref --verify --quiet refs/remotes/origin/main; then
  LOCAL_MAIN=$(git rev-parse refs/heads/main 2>/dev/null)
  REMOTE_MAIN=$(git rev-parse refs/remotes/origin/main 2>/dev/null)
  if [ "$LOCAL_MAIN" != "$REMOTE_MAIN" ]; then
    MERGE_BASE=$(git merge-base refs/heads/main refs/remotes/origin/main 2>/dev/null)
    if [ "$MERGE_BASE" = "$LOCAL_MAIN" ]; then
      echo "  main 브랜치 fast-forward 업데이트..."
      if [ "$CURRENT_BRANCH" = "main" ]; then
        git merge --ff-only origin/main 2>/dev/null || true
      else
        git fetch origin main:main 2>/dev/null || true
      fi
    fi
  fi
fi

# 2. npm 의존성 설치
echo "[2/3] npm install..."
npm install

# 3. VNC 서버 시작
echo "[3/3] VNC 서버 시작..."
nohup /usr/local/bin/start-vnc.sh > /tmp/vnc.log 2>&1 &

echo "=== Post-start 완료! ==="
