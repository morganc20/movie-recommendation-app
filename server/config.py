import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "empty")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
ALGORITHM = "HS256"

DOCKER_CREDENTIALS_PATH = "/app/projectkey.json"
LOCAL_CREDENTIALS_PATH = "projectkey.json"

# Use environment variable if provided, otherwise fallback to Docker or local paths
FIREBASE_CREDENTIALS_PATH = (
    os.getenv("FIREBASE_CREDENTIALS_PATH")
    or (DOCKER_CREDENTIALS_PATH if os.path.exists(DOCKER_CREDENTIALS_PATH) else LOCAL_CREDENTIALS_PATH)
)

# Raise an error if no valid credentials are found
if not os.path.exists(FIREBASE_CREDENTIALS_PATH):
    raise FileNotFoundError(
        f"Firebase credentials not found at {FIREBASE_CREDENTIALS_PATH}"
    )
