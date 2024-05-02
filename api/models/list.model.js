import  mongoose  from "mongoose";

const createList =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    furnished:{
        type:Boolean,
        required:true,
    },
    parking:{
        type:Boolean,
        required:true
    },
    offer:{
        type:Boolean,
        required:true,
    },
    market:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true,
    },
    image:{
        type:Array,
        required:true,
    },
    userRef:{
        type:String,
        required:true,
    },
    bathRoom:{
        type:Number,
        required:true,
    },
    bedRoom:{
        type:Number,
        required:true,
    },
},{
    timestamps:true
})

const listing =mongoose.model('Listing',createList);

export default listing;