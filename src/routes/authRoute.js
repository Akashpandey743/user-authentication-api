import {Router} from "express";
import { getUser, logout, signin, signup } from "../controllers/authControllers.js";
import { verifyAccessToken } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.route("/signup").post(signup)
authRouter.route("/signin").post(signin)
authRouter.route("/user").get(verifyAccessToken, getUser)
authRouter.route("/logout").post(verifyAccessToken, logout)


export default authRouter