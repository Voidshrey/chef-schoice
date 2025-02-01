import axios from 'axios';


// Get a random meal
const getRandomMeal = async (req, res, next) => {
  try {
    const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
    res.json(response.data);
  } catch (error) {
     next(error.message);
  }
};

//ff2b4f4f004e4df292b590e563f9d05a

export { getRandomMeal };