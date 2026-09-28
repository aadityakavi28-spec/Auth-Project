import dotenv from 'dotenv'
dotenv.config()
import app from './src/app.js';
import express from "express";
import connectDB from './src/db/db.js';
import dns from 'dns'


dns.setServers(['1.1.1.1', '8.8.8.8'])

connectDB()

app.listen(8000 , ()=> {
    console.log("Server is running on port 8000");
    
})