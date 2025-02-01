import express from 'express';
import connectDB from './config/db.js';
import mealRoutes from './routes/mealRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middleware/errorHandler.js';


// Connect to database
connectDB();


let app = express();

// for json parsing
app.use(express.json());

app.use("/api/v1/meals", mealRoutes);
app.use("/api/v1/user", userRoutes);

app.use(errorHandler);


export default app;