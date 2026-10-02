const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: [true, "Email already exists"], // Creates a unique index in MongoDB
    lowercase: true, // Automatically converts the email to lowercase before saving
    trim: true, // Removes leading and trailing whitespaces
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  name: {
    type: String,
    required: [true, 'Name is required for creating an account'],
  },
  password: {
    type: String,
    required: [true, 'Password is required for creating an account'],
    minlength:[6, "Password should contain 6 charachter"],
    select: false
  }
},{
    timestamps:true
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return next()
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("user", userSchema)

module.exports = userModel