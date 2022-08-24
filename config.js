const mongoose=require("mongoose");
//const connection =mongoose.connect("mongodb://127.0.0.1:27017/Eval-3");
const connection =  mongoose.connect("mongodb+srv://ashwini_mishra:8252672662@cluster0.izr7bmg.mongodb.net/eval-3?retryWrites=true&w=majority")
module.exports={connection
}
