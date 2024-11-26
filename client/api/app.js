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

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getAllUsers`);
    if (
      response.data &&
      response.data.data &&
      Array.isArray(response.data.data.users)
    ) {
      return response.data.data.users; // Extract the users array
    }
    return [];
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
};

export const updateUserDetails = async (userId, updatedData) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found");
      return null;
    }

    const response = await axios.patch(
      `${BASE_URL}/update-user/${userId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    return null;
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found");
      return null;
    }

    const response = await axios.delete(`${BASE_URL}/delete/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw error;
  }
};

export const getAllLists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/lists`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lists:", error);
    return [];
  }
};

export const updateList = async (listId, userId, description, active) => {
  try {
    const response = await axios.put(`${BASE_URL}/lists/${listId}/edit`, null, {
      params: {
        user_id: userId,
        description,
        active,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating list with ID ${listId}:`, error);
    return null;
  }
};

export const deleteList = async (listId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/lists/${listId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting list with ID ${listId}:`, error);
    throw error;
  }
};
