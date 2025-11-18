const JoinWaitList = require("../Model/JoinWaitList");

exports.addToWaitlist = async (req,res) => {
    try {
        const {fullName, email, phone, age, service, consent1, consent2} = req.body;
        // if(!fullName || !email || !phone || !age || !service || !consent1 || !consent2 ){
        //     return res.status(400).json({
        //         status:false,
        //         message:"All fields are required",
        //     });
        // }
        const result = new JoinWaitList({
           fullName, email, phone, age, service, consent1, consent2
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
        const list = await JoinWaitList.find();
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

exports.deleteWaitlist = (async (req,res) => {
    try {
        const id = req.params.id;
        const wrongEnquiry = await JoinWaitList.findByIdAndDelete(id);
        console.log("wrongEnquiry ",wrongEnquiry);
        if(!wrongEnquiry){
            return res.status(400).json({
                status:false,
                message:"Unable To Delete Waitlist Contact"
            });
        }
        return res.status(200).json({
            status:true,
            message:"Waitlist Contact Deleted Successfully"
        });
    } catch(error) {
        console.log("error : ",error);
        return res.status(500).json({
            status:false,
            message:"Unable to delete waitlist contact. Try again later",
            error:error
        });
    }
});