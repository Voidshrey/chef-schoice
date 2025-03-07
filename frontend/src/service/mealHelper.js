import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

export const getRandomMeal = async () => {
  try {
    const response = await axios.get(`${API_URL}/meal/random`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching random meal:", error);
    throw error;
  }
};

export const getFavoriteMeals = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/meal/favorite/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite meals:", error);
    throw error;
  }
};

export const postFavoriteMeal = async (mealBody) => {
  try {
    const response = await axios.post(`${API_URL}/meal/favorite`, mealBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error  adding  favorite meals:", error);
    throw error;
  }
};

export const removeFavoriteMeal = async (mealBody) => {
  try {
    const response = await axios.post(
      `${API_URL}/meal/favorite/delete`,
      mealBody,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting favorite meals:", error);
    throw error;
  }
};
