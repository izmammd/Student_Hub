const express = require("express");
require("dotenv").config();
const connectDB = require("./DB_Connnection/db");
const stdRouter = require("./Router/stdRouter");
const stdSubRouter = require("./Router/stdSubRouter");
const app = express();
const cors = require("cors");
const trainerRouter = require("./Router/trainerRouter");
const otpRouter = require("./Router/otpRouter");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5175";
const allowedOrigins = [FRONTEND_URL, "http://localhost:5173", "http://localhost:5175"];
const PORT = process.env.PORT || 3000;

app.use(express.json());

// HELP TO CONNECT FRONTEND
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB()  // connect DB -> to call function connectDB

app.use("/api/std",stdRouter)  // import and use stdRouter

app.use("/api/std/subject",stdSubRouter);

app.use("/api/trainner",trainerRouter)

app.use("/api/otp",otpRouter)

app.listen(PORT, ()=>{
    console.log(`server is Running on http://localhost:${PORT}`);
    // console.log(`server is Running on http://${h}:${PORT}`);  // not work
})