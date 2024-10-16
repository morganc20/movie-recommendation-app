from pydantic import BaseModel

class MovieCreate(BaseModel):
    title: str
    director: str
    releaseYear: int
    genre: str


