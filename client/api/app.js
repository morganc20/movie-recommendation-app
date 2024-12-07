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

// fetch recommended content from the database and return it as an array
export const getRecommendedContent = async (
  amount = 10,
  content_type = "movie",
  genre = null,
  shuffle = false,
  avg_rating = 8.8
) => {
  try {
    const genreQuery = genre ? `&genre=${genre}` : "";
    const shuffleQuery = shuffle ? `&shuffle=${shuffle}` : "";
    const ratingQuery = `&avg_rating=${avg_rating}`;

    const response = await axios.get(
      `${BASE_URL}/content/recommendations/${amount}?content_type=${content_type}${shuffleQuery}${genreQuery}${ratingQuery}`
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

export const getMyLists = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lists/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user lists:", error);
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

<<<<<<< HEAD
export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get-user-details/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching user details for ID ${userId}:`, error);
=======
export const getTitleDetails = async (titleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/content/${titleId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching details for title with ID ${titleId}:`,
      error
    );
>>>>>>> feature/dynamic-routes
    return null;
  }
};

<<<<<<< HEAD
export const updateProfile = async (userId, updateData) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/update-profile/${userId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating profile for user ${userId}:`, error);
=======
export const getSimilarMoviesByGenre = async (genre, limit = 5) => {
  try {
    // /content/genre/{genre}/{amount}
    console.log(genre);
    const response = await axios.get(
      `${BASE_URL}/content/genre/${genre}/${limit}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching similar movies by genre "${genre}":`, error);
    return [];
  }
};

export const getUserLists = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lists/${userId}/all`);
    return response.data; // Return the array of lists
  } catch (error) {
    console.error("Error fetching user lists:", error);
    return [];
  }
};

export const addContentToList = async (listId, contentId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/lists/${listId}/content/${contentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding content to list:", error);
>>>>>>> feature/dynamic-routes
    throw error;
  }
};
