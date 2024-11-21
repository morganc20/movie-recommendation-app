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
    firstName: str
    lastName: str
    password: str
    role: str = "user"


class User(BaseModel):
    '''
    User is the Pydantic model for users.
    '''
    userId: str
    username: str
    email: EmailStr


class UserView(BaseModel):
    '''
    UserView is the Pydantic model for the user view.
    '''
    firstName: str
    lastName: str
    email: str
    username: str


class TokenResponse(BaseModel):
    '''
    TokenResponse is the Pydantic model for the token response.
    '''
    access_token: str
    token_type: str = "Bearer"
    userId: str
    username: str
    role: str


class LoginRequest(BaseModel):
    '''
    LoginRequest is the Pydantic model for the login request.
    '''
    email: EmailStr
    password: str
