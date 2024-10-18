from fastapi import FastAPI
from routes import auth, lists, movies
from fastapi import Depends
from model.users import User
from utils.security import get_current_user
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

## url for frontend
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

app.include_router(auth.router)
app.include_router(lists.router)
app.include_router(movies.router)

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
    return {"message": "Hello World"}

## example of a protected route for future reference
@app.get("/protected")
async def protected_route(current_user: User = Depends(get_current_user)):
    return {"message": "This is a protected route"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)