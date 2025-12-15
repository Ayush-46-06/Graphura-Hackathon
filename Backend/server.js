import mongoose from "mongoose"
import {config} from "./config/env.js"
import app from "./app.js"
const PORT = config.PORT || 5000
const connectDB =async (req,res)=>{
  try{
 await mongoose.connect(config.MONGO_URI)
  console.log("MongoDB connected")
  app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
  })
  }catch(error){
    console.log("Error",error.message)
    process.exit(1)
  }
}

connectDB()
