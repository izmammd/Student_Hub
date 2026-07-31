const express = require("express");
const { handleTrainnerLogin, handleTrainnerSignup, getTrainerDetails, handleTrainnerUpdatePassword, getAllStd } = require("../controller/trainerController");
const handleAuth = require("../Auth/auth.js");
const authorized = require("../Auth/authorized.js");

const trainerRouter = express.Router();

trainerRouter.post("/signup", handleTrainnerSignup);

trainerRouter.post("/login", handleTrainnerLogin);

trainerRouter.get("/get", handleAuth, getTrainerDetails);

trainerRouter.patch("/updatepassword", handleAuth, handleTrainnerUpdatePassword);

trainerRouter.get('/allstd',handleAuth,authorized,getAllStd);

module.exports = trainerRouter;