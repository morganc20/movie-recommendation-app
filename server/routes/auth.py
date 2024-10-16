from fastapi import APIRouter, Depends
from model.users import UserCreate
from services.auth_service import register_user, login_user

router = APIRouter()

@router.post("/register")
async def register(user: UserCreate):
    return register_user(user)

@router.post("/login")
async def login(email: str, password: str):
    return login_user(email, password)