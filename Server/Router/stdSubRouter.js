const express = require("express");
const handleAuth = require("../Auth/auth");
const { handleAddSubject, handleGetAllSubject, handleRemoveSubject,handleUpdateSubject } = require("../controller/subController.js");


const stdSubRouter = express.Router();

stdSubRouter.post("/addsubject", handleAuth, handleAddSubject);

stdSubRouter.get("/allsubject", handleAuth, handleGetAllSubject);

stdSubRouter.delete("/remove/:id", handleAuth, handleRemoveSubject);

stdSubRouter.patch("/updatesubject",handleAuth,handleUpdateSubject)

module.exports = stdSubRouter;