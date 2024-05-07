import { errorHandeler } from "../utils/error.js"
import bcrypejs from 'bcryptjs'
import User from '../models/user.model.js'
import Listing from "../models/list.model.js"



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
        const listings =await Listing.create(req.body)
        res.status(201).json(listings)
    } catch (error) {
        next(error)
    }    
}

export const listing=async (req,res,next)=>{
    if(req.user.id !== req.params.id) next(errorHandeler(201,'You can see your own listing'))
        try {
            const listings =await Listing.find({userRef:req.params.id})
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    
        
    
    
}


export const deleteList=async (req,res,next)=>{
    const listings =await Listing.findById(req.params.id)
    if(!listings) next(errorHandeler(202,'Listings is not found'))
    if(req.user.id !== listings.userRef) next(errorHandeler(201,'You can delete your own listing'))
        try {
            await Listing.findByIdAndDelete(req.params.id)
            res.status(200).json('List delete successfully')
        } catch (error) {
            next(error)
        }
}

export const getList=async (req,res,next)=>{
    try {
        const listing =await Listing.findById(req.params.id)
        if(!listing) return next(errorHandeler(201,'Listing is not found'))
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}


export const updateList =async(req,res,next)=>{
    
     const listings =await Listing.findById(req.params.id)
    if(!listings) return next(errorHandeler(401,"List is not found"))
    if(req.user.id !== listings.userRef) return next(errorHandeler(403,"You can update your own list"))
    try {
        const userlistUpdate =await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
             new:true
            }
        )
        res.status(200).json(userlistUpdate)
    
    } catch (error) {
       next(error) 
    }
}
export const loadlor =async(req,res,next)=>{
    
   try {
    const landlor =await User.findById(req.params.id)
    if(!landlor) return next(errorHandeler(401,"User is not founds"))
        const {password:pass,...rest}=landlor._doc
       res.status(200).json(rest)
   
   } catch (error) {
      next(error) 
   }
}



export const search =async(req,res,next)=>{
    try {
      const limit =parseInt(req.query.limit) || 9;

      const startIndex =parseInt(req.query.startIndex) || 0;

       let offer =req.query.offer;
       if(offer === undefined || offer === 'false'){
        offer ={$in:[false,true]}
       }  
       let parking =req.query.parking;
       if(parking === undefined || parking === 'false'){
        parking ={$in:[false,true]}
       }
       let furnished =req.query.furnished;
       if(furnished === undefined || furnished === 'false'){
        furnished={$in:[false,true]}
       }
       let type =req.query.type;
       if(type=== undefined || type=== 'all'){
        type={$in:['sale','rent']}
       }
       const searchTerms =req.query.searchTerms || '';
       const sort =req.query.sort || 'createdAt';
       const order =req.query.order || 'desc'
       const allLists =await Listing.find({
        title:{$regex:searchTerms ,$options:'i'},
        offer,
        parking,
        furnished,
        type,
       }).sort({
        [sort]:order
       }).limit(limit).skip(startIndex)
            return res.status(200).json(allLists)
    } catch (error) {
        next(error)
    }
}
