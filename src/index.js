import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
dotenv.config({ path: "./.env" });

const app = express();
connectDB()
    .then(() => {
        app.listen(process.env.PORT,()=>{
            console.log(`the app is listening on the port: https://localhost/${process.env.PORT}`)
        });
    })
    .catch();
