const express = require("express")
const app = express()
const { connection } = require("./config/db")
const {  PostModel } = require("./models/Post.model")

const cors=require("cors")
require("dotenv").config()


const port =process.env.port
app.use(cors({
    origin:"*"
}))

app.use(express.json())

app.get("/", (req, res) => {
    res.send("WELCOME")
})

app.post("/post", async (req, res) => {
    const payload = req.body
    console.log(payload)
    try {
        const user = new PostModel(payload)
        await user.save()
        res.send("Data added successfully")
    }
    catch (err) {
        console.log(err)
    }
})



app.get("/browse",async(req,res)=>{
    console.log("hello")
    const data=await PostModel.find()
        res.send(data)
    })

    app.delete("/browse/delete/:id",async(req,res)=>{
        const id = req.params.id;
    console.log("hello",id)
        const post=await PostModel.findOne({"_id":id})
        const postID_in_post=post.postID
        const postID_making_req=req.body.postID
        try {
            if(postID_making_req!==postID_in_post){
                res.send({"msg":"you are not authorised"})
            }else{
                await PostModel.findByIdAndDelete({ "_id": id })
            res.send(`deleted the post whose id is ${id} `)
    
            }
        }
    
        catch (err) {
            console.log(err)
            res.send("err: somthing went wrong")
        }
    })        
    


app.listen(port, async () => {
    try {
        await connection
        console.log("connected")

    }
    catch (err) {
        console.log("err while connected", err)
    }


})