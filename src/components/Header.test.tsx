import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("타이틀 'Web App'을 렌더링한다", () => {
    render(<Header />);
    expect(screen.getByText("Web App")).toBeInTheDocument();
  });

  it("부제목 '실시간 실험 대시보드'를 렌더링한다", () => {
    render(<Header />);
    expect(screen.getByText("실시간 실험 대시보드")).toBeInTheDocument();
  });

  it("header 요소를 포함한다", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("h1 제목 요소를 포함한다", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Web App");
  });

  it("스냅샷과 일치한다", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
