const { Router } = require("express");
const userSchema = require("../validations/user.schema");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth");
require("dotenv").config()
const authRouter = Router()

authRouter.post("/sign-up", async (req, res) => {
    const {error} = userSchema.validate(req.body || {})
    if(error){
        return res.status(400).json(error)
    }

    const {fullName, email, password} = req.body

    const existUser = await userModel.findOne({email})
    if(existUser){
        return res.status(400).json({message: "user exist"})
    }



const hashedPass = await bcrypt.hash(password, 10)
await userModel.create({fullName, password: hashedPass, email})
 res.status(201).json({message: "user exist"})
    
})



authRouter.post("/sign-in", async  (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(400).json({message: "email and password"})
    }

    const existUser = await userModel.findOne({email}).select("password")

    if(!existUser){
        return res.status(400).json({message: "email and password envalid"})
    }

    const isPassEqual = await bcrypt.compare(password, existUser.password)
    if(!isPassEqual){
        return res.status(400).json({message: "email and password envalid"})
    }


    const payload = {
       userId: existUser._id
    }


    const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.json(token)
})

authRouter.get("/current-user", isAuth, async (req, res) => {
    const user = await userModel.findById(req.userId)
    res.json(user)
})

module.exports = authRouter