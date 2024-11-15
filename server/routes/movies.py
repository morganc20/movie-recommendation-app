"""
    content routes 
"""
from fastapi import APIRouter
from model.content import ContentCreate
from services.content_service import (
    add_content, get_content_by_id, get_content_by_genre, get_content_by_title,
    get_content_by_director, get_content_by_release_year, get_content_by_type,
    edit_content_by_id, remove_content_by_id
)


router = APIRouter()


@router.post("/content")
async def create_content(content: ContentCreate):
    """
    Add new content (movie, tv_show, or animation).
    """
    return add_content(content)


@router.get("/content/{content_id}")
async def get_content(content_id: str):
    """
    Get content by ID.
    """
    return get_content_by_id(content_id)


@router.get("/content/genre/{genre}")
async def get_content_by_genre_route(genre: str):
    """
    Get content by genre.
    """
    return get_content_by_genre(genre)


@router.get("/content/title/{title}")
async def get_content_by_title_route(title: str):
    """
    Get content by title.
    """
    return get_content_by_title(title)


@router.get("/content/director/{director}")
async def get_content_by_director_route(director: str):
    """
    Get content by director.
    """
    return get_content_by_director(director)


@router.get("/content/releaseYear/{year}")
async def get_content_by_release_year_route(year: int):
    """
    Get content by release year.
    """
    return get_content_by_release_year(year)


@router.get("/content/type/{content_type}")
async def get_content_by_type_route(content_type: str):
    """
    Get content by type (e.g., "movie", "tv_show", "animation").
    """
    return get_content_by_type(content_type)


@router.put("/content/{content_id}")
async def edit_content(content_id: str, updated_content: ContentCreate):
    """
    Edit content by content ID.
    """
    return edit_content_by_id(content_id, updated_content)


@router.delete("/content/{content_id}")
async def remove_content(content_id: str):
    """
    Remove content by ID.
    """
    return remove_content_by_id(content_id)
