const express = require("express");
const controller = require("../Controller/message");
const Router = express.Router();

Router.post("/newmessage",controller.newMessage);
Router.post("/getmessages",controller.getMessages);
module.exports = Router;