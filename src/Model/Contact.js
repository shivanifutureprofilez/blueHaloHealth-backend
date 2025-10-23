const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const contactSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: [true, "Name is Required"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        // validate: [validateEmail, 'Please fill a valid email address'], // Optional 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone:{
        type:Number,
        min:10,
    },
    message:{
        type:String,
        min:10
    },
    
}, {timestamps :true})


const Contact = mongoose.model('contacts', contactSchema);
module.exports = Contact;