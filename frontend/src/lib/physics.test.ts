import { describe, it, expect } from "vitest";
import { generateResistanceData, getCriticalTemperature } from "./physics";

describe("getCriticalTemperature", () => {
  it("자기장 0일 때 기본 임계온도(92K)를 반환한다", () => {
    expect(getCriticalTemperature(0)).toBe(92);
  });

  it("자기장 증가 시 임계온도가 단조감소한다", () => {
    const tc0 = getCriticalTemperature(0);
    const tc5 = getCriticalTemperature(5);
    const tc15 = getCriticalTemperature(15);
    expect(tc5).toBeLessThan(tc0);
    expect(tc15).toBeLessThan(tc5);
  });

  it("상부 임계자기장(30T) 이상에서도 음수가 되지 않는다", () => {
    expect(getCriticalTemperature(30)).toBeGreaterThanOrEqual(0);
    expect(getCriticalTemperature(50)).toBeGreaterThanOrEqual(0);
  });

  it("음수 자기장에서도 ratio²은 양수이므로 임계온도가 낮아진다", () => {
    // ratio = -5/30 = -0.167, ratio² = 0.028 → Tc = 92 * (1 - 0.028) ≈ 89.4
    const tc = getCriticalTemperature(-5);
    expect(tc).toBeLessThan(92);
    expect(tc).toBeGreaterThan(0);
  });
});

describe("generateResistanceData", () => {
  it("자기장 0일 때 데이터를 올바르게 생성한다", () => {
    const data = generateResistanceData(0);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].temp).toBe(0);
    expect(data[data.length - 1].temp).toBe(400);
  });

  it("데이터 포인트가 2K 간격으로 201개 생성된다", () => {
    const data = generateResistanceData(0);
    // 0~400K, 2K 간격 → 201개
    expect(data.length).toBe(201);
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

  it("전이 구간(Tc ~ Tc+10)에서 저항이 점진적으로 증가한다", () => {
    const data = generateResistanceData(0);
    // Tc=92K, 전이 구간 92~102K
    const transitionPoints = data.filter((d) => d.temp >= 92 && d.temp <= 102);
    for (let i = 1; i < transitionPoints.length; i++) {
      expect(transitionPoints[i].resistance).toBeGreaterThanOrEqual(
        transitionPoints[i - 1].resistance
      );
    }
  });

  it("전이 구간에서 superconducting 값이 0~1 사이다", () => {
    const data = generateResistanceData(0);
    const transitionPoints = data.filter((d) => d.temp >= 92 && d.temp <= 102);
    for (const point of transitionPoints) {
      expect(point.superconducting).toBeGreaterThanOrEqual(0);
      expect(point.superconducting).toBeLessThanOrEqual(1);
    }
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

  it("모든 resistance 값이 음수가 아니다", () => {
    const data = generateResistanceData(5);
    for (const point of data) {
      expect(point.resistance).toBeGreaterThanOrEqual(0);
    }
  });

  it("고온(400K)에서 resistance가 선형적으로 비례한다", () => {
    const data = generateResistanceData(0);
    const point400 = data.find((d) => d.temp === 400);
    // resistance = t * 0.005 = 400 * 0.005 = 2.0
    expect(point400!.resistance).toBe(2.0);
  });
});
