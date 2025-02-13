import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User.js';


export const auth = async(req , res , next) =>{
    const autheader = req.headers.authorization;
    if(!autheader){
        return res.status(401).send('User Unhotherised please login');
    }
    const token = autheader.split(' ')[1];
    const decodeId = jsonwebtoken.verify(token,process.env.JWT_SECRET);
    const existingUser = User.findById(decodeId.id);

    if(!existingUser){
      throw new Error("User doesn't exisits please register")
    }
    req.id = existingUser._id;
    next();
}

