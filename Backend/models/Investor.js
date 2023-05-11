const { request } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvestorSchema = new Schema({
    email : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    companyname : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true 
    },
    image : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true 
    },
    proposals:[{
        type: Schema.Types.ObjectId,
        required:false,
        ref: 'Entrepreneur'
    }]
})

module.exports = mongoose.model('Investor', InvestorSchema);