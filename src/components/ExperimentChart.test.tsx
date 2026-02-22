import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperimentChart from "./ExperimentChart";

// Recharts 컴포넌트를 mock 처리 (jsdom에서 SVG 렌더링 불가)
vi.mock("recharts", () => {
  const MockResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  );
  const MockLineChart = ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="line-chart" data-length={data.length}>
      {children}
    </div>
  );
  const MockLine = ({ dataKey, name }: { dataKey: string; name: string }) => (
    <div data-testid={`line-${dataKey}`} data-name={name} />
  );
  const MockXAxis = ({ dataKey }: { dataKey: string }) => (
    <div data-testid="x-axis" data-key={dataKey} />
  );
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

describe("ExperimentChart", () => {
  it("제목 '온도-저항 그래프'를 렌더링한다", () => {
    render(<ExperimentChart temperature={300} magneticField={0} />);
    expect(screen.getByText("온도-저항 그래프")).toBeInTheDocument();
  });

  it("현재 온도를 표시한다", () => {
    render(<ExperimentChart temperature={150} magneticField={0} />);
    expect(screen.getByText("150K")).toBeInTheDocument();
  });

  it("현재 자기장을 표시한다", () => {
    render(<ExperimentChart temperature={300} magneticField={5} />);
    expect(screen.getByText("5T")).toBeInTheDocument();
  });

  it("차트 컨테이너를 렌더링한다", () => {
    render(<ExperimentChart temperature={300} magneticField={0} />);
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
  });

  it("LineChart를 렌더링한다", () => {
    render(<ExperimentChart temperature={300} magneticField={0} />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });

  it("저항 Line을 렌더링한다", () => {
    render(<ExperimentChart temperature={300} magneticField={0} />);
    const line = screen.getByTestId("line-resistance");
    expect(line).toBeInTheDocument();
    expect(line).toHaveAttribute("data-name", "저항");
  });

  it("초전도 상태 Line을 렌더링한다", () => {
    render(<ExperimentChart temperature={300} magneticField={0} />);
    const line = screen.getByTestId("line-superconducting");
    expect(line).toBeInTheDocument();
    expect(line).toHaveAttribute("data-name", "초전도 상태");
  });

  it("X축이 temp 데이터키를 사용한다", () => {
    render(<ExperimentChart temperature={300} magneticField={0} />);
    expect(screen.getByTestId("x-axis")).toHaveAttribute("data-key", "temp");
  });

  it("그리드, 툴팁, 범례가 렌더링된다", () => {
    render(<ExperimentChart temperature={300} magneticField={0} />);
    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("legend")).toBeInTheDocument();
  });

  it("자기장 변경 시 데이터가 갱신된다", () => {
    const { rerender } = render(
      <ExperimentChart temperature={300} magneticField={0} />
    );
    const chart1 = screen.getByTestId("line-chart");
    expect(chart1).toBeInTheDocument();

    rerender(<ExperimentChart temperature={300} magneticField={10} />);
    const chart2 = screen.getByTestId("line-chart");
    expect(chart2).toBeInTheDocument();
  });
});
