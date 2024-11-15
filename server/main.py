"""
This is the main file for the FastAPI server. 
It contains the FastAPI app and the routes for the server.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends
import os
from dotenv import load_dotenv
from routes import auth, lists
from model.users import User
from server.routes import content
from utils.security import get_current_user

load_dotenv()
app = FastAPI()

## url for frontend
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.include_router(auth.router)
app.include_router(lists.router)
app.include_router(content.router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
async def root():
    """
    Root route for the server.
    """
    return {"message": "Hello World"}

## example of a protected route for future reference
@app.get("/protected")
async def protected_route(current_user: User = Depends(get_current_user)):
    """
    Example of a protected route.
    """
    return {"message": "This is a protected route"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
