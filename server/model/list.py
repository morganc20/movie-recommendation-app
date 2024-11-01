from pydantic import BaseModel
from datetime import datetime
from model.content import Image

class ListCreate(BaseModel):
    name: str
    description: str

class ListContentCreate(BaseModel):
    listContentId: str
    listId: str
    contentId: str
    addedAt: datetime
