import { errorHandeler } from "../utils/error.js"
import bcrypejs from 'bcryptjs'
import User from '../models/user.model.js'
import listing from "../models/list.model.js"



export const update =async(req,res,next)=>{
    
    if( req.user.id !== req.params.id) return next(errorHandeler(403,'You can update your won account'))
    try {
        if(req.body.password){
            req.body.password =bcrypejs.hashSync(req.body.password,10)
        }

        const updateUser =await User.findByIdAndUpdate(req.params.id,{
            $set:{
                userName:req.body.userName,
                email:req.body.email,
                password:req.body.password,
                avater:req.body.avater
            }
        },{new:true})

        const {password:pass,...rest} =updateUser._doc;

        res.status(200).json(rest)
    
    } catch (error) {
       next(error) 
    }
}

export const deleteUser =async(req,res,next)=>{
    if(req.user.id !== req.params.id ) next(errorHandeler(401,'You can delete your own account'))
    try {
       await User.findByIdAndDelete( req.params.id)
       res.clearCookie('access_token')
       res.status(200).json({message:'User hasbeen delete'})
    } catch (error) {
        next(error)
    }
}

export const singOut =async(req,res,next)=>{
    try {
       res.clearCookie('access_token')
       res.status(200).json({message:'User sing out'})
    } catch (error) {
        next(error)
    }
}


export  const list=async(req,res,next)=>{
    try {
        const listings =await listing.create(req.body)
        res.status(201).json(listings)
    } catch (error) {
        next(error)
    }    
}