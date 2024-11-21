// API/app.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Fetch all content from the database and return it as an array
export const getAllContent = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/content`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all content:", error);
    return [];
  }
};

// Fetch content with avgRating greater than 7.5 since 2020 (can tweak later to get more relevant content)
export const getRecommendedContent = async (amount = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/content/recommendations/${amount}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended content:", error);
    return [];
  }
};

export const getReportsForReview = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/reports`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports for review:", error);
    return [];
  }
};

export const updateReportStatus = async (reportId, approved) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/reports/${reportId}/status?approved=${approved}`,
      {
        approved,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating report status:", error);
    return null;
  }
};

export const getAdminReportsForReview = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/report`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin reports for review:", error);
    return [];
  }
};

export const updateListPrivacy = async (listId, isPrivate) => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found");
      return null;
    }

    const response = await axios.patch(
      `${BASE_URL}/lists/${listId}/privacy?is_private=${isPrivate}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating list privacy:", error);
    return null;
  }
};
