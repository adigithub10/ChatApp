const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required: true},
    confirmPassword:{
        type:String,
        required:false,
        
    },
    
    gender:{type:String,
        required:true,
        enum:['male','female']},
    profilePic:{type:String,required:false,default:""},
},{timestamps:true})


module.exports = mongoose.model("User",userSchema)

