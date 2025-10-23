const Contact = require("../Model/Contact");


exports.contact = (async (req, res) => {
    try {
        const enquiry = new Contact({
            fullName:"",
            email:"",
            phone:"",
            message:""
        })
        const result = await enquiry.save();
        if(result){
            res.json({
                status: true,
                message: "Enquiry has been sent",
                result: result
            })
        } else { 
            res.json({
                status: false,
                message: "Unable To send enquiry.",
                error: result
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: "Unable To send enquiry. Something Went Wrong",
            error: error
        })
    }
});