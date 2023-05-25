// this is user model/schema for mongo

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    mobileno:{
        type: String,
        required: true
    },
    profile_pic:{
        type: String
    }
})
const User = mongoose.model("user",userSchema)
module.exports = User