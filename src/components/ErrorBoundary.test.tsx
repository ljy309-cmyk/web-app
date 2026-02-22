import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "./ErrorBoundary";

function ProblemChild(): React.ReactNode {
  throw new Error("Test error");
}

describe("ErrorBoundary", () => {
  it("자식 컴포넌트를 정상 렌더링한다", () => {
    render(
      <ErrorBoundary>
        <p>정상 콘텐츠</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("정상 콘텐츠")).toBeInTheDocument();
  });

  it("에러 발생 시 폴백 UI를 표시한다", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("문제가 발생했습니다")).toBeInTheDocument();
    expect(screen.getByText(/페이지를 새로고침해 주세요/)).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it("새로고침 버튼이 존재한다", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByRole("button", { name: "새로고침" })).toBeInTheDocument();

    vi.restoreAllMocks();
  });

  it("새로고침 버튼 클릭 시 window.location.reload를 호출한다", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      value: { ...window.location, reload: reloadMock },
      writable: true,
    });

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "새로고침" }));
    expect(reloadMock).toHaveBeenCalledOnce();

    vi.restoreAllMocks();
  });

  it("프로덕션 환경에서는 console.error를 호출하지 않는다", () => {
    const originalDev = import.meta.env.DEV;
    import.meta.env.DEV = false;
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("ErrorBoundary caught:"),
      expect.anything(),
      expect.anything()
    );

    import.meta.env.DEV = originalDev;
    vi.restoreAllMocks();
  });

  it("에러 상태 스냅샷과 일치한다", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const { container } = render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(container).toMatchSnapshot();

    vi.restoreAllMocks();
  });
});
