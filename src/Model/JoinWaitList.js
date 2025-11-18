const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is Required"],
    },
    email:
    {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        // validate: [validateEmail, 'Please fill a valid email address'], // Optional 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: Number,
        min: 10,
    },
    age: {
        type: Number,
        required: [true, "Age is Required"],
    },
    service: {
        type: String,
        required: [true, "Service is Required"],
    },
    consent1:{
        type:Boolean,
        default:true,
        required: [true, "Your Consent Is Required!!"]
    },
    consent2:{
        type:Boolean,
        default:true,
        required: [true, "Your Consent Is Required!!"]
    }
},
    { timestamps: true },
);

const JoinWaitList = mongoose.model('waitlists', waitlistSchema);
module.exports = JoinWaitList;