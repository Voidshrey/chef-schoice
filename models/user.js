const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  favoriteMeals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }], 
  dietaryPreferences: { type: String, enum: ['vegetarian', 'vegan', 'gluten-free', 'none'], default: 'none' } // Optional: For filtering meals
});

module.exports = mongoose.model('User', userSchema);