import React, { useState, useEffect, useContext } from "react";
import { getRandomMeal, postFavoriteMeal } from "../service/mealHelper.js";
import { useNavigate } from "react-router-dom";
import "../Home.css";
import { UserContext } from "../context/UserContext.jsx";
import { useSnackbar } from "react-simple-snackbar";
import { successOptions, errorOptions } from "../utils/common.js";
function Home() {
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [successOpen, successClose] = useSnackbar(successOptions);
  const [errorOpen, errorClose] = useSnackbar(errorOptions);

  const fetchRandomMeal = async () => {
    try {
      const data = await getRandomMeal();
      setMeal(data);
    } catch (error) {
      console.error("Error fetching random meal:", error);
      errorOpen("Error fetching random meal:", 3000);
    }
  };

  const addToFavorites = async () => {
    try {
      let mealBody = {
        id: userId,
        mealId: meal.mealId,
      };
      await postFavoriteMeal(mealBody);
      successOpen(`Added ${meal?.name} to favorites`, 3000);
    } catch (error) {
      errorOpen("Error adding to favorites:", 3000);
      if(userId=== null){
        errorOpen("something went wrong please login again.!!", 3000);
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return (
    <div className="home-container">
      {meal ? (
        <div className="meal-card">
          <img src={meal.image} alt={meal.name} className="meal-image" />
          <div className="meal-info">
            <h2>{meal.name}</h2>
            <p>{meal.instructions}</p>
            <button className="fav-button" onClick={addToFavorites}>
              Add to Favorites
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={fetchRandomMeal} className="next-button">
        Next
      </button>
      <button
        onClick={() => navigate("/favorites", { state: { userId } })}
        className="favorites-button"
      >
        Go to Favorites
      </button>
    </div>
  );
}

export default Home;
