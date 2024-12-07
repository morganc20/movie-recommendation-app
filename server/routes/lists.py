"""
This module contains the routes for list operations.
"""
from typing import Optional
from fastapi import APIRouter, Depends
from model.list import ListCreate
from model.users import User
from services.list_service import (
    create_list, get_list, add_content_to_list, remove_content_from_list,
    toggle_private, give_rating_to_list, get_list_from_userid,  update_rating, get_all_lists_from_rating, get_average_rating, get_all_list, edit_list_by_id_admin,
    delete_list_by_id)
from utils.security import get_current_user

router = APIRouter()


@router.post("/lists")
async def create_new_list(list_data: ListCreate, current_user: User = Depends(get_current_user)):
    """
    Create a new list for the current user.
    """
    return create_list(list_data, current_user)


@router.get("/lists/{username}")
async def get_user_lists(username: str):
    """
    Get all lists for a user by username.
    """
    return get_list(username)


@router.get("/lists/{user_id}/all")
async def get_user_lists_by_userid(user_id: str):
    """
    Get all lists for a user by userId.
    """
    return get_list_from_userid(user_id)


@router.get("/lists")
async def get_all_lists():
    """
    Get all lists.
    """
    return get_all_list()


@router.put("/lists/{list_id}/edit")
async def edit_list(list_id: str,
                    user_id: Optional[str] = None,
                    description: Optional[str] = None,
                    active: Optional[bool] = None):
    """
    Edit a list's owner, description, or active status by listId.
    """
    return edit_list_by_id_admin(list_id, user_id, description, active)


@router.post("/lists/{list_id}/content/{content_id}")
async def add_content_to_existing_list(list_id: str, content_id: str):
    """
    Add a content item to a list.
    """
    return add_content_to_list(list_id, content_id)


@router.delete("/lists/{list_id}/content/{content_id}")
async def remove_content_from_existing_list(list_id: str, content_id: str, current_user: User = Depends(get_current_user)):
    """
    Remove a content item from a list.
    """
    return remove_content_from_list(list_id, content_id)


@router.patch("/lists/{list_id}/privacy")
async def toggle_list_privacy(list_id: str, is_private: bool, current_user: User = Depends(get_current_user)):
    """
    Toggle the privacy status of a list.
    """
    return toggle_private(list_id, is_private)


@router.post("/lists/{list_id}/rating")
async def give_rating(list_id: str, score: int, review: Optional[str] = None, current_user: User = Depends(get_current_user)):
    """
    Give a rating to a list.
    """
    return give_rating_to_list(current_user.userId, list_id, score, review)


@router.put("/ratings/{rating_id}")
async def update_existing_rating(rating_id: str, score: Optional[int] = None, review: Optional[str] = None):
    """
    Update an existing rating.
    """
    return update_rating(rating_id, score, review)


@router.get("/lists/ratings/{target_rating}")
async def get_lists_by_rating(target_rating: int):
    """
    Get all lists with a specific rating.
    """
    return get_all_lists_from_rating(target_rating)


@router.get("/lists/average-rating/{list_id}")
async def get_average_rating_for_list(list_id: str):
    """
    Get the average rating for a list.
    """
    return get_average_rating(list_id)


@router.delete("/lists/{list_id}")
async def delete_list(list_id: str):
    """
    Delete a list by listId.
    """
    return delete_list_by_id(list_id)
