const Contact = require("../Model/Contact");


exports.contactAdd = (async (req, res) => {
    try {
        const { fullName,service, age, phone, email, message, smsCheckbox } = req.body;
         if(!fullName || !age  || !email){
          return  res.status(400).json({
                status:false,
                message:"All fields required"
            })
        }
        const enquiry = new Contact({
            fullName, age, phone, email, service, message, smsCheckbox
        })
        const result = await enquiry.save();
        if (result) {
            return res.status(200).json({
                status: true,
                message: "Enquiry has been sent",
                result: result
            })
        } else {
            return res.status(400).json({
                status: false,
                message: "Unable To send enquiry.",
                error: result
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: "Unable To send enquiry. Something Went Wrong",
            error: error
        })
    }
});

exports.contactList = (async (req, res) => {
    try {
        const enquiryData = await Contact.find({})
            
        if(enquiryData && enquiryData.length){
            return res.status(200).json({
                enquiryData: enquiryData,
                status:true,
                message:"Fetched All Contacts"
            })
        }
        else{
            return res.status(400).json({
                status:false,
                enquiryData: [],
                message: "Unable To fetch All Contacts"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status:false,
            enquiryData : error || '',
            message: "Unable to fetch all Contacts. Try again Later"
        })
    } 
});

exports.deleteEnquiry = (async (req,res) => {
    try {
        const id = req.params.id;
        const wrongEnquiry = await Contact.findByIdAndDelete(id);
        console.log("wrongEnquiry ",wrongEnquiry);
        if(!wrongEnquiry){
            return res.status(400).json({
                status:false,
                message:"Unable To Delete Enquiry"
            });
        }
        return res.status(200).json({
            status:true,
            message:"Enquiry Deleted Successfully"
        });
    } catch(error) {
        console.log("error : ",error);
        return res.status(500).json({
            status:false,
            message:"Unable to delete enquiry. Try again later",
            error:error
        });
    }
});


