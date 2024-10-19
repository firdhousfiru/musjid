const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel=require("./models/users")

let app=express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://firdhouskh:kunjumol@cluster0.h3qcl.mongodb.net/musjidapp?retryWrites=true&w=majority&appName=Cluster0")


//signin
app.post("/signin",async(req,res)=>{

    let input =req.body
    let result =userModel.find({email:req.body.email}).then(
        (items)=>{
            if(items.length>0){
                const passwordValidator=bcrypt.compareSync(req.body.password,items[0].password)
                if(passwordValidator){
                    jwt.sign({email:req.body.email},"musjid",{expiresIn:"1d"},
                        (error,token)=>{
                            if(error){
                                res.json({"status":"error","errorMessage":error})
                            }else{
                                res.json({"status":"success","token":token,"userId":items[0]._id})
                            }
                        }
                    )
                }
            else{
                res.json({"status":"Incorrect Password"})
            }
        }else{
            res.json({"status":"Invalid Email id"})
        }

        }
    )



})



//signup
app.post("/signup",async(req,res)=>{
    
    let input=req.body
    let hashedPassword=bcrypt.hashSync(req.body.password,10)
    console.log(hashedPassword)
    req.body.password=hashedPassword
    
    let check = userModel.find({email:req.body.email}).then(
        (items)=>{


    

        if(items.length>0){
            res.json({"status":"email id already exists"})

        }else{
            let result=new userModel(input)
             result.save()
            res.json({"status":"success"})
        }
    }
).catch(
(error)=>{}
)
})



app.listen(3030,()=>{
    console.log("server started")
})