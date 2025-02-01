import express from 'express';
import { getRandomMeal , addFavoriteMeal , getFavoriteMeals} from '../controller/mealsController.js';


const router = express.Router();

router.get('/random',getRandomMeal);
router.post('/meals/favorite', addFavoriteMeal);
router.get('/meals/favorite/:userId', getFavoriteMeals);



export default router;