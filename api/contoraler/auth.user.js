import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandeler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

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

export const singin =async(req,res,next)=>{
    const {password,email}=req.body;
    try {
        const validUser =await User.findOne({email})
        if(!validUser)return next(errorHandeler(200,"User not found"))
        const validPassword =bcryptjs.compareSync(password,validUser.password)
        if(!validPassword)return next(errorHandeler(201,"Wrong cradintals"))
        const token =jwt.sign({id:validUser._id},process.env.JWTWEBTOKEN)
        const {password:pass,...rest}=validUser._doc;
        res
        .cookie("access_token",token,{httpOnly:true})
        .status(200)
        .json(rest)
    } catch (error) {
        next(error)
    }
}




export const google =async(req,res,next)=>{
    try {
        const user =await User.findOne({email:req.body.email})
        if(user){
            const token =jwt.sign({id: user._id},process.env.JWTWEBTOKEN)
            const {password:pass,...rest} =user._doc;
            res
            .cookie('access_token',token,{httpOnly:true})
            .status(200)
            .json(rest)
        }else{
            const generatedPassword =Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashPassword =bcryptjs.hashSync(generatedPassword,10)
            const newUser =new User({
                userName:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
                email:req.body.email,
                password:hashPassword,
                avater:req.body.photo
            })
            await newUser.save()
            const token =jwt.sign({id:newUser._id},process.env.JWTWEBTOKEN)
            const {password:pass,...rest} =newUser._doc;
            res
            .cookie("access_token",token,{httpOnly:true})
            .status(200)
            .json(rest)

            

        }
    } catch (error) {
        next(error)
    }
}