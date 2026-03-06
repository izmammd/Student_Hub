const moongoose = require("mongoose");

const trainerSchema = new moongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true,unique:true},
    age : {type:String,required : true},
    role : {type:String,default:"trainner"},
    password : {type:String, required:true}
})

const TRAINNER = moongoose.model("trainners",trainerSchema);

module.exports = TRAINNER;


