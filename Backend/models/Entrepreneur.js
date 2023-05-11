const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntrepreneurSchema = new Schema({
    email : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    startupname : {
        type: String,
        required: true,
    },
    logoUrl : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true 
    },
    password : {
        type: String,
        required: true 
    },
    pitchurl : {
        type: String,
        required: false 
    },
    requests:[{
        type: Schema.Types.ObjectId,
        required:false,
        ref: 'Investor'
    }]
})

module.exports = mongoose.model('Entrepreneur', EntrepreneurSchema);