import React, { useState, useEffect ,useContext} from 'react';
import { getFavoriteMeals } from '../service/mealHelper.js';
import { UserContext } from '../context/UserContext.jsx';
import '../Favorites.css';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { userId } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteMeals(userId);
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorite meals:', error);
      }
    };

    fetchFavorites();
  }, [userId]);

  return (
    <div className="favorites-container">
      <h2>Your Favorite Meals</h2>
      {favorites.length > 0 ? (
        <ul className="favorites-list">
          {favorites.map((meal) => (
            <li key={meal.id} className="favorite-item">
              <img src={meal.image} alt={meal.name} className="favorite-image" />
              <div className="favorite-info">
                <h3>{meal.name}</h3>
                <p>{meal.instructions}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite meals found.</p>
      )}
      <button
        onClick={() => navigate("/home")}
        className="favorites-button"
      >
        Go back Home
      </button>
    </div>
  );
}

export default Favorites;