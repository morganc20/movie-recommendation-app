from fastapi import APIRouter, Depends
from server.model.content import ContentCreate
from model.users import User
from server.services.content_service import add_content, add_content_to_list
from utils.security import get_current_user
from model.list import ListContentCreate
from datetime import datetime

router = APIRouter()

@router.post("/content")
async def create_content(content: ContentCreate):
    return add_content(content)

@router.post("/lists/{list_id}/content/{content_id}")
async def add_content_to_list(list_id: str, content_id: str, current_user: User = Depends(get_current_user)):
    list_content = ListContentCreate(listContentId="", listId=list_id, contentId=content_id, addedAt=datetime.now())
    return add_content_to_list(list_content, current_user)
