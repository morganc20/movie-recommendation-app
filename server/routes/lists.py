from fastapi import APIRouter, Depends
from model.list import ListCreate
from model.users import User
from services.list_service import create_list
from utils.security import get_current_user

router = APIRouter()

@router.post("/lists")
async def create_new_list(list_data: ListCreate, current_user: User = Depends(get_current_user)):
    return create_list(list_data, current_user)

