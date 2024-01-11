import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import roomsRoute from './routes/rooms.js';
import hotelsRoute from './routes/hotels.js';
import usersRoute from './routes/users.js';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config()


//middlewares

app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);  
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);





const connect = async () =>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected To MongoDB!");
  } catch (error) {
    throw error
  }
};

mongoose.connection.on("disconnected", ()=>{
  console.log('mongoDB Disconnected!');
})


  
app.use((err,req,res,next)=>{

   const errorStatus = err.status || 500;
   const errorMessage = err.message || "Something went wrong";

   return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    messege: errorMessage,
    stack: err.stack,
  });
});


app.listen(9000,()=>{
    connect()
    console.log("Connected to Backend!")
})