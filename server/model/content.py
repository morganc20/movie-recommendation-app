'''
This module contains the Pydantic models for the content.
from datetime import datetime
from pydantic import BaseModel
'''
from pydantic import BaseModel


class ContentCreate(BaseModel):
    '''
    ContentCreate is the Pydantic model for creating content.
    '''
    contentId: str
    title: str
    director: str
    releaseYear: int
    genre: str
    type: str  # "movie" or "tv_show"
    synopsis: str
    avgRating: float
