// TO CREATE A MONGOOSE WE NEED CREATE SCHEMA
const mongoose = require("mongoose");
 
const stdSchema = new mongoose.Schema({
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    name:{type:String,required:true},
    age : {type:String,required:true,default:18},
    role : {type:String,default:"frontend"},
});

const STD = mongoose.model("std",stdSchema);

module.exports = STD;