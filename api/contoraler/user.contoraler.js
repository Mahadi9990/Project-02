import { errorHandeler } from "../utils/error.js"
import bcrypejs from 'bcryptjs'
import User from '../models/user.model.js'



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