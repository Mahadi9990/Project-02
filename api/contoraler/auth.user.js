import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandeler } from "../utils/error.js";

export const singup =async(req,res,next)=>{
    const {userName,password,email}=req.body;
    const hashPassword =bcryptjs.hashSync(password,10)
    const newUser =new User({userName,password:hashPassword,email})
    try {
        await newUser.save()
        res.status(201).json("User create successfuly")
    } catch (error) {
        next(error)
    }
}