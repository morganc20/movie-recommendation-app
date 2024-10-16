import bcrypt
import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from db import db
from model.users import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def get_password_hash(password: str) -> tuple:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed, salt

def verify_password(plain_password: str, hashed_password: str, salt: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    user_doc = db.collection('users').document(user_id).get()
    if not user_doc.exists:
        raise HTTPException(status_code=401, detail="User not found")
    
    user_data = user_doc.to_dict()
    user_data['userId'] = user_id  

    return User(**user_data)
