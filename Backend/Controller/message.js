const Message = require("../models/Message");
const HttpError = require("../models/http-error");

exports.newMessage = async (req, res, next) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        return next(new HttpError("Something Went wrong please try again", 500));
    }
}

exports.getMessages = async (req, res, next) => {
    try {
        const messages = await Message.find({
            conversationId: req.body.conversationId,
        });
        res.status(200).json(messages);
    } catch (error) {
        return next(new HttpError("Something Went wrong please try again", 500));
    }
}