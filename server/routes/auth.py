from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from model.users import UserCreate, LoginRequest, TokenResponse
from services.auth_service import register_user, login_user

router = APIRouter()

class ResponseModel(BaseModel):
    message: str
    data: dict = None

@router.post("/register", response_model=ResponseModel)
async def register(user: UserCreate):
    try:
        result = await register_user(user)
        return ResponseModel(message="User registered successfully", data={"userId": result['userId']})
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@router.post("/login", response_model=TokenResponse)
async def login(login_request: LoginRequest):
    try:
        token = await login_user(login_request.email, login_request.password)
        return token
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")