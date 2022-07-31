const mongoose = require("mongoose");
const messMenu = new mongoose.Schema({
    fooditem:{
        type: String,
        required: true,
    },
    quantity1:{
        type: Number,
        required: true,
    },
    quantity2:{
        type: Number,
        required: true,
    }
});


const MessMenu = new mongoose.model("messMenu",messMenu);

module.exports = MessMenu;