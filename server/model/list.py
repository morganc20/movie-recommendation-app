'''
This module contains the Pydantic models for the list.
'''
from datetime import datetime
from typing import List
from pydantic import BaseModel


class ListCreate(BaseModel):
    """
    ListCreate is the Pydantic model for creating a list.
    """
    userId: str  # Reference to the users collection
    name: str
    description: str
    createdAt: datetime
    contentIds: List[str]  # List of content IDs
    ratings: List[str]  # List of rating IDs associated with the list
    active: bool = True  # Default to True