const Resource = require("../Model/Resource");

exports.addResource = async (req,res) => {
    try {
        const {title, date, tags, link} = req.body;
        if(!title || !date || !tags || !link){
            return res.status(400).json({
                status:false,
                message:"All fields are required"
            });
        }
        const result = new Resource({
            title,
            date,
            tags,
            link
        });
        const data = await result.save();
        if(!data){
            return res.status(400).json({
                status:false,
                message:"Unable To Add Resource",
                data: []
            })
        }
        return res.status(200).json({
            status:true,
            message:"Resource Added Successfully",
            data:data
        });
    } catch (error) {
        console.log("error : ",error)
        return res.status(500).json({
            status:false,
            message:"Unable To Add Resource. Please Try Again Later",
            error:error
        });
    }
};

exports.listResource = (async (req,res) => {
    try {
        const list = await Resource.find({deletedAt: null});
        if(!list){
            return res.status(400).json({
                status:false,
                message:"No Resources Found",
                resourceList: []
            });
        }
        return res.status(200).json({
            status:true,
            message:"Fetched All Resources Successfully",
            resourceList:list
        });
    } catch (error) {
        console.log("Error : ",error);
        return res.status(500).json({
            status:false,
            message:"Unable To Fetch Resources. Please Try Again Later",
            error:error
        });
    }
});

exports.deleteResource = (async (req,res)=>{
    try {
        const _id = req.params.id;
        console.log("req.params.id" ,req.params.id)
        const resourceData = await Resource.findByIdAndUpdate(_id);
        resourceData.deletedAt = new Date();
        resourceData.save();
        if(!resourceData){
            return res.status(400).json({
                status:false,
                message:"Unable to delete resource"
            })
        }
        return res.status(200).json({
            status:true,
            message:"Resource Deleted Successfully"
        })
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            status:false,
            message:"Unable To delete resource. Please try again later",
            error:error
        })   
    }
});

exports.updateResource = (async (req,res) => {
    try {
        const _id = req.params.id;
        const {title, date, tags, link} = req.body;
        if(!title || !date || !tags || !link){
            return res.status(400).json({
                status:false,
                message:"All fields are required"
            });
        }
        const resourceData = await Resource.findByIdAndUpdate(_id, { title, date, tags, link});
        if (!resourceData) {
            return res.status(400).json({
                status: false,
                message: "Unable To Update resource",
                resourceData:[]
            })
        }
        return res.status(200).json({
            status: true,
            message: "Resource Updated Successfully",
            resourceData: resourceData
        })
    } catch (error) {
        console.log("error : ",error);
        return res.status(500).json({
            status:false,
            message:"Unable to Update Resource. Try Again Later",
            error:error
        })        
    }
});






