const { default: mongoose,  } = require("mongoose");


const postSchema = new mongoose.Schema({
    content: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    }
}, {timestamps: true})


module.exports = mongoose.model("post", postSchema)