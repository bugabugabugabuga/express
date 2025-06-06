const express = require("express")
const userRouter = require("./users/user.route")
const connectToDb = require("./db/connectToDB")
const authRouter = require("./auth/auth.route")
const isAuth = require("./middlewares/isAuth")
const postRouter = require("./posts/posts.route")
const cors = require("cors")
const app = express()

connectToDb()

app.use(cors())
app.use(express.json())

app.use("/users", isAuth, userRouter)
app.use("/auth", authRouter)
app.use("/posts", isAuth, postRouter)


app.get("/",  (req, res) => {
    res.send("hello world")
})

module.exports = app; 



