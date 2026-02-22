/**
 * 초전도체 저항-온도 데이터 생성
 * YBCO(이트륨 바륨 구리 산화물) 기반 시뮬레이션
 * 임계온도 Tc ≈ 92K
 */

interface DataPoint {
  temp: number;
  resistance: number;
  superconducting: number;
}

const TC_BASE = 92; // YBCO 임계온도 (K)

/**
 * 자기장에 따른 임계온도 보정
 * Tc(B) = Tc(0) * (1 - (B/Bc2)^2)
 */
function getCriticalTemperature(magneticField: number): number {
  const bc2 = 30; // 상부 임계자기장 (T)
  const ratio = Math.min(magneticField / bc2, 0.99);
  return TC_BASE * (1 - ratio * ratio);
}

export function generateResistanceData(
  magneticField: number
): DataPoint[] {
  const tc = getCriticalTemperature(magneticField);
  const data: DataPoint[] = [];

  for (let t = 0; t <= 400; t += 2) {
    let resistance: number;
    let superconducting: number;

    if (t < tc) {
      // 초전도 상태: 저항 = 0
      resistance = 0;
      superconducting = 1;
    } else if (t < tc + 10) {
      // 전이 구간
      const progress = (t - tc) / 10;
      resistance = progress * progress * (t * 0.005);
      superconducting = 1 - progress;
    } else {
      // 일반 상태: 선형 저항 증가
      resistance = t * 0.005;
      superconducting = 0;
    }

    data.push({
      temp: t,
      resistance: Math.round(resistance * 1000) / 1000,
      superconducting: Math.round(superconducting * 1000) / 1000,
    });
  }

  return data;
}
