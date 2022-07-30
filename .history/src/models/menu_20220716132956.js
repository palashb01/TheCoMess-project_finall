const mongoose = require("mongoose");
const messMenu = new mongoose.Schema({
    fooditem1:{
        type: String,
        required: true,
    },
    quantity1:{
        type: Number,
        required: true,
    }
    fooditem2:{
        
    }
});


const MessMenu = new mongoose.model("messMenu",messMenu);

module.exports = MessMenu;