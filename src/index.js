import { app } from "./app.js";
import connectDb from "./config/databaseConfig.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 5001;

dotenv.config({
    path:"../.env"
})

// database connection
connectDb()
.then(() => {
    app.listen(PORT, () => {
        console.log("server is listening at port :", PORT)
    })
})
.catch((err) => {
    console.log("Mongodb connection failed !!", err)
})


