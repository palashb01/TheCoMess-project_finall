const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const studentSchema = new mongoose.Schema({
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
  rollnumber:{
    type: String,
    required: true,
    unique: true,
  },
  year:{
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
  // attendence:{
  //   type: String,
  //   required: true
  // }
});

studentSchema.pre("save", async function(next) {
  //const passwordHash = await bcrypt.hash(password,10);
  //next();
  if (this.isModified("password")) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`);
  }
  next();
})

const Register = new mongoose.model("Register", studentSchema);

module.exports = Register;
