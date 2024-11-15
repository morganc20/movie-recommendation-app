'''
This module contains the Pydantic models for the users.
'''
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    '''
    UserCreate is the Pydantic model for creating users.
    '''
    username: str
    email: EmailStr
    password: str


class User(BaseModel):
    '''
    User is the Pydantic model for users.
    '''
    userId: str
    username: str
    email: EmailStr


class TokenResponse(BaseModel):
    '''
    TokenResponse is the Pydantic model for the token response.
    '''
    access_token: str
    token_type: str = "Bearer"


class LoginRequest(BaseModel):
    '''
    LoginRequest is the Pydantic model for the login request.
    '''
    email: EmailStr
    password: str
