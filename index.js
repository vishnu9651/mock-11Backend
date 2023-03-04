const express = require("express")
const { connection } = require("./configs/db")
const {userRouter}=require("./routes/User.route")
const {noteRouter}=require("./routes/Note.route")
const {authenticate}=require("./middlwwares/authenticate.middleware")
const cors=require("cors")
require("dotenv").config()

const port =process.env.port
const app = express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())



app.use("/",userRouter)
app.use(authenticate)



app.listen(port, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (err) {
        console.log(err)
    }

    console.log("port is running at 8080")
})
