'''
This module contains the Pydantic models for the reports.
'''
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ReportCreate(BaseModel):
    '''
    ReportCreate is the Pydantic model for creating reports
    '''
    reportId: str  # Auto-generated
    userId: str  # User creating the report
    reportedId: str  # ID of the user or entity being reported
    listId: Optional[str] = None  # Optional, if applicable
    description: str
    approved: str = "screened"  # Default to "screened"
    timestamp: datetime = datetime.now()  # Auto-generated


class ReportView(BaseModel):
    '''
    ReportView is the Pydantic model forthe result of a get 
    '''
    reportId: str  # Auto-generated
    listName: str  # from listId
    listOwner: str  # from reportedId
    listId: str  # from listId
    userId: str  # User creating the report
    description: str  # Description of the report
    reportDate: datetime  # Timestamp of the report from timestamp
