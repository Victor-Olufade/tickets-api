import mongoose from "mongoose";
import colors from "colors";


const connectDb= async()=>{
    try {
        mongoose.set('strictQuery', true)
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected ${con.connection.host}`.cyan.underline);
        
        
    } catch (error) {
        console.error(`Error is ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDb