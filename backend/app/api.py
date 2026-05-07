from fastapi import APIRouter

from app.post import router

api_router = APIRouter()

api_router.include_router(router.router, prefix="/posts", tags=["posts"])
