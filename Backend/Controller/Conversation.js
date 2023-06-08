const Conversation = require("../models/Conversation");
const HttpError = require("../models/http-error");
const cryto = require("crypto");

exports.newConversation = async (req, res, next) => {
  const crypto = require("crypto");
  const sharedSecret = crypto.randomBytes(32);
  const sharedSecretHex = sharedSecret.toString("hex");
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    key: sharedSecretHex
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    return next(new HttpError("Something Went wrong please try again", 500));
  }
};

exports.getChatwithId = async (req, res, next) => {
  const userId = req.body.id;
  try {
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    return next(new HttpError("Something Went wrong please try again", 500));
  }
};

exports.getChat = async (req, res, next) => {
  const user1Id = req.body.id1;
  const user2Id = req.body.id2;
  // console.log(user1Id);
  // console.log(user2Id);
  try {
    const conversation = await Conversation.find({
      members: { $all: [user1Id, user2Id] },
    });

    res.status(200).json(conversation);
  } catch (error) {
    return next(new HttpError("Something Went wrong please try again", 500));
  }
};
