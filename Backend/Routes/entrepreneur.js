const express = require("express");
const { check } = require("express-validator");
const controller = require("../Controller/entrepreneur");
const fileUpload = require("../Middleware/PitchUpload");
const Router = express.Router();

Router.put(
  "/signup",
  fileUpload.fields([{name:"video"}, { name:"logo"}, {name:"verificationdoc"}]),
  [
    check("email").normalizeEmail().isEmail(),
    check("name").not().isEmpty(),
    check("password").isLength({ min: 6 }),
  ],
  controller.signup
);
Router.post("/login", controller.login);
Router.post("/getEntrepreneurbyId", controller.getEntrepreneurbyId);

module.exports = Router;