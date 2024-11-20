"""
    Report routes
"""
from fastapi import APIRouter
from model.reports import ReportCreate
from services.report_service import (
    create_report,
    get_report_by_id,
    get_reports_by_user_id,
    update_report_status,
    delete_report_by_id,
    get_reports_by_reported,
    update_superadmin_report_status,
    get_reports_for_review_part2
)

router = APIRouter()


@router.post("/reports")
async def create_report_route(report: ReportCreate):
    """
    Create a new report.
    """
    return create_report(report)


@router.get("/reports/{report_id}")
async def get_report_by_id_route(report_id: str):
    """
    Get report by report ID.
    """
    return get_report_by_id(report_id)


@router.get("/reports/user/{user_id}")
async def get_reports_by_user_id_route(user_id: str):
    """
    Get all reports created by a specific user.
    """
    return get_reports_by_user_id(user_id)


@router.get("/reports/reported/{reported}")
async def get_reports_by_reported_route(reported: str):
    """
    Get all reports for a specific reported user or entity.
    """
    return get_reports_by_reported(reported)


@router.patch("/reports/{report_id}/status")
async def update_report_status_route(report_id: str, approved: str):
    """
    Update the status of a report (approved or not).
    """
    return update_report_status(report_id, approved)


@router.patch("/reports/{report_id}/superadmin-status")
async def update_superadmin_report_status_route(report_id: str, approved: str):
    """
    Update the status of a report (approved or not). For superadmins
    """
    return update_superadmin_report_status(report_id, approved)


@router.delete("/reports/{report_id}")
async def delete_report_route(report_id: str):
    """
    Delete a report by ID.
    """
    return delete_report_by_id(report_id)


@router.get("/reports")
async def get_reports_for_review_part2_route():
    """
    Get all reports awaiting review. For moderators
    """
    return get_reports_for_review_part2()
