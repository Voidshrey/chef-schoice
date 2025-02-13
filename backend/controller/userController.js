import User from '../models/User.js';
import jsonwebToken from 'jsonwebtoken';
import { generateToken } from '../util/generateToken.js';

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

    const token = generateToken(user._id);

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user , token });
  } catch (error) {
    next(error);
  }
};


const loginUser = async(req , res, next) =>{
  try{
    const { email  , password } = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser){
      throw new Error("User does not exist please register");
    }
    if(!existingUser.verifyPassword(password)){
      throw new Error("Invalid password please verify");
    }
    const token = generateToken(existingUser._id);
    res.status(200).json({message: "User logged in successfully" , user: existingUser , token});
  }catch(error){
next(error);
  }
}

export { registerUser , loginUser };