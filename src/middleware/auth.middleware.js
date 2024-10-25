import jwt from "jsonwebtoken";

const verifyAccessToken = async (req, res, next) => {
   // verify token
   // inject user info in the request
   const token = req.cookies?.accessToken;
    if(!token) {
       return res.status(400).json({
        success: false,
        message: "Not Authrized"
       }) 
    }

    try {
       const payload = await  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
       req.user = payload;
       next();
    } catch(error) {
        return res.status(400).json({
            success: false,
            message: error.message
           }) 
    }
}

export {verifyAccessToken}