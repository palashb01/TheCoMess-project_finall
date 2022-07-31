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
    fooditem3:{
        type: String,
        required: true,
    },
    quantity3:{
        type: String,
        required: true,
    },
    fooditem3:{
        type: String,
        required: true,
    },
    quantity3:{

    },
    fooditem3:{

    },
    quantity3:{

    },
    fooditem3:{

    },
    quantity3:{

    },
    fooditem3:{

    },
    quantity3:{

    },
    fooditem3:{

    },
    quantity3:{

    },
    fooditem3:{

    },
    quantity3:{

    },

});


const MessMenu = new mongoose.model("messMenu",messMenu);

module.exports = MessMenu;