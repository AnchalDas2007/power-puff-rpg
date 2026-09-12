from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import engine, Base
from app import models
from app.routers import auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create tables on startup (works with SQLite or PostgreSQL)
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Gamified RPG Productivity API for Power Puff RPG - Quests, Stats, Lounges & Houses",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router, prefix=settings.API_V1_STR)

@app.get("/api/health", tags=["Health"])
def health_check():
    """
    Health check endpoint returning system status and DB engine dialect.
    """
    return {
        "status": "healthy",
        "app": settings.PROJECT_NAME,
        "database": engine.dialect.name
    }

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to Power Puff RPG API! 🎮✨",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
