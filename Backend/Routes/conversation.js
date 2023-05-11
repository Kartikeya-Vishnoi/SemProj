const express = require("express");
const controller = require("../Controller/Conversation");
const Router = express.Router();

Router.post("/",controller.newConversation);
Router.get("/getchatwithid", controller.getChatwithId);
Router.post("/getChat", controller.getChat);
module.exports = Router;