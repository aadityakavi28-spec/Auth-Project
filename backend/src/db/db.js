import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected");
        
    } catch (error) {
        console.log("Database Connection Failed :", error);
        
    }
}

export default connectDB