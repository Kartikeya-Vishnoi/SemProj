const Investor = require("../models/Investor");
const Entrepreneur = require("../models/Entrepreneur")
// const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const mongoose = require("mongoose");
// const NodeRSA = require('node-rsa')
// const forge = require('node-forge')

exports.signup = (req, res, next) => {
  const {name, email, password, companyName, description} = req.body;
  const imgUrl = req.file.path.replace("\\", "/");
  // const passphrase = 'kartik3193';
  // const key = new NodeRSA({ b: 2048 });
  // const privateKeyPem = key.exportKey('private');
  // const privateKeyAsn1 = forge.pki.privateKeyFromPem(privateKeyPem);
  // const encryptedPrivateKey = forge.pki.encryptRsaPrivateKey(privateKeyAsn1, passphrase);
  // const publicKey = key.exportKey('public');
  //console.log(req.body);
      bcrypt.hash(password,12)
      .then((hashedpwd) => {
        const investor = new Investor({
          email: email,
          name: name,
          companyname: companyName,
          description: description,
          password: hashedpwd,
          image: imgUrl
        });
        investor
          .save()
          .then((result) => {
            res.status(201).json({ message: "User Created", userid: result._id });
          })
          .catch((err) => {
            next(err);
          });
      })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
};

exports.getProposalList = async (req, res, next) => {
  const id = req.body.id;
  //console.log(email);
  user = await Investor.find({_id:id});
  //console.log(user);
  let proposals = user[0].proposals;
  //console.log(proposals)
  const Proposal = proposals.map(proposal => proposal.toString());
  //console.log(Proposal);
  // res.json({
  //   proposals: proposals.map((proposal) => proposal.toObject({ getters: true })),
  // });
  res.json({
    proposals: Proposal
  });
}

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  Investor.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("User does not exists");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        next(error);
      }
      res.status(200).send(JSON.stringify({ user: loadedUser }));
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getInvestors = async (req, res, next) => {
  let users;
  const excludedFields = { password: 0};
  try {
    users = await Investor.find({}, excludedFields);
  } catch (error) {
    return next(new HttpError("Cannot fetch users, please try again later", 500));
  }
  res
    .status(201)
    .json
    ({ users: users.map((user) => user.toObject({ getters: true })) });
}

exports.declineProposal = async (req, res, next) => {
  const id = req.body.id;
  try{
    const updatedResult = await Investor.findByIdAndUpdate(
      {_id:req.body.investorId},
      { $pull: { proposals: id } },
      { new: true },
    );
    console.log(updatedResult)
  }
  catch(err){
    console.log(err);
  }
}

exports.acceptProposal = async (req, res, next) => {
  const id = req.body.id;
  let investor;
  try{
    investor = await Investor.findById(req.body.investorId);
  }
  catch (err){
    return new HttpError("Could not connect, Please try again", 500);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    investor.acceptedproposals.push(id);
    await investor.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Estabilishing Connection failed, Please try again later.",
      500
    );
    return next(error);
  }

}

exports.addproposal = async (req, res, next) => {

  let investor,entrepreneur;
  try{
    investor = await Investor.findById(req.body.investorId);
  }
  catch (err){
    return new HttpError("Could not connect, Please try again", 500);
  }
  try{
    entrepreneur = await Entrepreneur.findById(req.body.entrepreneurId);
  }
  catch (err){
    return new HttpError("Could connection failed, Please try again", 500);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    investor.proposals.push(entrepreneur);
    await investor.save({ session: sess });
    entrepreneur.requests.push(investor._id);
    await entrepreneur.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Estabilishing Connection failed, Please try again later.",
      500
    );
    return next(error);
  }
}