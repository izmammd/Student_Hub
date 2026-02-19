const express = require("express");
const {configDotenv} = require("dotenv");
const connectDB = require("./DB_Connnection/db");
const stdRouter = require("./Router/stdRouter");
const app = express();
const cors = require("cors");

// configDotenv();
// console.log(process.env.PORT);

// HELP TO CONNECT FRONTEND
app.use(cors());

connectDB()  // connect DB -> to call function connectDB

// stdRouter testing
app.use(express.json());

// console.log("HOST = ",process.env.HOST);
// console.log("PORT = ", process.env.PORT);

// api testing
app.get("/",(req,res)=>{
    return res.json({message : "Express"})
})

app.use("/api/std",stdRouter)  // import and use stdRouter


//////////// NOT WORK                         
// const PORT = process.env.PORT || 3000;
// const HOST = process.env.HOST || "localhost";

app.listen(3000, ()=>{
    console.log(`server is Running on http://localhost:3000`);
    // console.log(`server is Running on http://${h}:${3000}`);  // not work
})