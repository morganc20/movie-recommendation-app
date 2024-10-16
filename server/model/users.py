from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class User(BaseModel):
    userId: str
    username: str
    email: str
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "Bearer"


class LoginRequest(BaseModel):
    email: str
    password: str
