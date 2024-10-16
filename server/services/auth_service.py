from fastapi import HTTPException
from db import db
from model.users import UserCreate, User
from utils.security import get_password_hash, verify_password, create_access_token


def register_user(user: UserCreate):
    existing_user = db.collection('users').where('email', '==', user.email).get()
    if len(existing_user) > 0:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password, salt = get_password_hash(user.password)
    
    new_user = {
        'username': user.username,
        'email': user.email,
        'passwordHash': hashed_password,
        'salt': salt,
        'listIds': []
    }
    user_ref = db.collection('users').add(new_user)
    
    return {"userId": user_ref[1].id, "message": "User registered successfully"}

def login_user(email: str, password: str):
    user_docs = db.collection('users').where('email', '==', email).get()
    if len(user_docs) == 0:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user_doc = user_docs[0]
    user_data = user_doc.to_dict()
    
    if not verify_password(password, user_data['passwordHash'], user_data['salt']):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = create_access_token(data={"sub": user_doc.id})
    return {"access_token": access_token, "token_type": "bearer"}