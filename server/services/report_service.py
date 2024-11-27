"""
Contains the service functions for the report endpoints.
"""
from typing import List
from fastapi import HTTPException
from db import db
from model.reports import ReportCreate, ReportView


def create_report(report: ReportCreate):
    """
    Create a new report.
    """
    new_report = {
        'userId': report.userId,
        'reportedId': report.reportedId,
        'listId': report.listId,
        'description': report.description,
        'approved': "screened",
        'timestamp': report.timestamp
    }
    report_ref = db.collection('reports').add(new_report)
    return {"reportId": report_ref[1].id, "message": "Report created successfully"}


def get_reports_for_review_part2() -> List[dict]:
    """
    Get all reports that are not yet approved and return them as a list of dictionaries.
    """
    # Get all reports where 'approved' is 'screened'
    report_docs = db.collection('reports').where(
        'approved', '==', 'screened').get()

    if not report_docs:
        return []

    reports_for_review = []

    for report_doc in report_docs:
        report_data = report_doc.to_dict()

        list_id = report_data.get('listId', 'N/A')
        list_name = "N/A"
        list_owner = "N/A"

        if list_id != "N/A":
            # Fetch the list document
            list_doc = db.collection('lists').document(list_id).get()
            if list_doc.exists:
                list_data = list_doc.to_dict()
                list_name = list_data.get('name', 'N/A')
                list_owner_id = list_data.get('userId', 'N/A')

                if list_owner_id != "N/A" and list_owner_id.strip():
                    user_doc = db.collection(
                        'users').document(list_owner_id).get()
                    if user_doc.exists:
                        user_data = user_doc.to_dict()
                        first_name = user_data.get('firstName', '').strip()
                        last_name = user_data.get('lastName', '').strip()
                        list_owner = f"{first_name} {last_name}".strip() or user_data.get('username', 'N/A')

        report_id = report_doc.id
        report_view = ReportView(
            reportId=report_id,
            listName=list_name,
            listOwner=list_owner,
            listId=list_id,
            userId=report_data['userId'],
            description=report_data['description'],
            reportDate=report_data['timestamp']
        )

        reports_for_review.append(report_view)

    return [report.dict() for report in reports_for_review]


def get_reports_for_admin_review() -> List[dict]:
    """
    Get all reports that are not yet approved and return them as a list of dictionaries for admin review.
    """
    # Get all reports where 'approved' is 'screened'
    report_docs = db.collection('reports').where(
        'approved', '==', 'pending').get()

    if not report_docs:
        return []

    reports_for_review = []

    for report_doc in report_docs:
        report_data = report_doc.to_dict()

        list_name = "N/A"
        list_owner = "N/A"

        if report_data.get('listId'):
            list_doc = db.collection('lists').document(
                report_data['listId']).get()
            if list_doc.exists:
                list_data = list_doc.to_dict()
                list_name = list_data.get('name', 'N/A')
                list_owner = list_data.get('userId', 'N/A')

        # Check if 'list_owner' is a valid Firestore document ID before querying
        if list_owner != "N/A" and list_owner.strip():
            user_doc = db.collection('users').document(list_owner).get()
            if user_doc.exists:
                user_data = user_doc.to_dict()
                list_owner = user_data.get('username', 'N/A')

        # Create a ReportView instance to represent the report
        report_id = report_doc.id
        report_view = ReportView(
            reportId=report_id,
            listName=list_name,
            listOwner=list_owner,
            listId=report_data['listId'],
            userId=report_data['userId'],
            description=report_data['description'],
            reportDate=report_data['timestamp']
        )

        reports_for_review.append(report_view)

    return [report.dict() for report in reports_for_review]


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


def get_reports_by_reported(reportedId: str):
    """
    Get all reports for a specific reported user or entity.
    """
    report_docs = db.collection('reports').where(
        'reportedId', '==', reportedId).get()
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
    Update the status of a report (approved or not). change from pending 
    to approved or rejected this is for admin
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
