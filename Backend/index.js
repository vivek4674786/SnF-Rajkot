// this index program for this project

const connectToMongo = require("./db")
const express = require("express")

connectToMongo()

//creating application
const app = express()
const port = 3005

app.use(express.json())

//Available Routed
app.use("/home/auth", require("./routes/auth"))
app.use("/home/services", require("./routes/service"))


app.listen(port, () => {
    console.log("app is listiening on port "+ port)
})