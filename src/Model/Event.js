const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Name is required"],
        },
        description:{
            type:String,
            required:[true, "Description is Required"],
        },
        link:{
            type:String,
            required:[true, "Event Link is Required"],
        },
        linkText:{
            type:String,
            required:[true,"Event Link Text is required"],
        },
        startDate:{
            type:Date,
            required:[true, "Start Date is Required"],
        },
        endDate:{
            type:Date,
            required:[true, "End Date is Required"],
        },
        deletedAt:{
            type:Date,
            default:null,
        },
    },
    {timestamp: true},
);

const Event = mongoose.model('events',eventSchema);
module.exports = Event;