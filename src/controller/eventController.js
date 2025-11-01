const Event = require("../Model/Event");

exports.addEvent = async (req,res) => {
    try {
        const {name, description, link, linkText, startDate, endDate} = req.body;
        if(!name || ! description || !link || !linkText|| !startDate || !endDate){
            return res.status(400).json({
                status:false,
                message:"All fields required",
            });
        }
        const result = new Event({
            name,
            description,
            link,
            linkText,
            startDate,
            endDate
        });
        const data = await result.save();
        if(!data){
            return res.status(400).json({
                status:false,
                message:"Unable To Add Event",
                data:[]
            });
        }

        return res.status(200).json({
            status:true,
            message:"Event Added Successfully",
            data:data
        });

    } catch (error) {
        console.log("Error :",error);
        return res.status(500).json({
            status:false,
            message:"Unable To Add Events.Please Try Again Later",
            error:error,
        })
    }
};

exports.listEvent = (async (req,res) => {
    try {
        const list = await Event.find({ deletedAt: null });
        if(!list){
            return res.status(400).json({
                status:false,
                message:"Unable To list Events",
                eventList : [],
            })
        }
        return res.status(200).json({
            status:true,
            message: "Fetched All Events Successfully",
            eventList:list,
        })
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            status:false,
            error:error,
            message:"No Events Found. Try Again Later"
        })
    }
});

exports.deleteEvent = (async (req,res) => {
    try{
    const _id = req.params.id;
    const eventData = await Event.findByIdAndUpdate(_id);
    eventData.deletedAt = new Date();
    eventData.save();
    if(!eventData){
        return res.status(400).json({
            status:false,
            message:"Unable To delete Event"
        })
    }
    return res.status(200).json({
        status:true,
        message:"Event Deleted Successfully"
    })
    }
    catch(error){
        console.log("error :",error);
        res.status(500).json({
            status:false,
            message:"Unable To delete Event.Something Went Wrong"
        })
    }
});

exports.updateEvent = (async (req,res) => {
    try {
        const _id = req.params.id;
        const { name, description, link, linkText, startDate, endDate} = req.body;
        console.log("_id : ",_id);
        if(!name || ! description || !link || !linkText|| !startDate || !endDate){
            return res.status(400).json({
                status:false,
                message:"All fields required",
            });
        }
        const eventData = await Event.findByIdAndUpdate(_id, { name, description, link, linkText, startDate, endDate});
        if (!eventData) {
            return res.status(400).json({
                status: false,
                message: "Unable To Update Event",
                eventData:[]
            })
        }
        return res.status(200).json({
            status: true,
            message: "Event Updated Successfully",
            eventData: eventData
        })
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            status:false,
            message:"Unable to Update Event. Try Again Later",
            error:error
        })
    }
});



