require("dotenv").config()
const jwt=require("jsonwebtoken");


const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        const decoded=jwt.verify(token,process.env.key)
        if(decoded){
            const userID=decoded.userID
            console.log("decode",decoded)
            req.body.userID=userID
            next()
        }else{
            res.send("Pleaqse Login First")
        }
    }
    else{
        res.send("Please Login first")
    }
}
module.exports={authenticate}