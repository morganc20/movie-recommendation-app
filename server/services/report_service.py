"""
Contains the service functions for the report endpoints.
"""
from fastapi import HTTPException
from db import db
from model.reports import ReportCreate


def create_report(report: ReportCreate):
    """
    Create a new report.
    """
    new_report = {
        'userId': report.userId,
        'reported': report.reported,
        'listId': report.listId,
        'description': report.description,
        'approved': "screened",
    }
    report_ref = db.collection('reports').add(new_report)
    return {"reportId": report_ref[1].id, "message": "Report created successfully"}


def get_report_by_id(report_id: str):
    """
    Get report by report ID.
    """
    report_doc = db.collection('reports').document(report_id).get()
    if not report_doc.exists:
        raise HTTPException(status_code=404, detail="Report not found")
    return report_doc.to_dict()


def get_reports_by_user_id(user_id: str):
    """
    Get all reports created by a specific user.
    """
    report_docs = db.collection('reports').where('userId', '==', user_id).get()
    return [doc.to_dict() for doc in report_docs]


def get_reports_by_reported(reported: str):
    """
    Get all reports for a specific reported user or entity.
    """
    report_docs = db.collection('reports').where(
        'reported', '==', reported).get()
    return [doc.to_dict() for doc in report_docs]

def get_reports_for_review():
    """
    Get all reports that are not yet approved. approved is str rangin from "screened pending approved and rejected"
    """
    report_docs = db.collection('reports').where(
        'approved', '==', 'screened').get()
    return [doc.to_dict() for doc in report_docs]


def update_report_status(report_id: str, approved: str):
    """
    Update the status of a report (approved or not). change from screened to pending
    """
    report_ref = db.collection('reports').document(report_id)
    if not report_ref.get().exists:
        raise HTTPException(status_code=404, detail="Report not found")

    report_ref.update({'approved': approved})
    return {"message": "Report status updated from screened to pending"}

def update_superadmin_report_status(report_id: str, approved: str):
    """
    Update the status of a report (approved or not). change from pending to approved or rejected this is for admin
    """
    report_ref = db.collection('reports').document(report_id)
    if not report_ref.get().exists:
        raise HTTPException(status_code=404, detail="Report not found")

    report_ref.update({'approved': approved})
    return {"message": "Report status updated from pending to approved or rejected"}

def delete_report_by_id(report_id: str):
    """
    Delete a report by ID.
    """
    report_ref = db.collection('reports').document(report_id)
    if not report_ref.get().exists:
        raise HTTPException(status_code=404, detail="Report not found")

    report_ref.delete()
    return {"message": "Report deleted successfully"}
