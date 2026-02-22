import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("'안녕하세요'를 렌더링한다", () => {
    render(<App />);
    expect(screen.getByText("안녕하세요")).toBeInTheDocument();
  });

  it("스냅샷과 일치한다", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
