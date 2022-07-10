const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const messSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
  },
  password: {
    type: String,
    required: true,
  },
});


messSchema.pre("save", async function(next) {
  //const passwordHash = await bcrypt.hash(password,10);
  //next();
  if (this.isModified("password")) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    //console.log(`the current password is ${this.password}`);
  }
  next();
})


const Mess = new mongoose.model("Mess", messSchema);

module.exports = Mess;
