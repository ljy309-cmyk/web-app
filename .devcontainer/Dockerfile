FROM mcr.microsoft.com/devcontainers/python:3.11-bullseye

ARG NODE_VERSION=20
ARG NOVNC_VERSION=1.4.0
ARG WEBSOCKIFY_VERSION=0.11.0

# ============================================================
# 1. Node.js 설치
# ============================================================
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && node --version && npm --version

# ============================================================
# 2. xvfb + VNC + noVNC (GUI 확인용)
# ============================================================
RUN apt-get update && apt-get install -y --no-install-recommends \
    xvfb \
    x11vnc \
    fluxbox \
    xterm \
    net-tools \
    procps \
    curl \
    wget \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# noVNC 설치
RUN mkdir -p /opt/noVNC/utils/websockify \
    && wget -qO- https://github.com/novnc/noVNC/archive/refs/tags/v${NOVNC_VERSION}.tar.gz \
       | tar xz --strip-components=1 -C /opt/noVNC \
    && wget -qO- https://github.com/novnc/websockify/archive/refs/tags/v${WEBSOCKIFY_VERSION}.tar.gz \
       | tar xz --strip-components=1 -C /opt/noVNC/utils/websockify \
    && ln -s /opt/noVNC/vnc.html /opt/noVNC/index.html

# ============================================================
# 3. Python 패키지 (Flask 등 백엔드용)
# ============================================================
COPY requirements.txt /tmp/requirements.txt
RUN if [ -f /tmp/requirements.txt ]; then pip install --no-cache-dir -r /tmp/requirements.txt; fi

# ============================================================
# 4. xvfb + noVNC 시작 스크립트
# ============================================================
COPY start-vnc.sh /usr/local/bin/start-vnc.sh
RUN chmod +x /usr/local/bin/start-vnc.sh

# 환경 변수
ENV DISPLAY=:99
ENV VNC_PORT=5900
ENV NOVNC_PORT=6080
ENV SCREEN_WIDTH=1280
ENV SCREEN_HEIGHT=720
ENV SCREEN_DEPTH=24

EXPOSE 5173 4173 6080 5900

# vscode 사용자로 전환
USER vscode
