import React, { useState, useEffect, useContext } from "react";
import { getFavoriteMeals, removeFavoriteMeal } from "../service/mealHelper.js";
import { UserContext } from "../context/UserContext.jsx";
import "../Favorites.css";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { useSnackbar } from "react-simple-snackbar";
import { successOptions, errorOptions } from "../utils/common.js";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();
  const [successOpen, successClose] = useSnackbar(successOptions);
  const [errorOpen, errorClose] = useSnackbar(errorOptions);

  useEffect(() => {
    fetchFavorites();
  }, [userId]);

  const fetchFavorites = async () => {
    try {
      const data = await getFavoriteMeals(userId);
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorite meals:", error);
    }
  };

  const  handleMealDelte = async(mealId)=>{
    try {
      if (mealId === null || userId === null) {
        errorOpen("Error in removing in meal.!!", 3000);
      } else {
        const body = {
          id: userId,
          mealId,
        };

        const response = await removeFavoriteMeal(body);
        if (response.message === "Meal removed from favorites successfully") {
          await fetchFavorites();
          successOpen("Meal removed from favorites successfully", 3000);
        } else {
          errorOpen("Error in removing meal.!!", 3000);
        }
      }
    } catch (error) {
      errorOpen("Error in removing meal.!!", 3000);
    }
  };

  return (
    <div className="favorites-container">
      <h2>Your Favorite Meals</h2>
      {favorites.length > 0 ? (
        <ul className="favorites-list">
          {favorites.map((meal) => (
            <li key={meal.id} className="favorite-item">
              <img
                src={meal.image}
                alt={meal.name}
                className="favorite-image"
              />
              <div className="favorite-info">
                <h3>{meal.name}</h3>
                <p>{meal.instructions}</p>
              </div>
              <MdDeleteForever onClick={() => handleMealDelte(meal.mealId)} className="favorit-delete-icon" title="Delete this meal from fav.?"/>
            </li>
          ))} 
        </ul>
      ) : (
        <p>No favorite meals found.</p>
      )}
      <button onClick={() => navigate("/home")} className="favorites-button">
        Go back Home
      </button>
    </div>
  );
}

export default Favorites;
