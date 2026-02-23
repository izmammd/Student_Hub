const express = require("express");
const {configDotenv} = require("dotenv");
const connectDB = require("./DB_Connnection/db");
const stdRouter = require("./Router/stdRouter");
const stdSubRouter = require("./Router/stdSubRouter");
const app = express();
const cors = require("cors");

// configDotenv();
// console.log(process.env.PORT);

// HELP TO CONNECT FRONTEND
app.use(cors());

connectDB()  // connect DB -> to call function connectDB

// stdRouter testing
app.use(express.json());

app.get("/",(req,res)=>{
    return res.json({message : "Express"})
})

app.use("/api/std",stdRouter)  // import and use stdRouter

app.use("/api/std/subject",stdSubRouter)

app.listen(3000, ()=>{
    console.log(`server is Running on http://localhost:3000`);
    // console.log(`server is Running on http://${h}:${3000}`);  // not work
})