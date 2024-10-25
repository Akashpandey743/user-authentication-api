import {User} from "../models/user.model.js"
import emailValidator from "email-validator"

const signup =async (req, res) => {
    // write logic for signup
    const {name, email, password, confirmPassword} = req.body;
    if(!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success:false,
            message:"please enter valid email"
        })
    }

    const validEmail = emailValidator.validate(email)
    if(!validEmail) {
        return res.status(400).json({
            success:false,
            message:"please enter valid email"
        })
    }
    if(password !== confirmPassword) {
        return res.status(400).json({
            success:false,
            message:"password and confirm password don't match"

        })
    }
    const isUserExists = await User.findOne({email});
    if(isUserExists) {
        return res.status(400).json({
            success:false,
            message:"User Already exists"
        })
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password");
    if(!createdUser) {
        return res.status(400).json({
                   success:false,
                    message: "user is not created in database"
                }) 
    }

    return res.status(201).json({
               success:true,
                data: createdUser
             }) 
   
    // try {
    //   const userInfo = new User({name, email, password});  
    //   const result = await userInfo.save();
    //   return res.status(200).json({
    //     success:true,
    //     data: result
    // })
    // } catch (error) {
        
    //     return res.status(400).json({
    //         success:false,
    //         message: "catch part executed"
    //     }) 
    // }
   

}

const signin = async (req, res) => {
 const {email, password} = req.body;
 if(!email || !password) {
    return res.status(400).json({
        success:false,
        message:"email and password both are required for sign in"
    })
 }

 try {
    const user = await User.findOne({email}).select("+password") 
    
    if(!user) {
        return res.status(400).json({
            success:false,
            message:"Invalid credentials"
        })
    }

    // validating password
    const isPasswordValid = await user.isPasswordCorrect(password)
     if(!isPasswordValid) {
        return res.status(400).json({
            success:false,
            message:"password is incorrect"
        })
     }

    // creating access token
    const accessToken = user.generateAccessToken()
    user.password = undefined
    // cookie option
    const cookieOption = {
       maxAge: 24 * 60 *60 * 1000,
       httpOnly: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOption)
    .json({
        success:true,
        data: {user, accessToken}
    })

    
 } catch (error) {
    return res.status(200).json({
        success: false,
        message: error.message
    })
 }
}

const getUser = async (req, res) => {
   const userId = req.user._id;
   try {
     const user = await User.findById(userId);
     return res.status(200).json({
        success: true,
        data: user
     })
   } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      })
   }
}

const logout = (req, res) => {
  try {
    const cookieOption = {
       httpOnly: true,
        expires: new Date()
    }

    return res
    .status(200)
    .cookie("accessToken", null, cookieOption)
    .json({
        success: true,
        message: "Logged out"
    })
  } catch(error) {
    return res.status(400).json({
        success: false,
        message: error.message
    })
  }
}

export {
    signup,
     signin,
     getUser,
     logout
    }