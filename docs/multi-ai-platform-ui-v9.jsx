import { useState, useEffect, useRef } from "react";

/* ─── Icons ─────────────────────────────────────────── */
const I = {
  Send: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  ),
  Stop: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </svg>
  ),
  Plus: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Chat: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  Code: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Doc: () => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  Down: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Right: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Settings: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09" />
    </svg>
  ),
  Dash: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
  Git: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 012 2v7" />
      <path d="M6 9v12" />
    </svg>
  ),
  Repo: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  ),
  Branch: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 01-9 9" />
    </svg>
  ),
  Layers: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Bkmk: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  ),
  Dot: ({ c }) => (
    <svg width="8" height="8" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="4" fill={c} />
    </svg>
  ),
  Chk: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Menu: () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  X: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  Lnk: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  Edit: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Trash: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  ),
  Grip: () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" opacity="0.3">
      <circle cx="9" cy="5" r="2" />
      <circle cx="15" cy="5" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="9" cy="19" r="2" />
      <circle cx="15" cy="19" r="2" />
    </svg>
  ),
  Sync: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
    </svg>
  ),
  Star: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  PR: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 012 2v7" />
      <line x1="6" y1="9" x2="6" y2="21" />
    </svg>
  ),
  File: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
      <polyline points="13 2 13 9 20 9" />
    </svg>
  ),
  Folder: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  ),
  Play: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Refresh: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
    </svg>
  ),
  Clock: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Calendar: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Bell: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  Search: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Attach: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
    </svg>
  ),
  Img: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  Kbd: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8h.001M10 8h.001M14 8h.001M18 8h.001M8 12h.001M12 12h.001M16 12h.001M6 16h12" />
    </svg>
  ),
  Diff: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="3" width="8" height="18" rx="1" />
      <rect x="14" y="3" width="8" height="18" rx="1" />
    </svg>
  ),
  GH: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
};

/* ─── Color tokens ─────────────────────────────────── */
const C = {
  pageBg: "#0C0E18",
  overlayBg: "#0C0E18",
  modalBg: "#12141F",
  sidebarBg: "#0F1120",
  cardBg: "#0F1120",
  inputBg: "#161930",
  deepBg: "#0A0C14",
  border: "#252A3A",
  borderLight: "#1E2235",
  borderDeep: "#1A1D2E",
};
const M = {
  opus: {
    name: "Claude Opus 4.6",
    s: "Opus",
    c: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    bd: "rgba(245,158,11,0.3)",
    r: "총괄",
  },
  gpt: {
    name: "GPT-5.2",
    s: "GPT",
    c: "#34D399",
    bg: "rgba(52,211,153,0.12)",
    bd: "rgba(52,211,153,0.3)",
    r: "속도형",
  },
  gemini: {
    name: "Gemini 3.1 Pro",
    s: "Gemini",
    c: "#A78BFA",
    bg: "rgba(167,139,250,0.12)",
    bd: "rgba(167,139,250,0.3)",
    r: "분석형",
  },
};
const MODES = [
  { id: "batch", l: "배치" },
  { id: "concurrent", l: "동시" },
  { id: "discussion", l: "토론" },
  { id: "dev", l: "개발" },
  { id: "auto", l: "자동" },
];
const PR_MODES = ["batch", "concurrent", "discussion"];
const REPOS = [
  {
    id: 1,
    name: "multi-ai-platform",
    full: "user/multi-ai-platform",
    br: "main",
    lang: "Python+TS",
    desc: "멀티 AI 개발 플랫폼",
    stars: 12,
    prs: 3,
    files: 156,
    lastSync: "5분 전",
  },
  {
    id: 2,
    name: "portfolio-site",
    full: "user/portfolio-site",
    br: "main",
    lang: "TypeScript",
    desc: "포트폴리오 웹사이트",
    stars: 5,
    prs: 0,
    files: 42,
    lastSync: "1시간 전",
  },
  {
    id: 3,
    name: "data-pipeline",
    full: "user/data-pipeline",
    br: "develop",
    lang: "Python",
    desc: "데이터 ETL 파이프라인",
    stars: 8,
    prs: 1,
    files: 89,
    lastSync: "3시간 전",
  },
  {
    id: 4,
    name: "mobile-app",
    full: "user/mobile-app",
    br: "main",
    lang: "Dart",
    desc: "Flutter 모바일 앱",
    stars: 3,
    prs: 2,
    files: 210,
    lastSync: "어제",
  },
];
const INITIAL_PRESETS = [
  {
    id: 1,
    name: "🔍 버그/수정 의견",
    mode: "concurrent",
    pr: true,
    msg: "버그/수정이 필요한 사항에 대해 의견 줘.",
  },
  {
    id: 2,
    name: "💡 개선점 의견",
    mode: "concurrent",
    pr: true,
    msg: "개선해야 할 점이 있으면 의견줘.",
  },
  {
    id: 3,
    name: "🔧 오픈 PR 검토",
    mode: "dev",
    pr: false,
    msg: "오픈되어 있는 PR을 모두 검토해서 수정해줘.",
  },
  {
    id: 4,
    name: "⚡ 버그 의견+수정",
    mode: "auto",
    pr: false,
    msg: "버그/수정이 필요한 사항에 대해 의견 주고 수정해줘.",
  },
];

/* ─── Scheduled tasks sample data ──────────────────── */
const SAMPLE_SCHEDULES = [
  {
    id: 1,
    time: "2025-02-25T14:00",
    label: "오늘 오후 2시",
    action: "PR#12 OAuth 콜백 보안 취약점 수정",
    pr: "#12",
    repo: "multi-ai-platform",
    mode: "auto",
    status: "pending",
    models: ["opus", "gpt", "gemini"],
  },
  {
    id: 2,
    time: "2025-02-25T18:00",
    label: "오늘 오후 6시",
    action: "PR#8 DB 마이그레이션 리뷰 및 수정",
    pr: "#8",
    repo: "multi-ai-platform",
    mode: "discussion",
    status: "pending",
    models: ["opus", "gpt"],
  },
  /* Running task with live progress */
  {
    id: 5,
    time: "2025-02-25T09:30",
    label: "오늘 오전 9:30",
    action: "PR#13 API 엔드포인트 리팩토링",
    pr: "#13",
    repo: "multi-ai-platform",
    mode: "auto",
    status: "running",
    models: ["opus", "gpt", "gemini"],
    progress: {
      currentPhase: 3,
      totalPhases: 5,
      phaseName: "PR 수정",
      percent: 56,
      elapsed: "4분 12초",
      phases: [
        { name: "토론", status: "done", duration: "1분 45초" },
        { name: "코드 병합", status: "done", duration: "52초" },
        { name: "PR 수정", status: "running", duration: "1분 35초" },
        { name: "파이프라인", status: "wait", duration: "—" },
        { name: "완료 보고", status: "wait", duration: "—" },
      ],
      log: [
        { t: "09:30:02", msg: "[Phase 1] 토론 시작 — API 엔드포인트 구조 최적화" },
        { t: "09:31:20", msg: "[Opus] 합의: RESTful 규칙 준수 + 버전닝 적용" },
        { t: "09:31:47", msg: "[Phase 2] 코드 병합 완료 — 6개 파일 수정" },
        { t: "09:31:55", msg: "[Phase 3] PR#13에 커밋 푸시 중..." },
      ],
    },
  },
  /* Completed tasks with discussion & change details */
  {
    id: 3,
    time: "2025-02-24T10:00",
    label: "어제 오전 10시",
    action: "PR#11 라우터 구조 개선",
    pr: "#11",
    repo: "multi-ai-platform",
    mode: "auto",
    status: "completed",
    models: ["opus", "gpt", "gemini"],
    result: {
      duration: "6분 32초",
      prClosed: true,
      pipelinePass: true,
      commits: 3,
      discussion: {
        topic: "라우터 구조 개선 방안",
        rounds: 2,
        opinions: [
          {
            model: "gpt",
            summary: "기능별 라우터 분리 (auth, chat, repo, pipeline) + 공통 미들웨어 추출",
          },
          {
            model: "gemini",
            summary: "라우터 prefix 일관성 확보 + 타입 힌트 100% 추가 + 에러 핸들러 통합",
          },
        ],
        consensus: "기능별 라우터 분리 + 공통 에러 핸들러 통합으로 합의 (합의율 100%)",
      },
      changes: [
        {
          file: "src/api/routes.py",
          type: "modified",
          diff: "+48 / -23",
          summary: "단일 라우터 → auth, chat, repo, pipeline 4개 분리",
        },
        {
          file: "src/api/middleware.py",
          type: "modified",
          diff: "+15 / -3",
          summary: "공통 에러 핸들링 미들웨어 추가",
        },
        {
          file: "src/api/auth_router.py",
          type: "added",
          diff: "+62",
          summary: "인증 전용 라우터 신규 생성",
        },
        {
          file: "src/api/chat_router.py",
          type: "added",
          diff: "+45",
          summary: "채팅 전용 라우터 신규 생성",
        },
        {
          file: "tests/test_routes.py",
          type: "modified",
          diff: "+28 / -12",
          summary: "분리된 라우터에 맞게 테스트 수정",
        },
      ],
    },
  },
  {
    id: 4,
    time: "2025-02-24T15:00",
    label: "어제 오후 3시",
    action: "전체 린트 검사 및 자동 수정",
    pr: null,
    repo: "data-pipeline",
    mode: "batch",
    status: "completed",
    models: ["gpt"],
    result: {
      duration: "2분 10초",
      prClosed: false,
      pipelinePass: true,
      commits: 1,
      discussion: null,
      changes: [
        {
          file: "src/etl/extract.py",
          type: "modified",
          diff: "+5 / -8",
          summary: "미사용 import 제거, 포맷팅 수정",
        },
        {
          file: "src/etl/transform.py",
          type: "modified",
          diff: "+3 / -6",
          summary: "타입 힌트 추가, 라인 길이 조정",
        },
        {
          file: "src/etl/load.py",
          type: "modified",
          diff: "+2 / -4",
          summary: "f-string 변환, 불필요한 pass 제거",
        },
      ],
    },
  },
];

