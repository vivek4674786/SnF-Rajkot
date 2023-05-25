// this is Service model/schema for mongo

const mongoose = require("mongoose")
const User = require("./user")

const serviceSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    service_title:{   //shop name
        type: String,
        required: true,
        unique: true
    },
    service_type:{    // service type (mech, ele, automobile, home cleaning)
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    description:{
        type: String,
    },
    keywords:{
        type: String,
    },
    address:{
        type: String,
    }
})

module.exports = mongoose.model("service",serviceSchema)