const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Resource title is required"]
    },
    link: {
        type: String,
        required: [true, "Resource Link is Required"]
    },
    tags:  {
        type: [String],
        required: [true, "Resource Tags are Required"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    deletedAt: {
        type: Date,
        default: null,
    },
},
    { timestamp: true },
);

const Resource = mongoose.model('resource', resourceSchema);
module.exports = Resource;
