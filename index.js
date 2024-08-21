import express from "express"
import cors from "cors"
const app = express()

app.use(cors())

app.post("/makepayment",(req,res)=>{
    res.send("jkadsjk")
})

app.get("/",(req,res)=>{
    res.send("dashjsdjak")
})



app.listen(4000,()=>{
    console.log("server is connected")
})