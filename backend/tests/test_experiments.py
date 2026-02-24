import pytest
from httpx import AsyncClient

# ── Health Check ──


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    response = await client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


# ── Resistance 엔드포인트 ──


@pytest.mark.asyncio
async def test_get_resistance_data(client: AsyncClient):
    response = await client.get("/api/experiments/resistance?magnetic_field=0")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert data["magnetic_field"] == 0.0


@pytest.mark.asyncio
async def test_get_resistance_data_default_param(client: AsyncClient):
    """magnetic_field 파라미터 없이 호출 시 기본값(0.0) 사용"""
    response = await client.get("/api/experiments/resistance")
    assert response.status_code == 200
    data = response.json()
    assert data["magnetic_field"] == 0.0
    assert len(data["data"]) == 201  # 0~400K, 2K 간격


@pytest.mark.asyncio
async def test_get_resistance_data_high_field(client: AsyncClient):
    """높은 자기장에서도 정상 응답"""
    response = await client.get("/api/experiments/resistance?magnetic_field=25")
    assert response.status_code == 200
    data = response.json()
    assert data["magnetic_field"] == 25.0
    # 높은 자기장 → 임계온도 낮아짐 → 0K에서도 초전도이지만 Tc가 훨씬 낮음
    assert len(data["data"]) > 0


@pytest.mark.asyncio
async def test_resistance_data_structure(client: AsyncClient):
    """응답 데이터 포인트의 구조 검증"""
    response = await client.get("/api/experiments/resistance?magnetic_field=0")
    data = response.json()["data"]
    point = data[0]
    assert "temp" in point
    assert "resistance" in point
    assert "superconducting" in point


@pytest.mark.asyncio
async def test_resistance_data_non_negative(client: AsyncClient):
    """모든 저항값이 음수가 아닌지 검증"""
    response = await client.get("/api/experiments/resistance?magnetic_field=5")
    data = response.json()["data"]
    for point in data:
        assert point["resistance"] >= 0


# ── Status 엔드포인트 ──


@pytest.mark.asyncio
async def test_get_experiment_status_superconducting(client: AsyncClient):
    response = await client.get(
        "/api/experiments/status?temperature=50&magnetic_field=0"
    )
    assert response.status_code == 200
    data = response.json()
    assert data["is_superconducting"] is True
    assert data["state"] == "초전도"


@pytest.mark.asyncio
async def test_get_experiment_status_normal(client: AsyncClient):
    response = await client.get(
        "/api/experiments/status?temperature=200&magnetic_field=0"
    )
    assert response.status_code == 200
    data = response.json()
    assert data["is_superconducting"] is False
    assert data["state"] == "일반"


@pytest.mark.asyncio
async def test_status_default_params(client: AsyncClient):
    """파라미터 없이 호출 시 기본값 사용 (temperature=100, magnetic_field=0)"""
    response = await client.get("/api/experiments/status")
    assert response.status_code == 200
    data = response.json()
    assert data["temperature"] == 100.0
    assert data["magnetic_field"] == 0.0
    # 100K > Tc(92K) → 일반 상태
    assert data["is_superconducting"] is False


@pytest.mark.asyncio
async def test_status_critical_temperature_varies_with_field(client: AsyncClient):
    """자기장 증가 시 임계온도가 낮아지는지 검증"""
    resp_low = await client.get(
        "/api/experiments/status?temperature=80&magnetic_field=0"
    )
    resp_high = await client.get(
        "/api/experiments/status?temperature=80&magnetic_field=15"
    )
    tc_low = resp_low.json()["critical_temperature"]
    tc_high = resp_high.json()["critical_temperature"]
    assert tc_high < tc_low


@pytest.mark.asyncio
async def test_status_boundary_near_tc(client: AsyncClient):
    """임계온도 경계(92K) 근처에서의 상태 전이 검증"""
    # 91K: 임계온도(92K) 바로 아래 → 초전도
    resp = await client.get(
        "/api/experiments/status?temperature=91&magnetic_field=0"
    )
    assert resp.json()["is_superconducting"] is True

    # 93K: 임계온도(92K) 바로 위 → 일반
    resp = await client.get(
        "/api/experiments/status?temperature=93&magnetic_field=0"
    )
    assert resp.json()["is_superconducting"] is False


@pytest.mark.asyncio
async def test_status_response_fields(client: AsyncClient):
    """응답에 모든 필수 필드가 포함되어 있는지 검증"""
    response = await client.get(
        "/api/experiments/status?temperature=50&magnetic_field=5"
    )
    data = response.json()
    assert "temperature" in data
    assert "magnetic_field" in data
    assert "critical_temperature" in data
    assert "is_superconducting" in data
    assert "state" in data
