import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
 name:{
    type:String,
    required:[true, "User name"],
    minLength: [5, "Name must be at least 5 char"],
    maxLength: [50, "Name must be less than 50 char"],
    trim: true
 },
 email:{
    type:String,
    required:[true, "User email is required"], 
    unique:true,
    lowercase:true
 },
 password:{
    type:String,
    required:true,
    select:false
 },
 forgortPasswordToken:{
    type:String
 },

 forgortPasswordExpiryDate:{
    type:String
 }
}, {timestamps:true})

userSchema.pre("save", async function(next) {
   if( !this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   return next(); 
})

userSchema.methods.generateAccessToken = function() {
   return jwt.sign(
      {
         _id:this._id,
         emial: this.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
   )
}

userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password)
}

export  const User = mongoose.model("User", userSchema)