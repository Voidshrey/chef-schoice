import React, { useState, useEffect ,useContext} from 'react';
import { getRandomMeal , postFavoriteMeal } from '../service/mealHelper.js';
import { useNavigate } from 'react-router-dom';
import '../Home.css';
import { UserContext } from '../context/UserContext.jsx';

function Home() {
  const { userId } = useContext(UserContext);
    const navigate = useNavigate();
  const [meal, setMeal] = useState(null);

  const fetchRandomMeal = async () => {
    try {
      const data = await getRandomMeal();
      setMeal(data);
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  const addToFavorites = async () => {
    try {
      await postFavoriteMeal(userId, meal.mealId);
      console.log(`Added meal to favorites for user ${userId}`);
    } catch (error) {
      console.error('Error adding to favorites:', error);
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
            <button className="fav-button" onClick={addToFavorites}>Add to Favorites</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={fetchRandomMeal} className="next-button">Next</button>
      <button onClick={() => navigate('/favorites', { state: { userId } })} className="favorites-button">Go to Favorites</button>

    </div>
  );
}

export default Home;