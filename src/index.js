// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: './.env'
})

connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server Is Running At Port ${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.log("MongoDB Connection Failed", err);
})


























// import express from "express";
// const app = express();

// (async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`
//     );

//     console.log(connectionInstance.connection.host);

//     app.on("Error", (error) => {
//       console.log("App Is Not Listening. Error : ", error);
//       throw error;
//         // process.exit(1);
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`The App Is Listening On Port : ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log(`Error Occured While Creating Database. ${error}`);
//   }
// })();
