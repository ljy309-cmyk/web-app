"""
초전도체 물리 시뮬레이션 서비스
YBCO(이트륨 바륨 구리 산화물) 기반
"""

TC_BASE = 92.0  # YBCO 임계온도 (K)
BC2 = 30.0  # 상부 임계자기장 (T)


def get_critical_temperature(magnetic_field: float) -> float:
    """자기장에 따른 임계온도 보정: Tc(B) = Tc(0) * (1 - (B/Bc2)^2)"""
    ratio = min(magnetic_field / BC2, 0.99)
    return TC_BASE * (1 - ratio * ratio)


def generate_resistance_data(magnetic_field: float) -> list[dict]:
    """온도-저항 데이터를 생성합니다."""
    tc = get_critical_temperature(magnetic_field)
    data: list[dict] = []

    for t in range(0, 401, 2):
        if t < tc:
            resistance = 0.0
            superconducting = 1.0
        elif t < tc + 10:
            progress = (t - tc) / 10
            resistance = progress * progress * (t * 0.005)
            superconducting = 1 - progress
        else:
            resistance = t * 0.005
            superconducting = 0.0

        data.append(
            {
                "temp": t,
                "resistance": round(resistance, 3),
                "superconducting": round(superconducting, 3),
            }
        )

    return data
