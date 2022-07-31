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
app.get("/gallery",(req,res)=>{
    res.render('gallery');
})

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
app.get("/messrebate", (req, res) => {
    res.render('MessRebate');
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
app.get('/studentmessmenu',(req, res)=>{
    res.render('StudentMessmenu');
})
app.get('/messmenu',(req, res)=>{
    res.render('MessMenu');
})
app.get('/studentattendanceafter',(req, res)=>{
    res.render('studentattendanceafter');
})
app.get('/MessForum',(req,res)=>{
    res.render('MessForum');
})
app.get('/Messeditlive',(req,res)=>{
    res.render('Messeditlive');
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('/contact',(req,res)=>{
    res.render('contact');
})
app.get('/StudentMessLive',(req,res)=>{
    res.render('StudentMessLive');
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
        res.status(201).render('MessDashboard');
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
            res.status(201).render('MessDashboard');
        } else {
            res.status(400).render("error");
        }
    } catch (err) {
        res.status(400).send("invalid email");
    }

})
app.post("/studentlogin", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        const ismatch = await bcrypt.compare(password, useremail.password);
        if (ismatch) {
            user= req.body.email;
            res.status(201).render('StudentDashboard');

        } else {
            res.status(400).render("error");
        }
    } catch (err) {
        res.status(400).render("error");
    }
})

app.post('/studentattendanceafter', async (req, res) => {
    if(user==='null'){
        window.alert("attendance already completed");
        res.render('error');
    }
    else{
        try {
            console.log(user);
            console.log("hello");
            const update = await Register.findOneAndUpdate({ email: user }, { $inc: { __v: 1 } });
            if (update) {
                user='null';
                res.status(201).render("studentattendanceafter");}
            
            else {
                console.log("hello");
                res.status(400).render("error");
            }
    
        }
        catch (err) {
            console.log("hello this i sme ")
            res.status(400).render("error");
        }
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

app.post('/Messeditlive',async (req, res)=>{
            const DATA = [];
            const fooditem1=req.body.fooditem1;
            const H1foodquantity1=req.body.H1foodquantity1;
            const H2foodquantity1=req.body.H2foodquantity1;
            DATA.push({
                fooditem:fooditem1,
                quantity1:H1foodquantity1,
                quantity2:H2foodquantity1

            })
            const fooditem2=req.body.fooditem2;
            const H1foodquantity2=req.body.H1foodquantity2;
            const H2foodquantity2=req.body.H2foodquantity2;
            DATA.push({
                fooditem:fooditem2,
                quantity1:H1foodquantity2,
                quantity2:H2foodquantity2

            })
            const fooditem3=req.body.fooditem3;
            const H1foodquantity3=req.body.H1foodquantity3;
            const H2foodquantity3=req.body.H2foodquantity3;
            DATA.push({
                fooditem:fooditem3,
                quantity1:H1foodquantity3,
                quantity2:H2foodquantity3

            })
            const fooditem4=req.body.fooditem4;
            const H1foodquantity4=req.body.H1foodquantity4;
            const H2foodquantity4=req.body.H2foodquantity4;
            DATA.push({
                fooditem:fooditem4,
                quantity1:H1foodquantity4,
                quantity2:H2foodquantity4

            })
            const fooditem5=req.body.fooditem5;
            const H1foodquantity5=req.body.H1foodquantity5;
            const H2foodquantity5=req.body.H2foodquantity5;
            DATA.push({
                fooditem:fooditem5,
                quantity1:H1foodquantity5,
                quantity2:H2foodquantity5

            })
        
    try{
        // const menu = new MessMenu({
        //     
            

        // })
        // const menuregistered = await menu.save();
        // res.status(201).render("/MessDashboard");
        // for(let i=0;i<5;++i){
        //     if((fooditem + i)==NULL){
        //         console.log("hello")

        //     }
        // }
       for(let i=0;i<DATA.length;++i){
            if(DATA[i].fooditem=='NULL'){
                continue;
            }
            else{
                const updating = await MessMenu.findOneAndUpdate({fooditem:DATA[i].fooditem},{$set:{quantity1:DATA[i].quantity1,quantity2:DATA[i].quantity2}}) 
                if(updating){
                    continue;
                }
                else{
                    const messnew = new MessMenu({
                        fooditem:DATA[i].fooditem,
                        quantity1:DATA[i].quantity1,
                        quantity2:DATA[i].quantity2
                    })
                    const happenmess = await messnew.save();
                }
            }
       }
        res.status(201).render("MessDashboard");
    }catch(e){
        console.log(e)  
    }
})
console.log(user);
app.listen(port, () => {
    console.log('server is running on port ' + port);
})