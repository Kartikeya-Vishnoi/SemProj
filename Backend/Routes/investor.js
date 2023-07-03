const express = require('express');
const Router = express.Router();
const controller = require('../Controller/investor');
const fileUpload = require("../Middleware/ImageUpload");

Router.put('/signup',fileUpload.single('image'),controller.signup);
Router.post('/login', controller.login);
Router.get('/list', controller.getInvestors);
Router.put('/addproposal', controller.addproposal);
Router.post('/getlist', controller.getProposalList);
Router.post('/acceptproposal', controller.acceptProposal);
Router.post('/declineproposal', controller.declineProposal);
module.exports = Router;
