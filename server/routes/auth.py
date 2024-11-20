from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from model.users import UserCreate, LoginRequest, TokenResponse
from services.auth_service import register_user, login_user, get_user_by_id, get_user_role, promote_user_to_mod
from db import db
from utils.security import verify_password, get_password_hash

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
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.post("/login", response_model=TokenResponse)
async def login(login_request: LoginRequest):
    try:
        token = await login_user(login_request.email, login_request.password)
        return TokenResponse(
            access_token=token['access_token'],
            token_type=token['token_type'],
            userId=token['userId'],
            username=token['username']
        )
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/get-username/{email}", response_model=ResponseModel)
async def get_username(email: str):
    try:
        user_docs = db.collection('users').where('email', '==', email).get()
        if not user_docs:
            raise HTTPException(status_code=404, detail="User not found")
        return ResponseModel(message="Username fetched successfully", data={"username": user_docs[0].to_dict()['username'], "userId": user_docs[0].id})
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/get-email/{username}", response_model=ResponseModel)
async def get_email(username: str):
    try:
        user_docs = db.collection('users').where(
            'username', '==', username).get()
        if not user_docs:
            raise HTTPException(status_code=404, detail="User not found")
        return ResponseModel(message="Email fetched successfully", data={"email": user_docs[0].to_dict()['email'], "userId": user_docs[0].id})
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.post("/verify-password", response_model=ResponseModel)
async def verify_user_password(email: str, password: str):
    try:
        user_docs = db.collection('users').where('email', '==', email).get()
        if not user_docs:
            raise HTTPException(status_code=404, detail="User not found")
        user_data = user_docs[0].to_dict()
        if verify_password(password, user_data['passwordHash'], user_data['salt']):
            return ResponseModel(message="Password verified successfully")
        else:
            raise HTTPException(
                status_code=401, detail="Password verification failed")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.post("/verify-user", response_model=ResponseModel)
async def verify_user(identifier: str, flag: str):
    try:
        if flag == "email":
            user_docs = db.collection('users').where(
                'email', '==', identifier).get()
        elif flag == "username":
            user_docs = db.collection('users').where(
                'username', '==', identifier).get()
        else:
            raise HTTPException(
                status_code=400, detail="Invalid flag provided, must be 'email' or 'username'")

        if not user_docs:
            raise HTTPException(status_code=404, detail="User not found")

        return ResponseModel(message="User exists", data={"userId": user_docs[0].id})
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/get-user/{user_id}", response_model=ResponseModel)
async def get_user(user_id: str):
    """
    Get a user by their user ID.
    """
    try:
        user = await get_user_by_id(user_id)
        return ResponseModel(message="User found", data=user)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.get("/get-user-role/{user_id}", response_model=ResponseModel)
async def get_role(user_id: str):
    """
    Get the role of a user by their user ID.
    """
    try:
        role = await get_user_role(user_id)
        return ResponseModel(message="Role found", data={"role": role})
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")


@router.put("/promote-user/{user_id}", response_model=ResponseModel)
async def promote_user(user_id: str):
    """
    Promote a user to moderator.
    """
    try:
        result = await promote_user_to_mod(user_id)
        return ResponseModel(message=result['message'])
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An unexpected error occurred: {str(e)}")
