// this is service routing program

const express = require("express")
const service = require("../models/serviceinfo")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator")

//Route 1: fetching all services [post]"home/services/allservices" (no login required)
router.get("/allservices/", async (req, res) => {
    try {
        const Service = await service.find({})
        res.json(Service)
    }
    catch (error) {
        console.log(error)
    }
})

//Route 2: adding service [post]"home/services/addservice" (login required)
router.post("/addservice/", fetchuser, [
    body("service_title","enter service title(your shop name)").exists(),
    body("description","write something about your service").exists(),
    body("address","enter your shop address").exists()

], async (req, res) => {
    // de multiplexing attributes form request body
    const { service_title, service_type, image, description, keywords, address } = req.body
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        //setting up services
        const Service = new service({
            service_title, service_type, image, description, keywords, address, user: req.user.id
        })
        const savedService = await Service.save() //saving services

        res.json(savedService) //returing service data
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("error occured while saving note")
    }
})


//Route 3: fetching specific services [post]"home/services/domains" (no login required)
router.post("/domains/", [
    body("service_type","enter proper service type").exists()
],async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({ error: errors.array() })
    }
    const { service_type } = req.body
    try {
        const Service = await service.find({service_type: service_type})
        res.json(Service)
    }
    catch (error) {
        console.log(error)
    }
})


module.exports = router