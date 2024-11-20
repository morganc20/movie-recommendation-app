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
