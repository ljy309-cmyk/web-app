import { describe, it, expect } from "vitest";
import { generateResistanceData } from "./physics";

describe("generateResistanceData", () => {
  it("자기장 0일 때 데이터를 올바르게 생성한다", () => {
    const data = generateResistanceData(0);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].temp).toBe(0);
    expect(data[data.length - 1].temp).toBe(400);
  });

  it("임계온도 이하에서 저항이 0이다", () => {
    const data = generateResistanceData(0);
    // Tc ≈ 92K, 80K는 확실히 임계온도 이하
    const point = data.find((d) => d.temp === 80);
    expect(point).toBeDefined();
    expect(point!.resistance).toBe(0);
    expect(point!.superconducting).toBe(1);
  });

  it("임계온도 이상에서 저항이 0보다 크다", () => {
    const data = generateResistanceData(0);
    // 200K는 확실히 임계온도 이상
    const point = data.find((d) => d.temp === 200);
    expect(point).toBeDefined();
    expect(point!.resistance).toBeGreaterThan(0);
    expect(point!.superconducting).toBe(0);
  });

  it("자기장이 높으면 임계온도가 낮아진다", () => {
    const dataLow = generateResistanceData(0);
    const dataHigh = generateResistanceData(10);

    // 자기장 0: 90K에서 초전도 상태
    const lowPoint = dataLow.find((d) => d.temp === 90);
    expect(lowPoint!.resistance).toBe(0);

    // 자기장 10T: 90K에서 저항 존재 (임계온도가 낮아짐)
    const highPoint = dataHigh.find((d) => d.temp === 90);
    expect(highPoint!.resistance).toBeGreaterThan(0);
  });
});
