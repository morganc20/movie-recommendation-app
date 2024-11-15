from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class RatingCreate(BaseModel):
    """
    RatingCreate is the Pydantic model for creating a rating.
    """
    ratingId: str  # Auto-generated
    userId: str  # Reference to the users collection
    listId: str  # Reference to the lists collection
    score: int  # Rating score, expected to be between 1 and 5 (handled in frontend)
    review: Optional[str] = None  # Optional review text
    createdAt: datetime  # Timestamp for when the rating was created
    updatedAt: Optional[datetime] = None  # Timestamp for the last update

class RatingUpdate(BaseModel):
    """
    RatingUpdate is the Pydantic model for updating a rating.
    """
    score: Optional[int] = None  #score update, expected to be between 1 and 5(handled in frontend)
    review: Optional[str] = None  # Updated review text
    updatedAt: datetime  # Timestamp for when the rating was updated
