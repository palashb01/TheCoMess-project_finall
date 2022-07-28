const mongoose = require("mongoose");
const DB = 'mongodb+srv://palashb01:palashb01@cluster0.4xfiw.mongodb.net/Thecomess?retryWrites=true&w=majority'
mongoose.connect(DB).then(()=>{
    console.log("connection successful");
}).catch((err)=>console.error(err));

