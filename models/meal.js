const mealSchema = new mongoose.Schema({
    mealId: { type: String, required: true, unique: true }, // ID from the third-party API
    name: { type: String, required: true },
    category: { type: String },
    instructions: { type: String },
    image: { type: String },
    ingredients: [{ type: String }]
  });
  
  module.exports = mongoose.model('Meal', mealSchema);