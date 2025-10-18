const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    bannerImg : {
        type:String,
        required: [true, "Banner Image is Required"]
    },
    name : {
        type:String,
        required: [true,"Service name is required"]
    },
    description1: {
        type:String,
        required:[true, "Description is required"],
        minlength: [25, 'Address must be at least 25 characters long'],
    },
    description2:{
        type:String,
    },
    provider: {
        type:String,
        required: [true, "Provider name is required"]
    },
    benefits: [
        {
            title: { type: String },
            description: { type: String }
        }
    ],
    agegroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'agegroups',
        required: true,
    },
    deletedAt: {
        type: Date,
    }
}, {timestamps :true}
)
 

const Service = mongoose.model('services',serviceSchema);
module.exports = Service;