const mongoose = require("mongoose")
const connectDB = async ()=>{     // DB is asyn 
    try{
    //    await mongoose.connect("mongodb://localhost:27017/std_hub")   // DB connect and connection

        await mongoose.connect("mongodb://localhost:27017/std_hub");
        console.log("DB Connected");
        
    }
    catch(err){
        console.log("DB not Connected");
        
    }
}

module.exports = connectDB; // to export the function