const Conversation = require('../models/Conversation');
const HttpError = require("../models/http-error");

exports.newConversation = async (req,res,next) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId]
    })
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        return next(new HttpError("Something Went wrong please try again", 500));
    }
}

exports.getChatwithId = async (req, res, next) => {
    const userId = req.body.id;
    try {
        const conversation = await Conversation.find({
            members: {$in : [userId]}
        });
        res.status(200).json(conversation); 
    } catch (error) {
        return next(new HttpError("Something Went wrong please try again", 500));
    }
}

exports.getChat = async (req, res, next) => {
    const user1Id = req.body.id1;
    const user2Id = req.body.id2;
    try {
        const conversation = await Conversation.find({
            members: {$in : [user1Id], $in : [user2Id]}
        });
        
        res.status(200).json(conversation); 
    } catch (error) {
        return next(new HttpError("Something Went wrong please try again", 500));
    }
}