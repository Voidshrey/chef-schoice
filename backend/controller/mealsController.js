import User from '../models/User.js';
import Meal from '../models/Meal.js';
import axios from 'axios';

// Get a random meal
const getRandomMeal = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const mealData = response.data.meals[0];

    // Check if the meal already exists in the database
    let meal = await Meal.findOne({ mealId: mealData.idMeal });

    if (!meal) {
      // Create a new meal document
      meal = new Meal({
        mealId: mealData.idMeal,
        name: mealData.strMeal,
        category: mealData.strCategory,
        instructions: mealData.strInstructions,
        image: mealData.strMealThumb,
        ingredients: [],
      });

      // Add ingredients to the meal document
      for (let i = 1; i <= 20; i++) {
        if (mealData[`strIngredient${i}`]) {
          if (mealData[`strMeasure${i}`] !== "") {
            meal.ingredients.push({
              ingredient: mealData[`strIngredient${i}`],
            });
          }
        }
      }

      // Save the meal to the database
      await meal.save();
    }

    res.json(meal);
  } catch (error) {
    next(error.message);
  }
};

const addFavoriteMeal = async (req, res, next) => {
  try {
    const { id, mealId } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favoriteMeals.includes(mealId)) {
      user.favoriteMeals.push(mealId);
      await user.save();
    }

    res.status(200).json({ message: "Meal added to favorites" });
  } catch (error) {
    next(error);
  }
};

const removeFavoriteMeal = async (req, res, next) => {
  try {
    const { id, mealId } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.favoriteMeals.includes(mealId)) {
      let index = user.favoriteMeals.indexOf(mealId);
      if (index > -1) {
        user.favoriteMeals.splice(index, 1); // index of eleme and delete 1 from that
        await user.save();
      }
    } else {
      return res.status(404).json({ message: "Meal not found to remove" });
    }

    res
      .status(200)
      .json({ message: "Meal removed from favorites successfully" });
  } catch (error) {
    next(error);
  }
};

const getFavoriteMeals = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteMeals = [];
    const mealIdsSet = new Set();
    for (const mealId of user.favoriteMeals) {
      let meal = await Meal.findOne({ mealId });
      if (!meal) {
        // Fetch meal details from external API
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const mealData = response.data.meals[0];

        // Create a new meal document
        meal = new Meal({
          mealId: mealData.idMeal,
          name: mealData.strMeal,
          category: mealData.strCategory,
          instructions: mealData.strInstructions,
          image: mealData.strMealThumb,
          ingredients: [],
        });

        // Add ingredients to the meal document
        for (let i = 1; i <= 20; i++) {
          if (mealData[`strIngredient${i}`]) {
            meal.ingredients.push({
              ingredient: mealData[`strIngredient${i}`],
              measure: mealData[`strMeasure${i}`] || "",
            });
          }
        }

        // Save the meal to the database
        await meal.save();

        // Add the meal ID to the user's favorites
        user.favoriteMeals.push(mealId);
        await user.save();
      }
      if (!mealIdsSet.has(meal.mealId)) {
        mealIdsSet.add(meal.mealId);
        favoriteMeals.push(meal);
      }
    }

    res.json(favoriteMeals);
  } catch (error) {
    console.error(`Error fetching favorite meals: ${error.message}`);
    next(error);
  }
};

export { getRandomMeal, addFavoriteMeal, getFavoriteMeals, removeFavoriteMeal };
