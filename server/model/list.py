from pydantic import BaseModel
from datetime import datetime

class ListCreate(BaseModel):
    name: str
    description: str
class ListMovieCreate(BaseModel):
    listId: str
    movieId: str
    addedAt: datetime
    listMovieId: str