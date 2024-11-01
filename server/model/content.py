from pydantic import BaseModel
from datetime import datetime

class ContentCreate(BaseModel):
    contentId: str
    title: str
    director: str
    releaseYear: int
    genre: str
    _type: str ## movie, series, etc
    synopsis: str
    

class Image(BaseModel):
    imageId: str
    contentId: str
    imageUrl: str
    imageType: str ## poster, thumbnail, etc
    uploadedAt: datetime
    isListImage: bool





