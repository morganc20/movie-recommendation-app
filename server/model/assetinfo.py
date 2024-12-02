'''
This module contains the Pydantic models for the asset info.
'''
from datetime import datetime
from pydantic import BaseModel


class ListPictureCreate(BaseModel):
    '''
    ListPictureCreate is the Pydantic model for creating list
    '''
    listPictureId: str
    listId: str
    imageUrl: str
    type: str
    uploadedAt: datetime


class ContentPictureCreate(BaseModel):
    '''
    ContentPictureCreate is the Pydantic model for creating
    '''
    contentPictureId: str
    contentId: str
    imageUrl: str
    type: str
    uploadedAt: datetime
