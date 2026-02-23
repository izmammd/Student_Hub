const moongoose = require("mongoose");


const subSchema = new moongoose.Schema({
    subject : {type : String,require : true},
    stdId : {type : moongoose.Schema.Types.ObjectId, ref : "std", required : true}

});

const SUBJECT = moongoose.model("subject" ,subSchema);

module.exports = SUBJECT;

