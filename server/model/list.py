'''
This module contains the Pydantic models for the list.
'''
from datetime import datetime
from typing import List
from pydantic import BaseModel
from typing import Optional


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


class ListView(BaseModel):
    """
    ListView is the Pydantic model for viewing a list.
    """
    userId: str
    listId: str
    name: str
    description: str
    active: bool
    ownerName: Optional[str] = None
