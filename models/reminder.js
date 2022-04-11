const mongoose = require("mongoose"); 

const reminderSchema=new mongoose.Schema({
    day: {
        type:Number, 
        required:true, 
        min:1, 
        max:31
    }, 
    month: {
        type:Number, 
        required:true, 
        min:1, 
        max:12
    },
    occasion: {
        type:String,
        required:true, 
    }, 
    interval: {
        type:Number, 
        enum:[1,2,4,7,14],
        default:1,
        required:true,
    },
    eventInDays: {
        type:Number
    }, 
    email: {
        type:String
    },
    sent: {
        type:Boolean,
        default:false, 
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }
})

const Reminder = mongoose.model("Reminder", reminderSchema);
module.exports=Reminder;