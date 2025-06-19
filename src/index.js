import dotenv from "dotenv";
dotenv.config({path: "./"});
import express from "express";
import connectDB from "./db/db.js";

connectDB();