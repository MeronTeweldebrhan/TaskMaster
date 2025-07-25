import mongoose from "mongoose";
import dotenv  from 'dotenv'

dotenv.config()
const uri=process.env.MONGO_URI
const connection = async()=>{
    try {
        mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(err)
    }
}
export default connection