const mongoose = require('mongoose');

const {Schema} = mongoose;

const approveSchema = new Schema({
    accepted:[
        {type: Schema.Types.ObjectId, ref: 'appointment'}
    ],
    rejected: [
        {type: Schema.Types.ObjectId, ref: 'appointment'}
    ]
});

module.exports = mongoose.model('approve', approveSchema);