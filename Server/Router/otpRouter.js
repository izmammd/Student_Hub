const { handleVerifyEmail,handleGetOtp ,handleVerifyOtp,handleUpdatePassword} = require("../controller/otpController");
const OTP = require("../model/otpModel")
const express = require("express");

const otpRouter = express.Router();

otpRouter.post("/emailverify",handleVerifyEmail);

otpRouter.post("/getotp",handleGetOtp)

otpRouter.post("/verifyotp",handleVerifyOtp)

otpRouter.post("/updatepassword",handleUpdatePassword)

module.exports = otpRouter;