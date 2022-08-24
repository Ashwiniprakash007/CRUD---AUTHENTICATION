const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    _id:String,
     token:String,
    Title:String,
    Note:String,
    Label:String
}) 

const DataModel =mongoose.model("data",userSchema) 
module.exports=DataModel
