const express = require("express")
const stdRouter = express.Router();
const {handleStdSignup,handleStdLogin,getStdDetails,handlStdUpdatename,handleStdUpdatePassword,handleStdDelete} = require("../controller/stdController.js");
const handleAuth = require("../Auth/auth.js");
// const handleStdLogin = require("../controller/stdController.js");


// use for testing
stdRouter.get("/", (req, res) => {
    return res.json({ message: "student Router is Running" })
})

//  CREATE SIGNUP ROUTE FOR STUDENT
// finction create in controller
stdRouter.post("/signup", handleStdSignup);

//  LOGIN STD
stdRouter.post("/login", handleStdLogin);

//   AUTHORIZATION  &&&  // get details student
stdRouter.get("/get",handleAuth,getStdDetails);

// UPDATE STUDENT NAME
stdRouter.patch("/updatename",handleAuth,handlStdUpdatename);

// STUDENT PASSWORD UPDATE
stdRouter.patch("/updatepassword",handleAuth,handleStdUpdatePassword)

// STUDENT DELETE ACCOUNT
stdRouter.delete("/delete",handleAuth,handleStdDelete)
module.exports = stdRouter;  // export stdRouter function