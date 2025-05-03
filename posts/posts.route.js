const { Router } = require("express");
const postModels = require("../models/post.models");
const { isValidObjectId } = require("mongoose");



const postRouter = Router()


postRouter.get("/", async (req, res) => {
    const user = await postModelsModel.find().sort({_id: -1}).populate({path: "author", select: "fullname email"})
    res.status(200).json(posts)
})


postRouter.post("/", async (req, res) => {
    const {content} = req.body
    if(!content){
        return  res.status(400).json({message: "fill in user-id"})
    }

    await postModels.create({content, author: req.userId})
    res.status(201).json({message: "created"})
})


postRouter.delete("/:id", async (req, res) => {
    const {id} = req.params
    if(!isValidObjectId()){
        return  res.status(400).json({message: "invalid id"})
    }

    const post = await postModels.findById(id)

    if(post.author.toString() !== req.userId){
        return  res.status(401).json({message: "no permission"})
    }

    await postModels.findByIdAndDelete(id)
    res.status(200).json({message: "deleted"})
})


module.exports = postRouter