/* ─── Reusable modal wrappers ──────────────────────── */
function Overlay({ children, onClose }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: C.overlayBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      {children}
    </div>
  );
}
function ModalBox({ children, width = 700, maxH = "80vh" }) {
  return (
    <div
      style={{
        width,
        maxHeight: maxH,
        backgroundColor: C.modalBg,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}
function ModalHeader({ title, desc, onClose, extra }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{title}</div>
        {desc && <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{desc}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {extra}
        <button
          onClick={onClose}
          style={{
            padding: 6,
            borderRadius: 8,
            border: "none",
            background: "transparent",
            color: "#9CA3AF",
            cursor: "pointer",
          }}
        >
          <I.X />
        </button>
      </div>
    </div>
  );
}
function Card({ children, style = {} }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 12,
        backgroundColor: C.cardBg,
        border: `1px solid ${C.borderLight}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
function ModelBadge({ k, small }) {
  const m = M[k];
  return (
    <div
      style={{
        width: small ? 24 : 32,
        height: small ? 24 : 32,
        borderRadius: small ? 6 : 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: small ? 9 : 11,
        fontWeight: 700,
        background: m.bg,
        color: m.c,
        border: `1px solid ${m.bd}`,
        flexShrink: 0,
      }}
    >
      {m.s[0]}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MODE-SPECIFIC CHAT RENDERERS
   ══════════════════════════════════════════════════════ */

/* ── CONCURRENT: Side-by-side panels ── */
function ConcurrentView({ onBack }) {
  const BackBtn = () => (
    <div
      style={{
        padding: "6px 12px",
        borderBottom: `1px solid ${C.borderDeep}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 10px",
          borderRadius: 6,
          border: `1px solid ${C.border}`,
          backgroundColor: C.inputBg,
          color: "#9CA3AF",
          fontSize: 10,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ← 채팅으로
      </button>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#93C5FD" }}>동시 모드 결과</span>
    </div>
  );
  const panels = ["gpt", "opus", "gemini"];
  const responses = {
    gpt: '```python\n# auth/router.py\nfrom fastapi import APIRouter\n\nrouter = APIRouter(prefix="/auth")\n\n@router.get("/github")\nasync def github_login():\n    state = generate_csrf_state()\n    return RedirectResponse(\n        f"https://github.com/login/oauth/authorize"\n        f"?client_id={CLIENT_ID}&state={state}"\n    )\n```\n\nstate 파라미터를 추가하여 CSRF 방어를 구현했습니다.',
    opus: "보안 관점에서 전체 인증 흐름을 분석합니다.\n\n**Critical Issues:**\n1. OAuth state 검증 누락 → CSRF 취약\n2. access_token 평문 저장 → AES-256-GCM 필요\n3. JWT refresh rotation 미구현\n\n**권장 구조:**\nstate 생성 → Redis 임시 저장 (5분 TTL) → 콜백에서 검증 → 토큰 암호화 저장",
    gemini:
      "코드베이스 정적 분석 결과:\n\n• auth/ 디렉토리 12개 파일 분석\n• middleware.py의 JWT 검증 로직 재사용 가능\n• 코드 중복 75% 절감 가능\n• typing 누락 3건 발견\n\nimport 의존성 그래프에서 순환 참조 없음 확인.",
  };
  return (
    <div style={{ display: "flex", gap: 8, height: "100%", padding: 8 }}>
      {panels.map((k) => {
        const m = M[k];
        return (
          <div
            key={k}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: 12,
              border: `1px solid ${m.bd}`,
              overflow: "hidden",
              backgroundColor: C.deepBg,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderBottom: `1px solid ${C.borderLight}`,
                backgroundColor: C.cardBg,
              }}
            >
              <ModelBadge k={k} small />
              <span style={{ fontSize: 12, fontWeight: 700, color: m.c }}>{m.s}</span>
              <span style={{ fontSize: 10, color: "#6B7280" }}>{m.r}</span>
              <span
                style={{
                  marginLeft: "auto",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#34D399",
                }}
              ></span>
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: 12,
                fontSize: 12,
                lineHeight: 1.8,
                color: "#E5E7EB",
                whiteSpace: "pre-wrap",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {responses[k]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── DISCUSSION: Round-based vertical flow ── */
function DiscussionView({ onBack }) {
  const BackBtn = () => (
    <div
      style={{
        padding: "6px 12px",
        borderBottom: `1px solid ${C.borderDeep}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 10px",
          borderRadius: 6,
          border: `1px solid ${C.border}`,
          backgroundColor: C.inputBg,
          color: "#9CA3AF",
          fontSize: 10,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ← 채팅으로
      </button>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#A78BFA" }}>토론 모드 결과</span>
    </div>
  );
  const rounds = [
    {
      num: 1,
      topic: "JWT vs Session 인증 방식",
      status: "완료",
      moderator: "인증 방식을 결정해야 합니다. JWT와 Session 각각의 장단점을 분석해주세요.",
      opinions: [
        {
          model: "gpt",
          role: "JWT 옹호",
          content:
            "JWT는 stateless하여 수평 확장에 유리합니다. Redis 의존성이 없고, 마이크로서비스 환경에서 토큰 전파가 자연스럽습니다.",
        },
        {
          model: "gemini",
          role: "Session 옹호",
          content:
            "Session은 서버 측에서 즉시 무효화가 가능합니다. JWT는 만료 전까지 revoke가 불가능하며 토큰 탈취 시 위험합니다.",
        },
      ],
      summary:
        "합의: JWT + Redis 블랙리스트 하이브리드 방식 채택. JWT의 stateless 장점을 유지하면서 Redis 블랙리스트로 즉시 무효화를 지원합니다.",
      consensus: 100,
    },
    {
      num: 2,
      topic: "토큰 저장 위치: Cookie vs LocalStorage",
      status: "진행중",
      moderator: "JWT 토큰의 클라이언트 저장 위치를 결정합니다.",
      opinions: [
        {
          model: "gpt",
          role: "Cookie 옹호",
          content:
            "httpOnly + secure + sameSite=strict 조합으로 XSS 공격을 원천 차단할 수 있습니다.",
        },
        { model: "gemini", role: "분석 중...", content: "" },
      ],
      summary: "",
      consensus: 0,
    },
  ];
  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
      {rounds.map((r) => (
        <div
          key={r.num}
          style={{
            borderRadius: 12,
            border: `1px solid ${C.borderLight}`,
            overflow: "hidden",
            backgroundColor: C.cardBg,
          }}
        >
          {/* Round header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              borderBottom: `1px solid ${C.borderLight}`,
              backgroundColor: C.deepBg,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#F59E0B",
                  padding: "2px 8px",
                  borderRadius: 6,
                  backgroundColor: "rgba(245,158,11,0.12)",
                  border: "1px solid rgba(245,158,11,0.3)",
                }}
              >
                Round {r.num}
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{r.topic}</span>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 6,
                backgroundColor:
                  r.status === "완료" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                color: r.status === "완료" ? "#6EE7B7" : "#FDE68A",
                border:
                  r.status === "완료"
                    ? "1px solid rgba(52,211,153,0.3)"
                    : "1px solid rgba(251,191,36,0.3)",
              }}
            >
              {r.status}
            </span>
          </div>
          {/* Moderator (Opus) */}
          <div
            style={{
              padding: "10px 16px",
              borderBottom: `1px solid ${C.borderDeep}`,
              display: "flex",
              gap: 10,
            }}
          >
            <ModelBadge k="opus" small />
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#F59E0B", marginBottom: 2 }}>
                진행자 (Opus)
              </div>
              <div style={{ fontSize: 12, color: "#D1D5DB", lineHeight: 1.6 }}>{r.moderator}</div>
            </div>
          </div>
          {/* Opinions */}
          {r.opinions.map((op, i) => {
            const m = M[op.model];
            return (
              <div
                key={i}
                style={{
                  padding: "10px 16px",
                  borderBottom: `1px solid ${C.borderDeep}`,
                  display: "flex",
                  gap: 10,
                  opacity: op.content ? 1 : 0.5,
                }}
              >
                <ModelBadge k={op.model} small />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: m.c }}>{m.s}</span>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#6B7280",
                        padding: "1px 6px",
                        borderRadius: 4,
                        backgroundColor: C.inputBg,
                      }}
                    >
                      {op.role}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#D1D5DB", lineHeight: 1.6 }}>
                    {op.content || (
                      <span style={{ color: "#4B5563", fontStyle: "italic" }}>응답 대기중...</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {/* Summary */}
          {r.summary && (
            <div
              style={{
                padding: "10px 16px",
                backgroundColor: "rgba(52,211,153,0.04)",
                borderTop: `1px solid rgba(52,211,153,0.15)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#6EE7B7" }}>✓ 합의 결과</span>
                {r.consensus > 0 && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#6EE7B7" }}>
                    {r.consensus}%
                  </span>
                )}
              </div>
              <div style={{ fontSize: 12, color: "#A7F3D0", lineHeight: 1.6 }}>{r.summary}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── DEV MODE: PR Card Grid ── */
function DevModeView({ onBack }) {
  const BackBtn = () => (
    <div
      style={{
        padding: "6px 12px",
        borderBottom: `1px solid ${C.borderDeep}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 10px",
          borderRadius: 6,
          border: `1px solid ${C.border}`,
          backgroundColor: C.inputBg,
          color: "#9CA3AF",
          fontSize: 10,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ← 채팅으로
      </button>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#F59E0B" }}>개발 모드 결과</span>
    </div>
  );
  const prs = [
    {
      id: 1,
      title: "feat(auth): GitHub OAuth 구현",
      model: "gpt",
      status: "완료",
      priority: "P0",
      deps: [],
      steps: "9/9",
      branch: "feat/auth-oauth",
    },
    {
      id: 2,
      title: "feat(api): 인증 미들웨어",
      model: "gemini",
      status: "진행중",
      priority: "P0",
      deps: ["PR#1"],
      steps: "5/9",
      branch: "feat/auth-middleware",
    },
    {
      id: 3,
      title: "feat(db): 세션 테이블 마이그레이션",
      model: "gpt",
      status: "대기",
      priority: "P1",
      deps: ["PR#1"],
      steps: "0/9",
      branch: "feat/db-session",
    },
    {
      id: 4,
      title: "test(auth): 인증 통합 테스트",
      model: "gemini",
      status: "대기",
      priority: "P2",
      deps: ["PR#1", "PR#2"],
      steps: "0/9",
      branch: "feat/auth-test",
    },
  ];
  const statusColor = {
    완료: { bg: "rgba(52,211,153,0.15)", c: "#6EE7B7", bc: "rgba(52,211,153,0.3)" },
    진행중: { bg: "rgba(251,191,36,0.15)", c: "#FDE68A", bc: "rgba(251,191,36,0.3)" },
    대기: { bg: "rgba(107,114,128,0.15)", c: "#9CA3AF", bc: "rgba(107,114,128,0.3)" },
  };
  return (
    <div style={{ padding: 16 }}>
      {/* Opus tech lead banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: 12,
          borderRadius: 10,
          backgroundColor: "rgba(245,158,11,0.06)",
          border: "1px solid rgba(245,158,11,0.15)",
          marginBottom: 16,
        }}
      >
        <ModelBadge k="opus" small />
        <div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#F59E0B" }}>Opus (테크리드)</span>
          <span style={{ fontSize: 11, color: "#D1D5DB", marginLeft: 8 }}>
            작업을 4개 PR로 분할했습니다. 의존관계 순서대로 실행합니다.
          </span>
        </div>
      </div>
      {/* PR Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {prs.map((p) => {
          const m = M[p.model];
          const sc = statusColor[p.status];
          return (
            <div
              key={p.id}
              style={{
                padding: 14,
                borderRadius: 12,
                backgroundColor: C.cardBg,
                border: `1px solid ${C.borderLight}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 700, color: "#60A5FA" }}>PR #{p.id}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 6,
                    backgroundColor: sc.bg,
                    color: sc.c,
                    border: `1px solid ${sc.bc}`,
                  }}
                >
                  {p.status}
                </span>
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  marginBottom: 8,
                  lineHeight: 1.4,
                }}
              >
                {p.title}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <ModelBadge k={p.model} small />
                <span style={{ fontSize: 11, color: m.c, fontWeight: 600 }}>{m.s}</span>
                <span
                  style={{
                    fontSize: 10,
                    color: "#6B7280",
                    marginLeft: "auto",
                    padding: "2px 6px",
                    borderRadius: 4,
                    backgroundColor: C.inputBg,
                  }}
                >
                  {p.priority}
                </span>
              </div>
              {p.deps.length > 0 && (
                <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 6 }}>
                  의존: {p.deps.join(", ")}
                </div>
              )}
              {/* Mini pipeline progress */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div
                  style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: C.borderDeep,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 3,
                      backgroundColor:
                        p.status === "완료"
                          ? "#22C55E"
                          : p.status === "진행중"
                            ? "#EAB308"
                            : "#374151",
                      width: `${(parseInt(p.steps) / 9) * 100}%`,
                      transition: "width 0.3s",
                    }}
                  ></div>
                </div>
                <span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace" }}>
                  {p.steps}
                </span>
              </div>
              <div
                style={{ fontSize: 10, color: "#4B5563", marginTop: 6, fontFamily: "monospace" }}
              >
                {p.branch}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── AUTO MODE: Phase progress + logs ── */
function AutoModeView({ onBack }) {
  const BackBtn = () => (
    <div
      style={{
        padding: "6px 12px",
        borderBottom: `1px solid ${C.borderDeep}`,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "4px 10px",
          borderRadius: 6,
          border: `1px solid ${C.border}`,
          backgroundColor: C.inputBg,
          color: "#9CA3AF",
          fontSize: 10,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        ← 채팅으로
      </button>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#34D399" }}>자동 모드 결과</span>
    </div>
  );
  const phases = [
    { num: 1, name: "토론", desc: "최적 방안 도출", status: "완료", duration: "2분 15초" },
    { num: 2, name: "코드 병합", desc: "토론 결과 통합", status: "완료", duration: "45초" },
    { num: 3, name: "PR 생성", desc: "독립 PR 단위 분할", status: "진행중", duration: "1분 30초" },
    { num: 4, name: "커밋 파이프라인", desc: "9단계 자동 검증", status: "대기", duration: "—" },
    { num: 5, name: "완료 보고", desc: "PR 링크 + 요약", status: "대기", duration: "—" },
  ];
  const logs = [
    { t: "09:51:02", lv: "info", msg: "[Phase 1] 토론 시작 — 주제: GitHub OAuth 최적 구현 방식" },
    { t: "09:51:15", lv: "info", msg: "[Opus] 역할 분배: GPT → JWT 구현, Gemini → 보안 분석" },
    { t: "09:52:30", lv: "success", msg: "[Phase 1] 합의 도달 (100%) — JWT + Redis 블랙리스트" },
    { t: "09:52:45", lv: "info", msg: "[Phase 2] 코드 병합 시작" },
    { t: "09:53:10", lv: "success", msg: "[Phase 2] 코드 병합 완료 — 파일 4개 생성" },
    { t: "09:53:20", lv: "info", msg: "[Phase 3] PR 분할 시작 — Opus 분석중..." },
    { t: "09:53:45", lv: "warn", msg: "[Phase 3] PR#2 의존성 감지 → PR#1 완료 후 실행 예약" },
  ];
  const currentPhase = phases.findIndex((p) => p.status === "진행중") + 1;
  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Phase progress bar */}
      <div
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: C.cardBg,
          border: `1px solid ${C.borderLight}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>자동 모드 실행중</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#60A5FA" }}>
            Phase {currentPhase} / 5
          </span>
        </div>
        <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
          {phases.map((p) => (
            <div
              key={p.num}
              style={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  p.status === "완료" ? "#22C55E" : p.status === "진행중" ? "#EAB308" : "#1E2235",
                transition: "background-color 0.3s",
                position: "relative",
              }}
            >
              {p.status === "진행중" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 4,
                    background: "linear-gradient(90deg,#EAB308 30%,#FBBF24 50%,#EAB308 70%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s infinite",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {phases.map((p) => {
            const sc =
              p.status === "완료" ? "#6EE7B7" : p.status === "진행중" ? "#FDE68A" : "#4B5563";
            return (
              <div
                key={p.num}
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: p.status === "진행중" ? C.inputBg : C.deepBg,
                  border: `1px solid ${p.status === "진행중" ? "rgba(251,191,36,0.3)" : C.borderDeep}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: sc }}>{p.name}</div>
                <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>{p.desc}</div>
                <div style={{ fontSize: 9, color: "#4B5563", marginTop: 2 }}>{p.duration}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Live logs */}
      <div
        style={{
          borderRadius: 12,
          backgroundColor: C.deepBg,
          border: `1px solid ${C.borderDeep}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "8px 12px",
            borderBottom: `1px solid ${C.borderDeep}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF" }}>실시간 로그</span>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              animation: "pulse 1s infinite",
            }}
          ></span>
        </div>
        <div
          style={{
            padding: 8,
            maxHeight: 200,
            overflowY: "auto",
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11,
          }}
        >
          {logs.map((l, i) => (
            <div key={i} style={{ display: "flex", gap: 8, padding: "3px 4px", lineHeight: 1.6 }}>
              <span style={{ color: "#4B5563", flexShrink: 0 }}>{l.t}</span>
              <span
                style={{
                  color: l.lv === "success" ? "#6EE7B7" : l.lv === "warn" ? "#FDE68A" : "#D1D5DB",
                }}
              >
                {l.msg}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PIPELINE EXECUTION VIEW (9 steps)
   ══════════════════════════════════════════════════════ */
function PipelineView({ onClose }) {
  const steps = [
    {
      num: 1,
      name: "Ruff 린트",
      tool: "ruff check",
      status: "pass",
      duration: "8초",
      output: "All checks passed. 0 errors, 0 warnings.",
      retries: 0,
    },
    {
      num: 2,
      name: "컴파일 검사",
      tool: "tsc / mypy",
      status: "pass",
      duration: "12초",
      output: "mypy: Success: no issues found in 4 source files",
      retries: 0,
    },
    {
      num: 3,
      name: "테스트 작성",
      tool: "AI 생성",
      status: "pass",
      duration: "35초",
      output: "test_auth_oauth.py (12 tests), test_auth_middleware.py (8 tests) 생성",
      retries: 0,
    },
    {
      num: 4,
      name: "테스트 실행",
      tool: "pytest",
      status: "pass",
      duration: "15초",
      output: "20 passed in 14.2s",
      retries: 0,
    },
    {
      num: 5,
      name: "커버리지 확인",
      tool: "coverage",
      status: "fail",
      duration: "3초",
      output: "Coverage: 87% (target: 100%)\nMissing: auth/router.py:45-52, auth/utils.py:18-22",
      retries: 1,
    },
    {
      num: 6,
      name: "보안 검사",
      tool: "bandit",
      status: "wait",
      duration: "—",
      output: "",
      retries: 0,
    },
    {
      num: 7,
      name: "pre-commit",
      tool: "pre-commit run",
      status: "wait",
      duration: "—",
      output: "",
      retries: 0,
    },
    {
      num: 8,
      name: "커밋 & 푸시",
      tool: "git commit/push",
      status: "wait",
      duration: "—",
      output: "",
      retries: 0,
    },
    {
      num: 9,
      name: "CI 확인",
      tool: "GitHub Actions",
      status: "wait",
      duration: "—",
      output: "",
      retries: 0,
    },
  ];
  const statusIcon = { pass: "✓", fail: "✗", running: "◉", wait: "○" };
  const statusColor = { pass: "#6EE7B7", fail: "#FCA5A5", running: "#FDE68A", wait: "#4B5563" };
  return (
    <Overlay>
      <ModalBox width={680} maxH="80vh">
        <ModalHeader
          title="커밋 파이프라인"
          desc="PR#12 feat(auth): GitHub OAuth 구현 [GPT-5.2]"
          onClose={onClose}
          extra={
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 6,
                backgroundColor: "rgba(251,191,36,0.15)",
                color: "#FDE68A",
                border: "1px solid rgba(251,191,36,0.3)",
              }}
            >
              Step 5 / 9 — AI 수정중
            </span>
          }
        />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {steps.map((st) => (
            <div
              key={st.num}
              style={{
                display: "flex",
                gap: 12,
                padding: 12,
                borderRadius: 10,
                backgroundColor:
                  st.status === "fail"
                    ? "rgba(239,68,68,0.04)"
                    : st.status === "running"
                      ? "rgba(251,191,36,0.04)"
                      : C.cardBg,
                border: `1px solid ${st.status === "fail" ? "rgba(248,113,113,0.2)" : st.status === "running" ? "rgba(251,191,36,0.2)" : C.borderLight}`,
              }}
            >
              {/* Step number circle */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                  color: statusColor[st.status],
                  backgroundColor:
                    st.status === "pass"
                      ? "rgba(52,211,153,0.12)"
                      : st.status === "fail"
                        ? "rgba(239,68,68,0.12)"
                        : st.status === "running"
                          ? "rgba(251,191,36,0.12)"
                          : "rgba(75,85,99,0.12)",
                  border: `1px solid ${st.status === "pass" ? "rgba(52,211,153,0.3)" : st.status === "fail" ? "rgba(239,68,68,0.3)" : st.status === "running" ? "rgba(251,191,36,0.3)" : "rgba(75,85,99,0.3)"}`,
                }}
              >
                {statusIcon[st.status]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                    Step {st.num}. {st.name}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: "#6B7280",
                      fontFamily: "monospace",
                      padding: "1px 6px",
                      borderRadius: 4,
                      backgroundColor: C.inputBg,
                    }}
                  >
                    {st.tool}
                  </span>
                  {st.retries > 0 && (
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#FCA5A5" }}>
                      재시도 {st.retries}회
                    </span>
                  )}
                  <span style={{ fontSize: 10, color: "#4B5563", marginLeft: "auto" }}>
                    {st.duration}
                  </span>
                </div>
                {st.output && (
                  <div
                    style={{
                      marginTop: 4,
                      padding: 8,
                      borderRadius: 6,
                      backgroundColor: C.deepBg,
                      border: `1px solid ${C.borderDeep}`,
                      fontSize: 11,
                      fontFamily: "'JetBrains Mono',monospace",
                      color: st.status === "fail" ? "#FCA5A5" : "#9CA3AF",
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {st.output}
                  </div>
                )}
                {st.status === "fail" && (
                  <div
                    style={{
                      marginTop: 6,
                      padding: 8,
                      borderRadius: 6,
                      backgroundColor: "rgba(59,130,246,0.06)",
                      border: "1px solid rgba(96,165,250,0.2)",
                      fontSize: 11,
                      color: "#93C5FD",
                    }}
                  >
                    🤖 AI 분석: 커버리지 87% → auth/router.py:45-52, auth/utils.py:18-22에 테스트
                    추가 필요. 추가 테스트를 생성합니다...
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Bottom stats */}
        <div
          style={{
            padding: "10px 16px",
            borderTop: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            gap: 16,
            backgroundColor: C.deepBg,
          }}
        >
          <span style={{ fontSize: 11, color: "#6B7280" }}>
            전체 재시도: <b style={{ color: "#FDE68A" }}>1</b>/30
          </span>
          <span style={{ fontSize: 11, color: "#6B7280" }}>
            경과 시간: <b style={{ color: "#D1D5DB" }}>1분 13초</b>
          </span>
          <span style={{ fontSize: 11, color: "#6B7280" }}>
            타임아웃: <b style={{ color: "#9CA3AF" }}>58분 47초</b>
          </span>
          <button
            style={{
              marginLeft: "auto",
              padding: "5px 12px",
              borderRadius: 8,
              border: "1px solid rgba(248,113,113,0.3)",
              backgroundColor: "rgba(239,68,68,0.1)",
              color: "#FCA5A5",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            중단
          </button>
        </div>
      </ModalBox>
    </Overlay>
  );
}

/* ══════════════════════════════════════════════════════
   REPO DETAIL VIEW (file tree + code viewer)
   ══════════════════════════════════════════════════════ */
function RepoDetailView({ onClose }) {
  const [selFile, setSelFile] = useState("src/auth/router.py");
  const tree = [
    {
      type: "dir",
      name: "src",
      open: true,
      children: [
        {
          type: "dir",
          name: "auth",
          open: true,
          children: [
            { type: "file", name: "router.py", path: "src/auth/router.py" },
            { type: "file", name: "middleware.py", path: "src/auth/middleware.py" },
            { type: "file", name: "utils.py", path: "src/auth/utils.py" },
          ],
        },
        {
          type: "dir",
          name: "api",
          open: false,
          children: [
            { type: "file", name: "routes.py", path: "src/api/routes.py" },
            { type: "file", name: "models.py", path: "src/api/models.py" },
          ],
        },
        { type: "file", name: "main.py", path: "src/main.py" },
        { type: "file", name: "config.py", path: "src/config.py" },
      ],
    },
    {
      type: "dir",
      name: "tests",
      open: false,
      children: [{ type: "file", name: "test_auth.py", path: "tests/test_auth.py" }],
    },
    { type: "file", name: ".ai-context.yml", path: ".ai-context.yml" },
    { type: "file", name: "pyproject.toml", path: "pyproject.toml" },
  ];
  const code = `from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import RedirectResponse
import httpx, secrets

from ..config import settings
from ..db import get_db
from .utils import encrypt_token, create_jwt

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/github")
async def github_login():
    """GitHub OAuth 로그인 시작"""
    state = secrets.token_urlsafe(32)
    # TODO: Redis에 state 저장 (TTL 5분)
    return RedirectResponse(
        f"https://github.com/login/oauth/authorize"
        f"?client_id={settings.GITHUB_CLIENT_ID}"
        f"&redirect_uri={settings.GITHUB_CALLBACK_URL}"
        f"&scope=repo,user:email"
        f"&state={state}"
    )

@router.get("/github/callback")
async def github_callback(code: str, state: str, db=Depends(get_db)):
    """GitHub OAuth 콜백 처리"""
    # TODO: Redis에서 state 검증
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "https://github.com/login/oauth/access_token",
            json={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
            },
            headers={"Accept": "application/json"},
        )
    data = resp.json()
    access_token = data.get("access_token")
    if not access_token:
        raise HTTPException(400, "OAuth 인증 실패")

    # 사용자 정보 조회 + DB 저장
    encrypted = encrypt_token(access_token)  # AES-256-GCM
    jwt_token = create_jwt(user_id=user.id)
    return {"token": jwt_token}`;
  const prsList = [
    {
      num: 12,
      title: "feat(auth): GitHub OAuth 구현",
      status: "Open",
      model: "gpt",
      created: "방금",
    },
    {
      num: 11,
      title: "fix(api): 라우터 구조 개선",
      status: "Merged",
      model: "gemini",
      created: "2시간 전",
    },
    {
      num: 10,
      title: "feat(db): 세션 테이블 추가",
      status: "Merged",
      model: "gpt",
      created: "어제",
    },
  ];
  const [tab, setTab] = useState("files");

  function renderTree(items, depth = 0) {
    return items.map((item, i) => (
      <div key={i}>
        <button
          onClick={() => item.type === "file" && setSelFile(item.path)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: `4px 8px 4px ${12 + depth * 16}px`,
            border: "none",
            backgroundColor: selFile === item.path ? "rgba(59,130,246,0.12)" : "transparent",
            cursor: "pointer",
            color: selFile === item.path ? "#93C5FD" : "#D1D5DB",
            fontSize: 11,
            textAlign: "left",
            borderRadius: 4,
          }}
          onMouseEnter={(e) => {
            if (selFile !== item.path)
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
          }}
          onMouseLeave={(e) => {
            if (selFile !== item.path) e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {item.type === "dir" ? (
            <span style={{ color: "#60A5FA" }}>
              <I.Folder />
            </span>
          ) : (
            <span style={{ color: "#6B7280" }}>
              <I.File />
            </span>
          )}
          <span style={{ fontWeight: item.type === "dir" ? 600 : 400 }}>{item.name}</span>
        </button>
        {item.type === "dir" && item.open && item.children && renderTree(item.children, depth + 1)}
      </div>
    ));
  }

  return (
    <Overlay>
      <ModalBox width={900} maxH="85vh">
        <ModalHeader
          title="multi-ai-platform"
          desc="user/multi-ai-platform · main"
          onClose={onClose}
          extra={
            <div style={{ display: "flex", gap: 6 }}>
              <select
                style={{
                  backgroundColor: C.inputBg,
                  fontSize: 10,
                  color: "#D1D5DB",
                  borderRadius: 6,
                  padding: "4px 8px",
                  border: `1px solid ${C.border}`,
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option>main</option>
                <option>develop</option>
                <option>feat/auth-oauth</option>
              </select>
            </div>
          }
        />
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, padding: "0 16px" }}>
          {[
            ["files", "파일"],
            ["prs", "Pull Requests"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: "8px 16px",
                border: "none",
                borderBottom: tab === id ? "2px solid #3B82F6" : "2px solid transparent",
                backgroundColor: "transparent",
                color: tab === id ? "#fff" : "#6B7280",
                fontSize: 12,
                fontWeight: tab === id ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {tab === "files" ? (
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            {/* File tree */}
            <div
              style={{
                width: 220,
                borderRight: `1px solid ${C.borderLight}`,
                overflowY: "auto",
                padding: 8,
                flexShrink: 0,
                backgroundColor: C.deepBg,
              }}
            >
              {renderTree(tree)}
            </div>
            {/* Code viewer */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderBottom: `1px solid ${C.borderLight}`,
                  backgroundColor: C.cardBg,
                }}
              >
                <I.File />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{selFile}</span>
                <span style={{ fontSize: 10, color: "#6B7280", marginLeft: "auto" }}>
                  52 lines · Python
                </span>
              </div>
              <div style={{ flex: 1, overflowY: "auto", backgroundColor: C.deepBg, padding: 0 }}>
                <pre
                  style={{
                    margin: 0,
                    padding: 12,
                    fontSize: 11,
                    lineHeight: 1.7,
                    fontFamily: "'JetBrains Mono',monospace",
                    color: "#D1D5DB",
                    whiteSpace: "pre",
                    overflowX: "auto",
                  }}
                >
                  {code.split("\n").map((line, i) => (
                    <div key={i} style={{ display: "flex" }}>
                      <span
                        style={{
                          width: 36,
                          textAlign: "right",
                          paddingRight: 12,
                          color: "#4B5563",
                          userSelect: "none",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span
                        style={{
                          color: line.trim().startsWith("#")
                            ? "#6B7280"
                            : line.includes("def ")
                              ? "#93C5FD"
                              : line.includes("@")
                                ? "#FDE68A"
                                : line.includes('\"')
                                  ? "#A5D6A7"
                                  : line.includes("import")
                                    ? "#C4B5FD"
                                    : "#D1D5DB",
                        }}
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 16,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {prsList.map((p) => {
              const m = M[p.model];
              return (
                <div
                  key={p.num}
                  style={{
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor: C.cardBg,
                    border: `1px solid ${C.borderLight}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span
                    style={{ fontSize: 18, color: p.status === "Open" ? "#6EE7B7" : "#A78BFA" }}
                  >
                    <I.PR />
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                        {p.title}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 6,
                          backgroundColor:
                            p.status === "Open"
                              ? "rgba(52,211,153,0.15)"
                              : "rgba(167,139,250,0.15)",
                          color: p.status === "Open" ? "#6EE7B7" : "#C4B5FD",
                        }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 10, color: "#6B7280" }}>#{p.num}</span>
                      <ModelBadge k={p.model} small />
                      <span style={{ fontSize: 10, color: m.c }}>{m.s}</span>
                      <span style={{ fontSize: 10, color: "#4B5563" }}>{p.created}</span>
                    </div>
                  </div>
                  <button
                    style={{
                      padding: "5px 12px",
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                      backgroundColor: C.inputBg,
                      color: "#D1D5DB",
                      fontSize: 11,
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    보기
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </ModalBox>
    </Overlay>
  );
}

/* ══════════════════════════════════════════════════════
   SCHEDULE MANAGEMENT PAGE
   ══════════════════════════════════════════════════════ */
function ScheduleManagePage({ onClose }) {
  const [schedules] = useState(SAMPLE_SCHEDULES);
  const [showNew, setShowNew] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [newForm, setNewForm] = useState({
    date: "",
    time: "",
    action: "",
    mode: "auto",
    models: { opus: true, gpt: true, gemini: true },
  });
  const statusStyle = {
    pending: {
      bg: "rgba(251,191,36,0.12)",
      c: "#FDE68A",
      bc: "rgba(251,191,36,0.3)",
      label: "대기중",
      icon: "⏳",
    },
    running: {
      bg: "rgba(59,130,246,0.12)",
      c: "#93C5FD",
      bc: "rgba(96,165,250,0.3)",
      label: "실행중",
      icon: "⚡",
    },
    completed: {
      bg: "rgba(52,211,153,0.12)",
      c: "#6EE7B7",
      bc: "rgba(52,211,153,0.3)",
      label: "완료",
      icon: "✓",
    },
    failed: {
      bg: "rgba(239,68,68,0.12)",
      c: "#FCA5A5",
      bc: "rgba(248,113,113,0.3)",
      label: "실패",
      icon: "✗",
    },
  };
  const ips = {
    width: "100%",
    backgroundColor: C.cardBg,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 13,
    color: "#fff",
    outline: "none",
  };
  const changeColor = { modified: "#FDE68A", added: "#6EE7B7", deleted: "#FCA5A5" };
  return (
    <Overlay onClose={onClose}>
      <ModalBox width={720} maxH="85vh">
        <ModalHeader
          title="예약 관리"
          desc="예약된 작업을 확인하고 새 예약을 추가합니다"
          onClose={onClose}
          extra={
            <button
              onClick={() => setShowNew(!showNew)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 8,
                border: "none",
                backgroundColor: "#2563EB",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <I.Plus /> 새 예약
            </button>
          }
        />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {/* ── New schedule form ── */}
          {showNew && (
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: "rgba(59,130,246,0.04)",
                border: "1px solid rgba(96,165,250,0.2)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "#93C5FD" }}>새 예약 등록</div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{ fontSize: 10, color: "#9CA3AF", display: "block", marginBottom: 4 }}
                  >
                    날짜
                  </label>
                  <input
                    type="date"
                    value={newForm.date}
                    onChange={(e) => setNewForm({ ...newForm, date: e.target.value })}
                    style={ips}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{ fontSize: 10, color: "#9CA3AF", display: "block", marginBottom: 4 }}
                  >
                    시간
                  </label>
                  <input
                    type="time"
                    value={newForm.time}
                    onChange={(e) => setNewForm({ ...newForm, time: e.target.value })}
                    style={ips}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{ fontSize: 10, color: "#9CA3AF", display: "block", marginBottom: 4 }}
                  >
                    모드
                  </label>
                  <select
                    value={newForm.mode}
                    onChange={(e) => setNewForm({ ...newForm, mode: e.target.value })}
                    style={{ ...ips, cursor: "pointer" }}
                  >
                    {MODES.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  style={{ fontSize: 10, color: "#9CA3AF", display: "block", marginBottom: 4 }}
                >
                  작업 내용
                </label>
                <textarea
                  value={newForm.action}
                  onChange={(e) => setNewForm({ ...newForm, action: e.target.value })}
                  placeholder="예: PR#12 OAuth 보안 취약점 수정해줘"
                  rows={2}
                  style={{ ...ips, resize: "none" }}
                />
              </div>
              <div>
                <label
                  style={{ fontSize: 10, color: "#9CA3AF", display: "block", marginBottom: 4 }}
                >
                  사용 모델
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  {Object.keys(M).map((k) => {
                    const m = M[k];
                    return (
                      <label
                        key={k}
                        onClick={() =>
                          setNewForm({
                            ...newForm,
                            models: { ...newForm.models, [k]: !newForm.models[k] },
                          })
                        }
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 10px",
                          borderRadius: 8,
                          cursor: "pointer",
                          border: newForm.models[k] ? `1px solid ${m.bd}` : "1px solid transparent",
                          backgroundColor: newForm.models[k] ? m.bg : "transparent",
                          opacity: newForm.models[k] ? 1 : 0.5,
                        }}
                      >
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: 3,
                            backgroundColor: newForm.models[k] ? m.c : "#4B5563",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {newForm.models[k] && (
                            <span style={{ color: "#000", fontSize: 8 }}>✓</span>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: newForm.models[k] ? m.c : "#6B7280",
                          }}
                        >
                          {m.s}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button
                  onClick={() => setShowNew(false)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#9CA3AF",
                    fontSize: 11,
                    cursor: "pointer",
                  }}
                >
                  취소
                </button>
                <button
                  style={{
                    padding: "6px 16px",
                    borderRadius: 8,
                    border: "none",
                    backgroundColor: "#2563EB",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  예약 등록
                </button>
              </div>
            </div>
          )}

          {/* ═══ RUNNING TASKS ═══ */}
          {schedules.filter((s) => s.status === "running").length > 0 && (
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#3B82F6",
                    animation: "pulse 1s infinite",
                  }}
                ></span>{" "}
                실행중인 작업
              </div>
              {schedules
                .filter((s) => s.status === "running")
                .map((s) => {
                  const ss = statusStyle[s.status];
                  const p = s.progress;
                  return (
                    <div
                      key={s.id}
                      style={{
                        borderRadius: 12,
                        backgroundColor: C.cardBg,
                        border: `1px solid rgba(96,165,250,0.3)`,
                        marginBottom: 8,
                        overflow: "hidden",
                      }}
                    >
                      {/* Header */}
                      <div style={{ padding: 14, borderBottom: `1px solid ${C.borderLight}` }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 8,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                backgroundColor: "rgba(59,130,246,0.15)",
                                border: "1px solid rgba(96,165,250,0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 16,
                              }}
                            >
                              {ss.icon}
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                                {s.action}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  marginTop: 3,
                                }}
                              >
                                {s.pr && (
                                  <span
                                    style={{
                                      fontSize: 10,
                                      padding: "2px 8px",
                                      borderRadius: 6,
                                      backgroundColor: "rgba(59,130,246,0.15)",
                                      color: "#93C5FD",
                                      fontWeight: 700,
                                    }}
                                  >
                                    {s.pr}
                                  </span>
                                )}
                                <span style={{ fontSize: 10, color: "#9CA3AF" }}>{s.repo}</span>
                                <span style={{ fontSize: 10, color: "#6B7280" }}>
                                  시작: {s.label}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "3px 10px",
                                borderRadius: 6,
                                backgroundColor: ss.bg,
                                color: ss.c,
                                border: `1px solid ${ss.bc}`,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <span
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor: "#3B82F6",
                                  animation: "pulse 1s infinite",
                                }}
                              ></span>
                              {ss.label}
                            </span>
                            <div style={{ fontSize: 10, color: "#6B7280", marginTop: 4 }}>
                              경과: {p.elapsed}
                            </div>
                          </div>
                        </div>
                        {/* Overall progress bar */}
                        <div
                          style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}
                        >
                          <div
                            style={{
                              flex: 1,
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: C.borderDeep,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                borderRadius: 4,
                                background: "linear-gradient(90deg,#2563EB,#3B82F6)",
                                width: `${p.percent}%`,
                                transition: "width 0.5s",
                              }}
                            ></div>
                          </div>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#93C5FD",
                              minWidth: 36,
                            }}
                          >
                            {p.percent}%
                          </span>
                        </div>
                        {/* Phase steps */}
                        <div style={{ display: "flex", gap: 4 }}>
                          {p.phases.map((ph, i) => {
                            const phColor =
                              ph.status === "done"
                                ? "#22C55E"
                                : ph.status === "running"
                                  ? "#3B82F6"
                                  : "#374151";
                            return (
                              <div
                                key={i}
                                style={{
                                  flex: 1,
                                  padding: 6,
                                  borderRadius: 6,
                                  backgroundColor:
                                    ph.status === "running" ? "rgba(59,130,246,0.08)" : C.deepBg,
                                  border: `1px solid ${ph.status === "running" ? "rgba(96,165,250,0.3)" : C.borderDeep}`,
                                  textAlign: "center",
                                  position: "relative",
                                  overflow: "hidden",
                                }}
                              >
                                {ph.status === "running" && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      inset: 0,
                                      background:
                                        "linear-gradient(90deg,transparent,rgba(59,130,246,0.1),transparent)",
                                      backgroundSize: "200% 100%",
                                      animation: "shimmer 2s infinite",
                                    }}
                                  ></div>
                                )}
                                <div
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: phColor,
                                    position: "relative",
                                  }}
                                >
                                  {ph.status === "done" ? "✓" : ph.status === "running" ? "◉" : "○"}{" "}
                                  {ph.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: 9,
                                    color: "#4B5563",
                                    marginTop: 2,
                                    position: "relative",
                                  }}
                                >
                                  {ph.duration}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {/* Live log */}
                      <div
                        style={{
                          padding: 8,
                          backgroundColor: C.deepBg,
                          maxHeight: 100,
                          overflowY: "auto",
                          fontFamily: "'JetBrains Mono',monospace",
                          fontSize: 10,
                        }}
                      >
                        {p.log.map((l, i) => (
                          <div
                            key={i}
                            style={{ display: "flex", gap: 8, padding: "2px 4px", lineHeight: 1.5 }}
                          >
                            <span style={{ color: "#4B5563", flexShrink: 0 }}>{l.t}</span>
                            <span style={{ color: "#D1D5DB" }}>{l.msg}</span>
                          </div>
                        ))}
                      </div>
                      {/* Actions */}
                      <div
                        style={{
                          padding: "8px 14px",
                          borderTop: `1px solid ${C.borderLight}`,
                          display: "flex",
                          gap: 6,
                        }}
                      >
                        <button
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 10,
                            border: "1px solid rgba(248,113,113,0.3)",
                            backgroundColor: "rgba(239,68,68,0.08)",
                            color: "#FCA5A5",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          중단
                        </button>
                        <span
                          style={{
                            fontSize: 10,
                            color: "#4B5563",
                            marginLeft: "auto",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          모델:{" "}
                          {s.models.map((k) => (
                            <ModelBadge key={k} k={k} small />
                          ))}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* ═══ PENDING TASKS ═══ */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <I.Clock /> 대기중인 예약
            </div>
            {schedules
              .filter((s) => s.status === "pending")
              .map((s) => {
                const ss = statusStyle[s.status];
                return (
                  <div
                    key={s.id}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      backgroundColor: C.cardBg,
                      border: `1px solid ${C.borderLight}`,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 10,
                            backgroundColor: "rgba(251,191,36,0.1)",
                            border: "1px solid rgba(251,191,36,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 16,
                          }}
                        >
                          {ss.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                            {s.action}
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}
                          >
                            <span
                              style={{
                                fontSize: 11,
                                color: "#FDE68A",
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <I.Clock /> {s.label}
                            </span>
                            {s.pr && (
                              <span
                                style={{
                                  fontSize: 10,
                                  padding: "2px 8px",
                                  borderRadius: 6,
                                  backgroundColor: "rgba(59,130,246,0.15)",
                                  color: "#93C5FD",
                                  fontWeight: 700,
                                }}
                              >
                                {s.pr}
                              </span>
                            )}
                            <span
                              style={{
                                fontSize: 10,
                                padding: "2px 8px",
                                borderRadius: 6,
                                backgroundColor: C.inputBg,
                                color: "#D1D5DB",
                              }}
                            >
                              {MODES.find((m) => m.id === s.mode)?.l} 모드
                            </span>
                          </div>
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 6,
                          backgroundColor: ss.bg,
                          color: ss.c,
                          border: `1px solid ${ss.bc}`,
                        }}
                      >
                        {ss.label}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}
                    >
                      <span style={{ fontSize: 10, color: "#6B7280" }}>모델:</span>
                      {s.models.map((k) => (
                        <ModelBadge key={k} k={k} small />
                      ))}
                      <span style={{ fontSize: 10, color: "#6B7280", marginLeft: 8 }}>
                        레포: {s.repo}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      {(s.mode === "auto"
                        ? ["토론", "코드 병합", "PR 수정", "PR 닫기"]
                        : s.mode === "discussion"
                          ? ["토론", "합의", "PR 수정", "PR 닫기"]
                          : ["코드 생성", "검증", "커밋"]
                      ).map((step, i, arr) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span
                            style={{
                              fontSize: 10,
                              padding: "3px 8px",
                              borderRadius: 6,
                              backgroundColor: C.deepBg,
                              border: `1px solid ${C.borderDeep}`,
                              color: "#9CA3AF",
                              fontWeight: 500,
                            }}
                          >
                            {step}
                          </span>
                          {i < arr.length - 1 && (
                            <span style={{ color: "#374151", fontSize: 10 }}>→</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                      <button
                        style={{
                          padding: "5px 10px",
                          borderRadius: 6,
                          fontSize: 10,
                          border: `1px solid ${C.border}`,
                          backgroundColor: C.inputBg,
                          color: "#D1D5DB",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        수정
                      </button>
                      <button
                        style={{
                          padding: "5px 10px",
                          borderRadius: 6,
                          fontSize: 10,
                          border: "1px solid rgba(248,113,113,0.2)",
                          backgroundColor: "rgba(239,68,68,0.06)",
                          color: "#FCA5A5",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        삭제
                      </button>
                      <button
                        style={{
                          padding: "5px 10px",
                          borderRadius: 6,
                          fontSize: 10,
                          border: "1px solid rgba(52,211,153,0.2)",
                          backgroundColor: "rgba(52,211,153,0.06)",
                          color: "#6EE7B7",
                          cursor: "pointer",
                          fontWeight: 500,
                          marginLeft: "auto",
                        }}
                      >
                        지금 실행
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ═══ COMPLETED TASKS (expandable) ═══ */}
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              ✓ 완료된 예약
            </div>
            {schedules
              .filter((s) => s.status === "completed")
              .map((s) => {
                const ss = statusStyle[s.status];
                const isOpen = expandedId === s.id;
                const r = s.result;
                return (
                  <div
                    key={s.id}
                    style={{
                      borderRadius: 12,
                      backgroundColor: C.cardBg,
                      border: `1px solid ${isOpen ? "rgba(52,211,153,0.3)" : C.borderLight}`,
                      marginBottom: 8,
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    }}
                  >
                    {/* Collapsed header — clickable */}
                    <button
                      onClick={() => setExpandedId(isOpen ? null : s.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 12,
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "inherit",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            backgroundColor: ss.bg,
                            border: `1px solid ${ss.bc}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                          }}
                        >
                          {ss.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "#D1D5DB" }}>
                            {s.action}
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}
                          >
                            <span style={{ fontSize: 10, color: "#6B7280" }}>{s.label}</span>
                            {s.pr && (
                              <span style={{ fontSize: 10, color: "#6EE7B7", fontWeight: 600 }}>
                                {s.pr} 닫힘
                              </span>
                            )}
                            <span style={{ fontSize: 10, color: "#6B7280" }}>{s.repo}</span>
                            {r && (
                              <span style={{ fontSize: 10, color: "#4B5563" }}>
                                · {r.duration} · 커밋 {r.commits}개
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: 6,
                            backgroundColor: ss.bg,
                            color: ss.c,
                          }}
                        >
                          {ss.label}
                        </span>
                        <span
                          style={{
                            transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                            transition: "transform 0.2s",
                            color: "#6B7280",
                          }}
                        >
                          <I.Right />
                        </span>
                      </div>
                    </button>

                    {/* ── Expanded detail ── */}
                    {isOpen && r && (
                      <div
                        style={{
                          borderTop: `1px solid ${C.borderLight}`,
                          padding: 14,
                          display: "flex",
                          flexDirection: "column",
                          gap: 14,
                        }}
                      >
                        {/* Summary stats */}
                        <div style={{ display: "flex", gap: 8 }}>
                          {[
                            ["소요 시간", r.duration, "#93C5FD"],
                            ["커밋 수", `${r.commits}개`, "#FDE68A"],
                            [
                              "파이프라인",
                              r.pipelinePass ? "통과 ✓" : "실패 ✗",
                              r.pipelinePass ? "#6EE7B7" : "#FCA5A5",
                            ],
                            [
                              "PR",
                              r.prClosed ? `${s.pr} 닫힘` : "변경 없음",
                              r.prClosed ? "#6EE7B7" : "#9CA3AF",
                            ],
                          ].map(([label, val, c]) => (
                            <div
                              key={label}
                              style={{
                                flex: 1,
                                padding: 8,
                                borderRadius: 8,
                                backgroundColor: C.deepBg,
                                border: `1px solid ${C.borderDeep}`,
                                textAlign: "center",
                              }}
                            >
                              <div style={{ fontSize: 13, fontWeight: 700, color: c }}>{val}</div>
                              <div style={{ fontSize: 9, color: "#6B7280", marginTop: 2 }}>
                                {label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Discussion section */}
                        {r.discussion && (
                          <div>
                            <div
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#F59E0B",
                                marginBottom: 8,
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              <ModelBadge k="opus" small /> 토론 내용 ({r.discussion.rounds}라운드)
                            </div>
                            <div
                              style={{
                                padding: 10,
                                borderRadius: 8,
                                backgroundColor: C.deepBg,
                                border: `1px solid ${C.borderDeep}`,
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                              }}
                            >
                              <div style={{ fontSize: 11, fontWeight: 600, color: "#D1D5DB" }}>
                                주제: {r.discussion.topic}
                              </div>
                              {r.discussion.opinions.map((op, i) => {
                                const m = M[op.model];
                                return (
                                  <div
                                    key={i}
                                    style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
                                  >
                                    <ModelBadge k={op.model} small />
                                    <div style={{ flex: 1 }}>
                                      <div
                                        style={{
                                          fontSize: 10,
                                          fontWeight: 700,
                                          color: m.c,
                                          marginBottom: 2,
                                        }}
                                      >
                                        {m.s}
                                      </div>
                                      <div
                                        style={{ fontSize: 11, color: "#D1D5DB", lineHeight: 1.5 }}
                                      >
                                        {op.summary}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                              <div
                                style={{
                                  padding: 8,
                                  borderRadius: 6,
                                  backgroundColor: "rgba(52,211,153,0.06)",
                                  border: "1px solid rgba(52,211,153,0.15)",
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: "#6EE7B7",
                                    marginBottom: 2,
                                  }}
                                >
                                  ✓ 합의 결과
                                </div>
                                <div style={{ fontSize: 11, color: "#A7F3D0", lineHeight: 1.5 }}>
                                  {r.discussion.consensus}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Code changes section */}
                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "#93C5FD",
                              marginBottom: 8,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <I.Code /> 수정사항 ({r.changes.length}개 파일)
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {r.changes.map((ch, i) => (
                              <div
                                key={i}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  padding: 8,
                                  borderRadius: 6,
                                  backgroundColor: C.deepBg,
                                  border: `1px solid ${C.borderDeep}`,
                                }}
                              >
                                <span
                                  style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    backgroundColor: changeColor[ch.type],
                                    flexShrink: 0,
                                  }}
                                ></span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span
                                      style={{
                                        fontSize: 11,
                                        fontWeight: 600,
                                        color: "#E5E7EB",
                                        fontFamily: "'JetBrains Mono',monospace",
                                      }}
                                    >
                                      {ch.file}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: 9,
                                        fontWeight: 700,
                                        padding: "1px 6px",
                                        borderRadius: 4,
                                        backgroundColor:
                                          ch.type === "added"
                                            ? "rgba(52,211,153,0.12)"
                                            : ch.type === "deleted"
                                              ? "rgba(239,68,68,0.12)"
                                              : "rgba(251,191,36,0.12)",
                                        color: changeColor[ch.type],
                                      }}
                                    >
                                      {ch.type}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: 10,
                                        color: "#6B7280",
                                        fontFamily: "monospace",
                                      }}
                                    >
                                      {ch.diff}
                                    </span>
                                  </div>
                                  <div style={{ fontSize: 10, color: "#9CA3AF", marginTop: 2 }}>
                                    {ch.summary}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Bottom info */}
        <div
          style={{
            padding: "10px 16px",
            borderTop: `1px solid ${C.border}`,
            backgroundColor: C.deepBg,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <I.Bell />
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>
            예약 실행 시 브라우저 알림과 Socket.IO 실시간 알림이 전송됩니다.
          </span>
        </div>
      </ModalBox>
    </Overlay>
  );
}

/* ══════════════════════════════════════════════════════
   SETTINGS PAGE (unchanged from v7)
   ══════════════════════════════════════════════════════ */
function SettingsPage({ presets, setPresets, onClose }) {
  const [tab, setTab] = useState("profile");
  const tabs = [
    { id: "profile", label: "프로필", icon: <I.Settings /> },
    { id: "connections", label: "연결 관리", icon: <I.Lnk /> },
    { id: "models", label: "모델 관리", icon: <I.Dot c="#60A5FA" /> },
    { id: "presets", label: "프리셋 관리", icon: <I.Bkmk /> },
  ];
  return (
    <Overlay onClose={onClose}>
      <ModalBox width={700} maxH="80vh">
        <ModalHeader title="설정" desc="플랫폼 설정을 관리합니다" onClose={onClose} />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <div
            style={{
              width: 170,
              borderRight: `1px solid ${C.borderLight}`,
              padding: 8,
              flexShrink: 0,
              backgroundColor: C.sidebarBg,
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  textAlign: "left",
                  marginBottom: 2,
                  cursor: "pointer",
                  backgroundColor: tab === t.id ? "rgba(255,255,255,0.08)" : "transparent",
                  color: tab === t.id ? "#fff" : "#9CA3AF",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
            {tab === "profile" && <SProfile />}
            {tab === "connections" && <SConn />}
            {tab === "models" && <SMod />}
            {tab === "presets" && <SPreset presets={presets} setPresets={setPresets} />}
          </div>
        </div>
      </ModalBox>
    </Overlay>
  );
}
function SProfile() {
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("ko");
  const [notif, setNotif] = useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>프로필</div>
      <Card style={{ padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#6B7280,#4B5563)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          U
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>user</div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>user@github.com</div>
        </div>
      </Card>
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>테마</div>
          <div style={{ fontSize: 10, color: "#6B7280" }}>다크 / 라이트</div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 4,
            backgroundColor: C.inputBg,
            borderRadius: 8,
            padding: 2,
          }}
        >
          {[
            ["dark", "다크"],
            ["light", "라이트"],
          ].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setTheme(v)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                backgroundColor: theme === v ? "#2563EB" : "transparent",
                color: theme === v ? "#fff" : "#9CA3AF",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </Card>
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>언어</div>
        </div>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{
            backgroundColor: C.inputBg,
            fontSize: 11,
            color: "#E5E7EB",
            borderRadius: 8,
            padding: "6px 12px",
            border: `1px solid ${C.border}`,
            outline: "none",
          }}
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </select>
      </Card>
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>알림</div>
        </div>
        <button
          onClick={() => setNotif(!notif)}
          style={{
            width: 40,
            height: 24,
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            position: "relative",
            backgroundColor: notif ? "#2563EB" : "#4B5563",
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#fff",
              position: "absolute",
              top: 4,
              left: notif ? 20 : 4,
              transition: "left 0.2s",
            }}
          ></div>
        </button>
      </Card>
    </div>
  );
}
function SConn() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>연결 관리</div>
      <Card style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#1F2937",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>GitHub</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>user@github.com</div>
            </div>
          </div>
          <span
            style={{
              fontSize: 10,
              padding: "4px 8px",
              borderRadius: 99,
              backgroundColor: "rgba(52,211,153,0.15)",
              color: "#6EE7B7",
              fontWeight: 700,
            }}
          >
            ✓ 연결됨
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              fontSize: 11,
              border: `1px solid ${C.border}`,
              backgroundColor: C.inputBg,
              color: "#D1D5DB",
              cursor: "pointer",
            }}
          >
            토큰 갱신
          </button>
          <button
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              fontSize: 11,
              border: "1px solid rgba(239,68,68,0.2)",
              backgroundColor: "rgba(239,68,68,0.06)",
              color: "#F87171",
              cursor: "pointer",
            }}
          >
            연결 해제
          </button>
        </div>
      </Card>
    </div>
  );
}
function SMod() {
  const [exp, setExp] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [ml, setMl] = useState([
    {
      key: "opus",
      provider: "Anthropic",
      apiKey: "sk-an...****",
      opts: {
        coding: { temperature: 1, extended_thinking: true },
        review: { temperature: 1 },
        discussion: { temperature: 1 },
      },
    },
    {
      key: "gpt",
      provider: "OpenAI",
      apiKey: "sk-op...****",
      opts: {
        coding: { temperature: 0, reasoning: "high" },
        review: { temperature: 0 },
        discussion: { temperature: 0.3 },
      },
    },
    {
      key: "gemini",
      provider: "Google",
      apiKey: "AIza...****",
      opts: {
        coding: { temperature: 0, thinking: 32768 },
        review: { temperature: 0 },
        discussion: { temperature: 0.3 },
      },
    },
  ]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>모델 관리</div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "6px 12px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#2563EB",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <I.Plus /> 새 모델
        </button>
      </div>
      {ml.map((md) => {
        const m = M[md.key];
        return (
          <div
            key={md.key}
            style={{
              borderRadius: 12,
              backgroundColor: C.cardBg,
              border: `1px solid ${C.borderLight}`,
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setExp(exp === md.key ? null : md.key)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <ModelBadge k={md.key} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{m.name}</span>
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 6px",
                      borderRadius: 4,
                      backgroundColor: "#1E2235",
                      color: "#9CA3AF",
                    }}
                  >
                    {md.provider}
                  </span>
                </div>
                <div
                  style={{ fontSize: 10, color: "#6B7280", marginTop: 4, fontFamily: "monospace" }}
                >
                  {md.apiKey} · <span style={{ color: "#34D399" }}>연결됨</span>
                </div>
              </div>
              <button
                onClick={(e) => e.stopPropagation()}
                style={{
                  padding: "4px 10px",
                  borderRadius: 8,
                  fontSize: 10,
                  fontWeight: 700,
                  border: `1px solid ${C.border}`,
                  backgroundColor: C.inputBg,
                  color: "#D1D5DB",
                  cursor: "pointer",
                }}
              >
                테스트
              </button>
            </button>
            {exp === md.key && (
              <div style={{ padding: "4px 14px 14px", borderTop: `1px solid ${C.borderLight}` }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
                  <button
                    onClick={() => setEditMode(editMode === md.key ? null : md.key)}
                    style={{
                      fontSize: 10,
                      color: editMode === md.key ? "#60A5FA" : "#6B7280",
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {editMode === md.key ? "✓ 완료" : "✏️ 편집"}
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    ["coding", "코드"],
                    ["review", "리뷰"],
                    ["discussion", "토론"],
                  ].map(([k, l]) => (
                    <div
                      key={k}
                      style={{
                        padding: 10,
                        borderRadius: 8,
                        backgroundColor: C.inputBg,
                        border: `1px solid ${C.borderLight}`,
                      }}
                    >
                      <div
                        style={{ fontSize: 10, fontWeight: 700, color: "#D1D5DB", marginBottom: 6 }}
                      >
                        {l}
                      </div>
                      {md.opts[k] &&
                        Object.entries(md.opts[k]).map(([ok, ov]) => (
                          <div
                            key={ok}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 3,
                            }}
                          >
                            <span style={{ fontSize: 10, color: "#6B7280" }}>{ok}</span>
                            {editMode === md.key ? (
                              <input
                                defaultValue={String(ov)}
                                onBlur={(e) => {
                                  const v = e.target.value;
                                  setMl((p) =>
                                    p.map((m) =>
                                      m.key === md.key
                                        ? {
                                            ...m,
                                            opts: {
                                              ...m.opts,
                                              [k]: {
                                                ...m.opts[k],
                                                [ok]:
                                                  v === "true"
                                                    ? true
                                                    : v === "false"
                                                      ? false
                                                      : isNaN(v)
                                                        ? v
                                                        : Number(v),
                                              },
                                            },
                                          }
                                        : m
                                    )
                                  );
                                }}
                                style={{
                                  width: 70,
                                  fontSize: 10,
                                  color: "#E5E7EB",
                                  fontFamily: "monospace",
                                  backgroundColor: C.cardBg,
                                  border: `1px solid ${C.border}`,
                                  borderRadius: 4,
                                  padding: "2px 6px",
                                  outline: "none",
                                  textAlign: "right",
                                }}
                              />
                            ) : (
                              <span
                                style={{ fontSize: 10, color: "#E5E7EB", fontFamily: "monospace" }}
                              >
                                {String(ov)}
                              </span>
                            )}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
function SPreset({ presets, setPresets }) {
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", mode: "batch", pr: false, msg: "" });
  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ name: p.name, mode: p.mode, pr: p.pr, msg: p.msg });
  };
  const startNew = () => {
    setEditing("new");
    setForm({ name: "", mode: "batch", pr: false, msg: "" });
  };
  const cancel = () => setEditing(null);
  const save = () => {
    if (!form.name.trim() || !form.msg.trim()) return;
    if (editing === "new") setPresets((p) => [...p, { id: Date.now(), ...form }]);
    else setPresets((p) => p.map((x) => (x.id === editing ? { ...x, ...form } : x)));
    setEditing(null);
  };
  const remove = (id) => setPresets((p) => p.filter((x) => x.id !== id));
  const ips = {
    width: "100%",
    backgroundColor: C.cardBg,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: 13,
    color: "#fff",
    outline: "none",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>프리셋 관리</div>
      </div>
      {presets.map((p) =>
        editing === p.id ? (
          <div
            key={p.id}
            style={{
              padding: 14,
              borderRadius: 12,
              backgroundColor: "rgba(59,130,246,0.04)",
              border: "1px solid rgba(59,130,246,0.2)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={ips}
              placeholder="이름"
            />
            <div style={{ display: "flex", gap: 8 }}>
              <select
                value={form.mode}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                style={{ ...ips, flex: 1 }}
              >
                {MODES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.l}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setForm({ ...form, pr: !form.pr })}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: form.pr ? "1px solid rgba(96,165,250,0.3)" : `1px solid ${C.border}`,
                  backgroundColor: form.pr ? "rgba(59,130,246,0.15)" : C.cardBg,
                  color: form.pr ? "#93C5FD" : "#6B7280",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  width: 80,
                }}
              >
                {form.pr ? "PR ✓" : "PR"}
              </button>
            </div>
            <textarea
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
              rows={2}
              style={{ ...ips, resize: "none" }}
              placeholder="메시지"
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button
                onClick={cancel}
                style={{
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#9CA3AF",
                  fontSize: 11,
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                onClick={save}
                style={{
                  padding: "6px 16px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "#2563EB",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  opacity: !form.name.trim() || !form.msg.trim() ? 0.3 : 1,
                }}
              >
                저장
              </button>
            </div>
          </div>
        ) : (
          <div
            key={p.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: 10,
              borderRadius: 12,
              backgroundColor: C.cardBg,
              border: `1px solid ${C.borderLight}`,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{p.name}</span>
                <span
                  style={{
                    fontSize: 10,
                    padding: "2px 6px",
                    borderRadius: 4,
                    backgroundColor: "#1E2235",
                    color: "#D1D5DB",
                  }}
                >
                  {MODES.find((m) => m.id === p.mode)?.l}
                </span>
                {p.pr && (
                  <span
                    style={{
                      fontSize: 10,
                      padding: "2px 6px",
                      borderRadius: 4,
                      backgroundColor: "rgba(59,130,246,0.15)",
                      color: "#93C5FD",
                      fontWeight: 700,
                    }}
                  >
                    PR
                  </span>
                )}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#9CA3AF",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {p.msg}
              </div>
            </div>
            <button
              onClick={() => startEdit(p)}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "none",
                backgroundColor: "transparent",
                color: "#6B7280",
                cursor: "pointer",
              }}
            >
              <I.Edit />
            </button>
            <button
              onClick={() => remove(p.id)}
              style={{
                padding: 6,
                borderRadius: 6,
                border: "none",
                backgroundColor: "transparent",
                color: "#6B7280",
                cursor: "pointer",
              }}
            >
              <I.Trash />
            </button>
          </div>
        )
      )}
      {editing === "new" ? null : (
        <button
          onClick={startNew}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 12,
            border: "2px dashed #1E2235",
            backgroundColor: "transparent",
            color: "#6B7280",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          <I.Plus /> 새 프리셋
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   REPO MANAGE + DASHBOARD (from v7)
   ══════════════════════════════════════════════════════ */
function RepoManagePage({ onClose }) {
  return (
    <Overlay onClose={onClose}>
      <ModalBox width={700} maxH="78vh">
        <ModalHeader
          title="레포지토리 관리"
          desc="GitHub 레포 관리 및 동기화"
          onClose={onClose}
          extra={
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px",
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                backgroundColor: C.inputBg,
                color: "#D1D5DB",
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              <I.Sync /> 전체 동기화
            </button>
          }
        />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {REPOS.map((r) => (
            <Card key={r.id} style={{ padding: 14 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#60A5FA" }}>
                      <I.Repo />
                    </span>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{r.name}</span>
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 6px",
                          borderRadius: 4,
                          backgroundColor: "#1E2235",
                          color: "#9CA3AF",
                          fontFamily: "monospace",
                        }}
                      >
                        {r.lang}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{r.desc}</div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    padding: "3px 8px",
                    borderRadius: 99,
                    backgroundColor: "rgba(52,211,153,0.15)",
                    color: "#6EE7B7",
                    fontWeight: 700,
                  }}
                >
                  연결됨
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "6px 8px",
                  borderRadius: 6,
                  backgroundColor: C.deepBg,
                  border: `1px solid ${C.borderDeep}`,
                  marginBottom: 10,
                  fontSize: 11,
                  color: "#D1D5DB",
                }}
              >
                <span>{r.files}개 파일</span>
                <span>PR {r.prs}개</span>
                <span style={{ color: "#6B7280" }}>동기화: {r.lastSync}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["파일 보기", "브랜치", "PR 목록", "동기화"].map((l) => (
                  <button
                    key={l}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 6,
                      fontSize: 10,
                      border: `1px solid ${C.border}`,
                      backgroundColor: C.inputBg,
                      color: "#D1D5DB",
                      cursor: "pointer",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </ModalBox>
    </Overlay>
  );
}
function DashboardPage({ onClose }) {
  const u = [
    { model: "opus", tIn: "2.4M", tOut: "1.8M", cost: "$42.30", calls: 156 },
    { model: "gpt", tIn: "3.1M", tOut: "2.5M", cost: "$28.60", calls: 203 },
    { model: "gemini", tIn: "1.8M", tOut: "1.2M", cost: "$12.40", calls: 98 },
  ];
  const ps = { total: 47, ok: 41, fail: 4, run: 2 };
  return (
    <Overlay onClose={onClose}>
      <ModalBox width={680} maxH="75vh">
        <ModalHeader title="대시보드" desc="사용량, 비용, 파이프라인 성공률" onClose={onClose} />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              파이프라인
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              {[
                ["전체", ps.total, "#60A5FA"],
                ["성공", ps.ok, "#34D399"],
                ["실패", ps.fail, "#F87171"],
                ["진행중", ps.run, "#FBBF24"],
              ].map(([l, v, c]) => (
                <div
                  key={l}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: C.cardBg,
                    border: `1px solid ${C.borderLight}`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 700, color: c }}>{v}</div>
                  <div style={{ fontSize: 10, color: "#6B7280" }}>{l}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 6,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#1A1D2E",
                overflow: "hidden",
                display: "flex",
              }}
            >
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#22C55E",
                  width: `${(ps.ok / ps.total) * 100}%`,
                }}
              />
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#EF4444",
                  width: `${(ps.fail / ps.total) * 100}%`,
                }}
              />
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#EAB308",
                  width: `${(ps.run / ps.total) * 100}%`,
                }}
              />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              모델별 사용량
            </div>
            {u.map((x) => {
              const m = M[x.model];
              return (
                <div
                  key={x.model}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: C.cardBg,
                    border: `1px solid ${C.borderLight}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <ModelBadge k={x.model} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{m.name}</div>
                    <div style={{ fontSize: 10, color: "#6B7280" }}>
                      입력 {x.tIn} · 출력 {x.tOut} · {x.calls}회
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: m.c }}>{x.cost}</div>
                </div>
              );
            })}
            <div
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "rgba(59,130,246,0.06)",
                border: "1px solid rgba(96,165,250,0.2)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: "#93C5FD" }}>총 비용</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>$83.30</span>
            </div>
          </div>
        </div>
      </ModalBox>
    </Overlay>
  );
}

/* ══════════════════════════════════════════════════════
   1. LOGIN PAGE
   ══════════════════════════════════════════════════════ */
function LoginPage({ onLogin }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: C.pageBg,
        fontFamily: "'Noto Sans KR',-apple-system,sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.animate-fadeIn{animation:fadeIn .4s ease-out}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(59,130,246,0.15)}50%{box-shadow:0 0 40px rgba(59,130,246,0.3)}}
      `}</style>
      <div
        className="animate-fadeIn"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          width: 380,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg,#3B82F6,#7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "float 3s ease-in-out infinite, glow 3s ease-in-out infinite",
            }}
          >
            <I.Layers />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              Multi AI Dev Platform
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>
              GPT-5.2 · Claude Opus 4.6 · Gemini 3.1 Pro
            </div>
          </div>
        </div>

        {/* Card */}
        <div
          style={{
            width: "100%",
            padding: 28,
            borderRadius: 20,
            backgroundColor: C.modalBg,
            border: `1px solid ${C.border}`,
            boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#E5E7EB",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            로그인하여 시작하기
          </div>
          <button
            onClick={onLogin}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "14px 0",
              borderRadius: 12,
              border: "none",
              backgroundColor: "#fff",
              color: "#0D1117",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "transform 0.1s",
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <I.GH />
            <span>GitHub로 로그인</span>
          </button>
          <div
            style={{
              fontSize: 11,
              color: "#4B5563",
              textAlign: "center",
              marginTop: 14,
              lineHeight: 1.6,
            }}
          >
            등록된 GitHub 계정으로만 접근 가능합니다.
            <br />
            1인 전용 플랫폼 · OAuth 인증
          </div>
        </div>

        {/* Features */}
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          {[
            ["5가지 모드", "배치·동시·토론·개발·자동", "#3B82F6"],
            ["3개 AI 모델", "GPT·Opus·Gemini 병렬", "#8B5CF6"],
            ["자동 파이프라인", "9단계 검증 커밋", "#10B981"],
          ].map(([t, d, c]) => (
            <div
              key={t}
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                backgroundColor: C.cardBg,
                border: `1px solid ${C.borderLight}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: c }}>{t}</div>
              <div style={{ fontSize: 9, color: "#6B7280", marginTop: 4, lineHeight: 1.4 }}>
                {d}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10, color: "#374151" }}>v0.1.0 · Powered by Multi AI</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   2. NOTIFICATION PANEL (dropdown)
   ══════════════════════════════════════════════════════ */
const SAMPLE_NOTIFS = [
  {
    id: 1,
    type: "schedule",
    title: "예약 작업 완료",
    desc: "PR#11 라우터 구조 개선 — 자동 모드 완료, PR 닫힘",
    time: "10분 전",
    read: false,
    color: "#6EE7B7",
  },
  {
    id: 2,
    type: "pipeline",
    title: "파이프라인 성공",
    desc: "PR#13 API 리팩토링 — 9단계 모두 통과",
    time: "25분 전",
    read: false,
    color: "#93C5FD",
  },
  {
    id: 3,
    type: "error",
    title: "파이프라인 실패",
    desc: "PR#9 테스트 커버리지 87% — 100% 미달",
    time: "1시간 전",
    read: true,
    color: "#FCA5A5",
  },
  {
    id: 4,
    type: "pr",
    title: "PR 머지 완료",
    desc: "PR#10 인증 미들웨어 리팩토링이 main에 머지됨",
    time: "2시간 전",
    read: true,
    color: "#C4B5FD",
  },
  {
    id: 5,
    type: "schedule",
    title: "예약 실행 시작",
    desc: "PR#8 DB 마이그레이션 리뷰 — 토론 모드 시작",
    time: "3시간 전",
    read: true,
    color: "#FDE68A",
  },
];
function NotificationPanel({ onClose, onShowAll }) {
  const panelRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };
    setTimeout(() => document.addEventListener("mousedown", handler), 10);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  const [notifs] = useState(SAMPLE_NOTIFS);
  const unread = notifs.filter((n) => !n.read).length;
  const typeIcon = { schedule: "⏳", pipeline: "⚡", error: "✗", pr: "⎇" };
  return (
    <div
      style={{
        position: "absolute",
        top: "100%",
        right: 0,
        marginTop: 6,
        width: 380,
        backgroundColor: C.modalBg,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        zIndex: 100,
        overflow: "hidden",
      }}
      className="animate-fadeIn"
      ref={panelRef}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>알림</span>
          {unread > 0 && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 99,
                backgroundColor: "#2563EB",
                color: "#fff",
              }}
            >
              {unread}
            </span>
          )}
        </div>
        <button
          style={{
            fontSize: 10,
            color: "#6B7280",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          모두 읽음
        </button>
      </div>
      <div style={{ maxHeight: 360, overflowY: "auto" }}>
        {notifs.map((n) => (
          <div
            key={n.id}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 16px",
              borderBottom: `1px solid ${C.borderDeep}`,
              backgroundColor: n.read ? "transparent" : "rgba(59,130,246,0.03)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = n.read
                ? "transparent"
                : "rgba(59,130,246,0.03)")
            }
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: `${n.color}15`,
                border: `1px solid ${n.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                flexShrink: 0,
                color: n.color,
              }}
            >
              {typeIcon[n.type]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: n.read ? "#9CA3AF" : "#fff" }}>
                  {n.title}
                </span>
                {!n.read && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#3B82F6",
                      flexShrink: 0,
                    }}
                  ></span>
                )}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#6B7280",
                  marginTop: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {n.desc}
              </div>
              <div style={{ fontSize: 10, color: "#4B5563", marginTop: 3 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "8px 16px",
          borderTop: `1px solid ${C.borderLight}`,
          textAlign: "center",
        }}
      >
        <button
          onClick={() => {
            if (onShowAll) onShowAll();
            onClose();
          }}
          style={{
            fontSize: 11,
            color: "#60A5FA",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          전체 알림 보기
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   3. SEARCH MODAL (Ctrl+K)
   ══════════════════════════════════════════════════════ */
function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const sampleResults = [
    {
      type: "chat",
      icon: <I.Chat />,
      title: "GitHub OAuth 구현",
      desc: "자동 모드 · 오늘 오전",
      match: "OAuth callback 보안 취약점 수정",
    },
    {
      type: "chat",
      icon: <I.Chat />,
      title: "DB 스키마 리팩토링",
      desc: "토론 모드 · 2시간 전",
      match: "embeddings 테이블 인덱스 최적화",
    },
    {
      type: "code",
      icon: <I.Code />,
      title: "src/api/auth_router.py",
      desc: "multi-ai-platform · 52줄",
      match: "async def github_login():",
    },
    {
      type: "code",
      icon: <I.Code />,
      title: "src/api/middleware.py",
      desc: "multi-ai-platform · 38줄",
      match: "class AuthMiddleware:",
    },
    {
      type: "pr",
      icon: <I.Git />,
      title: "PR#12 OAuth 콜백 보안",
      desc: "multi-ai-platform · Open",
      match: "state 파라미터 검증 추가",
    },
  ];
  const filtered = query
    ? sampleResults.filter(
        (r) =>
          (tab === "all" || r.type === tab) &&
          (r.title + r.match).toLowerCase().includes(query.toLowerCase())
      )
    : [];
  return (
    <Overlay onClose={onClose}>
      <div
        style={{
          width: 580,
          backgroundColor: C.modalBg,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
        className="animate-fadeIn"
      >
        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            borderBottom: `1px solid ${C.borderLight}`,
          }}
        >
          <I.Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="대화, 코드, PR 검색..."
            style={{
              flex: 1,
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "#fff",
              fontFamily: "inherit",
            }}
          />
          <span
            style={{
              fontSize: 10,
              padding: "3px 8px",
              borderRadius: 4,
              backgroundColor: C.inputBg,
              color: "#6B7280",
              fontFamily: "monospace",
            }}
          >
            ESC
          </span>
        </div>
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 2,
            padding: "6px 16px",
            borderBottom: `1px solid ${C.borderDeep}`,
          }}
        >
          {[
            ["all", "전체"],
            ["chat", "대화"],
            ["code", "코드"],
            ["pr", "PR"],
          ].map(([id, l]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding: "4px 12px",
                borderRadius: 6,
                border: "none",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                backgroundColor: tab === id ? "rgba(59,130,246,0.15)" : "transparent",
                color: tab === id ? "#93C5FD" : "#6B7280",
              }}
            >
              {l}
            </button>
          ))}
        </div>
        {/* Results */}
        <div style={{ maxHeight: 340, overflowY: "auto", padding: 8 }}>
          {query ? (
            filtered.length > 0 ? (
              filtered.map((r, i) => (
                <button
                  key={i}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    color: "inherit",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      backgroundColor: C.deepBg,
                      border: `1px solid ${C.borderDeep}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9CA3AF",
                      flexShrink: 0,
                    }}
                  >
                    {r.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#E5E7EB" }}>{r.title}</div>
                    <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>{r.desc}</div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#93C5FD",
                        marginTop: 2,
                        fontFamily: "'JetBrains Mono',monospace",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.match}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: 4,
                      backgroundColor:
                        r.type === "chat"
                          ? "rgba(96,165,250,0.1)"
                          : r.type === "code"
                            ? "rgba(52,211,153,0.1)"
                            : "rgba(196,181,253,0.1)",
                      color:
                        r.type === "chat" ? "#93C5FD" : r.type === "code" ? "#6EE7B7" : "#C4B5FD",
                    }}
                  >
                    {r.type === "chat" ? "대화" : r.type === "code" ? "코드" : "PR"}
                  </span>
                </button>
              ))
            ) : (
              <div style={{ padding: 24, textAlign: "center", color: "#4B5563", fontSize: 12 }}>
                검색 결과가 없습니다
              </div>
            )
          ) : (
            <div style={{ padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 8 }}>
                검색어를 입력하세요
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                {["OAuth", "middleware", "PR#12"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: 6,
                      border: `1px solid ${C.border}`,
                      backgroundColor: C.deepBg,
                      color: "#9CA3AF",
                      fontSize: 11,
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            borderTop: `1px solid ${C.borderLight}`,
            fontSize: 10,
            color: "#4B5563",
          }}
        >
          <span>↑↓ 이동 · Enter 열기 · ESC 닫기</span>
          <span>Ctrl+K 검색</span>
        </div>
      </div>
    </Overlay>
  );
}

/* ══════════════════════════════════════════════════════
   4. MODEL DIFF COMPARE VIEW
   ══════════════════════════════════════════════════════ */
function DiffCompareView({ onClose }) {
  const leftModel = "gpt",
    rightModel = "opus";
  const lm = M[leftModel],
    rm = M[rightModel];
  const leftCode = `from fastapi import APIRouter

router = APIRouter(prefix="/auth")

@router.get("/github")
async def github_login():
    state = generate_csrf_state()
    return RedirectResponse(
        f"https://github.com/login/oauth/authorize"
        f"?client_id={CLIENT_ID}&state={state}"
    )`;
  const rightCode = `from fastapi import APIRouter, HTTPException
from secrets import token_urlsafe

router = APIRouter(prefix="/auth")

@router.get("/github")
async def github_login():
    state = token_urlsafe(32)
    await redis.set(f"oauth:state:{state}", "1", ex=300)
    return RedirectResponse(
        f"https://github.com/login/oauth/authorize"
        f"?client_id={CLIENT_ID}&state={state}&scope=repo"
    )`;
  const leftLines = leftCode.split("\n"),
    rightLines = rightCode.split("\n");
  const maxLines = Math.max(leftLines.length, rightLines.length);
  return (
    <Overlay onClose={onClose}>
      <ModalBox width={820} maxH="80vh">
        <ModalHeader
          title="모델 응답 Diff 비교"
          desc="동시 모드에서 두 모델의 코드 차이를 비교합니다"
          onClose={onClose}
          extra={
            <div style={{ display: "flex", gap: 4 }}>
              <ModelBadge k={leftModel} small />
              <span style={{ fontSize: 11, color: "#4B5563" }}>vs</span>
              <ModelBadge k={rightModel} small />
            </div>
          }
        />
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Left model */}
          <div
            style={{
              flex: 1,
              borderRight: `1px solid ${C.borderLight}`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "8px 14px",
                borderBottom: `1px solid ${C.borderDeep}`,
                display: "flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: C.deepBg,
              }}
            >
              <ModelBadge k={leftModel} small />
              <span style={{ fontSize: 11, fontWeight: 700, color: lm.c }}>{lm.name}</span>
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 12,
              }}
            >
              {Array.from({ length: maxLines }).map((_, i) => {
                const line = leftLines[i] || "";
                const rLine = rightLines[i] || "";
                const isDiff = line !== rLine;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      padding: "1px 0",
                      backgroundColor: isDiff && line ? "rgba(239,68,68,0.06)" : "transparent",
                    }}
                  >
                    <span
                      style={{
                        width: 32,
                        textAlign: "right",
                        color: "#374151",
                        padding: "0 8px",
                        userSelect: "none",
                        flexShrink: 0,
                        fontSize: 10,
                        lineHeight: "20px",
                      }}
                    >
                      {line ? i + 1 : ""}
                    </span>
                    <span
                      style={{
                        padding: "0 8px",
                        color: isDiff && line ? "#FCA5A5" : "#D1D5DB",
                        lineHeight: "20px",
                        whiteSpace: "pre",
                      }}
                    >
                      {isDiff && line && (
                        <span style={{ color: "#EF4444", marginRight: 4 }}>−</span>
                      )}
                      {line}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Right model */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                padding: "8px 14px",
                borderBottom: `1px solid ${C.borderDeep}`,
                display: "flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: C.deepBg,
              }}
            >
              <ModelBadge k={rightModel} small />
              <span style={{ fontSize: 11, fontWeight: 700, color: rm.c }}>{rm.name}</span>
            </div>
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: 12,
              }}
            >
              {Array.from({ length: maxLines }).map((_, i) => {
                const line = rightLines[i] || "";
                const lLine = leftLines[i] || "";
                const isDiff = line !== lLine;
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      padding: "1px 0",
                      backgroundColor: isDiff && line ? "rgba(52,211,153,0.06)" : "transparent",
                    }}
                  >
                    <span
                      style={{
                        width: 32,
                        textAlign: "right",
                        color: "#374151",
                        padding: "0 8px",
                        userSelect: "none",
                        flexShrink: 0,
                        fontSize: 10,
                        lineHeight: "20px",
                      }}
                    >
                      {line ? i + 1 : ""}
                    </span>
                    <span
                      style={{
                        padding: "0 8px",
                        color: isDiff && line ? "#6EE7B7" : "#D1D5DB",
                        lineHeight: "20px",
                        whiteSpace: "pre",
                      }}
                    >
                      {isDiff && line && (
                        <span style={{ color: "#22C55E", marginRight: 4 }}>+</span>
                      )}
                      {line}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            borderTop: `1px solid ${C.border}`,
            backgroundColor: C.deepBg,
          }}
        >
          <div style={{ display: "flex", gap: 12, fontSize: 10 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  backgroundColor: "rgba(239,68,68,0.2)",
                  border: "1px solid rgba(239,68,68,0.3)",
                }}
              ></span>
              <span style={{ color: "#FCA5A5" }}>삭제/변경</span>
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  backgroundColor: "rgba(52,211,153,0.2)",
                  border: "1px solid rgba(52,211,153,0.3)",
                }}
              ></span>
              <span style={{ color: "#6EE7B7" }}>추가/변경</span>
            </span>
          </div>
          <span style={{ fontSize: 10, color: "#6B7280" }}>
            {leftLines.length}줄 vs {rightLines.length}줄
          </span>
        </div>
      </ModalBox>
    </Overlay>
  );
}

/* ══════════════════════════════════════════════════════
   5. KEYBOARD SHORTCUTS MODAL
   ══════════════════════════════════════════════════════ */
function ShortcutsModal({ onClose }) {
  const groups = [
    {
      title: "일반",
      shortcuts: [
        ["Ctrl + K", "검색 열기"],
        ["Ctrl + /", "단축키 도움말"],
        ["Ctrl + B", "사이드바 토글"],
        ["Ctrl + ,", "설정 열기"],
        ["Escape", "모달 닫기"],
      ],
    },
    {
      title: "채팅",
      shortcuts: [
        ["Enter", "메시지 전송"],
        ["Shift + Enter", "줄바꿈"],
        ["Ctrl + Shift + S", "KillSwitch (즉시 중단)"],
        ["Ctrl + Z", "Revert (되돌리기)"],
        ["Ctrl + U", "파일 업로드"],
      ],
    },
    {
      title: "모드 전환",
      shortcuts: [
        ["Alt + 1", "배치 모드"],
        ["Alt + 2", "동시 모드"],
        ["Alt + 3", "토론 모드"],
        ["Alt + 4", "개발 모드"],
        ["Alt + 5", "자동 모드"],
      ],
    },
  ];
  return (
    <Overlay onClose={onClose}>
      <ModalBox width={520} maxH="70vh">
        <ModalHeader title="키보드 단축키" desc="사용 가능한 단축키 목록" onClose={onClose} />
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {groups.map((g) => (
            <div key={g.title}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                {g.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {g.shortcuts.map(([key, desc]) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: 8,
                      backgroundColor: C.deepBg,
                      border: `1px solid ${C.borderDeep}`,
                    }}
                  >
                    <span style={{ fontSize: 12, color: "#D1D5DB" }}>{desc}</span>
                    <div style={{ display: "flex", gap: 4 }}>
                      {key.split(" + ").map((k) => (
                        <span
                          key={k}
                          style={{
                            padding: "3px 8px",
                            borderRadius: 6,
                            backgroundColor: C.cardBg,
                            border: `1px solid ${C.borderLight}`,
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#E5E7EB",
                            fontFamily: "'JetBrains Mono',monospace",
                            minWidth: 28,
                            textAlign: "center",
                          }}
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ModalBox>
    </Overlay>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════ */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(true); // start logged in for demo, false for login page
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [codingOpen, setCodingOpen] = useState(true);
  const [docOpen, setDocOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState(1);
  const [showRepoModal, setShowRepoModal] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(REPOS[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [showRepoManage, setShowRepoManage] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showPipeline, setShowPipeline] = useState(false);
  const [showRepoDetail, setShowRepoDetail] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showAllNotifs, setShowAllNotifs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const [presets, setPresets] = useState(INITIAL_PRESETS);
  const [presetOpen, setPresetOpen] = useState(false);
  const [chatMenu, setChatMenu] = useState(null);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [mode, setMode] = useState("batch");
  const [models, setModels] = useState({ opus: true, gpt: true, gemini: true });
  const [pr, setPr] = useState(false);
  const [discussionRounds, setDiscussionRounds] = useState(10);
  const [text, setText] = useState("");
  const [running, setRunning] = useState(false);
  const [runPhase, setRunPhase] = useState(null); // which demo mode is running
  const [stopAct, setStopAct] = useState("kill");
  const [msgs, setMsgs] = useState([]);
  const chatEnd = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);
  /* Keyboard shortcuts: Ctrl+K search, Ctrl+/ shortcuts, Ctrl+B sidebar, Ctrl+, settings */
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.ctrlKey && e.key === "/") {
        e.preventDefault();
        setShowShortcuts(true);
      }
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        setSidebarOpen((p) => !p);
      }
      if (e.ctrlKey && e.key === ",") {
        e.preventDefault();
        setShowSettings(true);
      }
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowShortcuts(false);
        setShowDiff(false);
        setShowNotif(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  /* File attachment handler */
  const MAX_FILE_SIZE = 10 * 1024 * 1024; /* 10MB */
  const [fileError, setFileError] = useState(null);
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []).filter((f) => {
      if (f.size > MAX_FILE_SIZE) {
        setFileError(`파일 "${f.name}" — 10MB 초과 (${(f.size / 1024 / 1024).toFixed(1)}MB)`);
        setTimeout(() => setFileError(null), 3000);
        return false;
      }
      return true;
    });
    const newAttachments = files.map((f) => ({
      id: Date.now() + Math.random(),
      name: f.name,
      size: (f.size / 1024).toFixed(1) + "KB",
      type: f.type.startsWith("image/") ? "image" : "text",
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
    }));
    setAttachments((p) => [...p, ...newAttachments]);
    e.target.value = "";
  };
  const removeAttachment = (id) => setAttachments((p) => p.filter((a) => a.id !== id));

  /* Show login page if not logged in */
  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />;

  const chats = [
    { id: 1, title: "GitHub OAuth 구현", m: "자동", t: "방금" },
    { id: 2, title: "DB 스키마 리팩토링", m: "토론", t: "2시간 전" },
    { id: 3, title: "API 엔드포인트 추가", m: "배치", t: "어제" },
  ];
  const docChats = [{ id: 101, title: "API 문서 생성", m: "검색", t: "3시간 전" }];
  const newChat = () => {
    setMsgs([]);
    setRunPhase(null);
    setRunning(false);
    setText("");
    setShowRepoModal(true);
  };
  const selectPreset = (p) => {
    setText(p.msg);
    setMode(p.mode);
    setPr(PR_MODES.includes(p.mode) ? p.pr : false);
    setPresetOpen(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };
  const toggleModel = (k) => setModels((p) => ({ ...p, [k]: !p[k] }));
  const changeMode = (m) => {
    setMode(m);
    if (!PR_MODES.includes(m)) setPr(false);
  };

  const send = () => {
    if (!text.trim()) return;
    setMsgs((p) => [...p, { role: "user", content: text }]);
    // Check if message contains scheduling keywords
    const schedulePattern =
      /(\d{1,2}시|\d{1,2}:\d{2}|오전|오후|내일|모레|다음주|월요일|화요일|수요일|목요일|금요일)/;
    const prPattern = /PR\s*#?\d+|pr\s*#?\d+/i;
    const isSchedule =
      schedulePattern.test(text) &&
      (prPattern.test(text) ||
        text.includes("수정") ||
        text.includes("검토") ||
        text.includes("분석"));

    if (isSchedule) {
      const prMatch = text.match(/PR\s*#?(\d+)/i);
      const timeMatch = text.match(/(오늘|내일|모레)?\s*(오전|오후)?\s*(\d{1,2})\s*시/);
      setText("");
      setRunning(true);
      setTimeout(() => {
        setMsgs((p) => [
          ...p,
          {
            role: "schedule",
            content: text,
            prNum: prMatch ? `#${prMatch[1]}` : null,
            timeLabel: timeMatch
              ? `${timeMatch[1] || "오늘"} ${timeMatch[2] || ""} ${timeMatch[3]}시`.trim()
              : "예약 시간",
            action: text,
          },
        ]);
        setRunning(false);
      }, 600);
      return;
    }

    setText("");
    setRunning(true);
    setRunPhase(mode);
    // For batch mode, simulate normal messages
    if (mode === "batch") {
      const active = Object.entries(models)
        .filter(([, v]) => v)
        .map(([k]) => k);
      setTimeout(() => {
        active.forEach((md, i) => {
          setTimeout(
            () => {
              const r = {
                gpt: "코드를 분석했습니다. auth/router.py에서 state 파라미터 검증이 누락되어 있습니다.",
                opus: "보안 관점에서 분석:\n1. OAuth state 검증 누락 (Critical)\n2. AES-256-GCM 암호화 필요",
                gemini: "12개 파일 분석 결과, middleware.py 로직 재사용 시 중복 75% 절감 가능",
              };
              setMsgs((p) => [
                ...p,
                { role: "assistant", model: md, content: r[md] || "응답 완료" },
              ]);
              if (i === active.length - 1)
                setTimeout(() => {
                  setRunning(false);
                  setRunPhase(null);
                }, 500);
            },
            i * 800 + 500
          );
        });
      }, 300);
    } else {
      // For other modes, show the mode-specific view after a brief delay
      setTimeout(() => {
        setRunning(false);
      }, 800);
    }
  };
  const [showStopConfirm, setShowStopConfirm] = useState(false);
  const doStop = () => {
    setRunning(false);
    setRunPhase(null);
    setShowStopConfirm(false);
    setMsgs((p) => [
      ...p,
      {
        role: "system",
        content: stopAct === "kill" ? "⛔ 작업이 중단되었습니다." : "↩️ 변경사항이 되돌려졌습니다.",
      },
    ]);
  };
  const stop = () => {
    if (stopAct === "revert") setShowStopConfirm(true);
    else doStop();
  };

  // Determine which chat view to render based on mode after send
  const showModeView = !running && runPhase && runPhase !== "batch";

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        backgroundColor: C.pageBg,
        color: "#F3F4F6",
        overflow: "hidden",
        fontFamily: "'Noto Sans KR',-apple-system,sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');
        @keyframes fadeIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}.animate-fadeIn{animation:fadeIn .25s ease-out}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @media(max-width:768px){.sidebar-desktop{position:fixed!important;z-index:150!important;height:100vh!important;transition:transform .2s!important}.sidebar-hidden{transform:translateX(-100%)!important}.mobile-menu-btn{display:flex!important}.modal-responsive{width:95vw!important;max-width:95vw!important}}
        .mobile-menu-btn{display:none}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#2A2E40;border-radius:4px}textarea{resize:none}select{cursor:pointer}`}</style>

      {/* ── Modals ── */}
      {showRepoModal && (
        <Overlay onClose={() => setShowRepoModal(false)}>
          <ModalBox width={520} maxH="70vh">
            <ModalHeader
              title="레포지토리 선택"
              desc="작업할 레포를 선택하세요"
              onClose={() => setShowRepoModal(false)}
            />
            <div
              style={{
                padding: 12,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                overflowY: "auto",
                maxHeight: 300,
              }}
            >
              {REPOS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRepo(r);
                    setShowRepoModal(false);
                    setMsgs([]);
                    setRunPhase(null);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: 14,
                    borderRadius: 12,
                    border: "1px solid transparent",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    color: "inherit",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: "#60A5FA" }}>
                      <I.Repo />
                    </span>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{r.name}</span>
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 6px",
                          borderRadius: 4,
                          backgroundColor: "#1E2030",
                          color: "#9CA3AF",
                          fontFamily: "monospace",
                        }}
                      >
                        {r.lang}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                      <span style={{ fontSize: 10, color: "#6B7280" }}>{r.full}</span>
                      <span style={{ fontSize: 10, color: "#6B7280" }}>
                        <I.Branch /> {r.br}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ModalBox>
        </Overlay>
      )}
      {showSettings && (
        <SettingsPage
          presets={presets}
          setPresets={setPresets}
          onClose={() => setShowSettings(false)}
        />
      )}
      {showRepoManage && <RepoManagePage onClose={() => setShowRepoManage(false)} />}
      {showDashboard && <DashboardPage onClose={() => setShowDashboard(false)} />}
      {showPipeline && <PipelineView onClose={() => setShowPipeline(false)} />}
      {showRepoDetail && <RepoDetailView onClose={() => setShowRepoDetail(false)} />}
      {showSchedule && <ScheduleManagePage onClose={() => setShowSchedule(false)} />}
      {showStopConfirm && (
        <Overlay onClose={() => setShowStopConfirm(false)}>
          <div
            style={{
              padding: 24,
              backgroundColor: C.modalBg,
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: 16,
              width: 380,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 8 }}>⚠️</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
              정말 되돌릴까요?
            </div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 16, lineHeight: 1.5 }}>
              현재 작업의 모든 변경사항이 되돌려집니다.
              <br />이 작업은 취소할 수 없습니다.
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button
                onClick={() => setShowStopConfirm(false)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 10,
                  border: `1px solid ${C.border}`,
                  backgroundColor: C.inputBg,
                  color: "#D1D5DB",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                취소
              </button>
              <button
                onClick={doStop}
                style={{
                  padding: "8px 20px",
                  borderRadius: 10,
                  border: "1px solid rgba(248,113,113,0.3)",
                  backgroundColor: "rgba(239,68,68,0.15)",
                  color: "#FCA5A5",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                되돌리기
              </button>
            </div>
          </div>
        </Overlay>
      )}
      {showAllNotifs && (
        <Overlay onClose={() => setShowAllNotifs(false)}>
          <ModalBox width={560} maxH="75vh">
            <ModalHeader
              title="전체 알림"
              desc="모든 알림을 확인합니다"
              onClose={() => setShowAllNotifs(false)}
            />
            <div style={{ flex: 1, overflowY: "auto" }}>
              {SAMPLE_NOTIFS.map((n) => (
                <div
                  key={n.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "12px 18px",
                    borderBottom: `1px solid ${C.borderDeep}`,
                    backgroundColor: n.read ? "transparent" : "rgba(59,130,246,0.03)",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: `${n.color}15`,
                      border: `1px solid ${n.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      flexShrink: 0,
                      color: n.color,
                    }}
                  >
                    {{ schedule: "⏳", pipeline: "⚡", error: "✗", pr: "⎇" }[n.type]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: n.read ? "#9CA3AF" : "#fff",
                        }}
                      >
                        {n.title}
                      </span>
                      {!n.read && (
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            backgroundColor: "#3B82F6",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ fontSize: 11, color: "#6B7280", marginTop: 3 }}>{n.desc}</div>
                    <div style={{ fontSize: 10, color: "#4B5563", marginTop: 4 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </ModalBox>
        </Overlay>
      )}
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}
      {showDiff && <DiffCompareView onClose={() => setShowDiff(false)} />}
      {showShortcuts && <ShortcutsModal onClose={() => setShowShortcuts(false)} />}

      {/* ═══ SIDEBAR ═══ */}
      {sidebarOpen && (
        <div
          style={{
            width: 240,
            backgroundColor: C.sidebarBg,
            borderRight: `1px solid ${C.borderLight}`,
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: 12, borderBottom: `1px solid ${C.borderLight}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg,#3B82F6,#7C3AED)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <I.Layers />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Multi AI Dev</div>
                <div style={{ fontSize: 10, color: "#6B7280" }}>v0.1.0</div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 6px" }}>
            {/* 코딩모드 */}
            <div style={{ marginBottom: 4 }}>
              <button
                onClick={() => setCodingOpen(!codingOpen)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "#E5E7EB",
                }}
              >
                <span
                  style={{
                    transform: codingOpen ? "rotate(90deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                  }}
                >
                  <I.Right />
                </span>
                <span style={{ color: "#60A5FA" }}>
                  <I.Code />
                </span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>코딩모드</span>
              </button>
              {codingOpen && (
                <div style={{ marginLeft: 8, marginRight: 4 }}>
                  <button
                    onClick={() => setShowRepoModal(true)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      color: "#60A5FA",
                      fontSize: 12,
                      marginBottom: 2,
                    }}
                  >
                    <I.Plus />
                    <span style={{ color: "#9CA3AF", fontWeight: 500 }}>새 대화</span>
                  </button>
                  {chats.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveChatId(c.id)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        backgroundColor:
                          activeChatId === c.id ? "rgba(255,255,255,0.08)" : "transparent",
                        color: activeChatId === c.id ? "#fff" : "#9CA3AF",
                      }}
                    >
                      <I.Chat />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {c.title}
                        </div>
                        <div style={{ fontSize: 10, color: "#6B7280" }}>
                          {c.m} · {c.t}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* 문서작성 */}
            <div style={{ marginBottom: 4 }}>
              <button
                onClick={() => setDocOpen(!docOpen)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "#E5E7EB",
                }}
              >
                <span
                  style={{
                    transform: docOpen ? "rotate(90deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                  }}
                >
                  <I.Right />
                </span>
                <span style={{ color: "#A78BFA" }}>
                  <I.Doc />
                </span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>문서작성 / 검색</span>
              </button>
              {docOpen && (
                <div style={{ marginLeft: 8, marginRight: 4 }}>
                  <button
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 12px",
                      borderRadius: 8,
                      border: "none",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      color: "#A78BFA",
                      fontSize: 12,
                    }}
                  >
                    <I.Plus />
                    <span style={{ color: "#9CA3AF", fontWeight: 500 }}>새 대화</span>
                  </button>
                  {docChats.map((c) => (
                    <button
                      key={c.id}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 12px",
                        borderRadius: 8,
                        border: "none",
                        textAlign: "left",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        color: "#9CA3AF",
                      }}
                    >
                      <I.Chat />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 500 }}>{c.title}</div>
                        <div style={{ fontSize: 10, color: "#6B7280" }}>
                          {c.m} · {c.t}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Bottom nav */}
          <div
            style={{
              padding: "6px 8px",
              borderTop: `1px solid ${C.borderLight}`,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {[
              ["레포 관리", <I.Git />, () => setShowRepoManage(true)],
              ["레포 상세", <I.Repo />, () => setShowRepoDetail(true)],
              ["예약 관리", <I.Clock />, () => setShowSchedule(true)],
              ["파이프라인", <I.Play />, () => setShowPipeline(true)],
              ["대시보드", <I.Dash />, () => setShowDashboard(true)],
              ["설정", <I.Settings />, () => setShowSettings(true)],
            ].map(([l, icon, fn]) => (
              <button
                key={l}
                onClick={fn}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#9CA3AF",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                {icon}
                <span>{l}</span>
              </button>
            ))}
          </div>
          <div
            style={{
              padding: "10px 12px",
              borderTop: `1px solid ${C.borderLight}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#6B7280,#4B5563)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              U
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: "#D1D5DB", fontWeight: 500 }}>user@github.com</div>
            </div>
            <span
              style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399" }}
            ></span>
          </div>
        </div>
      )}

      {/* ═══ MAIN AREA ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "10px 12px",
            borderBottom: `1px solid ${C.borderLight}`,
            backgroundColor: C.sidebarBg,
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: 4,
              border: "none",
              backgroundColor: "transparent",
              color: "#9CA3AF",
              cursor: "pointer",
            }}
          >
            <I.Menu />
          </button>
          <button
            onClick={() => setShowRepoModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 8,
              backgroundColor: C.inputBg,
              border: `1px solid ${C.border}`,
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <span style={{ color: "#60A5FA" }}>
              <I.Repo />
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
              {selectedRepo.name}
            </span>
            <span
              style={{
                fontSize: 10,
                padding: "2px 6px",
                borderRadius: 4,
                backgroundColor: "#1E2235",
                color: "#9CA3AF",
                fontFamily: "monospace",
              }}
            >
              <I.Branch /> {selectedRepo.br}
            </span>
            <I.Down />
          </button>
          <span style={{ color: "#374151" }}>·</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#E5E7EB" }}>GitHub OAuth 구현</span>
          {showModeView && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 6,
                backgroundColor: "rgba(59,130,246,0.15)",
                color: "#93C5FD",
                border: "1px solid rgba(96,165,250,0.2)",
                marginLeft: 8,
              }}
            >
              {MODES.find((m) => m.id === runPhase)?.l} 모드 결과
            </span>
          )}
          {/* Diff button (visible after concurrent mode) */}
          {runPhase === "concurrent" && (
            <button
              onClick={() => setShowDiff(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 10px",
                borderRadius: 6,
                border: `1px solid ${C.border}`,
                backgroundColor: C.inputBg,
                color: "#9CA3AF",
                fontSize: 10,
                cursor: "pointer",
                fontWeight: 600,
                marginLeft: 4,
              }}
              title="모델 Diff 비교"
            >
              <I.Diff />
              <span>Diff</span>
            </button>
          )}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              style={{
                padding: 6,
                borderRadius: 8,
                border: "none",
                backgroundColor: "transparent",
                color: "#6B7280",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
              title="검색 (Ctrl+K)"
            >
              <I.Search />
              <span
                style={{
                  fontSize: 10,
                  padding: "2px 6px",
                  borderRadius: 4,
                  backgroundColor: C.inputBg,
                  color: "#4B5563",
                  fontFamily: "monospace",
                }}
              >
                ⌘K
              </span>
            </button>
            {/* Shortcuts */}
            <button
              onClick={() => setShowShortcuts(true)}
              style={{
                padding: 6,
                borderRadius: 8,
                border: "none",
                backgroundColor: "transparent",
                color: "#6B7280",
                cursor: "pointer",
              }}
              title="단축키 (Ctrl+/)"
            >
              <I.Kbd />
            </button>
            {/* Notification bell */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowNotif(!showNotif)}
                style={{
                  padding: 6,
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: showNotif ? "rgba(255,255,255,0.08)" : "transparent",
                  color: showNotif ? "#fff" : "#6B7280",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <I.Bell />
                {/* Unread badge */}
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#EF4444",
                    border: "2px solid " + C.sidebarBg,
                  }}
                ></span>
              </button>
              {showNotif && (
                <NotificationPanel
                  onClose={() => setShowNotif(false)}
                  onShowAll={() => setShowAllNotifs(true)}
                />
              )}
            </div>
            <span style={{ width: 1, height: 16, backgroundColor: C.borderDeep }}></span>
            {/* Model status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 10px",
                borderRadius: 8,
                backgroundColor: C.inputBg,
                border: `1px solid ${C.border}`,
              }}
            >
              {Object.entries(M).map(([k, m]) => (
                <div
                  key={k}
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                  title={m.name}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: models[k] ? "#34D399" : "#4B5563",
                    }}
                  ></span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: models[k] ? "#E5E7EB" : "#6B7280",
                    }}
                  >
                    {m.s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat / Mode-specific view */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {showModeView ? (
            // Render mode-specific view
            runPhase === "concurrent" ? (
              <ConcurrentView onBack={() => setRunPhase(null)} />
            ) : runPhase === "discussion" ? (
              <DiscussionView onBack={() => setRunPhase(null)} />
            ) : runPhase === "dev" ? (
              <DevModeView onBack={() => setRunPhase(null)} />
            ) : runPhase === "auto" ? (
              <AutoModeView onBack={() => setRunPhase(null)} />
            ) : null
          ) : (
            // Normal chat messages
            <div style={{ padding: 16 }}>
              {msgs.length === 0 ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 300,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background:
                        "linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))",
                      border: "1px solid rgba(59,130,246,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <I.Layers />
                  </div>
                  <div style={{ fontSize: 15, color: "#D1D5DB", fontWeight: 600, marginBottom: 4 }}>
                    Multi AI 코딩 플랫폼
                  </div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 16 }}>
                    모드를 선택하고 프롬프트를 입력하세요
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 16px",
                      borderRadius: 12,
                      backgroundColor: C.inputBg,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <span style={{ color: "#60A5FA" }}>
                      <I.Repo />
                    </span>
                    <span style={{ fontSize: 12, color: "#E5E7EB", fontWeight: 500 }}>
                      {selectedRepo.full}
                    </span>
                    <span style={{ fontSize: 10, color: "#9CA3AF", fontFamily: "monospace" }}>
                      <I.Branch /> {selectedRepo.br}
                    </span>
                  </div>
                </div>
              ) : (
                msgs.map((msg, i) =>
                  msg.role === "system" ? (
                    <div
                      key={i}
                      style={{ textAlign: "center", margin: "12px 0" }}
                      className="animate-fadeIn"
                    >
                      <span
                        style={{
                          fontSize: 12,
                          padding: "6px 16px",
                          borderRadius: 99,
                          backgroundColor: "#1A1D2E",
                          color: "#D1D5DB",
                          fontWeight: 500,
                          display: "inline-block",
                        }}
                      >
                        {msg.content}
                      </span>
                    </div>
                  ) : msg.role === "schedule" ? (
                    /* ── Schedule confirmation card ── */
                    <div
                      key={i}
                      className="animate-fadeIn"
                      style={{
                        maxWidth: 480,
                        margin: "12px auto",
                        borderRadius: 14,
                        overflow: "hidden",
                        border: "1px solid rgba(251,191,36,0.25)",
                        backgroundColor: "rgba(251,191,36,0.04)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "10px 16px",
                          borderBottom: "1px solid rgba(251,191,36,0.15)",
                          backgroundColor: "rgba(251,191,36,0.06)",
                        }}
                      >
                        <I.Clock />
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#FDE68A" }}>
                          예약이 등록되었습니다
                        </span>
                      </div>
                      <div
                        style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#FDE68A",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <I.Calendar /> {msg.timeLabel}
                          </span>
                          {msg.prNum && (
                            <span
                              style={{
                                fontSize: 11,
                                padding: "2px 8px",
                                borderRadius: 6,
                                backgroundColor: "rgba(59,130,246,0.15)",
                                color: "#93C5FD",
                                fontWeight: 700,
                              }}
                            >
                              PR {msg.prNum}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 12, color: "#E5E7EB", lineHeight: 1.5 }}>
                          {msg.action}
                        </div>
                        <div
                          style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}
                        >
                          <span style={{ fontSize: 10, color: "#6B7280" }}>실행 모드:</span>
                          <span
                            style={{
                              fontSize: 10,
                              padding: "2px 8px",
                              borderRadius: 6,
                              backgroundColor: C.inputBg,
                              color: "#D1D5DB",
                              fontWeight: 600,
                            }}
                          >
                            자동 모드
                          </span>
                          <span style={{ fontSize: 10, color: "#6B7280", marginLeft: 8 }}>
                            모델:
                          </span>
                          {["opus", "gpt", "gemini"].map((k) => (
                            <ModelBadge key={k} k={k} small />
                          ))}
                        </div>
                        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                          {["토론", "코드 병합", "PR 수정", "PR 닫기"].map((step, si, arr) => (
                            <div key={si} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span
                                style={{
                                  fontSize: 10,
                                  padding: "2px 6px",
                                  borderRadius: 4,
                                  backgroundColor: C.deepBg,
                                  border: `1px solid ${C.borderDeep}`,
                                  color: "#9CA3AF",
                                }}
                              >
                                {step}
                              </span>
                              {si < arr.length - 1 && (
                                <span style={{ color: "#374151", fontSize: 9 }}>→</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          padding: "8px 14px",
                          borderTop: "1px solid rgba(251,191,36,0.1)",
                          backgroundColor: "rgba(251,191,36,0.02)",
                        }}
                      >
                        <button
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 10,
                            border: `1px solid ${C.border}`,
                            backgroundColor: C.inputBg,
                            color: "#D1D5DB",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          수정
                        </button>
                        <button
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 10,
                            border: "1px solid rgba(248,113,113,0.2)",
                            backgroundColor: "rgba(239,68,68,0.06)",
                            color: "#FCA5A5",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          취소
                        </button>
                        <button
                          onClick={() => setShowSchedule(true)}
                          style={{
                            padding: "4px 10px",
                            borderRadius: 6,
                            fontSize: 10,
                            border: `1px solid ${C.border}`,
                            backgroundColor: C.inputBg,
                            color: "#9CA3AF",
                            cursor: "pointer",
                            fontWeight: 500,
                            marginLeft: "auto",
                          }}
                        >
                          예약 목록 보기
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        marginBottom: 14,
                        flexDirection: msg.role === "user" ? "row-reverse" : "row",
                      }}
                      className="animate-fadeIn"
                    >
                      {msg.role !== "user" && M[msg.model] && <ModelBadge k={msg.model} />}
                      {msg.role === "user" && (
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "rgba(37,99,235,0.2)",
                            border: "1px solid rgba(59,130,246,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#93C5FD",
                            flexShrink: 0,
                          }}
                        >
                          U
                        </div>
                      )}
                      <div style={{ maxWidth: "75%" }}>
                        {msg.role !== "user" && M[msg.model] && (
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              marginBottom: 4,
                              marginLeft: 4,
                              color: M[msg.model].c,
                            }}
                          >
                            {M[msg.model].name}
                          </div>
                        )}
                        <div
                          style={{
                            borderRadius: 16,
                            padding: "12px 16px",
                            fontSize: 13,
                            lineHeight: 1.7,
                            whiteSpace: "pre-wrap",
                            backgroundColor: msg.role === "user" ? "#2563EB" : "#1A1D2E",
                            color: "#fff",
                            border: msg.role === "user" ? "none" : `1px solid ${C.borderDeep}`,
                            borderTopRightRadius: msg.role === "user" ? 6 : 16,
                            borderTopLeftRadius: msg.role === "user" ? 16 : 6,
                          }}
                        >
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
              <div ref={chatEnd} />
            </div>
          )}
        </div>

        {/* File size error toast */}
        {fileError && (
          <div
            style={{
              position: "absolute",
              bottom: 140,
              left: "50%",
              transform: "translateX(-50%)",
              padding: "8px 16px",
              borderRadius: 10,
              backgroundColor: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(248,113,113,0.3)",
              color: "#FCA5A5",
              fontSize: 11,
              fontWeight: 600,
              zIndex: 30,
              whiteSpace: "nowrap",
            }}
          >
            {fileError}
          </div>
        )}
        {/* Input Area */}
        <div style={{ borderTop: `1px solid ${C.borderLight}`, backgroundColor: C.sidebarBg }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 16px 4px" }}>
            <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500, marginRight: 4 }}>
              모델 :
            </span>
            {Object.keys(M).map((k) => (
              <label
                key={k}
                onClick={() => toggleModel(k)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                  userSelect: "none",
                  border: models[k] ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                  backgroundColor: models[k] ? "rgba(255,255,255,0.08)" : "transparent",
                  opacity: models[k] ? 1 : 0.6,
                }}
              >
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 4,
                    border: models[k] ? "none" : "2px solid #6B7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: models[k] ? M[k].c : "transparent",
                  }}
                >
                  {models[k] && (
                    <span style={{ color: "#000" }}>
                      <I.Chk />
                    </span>
                  )}
                </div>
                <I.Dot c={M[k].c} />
                <span
                  style={{ fontSize: 12, fontWeight: 600, color: models[k] ? M[k].c : "#9CA3AF" }}
                >
                  {M[k].s}
                </span>
                <span style={{ fontSize: 10, color: "#9CA3AF" }}>({M[k].r})</span>
              </label>
            ))}
          </div>
          <div style={{ padding: "8px 16px" }}>
            {/* File attachment preview */}
            {attachments.length > 0 && (
              <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                {attachments.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 10px",
                      borderRadius: 8,
                      backgroundColor: C.deepBg,
                      border: `1px solid ${C.borderDeep}`,
                    }}
                  >
                    {a.type === "image" ? <I.Img /> : <I.Doc />}
                    <div style={{ maxWidth: 120 }}>
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#D1D5DB",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {a.name}
                      </div>
                      <div style={{ fontSize: 9, color: "#4B5563" }}>{a.size}</div>
                    </div>
                    {a.preview && (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 4,
                          backgroundImage: `url(${a.preview})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          border: `1px solid ${C.borderDeep}`,
                        }}
                      ></div>
                    )}
                    <button
                      onClick={() => removeAttachment(a.id)}
                      style={{
                        padding: 2,
                        border: "none",
                        backgroundColor: "transparent",
                        color: "#6B7280",
                        cursor: "pointer",
                        display: "flex",
                      }}
                    >
                      <I.X />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 10,
                backgroundColor: C.inputBg,
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                padding: 10,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                <select
                  value={mode}
                  onChange={(e) => changeMode(e.target.value)}
                  style={{
                    backgroundColor: "#1E2235",
                    fontSize: 12,
                    color: "#E5E7EB",
                    borderRadius: 8,
                    padding: "8px 28px 8px 10px",
                    border: "1px solid #2A2E40",
                    outline: "none",
                    fontWeight: 500,
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 8px center",
                  }}
                >
                  {MODES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.l}
                    </option>
                  ))}
                </select>
                {mode === "discussion" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 6px" }}>
                    <span style={{ fontSize: 10, color: "#9CA3AF" }}>라운드:</span>
                    <select
                      value={discussionRounds}
                      onChange={(e) => setDiscussionRounds(Number(e.target.value))}
                      style={{
                        backgroundColor: "#1E2235",
                        fontSize: 11,
                        color: "#E5E7EB",
                        borderRadius: 6,
                        padding: "4px 8px",
                        border: "1px solid #2A2E40",
                        outline: "none",
                      }}
                    >
                      {[3, 5, 7, 10, 15, 20].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {PR_MODES.includes(mode) && (
                  <label
                    onClick={() => setPr(!pr)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "0 6px",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 4,
                        border: pr ? "none" : "2px solid #6B7280",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: pr ? "#3B82F6" : "transparent",
                      }}
                    >
                      {pr && (
                        <span style={{ color: "#fff" }}>
                          <I.Chk />
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: 11, color: "#D1D5DB", fontWeight: 500 }}>PR 생성</span>
                  </label>
                )}
              </div>
              {/* File upload button */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png,image/jpeg,text/plain,.json,.log"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  border: "none",
                  backgroundColor: "transparent",
                  color: "#6B7280",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                }}
                title="파일 첨부 (Ctrl+U)"
              >
                <I.Attach />
              </button>
              <textarea
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    running ? stop() : send();
                  }
                }}
                placeholder="메시지를 입력하세요..."
                rows={1}
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  fontSize: 14,
                  color: "#fff",
                  outline: "none",
                  border: "none",
                  minHeight: 40,
                  maxHeight: 120,
                  padding: "8px 0",
                  lineHeight: 1.6,
                  fontFamily: "inherit",
                  resize: "none",
                }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }}
              />
              {running ? (
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <select
                    value={stopAct}
                    onChange={(e) => setStopAct(e.target.value)}
                    style={{
                      backgroundColor: "rgba(239,68,68,0.15)",
                      fontSize: 10,
                      color: "#FCA5A5",
                      borderRadius: 8,
                      padding: 6,
                      border: "1px solid rgba(248,113,113,0.3)",
                      outline: "none",
                      fontWeight: 700,
                      appearance: "none",
                    }}
                  >
                    <option value="kill">Kill</option>
                    <option value="revert">Revert</option>
                  </select>
                  <button
                    onClick={stop}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: "rgba(239,68,68,0.2)",
                      border: "1px solid rgba(248,113,113,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FCA5A5",
                      cursor: "pointer",
                    }}
                  >
                    <I.Stop />
                  </button>
                </div>
              ) : (
                <button
                  onClick={send}
                  disabled={!text.trim()}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "none",
                    cursor: text.trim() ? "pointer" : "not-allowed",
                    backgroundColor: text.trim() ? "#2563EB" : "#1E2235",
                    color: text.trim() ? "#fff" : "#4B5563",
                  }}
                >
                  <I.Send />
                </button>
              )}
            </div>
          </div>
          <div style={{ padding: "0 16px 12px", position: "relative" }}>
            <button
              onClick={() => setPresetOpen(!presetOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "#9CA3AF",
                padding: "4px 6px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              <I.Bkmk />
              <span>자주 쓰는 메시지</span>
              <span
                style={{
                  transform: presetOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.2s",
                }}
              >
                <I.Down />
              </span>
            </button>
            {presetOpen && (
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: 16,
                  marginBottom: 6,
                  width: 460,
                  backgroundColor: C.inputBg,
                  border: `1px solid #2A2E40`,
                  borderRadius: 12,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                  overflow: "hidden",
                  zIndex: 50,
                }}
                className="animate-fadeIn"
              >
                <div style={{ padding: 8 }}>
                  {presets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => selectPreset(p)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "none",
                        textAlign: "left",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "inherit",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: "#E5E7EB", fontWeight: 500 }}>
                          {p.name}
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                          <span
                            style={{
                              fontSize: 10,
                              padding: "2px 8px",
                              borderRadius: 6,
                              backgroundColor: "#1E2235",
                              color: "#D1D5DB",
                              fontWeight: 700,
                            }}
                          >
                            {MODES.find((m) => m.id === p.mode)?.l}
                          </span>
                          {p.pr && (
                            <span
                              style={{
                                fontSize: 10,
                                padding: "2px 8px",
                                borderRadius: 6,
                                backgroundColor: "rgba(59,130,246,0.15)",
                                color: "#93C5FD",
                                fontWeight: 700,
                              }}
                            >
                              PR
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
