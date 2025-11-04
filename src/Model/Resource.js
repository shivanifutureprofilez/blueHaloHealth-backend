const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Resource title is required"]
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    tags: {
        type: String,
        required: [true, "Resource Tags are Required"]
    },
    link: {
        type: String,
        required: [true, "Resource Link is Required"]
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
