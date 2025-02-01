import User from '../models/User.js';

const registerUser = async (req, res, next) => {
  try {
    const { username, dietaryPreferences, email , password } = req.body;

    const user = new User({
      username,
      email,
        password,
      dietaryPreferences,
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
};

export { registerUser };