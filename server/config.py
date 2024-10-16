import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "empty")
ACCESS_TOKEN_EXPIRE_MINUTES =  os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
ALGORITHM = "HS256"
FIREBASE_CREDENTIALS_PATH = os.getenv("FIREBASE_CREDENTIALS_PATH", "empty")

