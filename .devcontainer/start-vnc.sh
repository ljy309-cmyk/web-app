#!/bin/bash
set -e

# xvfb 가상 디스플레이 시작
echo "Starting Xvfb on display ${DISPLAY}..."
Xvfb ${DISPLAY} -screen 0 ${SCREEN_WIDTH}x${SCREEN_HEIGHT}x${SCREEN_DEPTH} -ac +extension GLX +render -noreset &
sleep 1

# fluxbox 윈도우 매니저 시작
echo "Starting Fluxbox..."
fluxbox &
sleep 1

# VNC 서버 시작
echo "Starting x11vnc on port ${VNC_PORT}..."
x11vnc -display ${DISPLAY} -forever -nopw -rfbport ${VNC_PORT} -shared &
sleep 1

# noVNC 웹 클라이언트 시작
echo "Starting noVNC on port ${NOVNC_PORT}..."
/opt/noVNC/utils/novnc_proxy --vnc localhost:${VNC_PORT} --listen ${NOVNC_PORT} &

echo "=== VNC ready ==="
echo "  noVNC (브라우저): http://localhost:${NOVNC_PORT}/vnc.html"
echo "  VNC 직접 연결:    localhost:${VNC_PORT}"
echo "==================="

# 백그라운드 프로세스 유지
wait
