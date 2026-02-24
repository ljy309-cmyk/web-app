import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    response = await client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.asyncio
async def test_get_resistance_data(client: AsyncClient):
    response = await client.get("/api/experiments/resistance?magnetic_field=0")
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert data["magnetic_field"] == 0.0


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
