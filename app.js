const express =require("express");
const {connection} =require("./config");
const UserModel = require("./models/User.model");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')
const app=express();

app.use(express.json());
const postsRoutes=require("./routes/index")

app.get ("/",(req,res)=>{
    return res.send("Home page n")
})

app.post("/signup",async(req,res)=>{
    const {email,password,age}=req.body;
    await bcrypt.hash(password,8,function(err,hash){
        if(err){
            return res.send("sign up failed")
        }
        const user=new UserModel({email,password:hash,age})
        user.save()
        return res.send("signup successful")
    })
   
})
app.post ("/login",async(req,res,next)=>{
    const {email,password}=req.body; 
    const user =await UserModel.findOne({email})
      const id=user._id
    const hashpassword=user.password;
    await bcrypt.compare(password,hashpassword,function(err,result){
        if(err){
            return ("Please try later")
        }
        if(result){
            const token =jwt.sign({email:user.email,_id:user.id},'secret');
            if(user.length===0){
             return res.send("invalid credential")
            }
            res.send({id,message:"login successful",token:token});//
          next()
            
             
        }
        else {
            return res.send("Invalid credentials")
        }
    })
  
})
app.use("/posts",postsRoutes)

app.get("/profile/:id",async(req,res)=>{
    const id=req.params.id 
   
   const user_token=req.query.token  

    jwt.verify(user_token,'secret',function(err,decoded){
if(err){
    return res.send("Please login again")
}
console.log(decoded)

    })
    try{
        const user=await UserModel.find({_id:id},{__v:0,_id:0})
        console.log(user);
        return res.send(user)
       
    }
    catch{
        return res.send("not found")
    }
})


app.listen(8080,async()=>{
    try {
        await connection
    console.log("listining on port 8080")
    }
    catch(err){
        console.log(err)
    }
    console.log("open port 8080")
})