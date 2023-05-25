// database connection

const mongoose = require("mongoose")

const mongoURI = "mongodb+srv://vivek:4674786@mern-course.j42moxy.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(mongoURI)
    console.log("conected to database")
}

module.exports = connectToMongo