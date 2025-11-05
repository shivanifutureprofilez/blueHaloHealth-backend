const Waitlist = require("../Model/WaitList");


exports.addToWaitlist = async (req,res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                status:false,
                message:"Email is required",
            });
        }
        const result = new Waitlist({
           email
        });
        const data = await result.save();
        if(!data){
            return res.status(400).json({
                status:false,
                message:"Unable To Add You To Waitlist",
                data:[]
            });
        }

        return res.status(200).json({
            status:true,
            message:"Added To Waitlist",
            data:data
        });

    } catch (error) {
        console.log("Error :",error);
        return res.status(500).json({
            status:false,
            message:"Unable To Add You To Waitlist. Please Try Again Later",
            error:error,
        })
    }
};

exports.getWaitlist = (async (req,res) => {
    try {
        const list = await Waitlist.find();
        if(!list){
            return res.status(400).json({
                status:false,
                message:"Unable To list Waitlisted Users",
                waitlistData : [],
            })
        }
        return res.status(200).json({
            status:true,
            message: "Fetched All Waitlisted Users",
            waitlistData:list,
        })
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            status:false,
            error:error,
            message:"Unable To list Waitlisted Users. Try Again Later"
        })
    }
});