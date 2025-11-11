const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
        email:
        {
        type:String,
        required:[true, "email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        // validate: [validateEmail, 'Please fill a valid email address'], // Optional 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    },
    {timestamps: true},
);

const Waitlist = mongoose.model('waitlists',waitlistSchema);
module.exports = Waitlist;