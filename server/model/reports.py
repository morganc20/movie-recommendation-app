'''
This module contains the Pydantic models for the reports.
'''
from typing import Optional
from pydantic import BaseModel


class ReportCreate(BaseModel):
    '''
    ReportCreate is the Pydantic model for creating reports
    '''
    reportId: str  # Auto-generated
    userId: str  # User creating the report
    reported: str  # ID of the user or entity being reported
    listId: Optional[str] = None  # Optional, if applicable
    description: str
    approved: str = "screened"  # Default to "screened"
