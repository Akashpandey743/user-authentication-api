import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
}))

// importing our router
import authRouter from "./routes/authRoute.js";
app.use("/api/auth", authRouter)

export {app}