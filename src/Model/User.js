const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true, "email is required"],
        unique:true,
        lowercase:true,
        trim:true,
        // validate: [validateEmail, 'Please fill a valid email address'], // Optional 
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true, 'password is required'],
        select:false,
        max:25
    },
    hashGenerated:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Number
    }
},
    { timestamps: true }
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    try{
        this.password = await bycrypt.hash(this.password, 10);
        this.hashGenerated = true;
        next();
    }
    catch(err){
        next(err);
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;