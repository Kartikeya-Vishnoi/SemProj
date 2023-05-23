const Entrepreneur = require("../models/Entrepreneur");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Investor = require("../models/Investor");
const HttpError = require("../models/http-error");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, password, startupname, description } = req.body;
  let loadedUser;
  try {
    loadedUser = await Entrepreneur.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Signing Up failed please try again", 500));
  }

  if (loadedUser) {
    return next(
      new HttpError(
        "User with given email id already exists, please try with a different Id",
        403
      )
    );
  }
  const pitchUrl = req.files["video"][0].path.replace("\\", "/");
  const logoUrl = req.files["logo"][0].path.replace("\\", "/");
  let hashedpwd;
  try {
    hashedpwd = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Signing up failed please try again", 500));
  }
  const entrepreneur = new Entrepreneur({
    email: email,
    name: name,
    startupname: startupname,
    logoUrl:logoUrl,
    description: description,
    password: hashedpwd,
    pitchurl: pitchUrl,
  });
  let created;
  try {
    created = await entrepreneur.save();
  } catch (err) {
    return next(new HttpError("Signing up failed please try again", 500));
  }
  res.status(201).json({ message: "User Created", userid: entrepreneur._id });
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    loadedUser = await Entrepreneur.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Logging in failed please try again", 500));
  }

  if (!loadedUser) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong",
        403
      )
    );
  }
  let isEqual;
  try {
    isEqual = await bcrypt.compare(password, loadedUser.password);
  } catch (err) {
    return next(new HttpError("Logging in failed please try again", 500));
  }

  if (!isEqual) {
    return next(new HttpError("Invalid Credentials", 403));
  }
  // const token = jwt.sign(
  //   {
  //     email: loadedUser.email,
  //     userId: loadedUser._id.toString(),
  //   },
  //   "smefflfkgdflkdajhsfhieowuhdfkfj",
  //   { expiresIn: "1h" }
  // );
  //res.status(200).json({ token:token, userId: loadedUser._id.toString() });
  res.status(200).send(JSON.stringify({ user: loadedUser }));
};

exports.connectInvestors = async (req, res, next) => {
  let investor;
  try {
    investor = await Investor.findById(req.id);
  } catch {
    (err) => {};
  }

  if (!investor) {
    const error = new Error("Investor doent't exists");
    error.statusCode = 401;
    throw error;
  }
  // const sess = await mongoose.startSession();
  // sess.startTransaction();
  // await createdPlace.save({ session: sess });
  // user.places.push(createdPlace);
  // await user.save({ session: sess });
  // await sess.commitTransaction();
};

exports.getEntrepreneurbyId = async (req, res, next) => {
  const id = req.body.id;
  //console.log(id)
  let user;
  try{
  user = await Entrepreneur.findById(id);
  }
  catch(err){
    return next(new HttpError("The server is not responding, please try again later", 500));
  }
  if(!user){
    return next(new HttpError("The server is not responding, please try again later", 500));
  }
  //console.log(user);
  res.send(JSON.stringify({user:user}));
}

// exports.getEntrepreneurbyId()
