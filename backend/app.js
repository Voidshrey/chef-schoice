import express from 'express';
import connectDB from './config/db.js';
import mealRoutes from './routes/mealRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';


// Connect to database
connectDB();


let app = express();

// for json parsing
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use("/api/v1/meal", mealRoutes);
app.use("/api/v1/user", userRoutes);

app.use(errorHandler);


export default app;