import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ControlPanel from "./ControlPanel";

const defaultProps = {
  temperature: 300,
  magneticField: 5.0,
  onTemperatureChange: vi.fn(),
  onMagneticFieldChange: vi.fn(),
};

describe("ControlPanel", () => {
  it("제목 '실험 제어'를 렌더링한다", () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText("실험 제어")).toBeInTheDocument();
  });

  it("현재 온도 값을 표시한다", () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText("300 K")).toBeInTheDocument();
  });

  it("현재 자기장 값을 표시한다", () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText("5.0 T")).toBeInTheDocument();
  });

  it("온도 슬라이더를 변경하면 콜백이 호출된다", () => {
    const onTemperatureChange = vi.fn();
    render(<ControlPanel {...defaultProps} onTemperatureChange={onTemperatureChange} />);
    const slider = screen.getByLabelText("온도 (K)");
    fireEvent.change(slider, { target: { value: "150" } });
    expect(onTemperatureChange).toHaveBeenCalledWith(150);
  });

  it("자기장 슬라이더를 변경하면 콜백이 호출된다", () => {
    const onMagneticFieldChange = vi.fn();
    render(<ControlPanel {...defaultProps} onMagneticFieldChange={onMagneticFieldChange} />);
    const slider = screen.getByLabelText("자기장 (T)");
    fireEvent.change(slider, { target: { value: "10" } });
    expect(onMagneticFieldChange).toHaveBeenCalledWith(10);
  });

  it("온도가 92K 미만이면 초전도 상태 메시지를 표시한다", () => {
    render(<ControlPanel {...defaultProps} temperature={50} />);
    expect(screen.getByText("초전도 상태: 저항이 0에 근접합니다.")).toBeInTheDocument();
  });

  it("온도가 92K 이상이면 일반 상태 메시지를 표시한다", () => {
    render(<ControlPanel {...defaultProps} temperature={300} />);
    expect(screen.getByText("일반 상태: 온도가 임계점 이상입니다.")).toBeInTheDocument();
  });

  it("온도 슬라이더의 범위가 0~400이다", () => {
    render(<ControlPanel {...defaultProps} />);
    const slider = screen.getByLabelText("온도 (K)");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "400");
  });

  it("자기장 슬라이더의 범위가 0~20이다", () => {
    render(<ControlPanel {...defaultProps} />);
    const slider = screen.getByLabelText("자기장 (T)");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "20");
  });

  it("상태 정보 섹션이 렌더링된다", () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText("상태 정보")).toBeInTheDocument();
  });

  it("초전도 상태 스냅샷과 일치한다", () => {
    const { container } = render(<ControlPanel {...defaultProps} temperature={50} />);
    expect(container).toMatchSnapshot();
  });

  it("일반 상태 스냅샷과 일치한다", () => {
    const { container } = render(<ControlPanel {...defaultProps} temperature={300} />);
    expect(container).toMatchSnapshot();
  });
});
