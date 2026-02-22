import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Recharts mock (ExperimentChart에서 사용)
vi.mock("recharts", () => {
  const MockResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  );
  const MockLineChart = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  );
  const MockLine = ({ dataKey }: { dataKey: string }) => (
    <div data-testid={`line-${dataKey}`} />
  );
  const MockXAxis = () => <div data-testid="x-axis" />;
  const MockYAxis = () => <div data-testid="y-axis" />;
  const MockCartesianGrid = () => <div data-testid="cartesian-grid" />;
  const MockTooltip = () => <div data-testid="tooltip" />;
  const MockLegend = () => <div data-testid="legend" />;

  return {
    ResponsiveContainer: MockResponsiveContainer,
    LineChart: MockLineChart,
    Line: MockLine,
    XAxis: MockXAxis,
    YAxis: MockYAxis,
    CartesianGrid: MockCartesianGrid,
    Tooltip: MockTooltip,
    Legend: MockLegend,
  };
});

describe("App", () => {
  it("Header를 렌더링한다", () => {
    render(<App />);
    expect(screen.getByText("Web App")).toBeInTheDocument();
  });

  it("ExperimentChart를 렌더링한다", () => {
    render(<App />);
    expect(screen.getByText("온도-저항 그래프")).toBeInTheDocument();
  });

  it("ControlPanel을 렌더링한다", () => {
    render(<App />);
    expect(screen.getByText("실험 제어")).toBeInTheDocument();
  });

  it("기본 온도가 300K이다", () => {
    render(<App />);
    expect(screen.getByText("300 K")).toBeInTheDocument();
  });

  it("기본 자기장이 0T이다", () => {
    render(<App />);
    expect(screen.getByText("0.0 T")).toBeInTheDocument();
  });

  it("온도 슬라이더를 조작하면 값이 변경된다", () => {
    render(<App />);
    const tempSlider = screen.getByLabelText("온도 (K)");
    fireEvent.change(tempSlider, { target: { value: "50" } });
    expect(screen.getByText("50 K")).toBeInTheDocument();
  });

  it("자기장 슬라이더를 조작하면 값이 변경된다", () => {
    render(<App />);
    const fieldSlider = screen.getByLabelText("자기장 (T)");
    fireEvent.change(fieldSlider, { target: { value: "7.5" } });
    expect(screen.getByText("7.5 T")).toBeInTheDocument();
  });

  it("온도를 92K 미만으로 변경하면 초전도 상태 메시지가 표시된다", () => {
    render(<App />);
    const tempSlider = screen.getByLabelText("온도 (K)");
    fireEvent.change(tempSlider, { target: { value: "50" } });
    expect(
      screen.getByText("초전도 상태: 저항이 0에 근접합니다.")
    ).toBeInTheDocument();
  });
});
