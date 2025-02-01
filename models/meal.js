import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    mealId: { type: String, required: true, unique: true }, // ID from the third-party API
    name: { type: String, required: true },
    category: { type: String },
    instructions: { type: String },
    image: { type: String },
    ingredients: [{ ingredient: String }]
  });
  
export default mongoose.model('Meal', mealSchema);