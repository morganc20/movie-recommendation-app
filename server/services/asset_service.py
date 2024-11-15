"""
    contains the service functions for the asset info endpoints.
"""
from datetime import datetime
from fastapi import HTTPException
from db import db
from model.assetinfo import ListPictureCreate, ContentPictureCreate


def add_list_picture(list_picture: ListPictureCreate):
    """
    Add a new list picture.
    """
    new_list_picture = {
        "listId": list_picture.listId,
        "imageUrl": list_picture.imageUrl,
        "type": list_picture.type,
        "uploadedAt": list_picture.uploadedAt or datetime.utcnow(),
    }
    list_picture_ref = db.collection('list_pictures').add(new_list_picture)
    return {"listPictureId": list_picture_ref[1].id, "message": "List picture added successfully"}


def get_list_picture_by_id(list_picture_id: str):
    """
    Get list picture by ID.
    """
    list_picture_doc = db.collection('list_pictures').document(list_picture_id).get()
    if not list_picture_doc.exists:
        raise HTTPException(status_code=404, detail="List picture not found")
    return list_picture_doc.to_dict()


def add_content_picture(content_picture: ContentPictureCreate):
    """
    Add a new content picture.
    """
    new_content_picture = {
        "contentId": content_picture.contentId,
        "imageUrl": content_picture.imageUrl,
        "type": content_picture.type,
        "uploadedAt": content_picture.uploadedAt or datetime.utcnow(),
    }
    content_picture_ref = db.collection('content_pictures').add(new_content_picture)
    return {"contentPictureId": content_picture_ref[1].id, "message": "Content picture added successfully"}


def get_content_picture_by_id(content_picture_id: str):
    """
    Get content picture by ID.
    """
    content_picture_doc = db.collection('content_pictures').document(content_picture_id).get()
    if not content_picture_doc.exists:
        raise HTTPException(status_code=404, detail="Content picture not found")
    return content_picture_doc.to_dict()


def get_pictures_by_list_id(list_id: str):
    """
    Get all pictures for a specific list.
    """
    list_picture_docs = db.collection('list_pictures').where('listId', '==', list_id).get()
    return [doc.to_dict() for doc in list_picture_docs]


def get_pictures_by_content_id(content_id: str):
    """
    Get all pictures for a specific content.
    """
    content_picture_docs = db.collection('content_pictures').where('contentId', '==', content_id).get()
    return [doc.to_dict() for doc in content_picture_docs]

def delete_list_picture_by_id(list_picture_id: str):
    """
    Delete a list picture by ID.
    """
    list_picture_ref = db.collection('list_pictures').document(list_picture_id)
    if not list_picture_ref.get().exists:
        raise HTTPException(status_code=404, detail="List picture not found")

    list_picture_ref.delete()
    return {"message": "List picture deleted successfully"}


def delete_content_picture_by_id(content_picture_id: str):
    """
    Delete a content picture by ID.
    """
    content_picture_ref = db.collection('content_pictures').document(content_picture_id)
    if not content_picture_ref.get().exists():
        raise HTTPException(status_code=404, detail="Content picture not found")

    content_picture_ref.delete()
    return {"message": "Content picture deleted successfully"}


def update_list_picture_type(list_picture_id: str, new_type: str):
    """
    Update the type of a list picture.
    """
    list_picture_ref = db.collection('list_pictures').document(list_picture_id)
    if not list_picture_ref.get().exists():
        raise HTTPException(status_code=404, detail="List picture not found")

    list_picture_ref.update({"type": new_type})
    return {"message": "List picture type updated successfully"}


def update_content_picture_type(content_picture_id: str, new_type: str):
    """
    Update the type of a content picture.
    """
    content_picture_ref = db.collection('content_pictures').document(content_picture_id)
    if not content_picture_ref.get().exists():
        raise HTTPException(status_code=404, detail="Content picture not found")

    content_picture_ref.update({"type": new_type})
    return {"message": "Content picture type updated successfully"}