'''
This file contains the service functions for the list endpoints.
'''
from datetime import datetime
from typing import Optional
from fastapi import HTTPException
from db import db
from google.cloud import firestore
# from firebase_admin import firestore
from model.list import ListCreate
from model.users import User
from model.ratings import RatingCreate


def create_list(list_data: ListCreate, current_user: User):
    '''
    Create a new list in Firestore.
    '''
    new_list = {
        'userId': current_user.userId,
        'name': list_data.name,
        'description': list_data.description,
        'createdAt': firestore.SERVER_TIMESTAMP,
        'contentIds': [],
        'ratings': [],
        'active': True
    }
    list_ref = db.collection('lists').add(new_list)

    # Update user's listIds array
    user_ref = db.collection('users').document(current_user.userId)
    user_ref.update({'listIds': firestore.ArrayUnion([list_ref[1].id])})

    return {"listId": list_ref[1].id, "message": "List created successfully"}


def get_list(username: str):
    '''
    Get all lists for a user by username.
    '''
    user_docs = db.collection('users').where('username', '==', username).get()
    if not user_docs:
        raise HTTPException(status_code=404, detail="User not found")

    user_id = user_docs[0].id
    list_docs = db.collection('lists').where('userId', '==', user_id).get()
    return [doc.to_dict() for doc in list_docs]


def remove_content_from_list(list_id: str, content_id: str):
    '''
    Remove a content from a list.
    '''
    list_ref = db.collection('lists').document(list_id)
    list_doc = list_ref.get()
    if not list_doc.exists:
        raise HTTPException(status_code=404, detail="List not found")

    content_ids = list_doc.to_dict().get('contentIds', [])
    if content_id in content_ids:
        content_ids.remove(content_id)
        list_ref.update({"contentIds": content_ids})
        return {"message": "Content removed from list"}
    return {"message": "Content not found in list"}


def add_content_to_list(list_id: str, content_id: str):
    """
    Add a content to a list.
    """
    list_ref = db.collection('lists').document(list_id)
    list_doc = list_ref.get()
    if not list_doc.exists:
        raise HTTPException(status_code=404, detail="List not found")

    content_ids = list_doc.to_dict().get('contentIds', [])
    if content_id not in content_ids:
        content_ids.append(content_id)
        list_ref.update({"contentIds": content_ids})
        return {"message": "Content added to list"}
    return {"message": "Content already in list"}


def toggle_private(list_id: str, is_private: bool):
    '''
    Toggle the privacy of a list.
    '''
    list_ref = db.collection('lists').document(list_id)
    if list_ref.get().exists:
        list_ref.update({"active": is_private})
        return {"message": "List privacy toggled"}
    raise HTTPException(status_code=404, detail="List not found")


def give_rating_to_list(user_id: str, list_id: str, score: int, review: Optional[str] = None):
    """
    Give a rating to a list
    """
    # Create a new rating
    rating_id = db.collection('ratings').document().id
    new_rating = RatingCreate(
        ratingId=rating_id,
        userId=user_id,
        listId=list_id,
        score=score,
        review=review,
        createdAt=datetime.now()
    )
    db.collection("ratings").document(rating_id).set(new_rating.model_dump())

    # Update list's ratings array
    list_ref = db.collection("lists").document(list_id)
    list_ref.update({"ratings": firestore.ArrayUnion([rating_id])})
    return {"message": "Rating added to list", "ratingId": rating_id}


def update_rating(rating_id: str, score: Optional[int] = None, review: Optional[str] = None):
    """
    Update a rating
    """
    rating_ref = db.collection("ratings").document(rating_id)
    if not rating_ref.get().exists:
        raise HTTPException(status_code=404, detail="Rating not found")

    update_data = {
        "updatedAt": datetime.now()
    }
    if score is not None:
        update_data["score"] = score
    if review is not None:
        update_data["review"] = review

    rating_ref.update(update_data)
    return {"message": "Rating updated"}


def get_all_lists_from_rating(target_rating: int):
    """
    Get all lists with a specific rating
    """
    rating_docs = db.collection("ratings").where(
        "score", "==", target_rating).get()
    list_ids = {rating.to_dict()["listId"] for rating in rating_docs}

    lists = []
    for list_id in list_ids:
        list_doc = db.collection("lists").document(list_id).get()
        if list_doc.exists:
            lists.append(list_doc.to_dict())

    return lists
