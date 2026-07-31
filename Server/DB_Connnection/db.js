const mongoose = require("mongoose")
require("dotenv").config();
const connectDB = async () => {     // DB is asyn 
    try {
        const MONGO_URI = process.env.MONGO_URI || process.env.DB || "mongodb://localhost:27017/std_hub";
        await mongoose.connect(MONGO_URI);

        // await mongoose.connect("mongodb://localhost:27017/std_hub");
        console.log("DB Connected");

    }
    catch (err) {
        console.error("DB not Connected", err.message);
        process.exit(1);

    }
}

module.exports = connectDB; // to export the function