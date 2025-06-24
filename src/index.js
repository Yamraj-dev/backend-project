import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import express from "express";
import connectDB from "./db/db.js";
import app from "./app.js";
 
app.on("error", (error) => {
    console.error("error: ", error);
    throw error;
})

connectDB()
.then(()=> {
    app.listen(process.env.PORT, () => {
        console.log("server is running ar ", process.env.PORT)
    });
})
.catch((err)=> {
    console.error("Mongo connection failed ! " ,err);
})