const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bycrypt = require('bcrypt');

exports.validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(200).json({ status: false, message: "No token provided" });
        }

        // Token format: "Bearer <token>"
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(200).json({ status: false, message: "Token missing" });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(200).json({ status: false, message: "Invalid or expired token" });
            }
            const user = await User.findById(decoded.userId);
            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Token validation error:", error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

const signToken = (user_id) => {
    const token = jwt.sign({ userId: user_id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
    return token;
}

exports.login = (async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required!!"
            })
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User Not Found"
            })
        }
        const actualUser = await User.findOne({ email });
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password." });
        }
        const token = signToken(user._id);
        return res.status(200).json({
            "message": "User Logged In Succesfully",
            "user": actualUser,
            "token": token,
            "status": true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Unable To Login. Something Went Wrong",
            error: error
        })
    }
});


exports.myprofile = (async (req, res) => {
    try {
        if (req?.user) {
            return res.status(200).json({
                status: true,
                user: req?.user
            })
        } else { 
            return res.status(400).json({
                status: false,
                user: "Unauthencated"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Unauthencated",
        })
    }
});

exports.register = (async (req, res) => {
    try {
        const user = new User({
            email:"admin@gamil.com",
            name:"Admin",
            isAdmin: 1,
            password:""
        })
        const result = await user.save();
        if(result){
            return res.status(200).json({
                status: true,
                message: "User has been created",
                result: result
            })
        } else { 
            return res.status(400).json({
                status: false,
                message: "Unable To register. Something Went Wrong",
                error: result
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Unable To Login. Something Went Wrong",
            error: error
        })
    }
});