import User from '../models/User.js';

const registerUser = async (req, res, next) => {
  try {
    const { username, dietaryPreferences, email , password } = req.body;

 let  eshixtingUser = await User.findOne({email});

 if(eshixtingUser)
  throw new Error("User already exists please login");

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