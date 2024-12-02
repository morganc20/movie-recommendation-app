"""
    asset info routes
"""
from fastapi import APIRouter
from pydantic import BaseModel
from model.assetinfo import ListPictureCreate, ContentPictureCreate
from services.asset_service import (
    add_list_picture,
    get_list_picture_by_id,
    add_content_picture,
    get_content_picture_by_id,
    get_pictures_by_list_id,
    get_pictures_by_content_id,
    delete_list_picture_by_id,
    delete_content_picture_by_id,
    update_list_picture_type,
    update_content_picture_type,
    create_content_picture_api
)

router = APIRouter()


class ContentPictureRequest(BaseModel):
    '''
    ContentPictureRequest is the Pydantic model for creating content picture
    '''
    content_id: str
    image_url: str


@router.post("/assetinfo/list_picture")
async def create_list_picture_route(list_picture: ListPictureCreate):
    """
    Add a new list picture.
    """
    return add_list_picture(list_picture)


@router.get("/assetinfo/list_picture/{list_picture_id}")
async def get_list_picture_route(list_picture_id: str):
    """
    Get list picture by ID.
    """
    return get_list_picture_by_id(list_picture_id)


@router.get("/assetinfo/list/{list_id}/pictures")
async def get_pictures_by_list_id_route(list_id: str):
    """
    Get all pictures for a specific list.
    """
    return get_pictures_by_list_id(list_id)


@router.post("/assetinfo/content_picture")
async def create_content_picture_route(content_picture: ContentPictureCreate):
    """
    Add a new content picture.
    """
    return add_content_picture(content_picture)


@router.get("/assetinfo/content_picture/{content_picture_id}")
async def get_content_picture_route(content_picture_id: str):
    """
    Get content picture by ID.
    """
    return get_content_picture_by_id(content_picture_id)


@router.get("/assetinfo/content/{content_id}/pictures")
async def get_pictures_by_content_id_route(content_id: str):
    """
    Get all pictures for a specific content.
    """
    return get_pictures_by_content_id(content_id)


@router.delete("/assetinfo/list_picture/{list_picture_id}")
async def delete_list_picture_route(list_picture_id: str):
    """
    Delete a list picture by ID.
    """
    return delete_list_picture_by_id(list_picture_id)


@router.delete("/assetinfo/content_picture/{content_picture_id}")
async def delete_content_picture_route(content_picture_id: str):
    """
    Delete a content picture by ID.
    """
    return delete_content_picture_by_id(content_picture_id)


@router.put("/assetinfo/list_picture/{list_picture_id}")
async def update_list_picture_type_route(list_picture_id: str, new_type: str):
    """
    Update the type of a list picture.
    """
    return update_list_picture_type(list_picture_id, new_type)


@router.put("/assetinfo/content_picture/{content_picture_id}")
async def update_content_picture_type_route(content_picture_id: str, new_type: str):
    """
    Update the type of a content picture.
    """
    return update_content_picture_type(content_picture_id, new_type)


@router.post("/assetinfo/content_picture_api")
async def post_content_for_api(request: ContentPictureRequest):
    """
    Create a content picture using the API.
    """
    return create_content_picture_api(request.content_id, request.image_url)
