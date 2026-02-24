from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.services.physics import generate_resistance_data

router = APIRouter()

DbSession = Annotated[AsyncSession, Depends(get_db)]


@router.get("/resistance")
async def get_resistance_data(
    db: DbSession,
    magnetic_field: float = 0.0,
) -> dict[str, object]:
    """자기장에 따른 저항-온도 데이터를 반환합니다."""
    _ = db  # 추후 DB 조회 시 사용
    data = generate_resistance_data(magnetic_field)
    return {"magnetic_field": magnetic_field, "data": data}


@router.get("/status")
async def get_experiment_status(
    temperature: float = 100.0,
    magnetic_field: float = 0.0,
) -> dict[str, object]:
    """현재 실험 상태를 반환합니다."""
    tc = 92.0 * (1 - min(magnetic_field / 30, 0.99) ** 2)
    is_superconducting = temperature < tc

    return {
        "temperature": temperature,
        "magnetic_field": magnetic_field,
        "critical_temperature": round(tc, 2),
        "is_superconducting": is_superconducting,
        "state": "초전도" if is_superconducting else "일반",
    }
