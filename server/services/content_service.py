from fastapi import HTTPException
from db import db
from firebase_admin import firestore
from server.model.content import ContentCreate
from model.users import User
from model.list import ListContentCreate
from datetime import datetime

def add_content(content: ContentCreate):
    new_content = {
        'title': content.title,
        'director': content.director,
        'releaseYear': content.releaseYear,
        'genre': content.genre,
        'type': content._type,
        'synopsis': content.synopsis
    }
    content_ref = db.collection('content').add(new_content)

    return {"contentId": content_ref[1].id, "message": "Content added successfully"}

def add_content_to_list(list_content: ListContentCreate, current_user: User):
    list_doc = db.collection('lists').document(list_content.listId).get()
    if not list_doc.exists or list_doc.to_dict()['userId'] != current_user.userId:
        raise HTTPException(status_code=403, detail="Not authorized to modify this list")
    
    content_doc = db.collection('content').document(list_content.contentId).get()
    if not content_doc.exists:
        raise HTTPException(status_code=404, detail="Content not found")
    
    # Set the current time
    list_content.addedAt = datetime.now()
    
    # Create a new document reference with an auto-generated ID
    list_content_ref = db.collection('list_content').document()
    
    # Set the listContentId to the auto-generated ID
    list_content.listContentId = list_content_ref.id
    
    # Add the document to Firestore
    list_content_ref.set(list_content.model_dump())
    
    return {"listContentId": list_content.listContentId, "message": "Content added to list successfully"}