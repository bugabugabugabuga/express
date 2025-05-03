const { Router } = require("express");
const userModel = require("../models/user.model");


const userRouter = Router()





userRouter.get("/", async (req, res) => {
    const user = await userModel.find().sort({_id: -1})
    res.status(200).json(users)
})


module.exports = userRouter