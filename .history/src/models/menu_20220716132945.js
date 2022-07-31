const mongoose = require("mongoose");
const messMenu = new mongoose.Schema({
    fooditem1:{
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    }
});


const MessMenu = new mongoose.model("messMenu",messMenu);

module.exports = MessMenu;