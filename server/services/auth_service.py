'''
This file contains the business logic for user registration and login.
'''
from fastapi import HTTPException
from db import db
from model.users import UserCreate
from utils.security import get_password_hash, verify_password, create_access_token


async def register_user(user: UserCreate):
    """
    Register a new user.
    """
    existing_user = db.collection('users').where(
        'email', '==', user.email).get()
    if len(existing_user) > 0:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password, salt = get_password_hash(user.password)
    new_user = {
        'username': user.username,
        'email': user.email,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'passwordHash': hashed_password,
        'salt': salt,
        'listIds': [],
        'role': user.role
    }
    user_ref = db.collection('users').add(new_user)
    return {"userId": user_ref[1].id, "message": "User registered successfully"}


async def login_user(email: str, password: str):
    """
    Log in a user.
    """
    user_docs = db.collection('users').where('email', '==', email).get()
    if len(user_docs) == 0:
        raise HTTPException(
            status_code=401, detail="Invalid email or password")

    user_doc = user_docs[0]
    user_data = user_doc.to_dict()

    if not verify_password(password, user_data['passwordHash'], user_data['salt']):
        raise HTTPException(
            status_code=401, detail="Invalid email or password")

    access_token = create_access_token(data={"sub": user_doc.id})

    # Include the userId and username in the return data
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "userId": user_doc.id,
        "username": user_data['username']
    }


async def get_user_by_id(user_id: str):
    """
    Get a user by their ID.
    """
    user_doc = db.collection('users').document(user_id).get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found")

    user_data = user_doc.to_dict()
    return user_data


async def get_user_role(user_id: str):
    """
    Get the role of a user by their ID.
    """
    user_doc = db.collection('users').document(user_id).get()
    if not user_doc.exists:
        raise HTTPException(status_code=404, detail="User not found")

    user_data = user_doc.to_dict()
    return user_data['role']


async def promote_user_to_mod(user_id: str):
    """
    Promote a user to moderator.
    """
    user_ref = db.collection('users').document(user_id)
    if not user_ref.get().exists:
        raise HTTPException(status_code=404, detail="User not found")

    user_ref.update({'role': 'moderator'})
    return {"message": "User promoted to moderator"}
