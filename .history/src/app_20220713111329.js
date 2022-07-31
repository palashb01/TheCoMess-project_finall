const path = require('path');
const bcrypt = require("bcryptjs");
const express = require('express');
const hbs = require('hbs');
require("./db/conn");
const app = express();
const port = process.env.PORT || 4000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const Mess = require("./models/Messregister");
const Register = require("./models/studentregister");
const MessMenu = require("./models/menu");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(express.static(static_path));
app.get("/", (req, res) => {
    res.render("index");
})

//variables
let user;
app.get("/messregister", (req, res) => {
    res.render('messregister');
})
app.get("/studentregister", (req, res) => {
    res.render('studentregister');
})
app.get("/studentlogin", (req, res) => {
    res.render('studentlogin');
})
app.get("/messlogin", (req, res) => {
    res.render('messlogin');
})
app.get("/studentpage", (req, res) => {
    res.render('studentpage');
})
app.get("/studentdashboard",(req, res)=>{
    res.render('StudentDashboard');
})
app.get("/messdashboard",(req, res)=>{
    res.render('MessDashboard');
})
app.get("/forum",(req, res)=>{
    res.render('Forum');
})
app.get('/studentattendance',(req, res)=>{
    res.render('StudentAttendance');
})
app.get("*",(req,res)=>{
    res.render('error')
})




app.post("/studentregister", async (req, res) => {
    try {
        // console.log(req.body.firstname);
        const studentpassword = req.body.password;
        const registerStudent = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            rollnumber: req.body.rollnumber,
            password: req.body.password,
            // attendence: 0

        })
        const registered = await registerStudent.save();
        res.status(201).redirect("/studentdashboard");
        
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/messregister", async (req, res) => {
    try {
        // console.log(req.body.firstname);
        const password = req.body.password;
        const registermess = new Mess({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        })
        const register = await registermess.save();
        res.status(201).redirect("/messdashboard");
    } catch (error) {
        res.status(400).send(error);
    }
})
app.post("/messlogin", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Mess.findOne({ email: email });
        const ismatch = await bcrypt.compare(password, useremail.password);
        if (ismatch) {
            res.status(201).redirect("/messdashboard");
        } else {
            res.status(400).render("error");
        }
    } catch (err) {
        res.status(400).send("invalid email");
    }

})
app.post("/studentlogin", async (req, res) => {
    localStorage.setItem("user", req.body.email);
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        const ismatch = await bcrypt.compare(password, useremail.password);
        if (ismatch) {
            user = req.body.email;
            res.status(201).redirect('/studentdashboard');

        } else {
            res.status(400).render("error");
        }
    } catch (err) {
        res.status(400).render("error");
    }
})

app.get('/studentattendance', async (req, res) => {
    try {
        const user = localStorage.getItem("user");
        if(user==null){
            window.alert("attendance already marked");
            res.render('StudentAttendance');
        }
        else{const update = await Register.findOneAndUpdate({ email: user }, { $inc: { __v: 1 } });
        console.log("hello");
        if (update) {
            window.alert("Attendance Updated");
            res.status(201).render("StudentDashboard");
        }
        else {
            console.log("hello");
            res.status(400).render("error");
        }}

    }
    catch (err) {
        console.log("hello this i sme ")
        res.status(400).render("error");
    }
})

app.post('/messpage', async (req, res) => {
    try {
        const aval = req.body.fooditem;
        const quantity = req.body.quantity;
        const update = await MessMenu.findOne({ fooditem: aval });
        if (update) {
            const updated = await MessMenu.findOneAndUpdate({ fooditem: aval }, { quantity: quantity });
            res.status(201).render("index");
        }
        else {
            const Messmenu = new MessMenu({
                fooditem: aval,
                quantity: quantity
            })
            const menu = await Messmenu.save();
        }

    }

    catch (err){
        res.status(400).render("error");
    }
})
app.listen(port, () => {
    console.log('server is running on port ' + port);
})