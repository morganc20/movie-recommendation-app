from fastapi import APIRouter, Depends
from model.movie import MovieCreate
from model.users import User
from services.movie_service import add_movie, add_movie_to_list
from utils.security import get_current_user

router = APIRouter()

@router.post("/movies")
async def create_movie(movie: MovieCreate):
    return add_movie(movie)

@router.post("/lists/{list_id}/movies/{movie_id}")
async def add_movie_to_user_list(list_id: str, movie_id: str, current_user: User = Depends(get_current_user)):
    return add_movie_to_list(list_id, movie_id, current_user)