import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    favoriteMeals: [{ type: String, ref: "Meal" }],
  },
  {
    timestamps: true,
  }
);

// verifying saved pass with user input
userSchema.methods.verifyPassword = async function verifyPassword(pass) {
  return await bcrypt.compare(pass, this.password);
};

// pre hook to hash password before save
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model("User", userSchema);
