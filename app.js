import express from 'express';
import connectDB from './config/db.js';
import mealRoutes from './routes/mealRoutes.js';


// Connect to database
connectDB();


let app = express();

// for json parsing
app.use(express.json());

app.use("/api/v1/meals", mealRoutes);

app.use((err, req, res, next) => {
    return res.status(400).json(err.message);
  });


export default app;