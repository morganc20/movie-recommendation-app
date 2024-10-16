from fastapi import HTTPException
from db import db
from firebase_admin import firestore
from model.list import ListCreate
from model.users import User

def create_list(list_data: ListCreate, current_user: User):
    new_list = {
        'userId': current_user.userId,
        'name': list_data.name,
        'description': list_data.description,
        'createdAt': firestore.SERVER_TIMESTAMP
    }
    list_ref = db.collection('lists').add(new_list)
    
    user_ref = db.collection('users').document(current_user.userId)
    user_ref.update({'listIds': firestore.ArrayUnion([list_ref[1].id])})
    
    return {"listId": list_ref[1].id, "message": "List created successfully"}