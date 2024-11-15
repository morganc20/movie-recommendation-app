'''
This module contains the Pydantic models for the asset info.
'''
from datetime import datetime
from pydantic import BaseModel


class ListPictureCreate(BaseModel):
    '''
    ListPictureCreate is the Pydantic model for creating list
    '''
    listPictureId: str  # Auto-generated
    listId: str  # Reference to the lists collection
    imageUrl: str
    type: str  # Type of image, e.g., "poster", "thumbnail"
    uploadedAt: datetime


class ContentPictureCreate(BaseModel):
    '''
    ContentPictureCreate is the Pydantic model for creating
    '''
    contentPictureId: str  # Auto-generated
    contentId: str  # Reference to the content collection
    imageUrl: str
    type: str  # Type of image, e.g., "poster", "thumbnail"
    uploadedAt: datetime
