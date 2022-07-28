const mongoose = require("mongoose");
const messMenu = new mongoose.Schema({
    fooditem1:{
        type: String,
        required: true,
    },
    quantity1:{
        type: Number,
        required: true,
    },
    fooditem2:{
        type: String,
        required: true,
    },
    quantity2:{
        type: String,
        required: true,
    },
    fooditem3:{
        type: String,
        required: true,
    },
    quantity3:{
        type: String,
        required: true,
    },
    fooditem4:{
        type: String,
        required: true,
    },
    quantity4:{
        type: String,
        required: true,
    },
    fooditem5:{
        type: String,
        required: true,
    },
    quantity5:{
        type: String,
        required: true,

    },
    fooditem6:{
        type: String,
        required: true,
    },
    quantity6:{
   type: String,
    required: true,
    },
    fooditem7:{
        type: String,
        required: true,
    },
    quantity7:{
        type: String,
        required: true,
    },
    fooditem8:{
        type: String,
        required: true,
    },
    quantity8:{
        type: String,
        required: true,
    },
    fooditem9:{
        type: String,
        required: true,
    },
    quantity9:{
        type: String,
        required: true,
    },
    fooditem10:{
        type: String,
        required: true,
    },
    quantity10:{
        type: String,
        required: true,
    },
    fooditem11:{
        type: String,
        required: true,
    },
    quantity11:{
        type: String,
        required: true,

    },
    fooditem12:{

    },
    quantity12:{

    },
    fooditem13:{

    },
    quantity13:{

    },

});


const MessMenu = new mongoose.model("messMenu",messMenu);

module.exports = MessMenu;