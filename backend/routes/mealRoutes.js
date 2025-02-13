import express from 'express';
import { getRandomMeal , addFavoriteMeal , getFavoriteMeals , removeFavoriteMeal} from '../controller/mealsController.js';
import { auth } from '../middleware/auth.js';


const router = express.Router();

router.get('/random',auth,getRandomMeal);
router.post('/favorite', addFavoriteMeal);
router.get('/favorite/:userId', getFavoriteMeals);
router.post('/favorite/delete', removeFavoriteMeal);

export default router;