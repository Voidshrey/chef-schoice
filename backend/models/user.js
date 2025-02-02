import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteMeals: [{ type: String, ref: 'Meal' }], 
  dietaryPreferences: { type: String, enum: ['vegetarian', 'Vegan', 'Breakfast', 'Chicken','Dessert',
     'non-vegetarian','Pasta','none' , 'Seafood' , 'Starter'], default: 'none' } // Optional: For filtering meals
});

userSchema.methods.verifyPassword = function verifyPassword(password){
  return password === this.password;
};

export default mongoose.model('User', userSchema);