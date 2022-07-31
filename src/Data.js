const path = require('path');
const express = require('express');
const hbs = require('hbs');
require("./db/conn");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(cors());
// const Register = require("./models/studentregister");
const MessMenu = require("./models/menu");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));
app.get("/", (req, res) => {
    MessMenu.find({}).then((food)=>{
        //console.log(students);
        res.status(201).json(food);

    })
})
app.listen(port, () => {
    console.log('server is running on port ' + port);
})

//variables
