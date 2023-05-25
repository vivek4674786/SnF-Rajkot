// auth.js

//importing modules
const express = require("express")
const user = require("../models/user")
const router = express.Router()
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
const fetchUser = require("../middleware/fetchuser")

var JWT_Sign = "i_am_ethical_user"



// Route 1:  (signup) creating new User withend point [Post]/home/auth/signup/  (no login reqiured)
router.post("/signup/", [       // validation of sign-up form
    body("email", "Enter a valid Email").isEmail(),
    body("mobileno", "Enter valid mobile number").isLength(10)
],
    async (req, res) => {          //async callback function
        const errors = validationResult(req)
        if (!errors.isEmpty()) {           // send 400 status code if any error found in array
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            // check weather user with this email id exists or not
            let User = await user.findOne({ email: req.body.email })
            if (User) {
                return res.status(400).json({ error: "Sorry User with this Email Already Exists" })
            }

            const salt = await bcrypt.genSalt()  // creating salt using bycrypt.
            securepwd = await bcrypt.hash(req.body.password, salt) // making hash code of the password using bycrypt.
            User = await user.create({  //storing info to User database.
                email: req.body.email,
                password: securepwd,
                name: req.body.name,
                mobileno: req.body.mobileno
            })

            const data = { // setting user id in data for sending as json web token data.
                User: {
                    id: User.id
                }
            }

            const authtoken = jwt.sign(data, JWT_Sign) // adding secreat sign to token.
            res.json({ authtoken }) // sending auth token to user.
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("error occured")
        }
    })


//=======================================================================


// Route 2:  (login) authenticate user [Post]home/auth/login (no login required)
router.post("/login/", [       // validation of sign-in form
    body("email", "Enter a valid Email").isEmail(),
    body("password", "password can not be empty").exists()
],
    async (req, res) => {          //async callback function
        const errors = validationResult(req)
        if (!errors.isEmpty()) {           // send 400 status code if any error found in array
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body
        try {
            // check weather user with this email id exists or not
            let User = await user.findOne({ email })
            if (!User) {
                return res.status(400).json({ error: "please login with correct credentials" })
            }

            const pwdCompare = await bcrypt.compare(password, User.password)

            if (!pwdCompare) {
                return res.status(400).json({ error: "please login with correct credentials" })
            }

            const data = { // setting user id in data for sending as json web token data.
                User:{
                    id: User.id
                }
            }

            const authtoken = jwt.sign(data, JWT_Sign) // adding secreat sign to token.
            res.json({ authtoken }) // sending auth token to user.
        }
        catch (error) {
            console.error(error.message)
            res.status(500).send("error occured")
        }
    })


//=======================================================================


//Route 3: get logged-in user details [post] home/auth/fetchuser(login required)
router.post("/fetchuser/", fetchUser, async (req, res) => {     //async callback function
        try{
            userId = req.user.id
            const User = await user.findById(userId).select("-password")
            res.send(User)
        }
        catch (error){
            console.log(error)
            console.error(error.message)
            res.status(500).send("internal server error. at route 3: fetch user")
        }

})



module.exports = router