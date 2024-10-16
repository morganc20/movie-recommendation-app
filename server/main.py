from fastapi import FastAPI
from routes import auth, lists, movies
from fastapi import Depends
from model.users import User
from utils.security import get_current_user

app = FastAPI()

app.include_router(auth.router)
app.include_router(lists.router)
app.include_router(movies.router)

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