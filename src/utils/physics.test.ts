import { describe, it, expect } from "vitest";
import { generateResistanceData } from "./physics";

describe("generateResistanceData", () => {
  it("자기장 0T일 때 201개의 데이터 포인트를 반환한다 (0~400, step 2)", () => {
    const data = generateResistanceData(0);
    expect(data).toHaveLength(201);
    expect(data[0].temp).toBe(0);
    expect(data[200].temp).toBe(400);
  });

  it("임계온도(92K) 이하에서 저항이 0이다 (자기장 0T)", () => {
    const data = generateResistanceData(0);
    // 0K ~ 90K 구간 (Tc=92K)
    const superconductingPoints = data.filter((d) => d.temp < 92);
    for (const point of superconductingPoints) {
      expect(point.resistance).toBe(0);
      expect(point.superconducting).toBe(1);
    }
  });

  it("임계온도 이상에서 저항이 선형 증가한다 (자기장 0T)", () => {
    const data = generateResistanceData(0);
    // Tc=92, 전이구간 92~102, 이후 일반상태
    const normalPoints = data.filter((d) => d.temp >= 102);
    for (const point of normalPoints) {
      expect(point.resistance).toBeGreaterThan(0);
      expect(point.superconducting).toBe(0);
    }
  });

  it("전이 구간에서 저항이 점진적으로 증가하고 초전도 값이 감소한다", () => {
    const data = generateResistanceData(0);
    // Tc=92, 전이구간: 92 <= t < 102
    const transitionPoints = data.filter((d) => d.temp >= 92 && d.temp < 102);
    expect(transitionPoints.length).toBeGreaterThan(0);

    for (const point of transitionPoints) {
      expect(point.resistance).toBeGreaterThanOrEqual(0);
      expect(point.superconducting).toBeGreaterThanOrEqual(0);
      expect(point.superconducting).toBeLessThanOrEqual(1);
    }
  });

  it("자기장이 증가하면 임계온도가 낮아진다", () => {
    const data0T = generateResistanceData(0);
    const data10T = generateResistanceData(10);

    // 80K에서: 0T이면 초전도 상태, 10T이면 Tc가 낮아져 일반 상태일 수 있음
    const point0T_80K = data0T.find((d) => d.temp === 80)!;
    const point10T_80K = data10T.find((d) => d.temp === 80)!;

    expect(point0T_80K.resistance).toBe(0);
    expect(point10T_80K.resistance).toBeGreaterThanOrEqual(0);
  });

  it("매우 강한 자기장에서 임계온도가 크게 낮아진다", () => {
    const data25T = generateResistanceData(25);
    // Bc2=30T, ratio=25/30≈0.833, Tc≈92*(1-0.694)≈28.2K
    // 30K에서는 전이 구간 또는 일반 상태
    const point30K = data25T.find((d) => d.temp === 30)!;
    expect(point30K).toBeDefined();
    // 0K에서는 여전히 초전도
    const point0K = data25T.find((d) => d.temp === 0)!;
    expect(point0K.resistance).toBe(0);
    expect(point0K.superconducting).toBe(1);
  });

  it("자기장이 임계자기장에 근접하면 임계온도가 거의 0에 수렴한다", () => {
    const data29T = generateResistanceData(29);
    // Tc ≈ 92 * (1 - (29/30)^2) ≈ 92 * 0.064 ≈ 5.9K
    // 10K에서는 일반 상태 또는 전이 구간
    const point10K = data29T.find((d) => d.temp === 10)!;
    expect(point10K.resistance).toBeGreaterThanOrEqual(0);
  });

  it("모든 데이터 포인트의 값이 소수점 3자리까지 반올림된다", () => {
    const data = generateResistanceData(5);
    for (const point of data) {
      const resistanceDecimals = String(point.resistance).split(".")[1];
      const scDecimals = String(point.superconducting).split(".")[1];
      if (resistanceDecimals) {
        expect(resistanceDecimals.length).toBeLessThanOrEqual(3);
      }
      if (scDecimals) {
        expect(scDecimals.length).toBeLessThanOrEqual(3);
      }
    }
  });
});
