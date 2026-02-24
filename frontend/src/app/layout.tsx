import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web App - 실시간 실험 대시보드",
  description: "초전도체 실시간 실험 대시보드",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
