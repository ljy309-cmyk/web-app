from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import experiments
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(experiments.router, prefix="/api/experiments", tags=["experiments"])


@app.get("/api/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
