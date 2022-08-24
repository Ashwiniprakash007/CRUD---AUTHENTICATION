const {Router}=require("express");
const DataModel = require("../models/Data.model");
const postsRoutes=Router()

const validator=(req,res,next)=>{
    const {id,token}=req.body;
    if(id && token) { 
    next()
    }
    else {
      res.send("Validation Failed")
    }
  }
   postsRoutes.use(validator)
  postsRoutes.get("/read", async (req,res)=>{
    const {id}=req.body;
    const data = await DataModel.find({id},{_id:0, __v:0})
   return res.send("results")
   
  })
  postsRoutes.delete("/delete", async (req,res)=>{
    const {_id}=req.body;
    const data = await DataModel.deleteOne({_id},{_id:0, __v:0})
    return res.send("data delete")
  })

postsRoutes.post("/create", async (req,res)=>{
    const data= await DataModel.insertMany([req.body])
    data.save()
   return res.send("data saved")
})

module.exports=postsRoutes;