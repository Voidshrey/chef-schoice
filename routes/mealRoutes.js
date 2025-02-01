import express from 'express';
import { getRandomMeal } from '../controller/mealsController.js';


const router = express.Router();

router.get('/random',getRandomMeal);


export default router;