const Service = require("../Model/Service");

exports.addNewService = (async (req, res) => {
    try {
        const { name,
                bannerImg,
                description1,
                description2,
                provider,
                benefits,
                agegroup } = req.body;
                console.log("req.body" ,req.body)

        if(!name || !bannerImg || !description1 || !provider  || !agegroup){
            res.json({
                status:false,
                message:"All fields required"
            })
        }

        console.log("benefits benefits",benefits)
        const result = new Service({name, bannerImg, description1, description2, provider, benefits, agegroup})
        const data = await result.save();
        if(data?._id){
            res.json({
                status:true,
                message:"Service Added Successfully"
            })
        }
        else{
            res.json({
                status:false,
                message:"Unable To Add Service"
            })
        }
    } catch (error) {
        console.log("error ", error);
        res.json({
            status: false,
            message: "Service Not Added. Something went wrong!!",
            error: error
        })
    }
});

exports.showServicesByAge = (async (req, res) => {
    try {
        const id = req.params.id;
        const serviceData = await Service.find({agegroup: id}).populate('agegroup');
        if(serviceData && serviceData.length){
            res.json({
                allServices: serviceData,
                status:true,
                message:"Fetched All Services"
            })
        }
        else{
            res.json({
                status:false,
                allServices: [],
                message: "Unable To fetch All Services"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status:false,
            allServices : error || '',
            message: "Unable to fetch all services. Try again Later"
        })
    } 
});


exports.showAllServices = (async (req, res) => {
    try {
        const serviceData = await Service.find({}).populate('agegroup');
            console.log("serviceData",serviceData)
        if(serviceData && serviceData.length){
            res.json({
                allServices: serviceData,
                status:true,
                message:"Fetched All Services"
            })
        }
        else{
            res.json({
                status:false,
                allServices: [],
                message: "Unable To fetch All Services"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status:false,
            allServices : error || '',
            message: "Unable to fetch all services. Try again Later"
        })
    } 
});

exports.updateService = async (req, res) => {
  try {
    const {
      id,
      serviceName,
      bannerImg,
      description1,
      description2,
      provider,
      benefits,
      agegroup,
    } = req.body;
    console.log("req.body" , req.body);
    // if (!id || !serviceName || !bannerImg || !description1 || !provider || !benefits || !agegroup) {
    //   res.json({
    //     status: false,
    //     message: "All fields required"
    //   });
    // }

    console.log("service id", id);
    const SERVICE = await Service.findById(id)
    console.log("service SERVICE", SERVICE);
    const serviceData = await Service.findByIdAndUpdate(
      id,
      { serviceName, bannerImg, description1, description2, provider, agegroup , benefits}
      
    );
    console.log("service Data", serviceData);
    if (!serviceData) {
      return res.json({
        status: false,
        message: "Unable To Update Service",
      });
    }
    return res.json({
      status: true,
      message: "Successfully Updated Service",
      serviceData,
    });

  } catch (error) {
    console.error(error);
    return res.json({
      status: false,
      message: "Unable To Update Service. Try Again Later.",
      error,
    });
  }
};


exports.deleteService = (async (req,res) => {
    try {
        const _id = req.params.id;
        const serviceData = await Service.findByIdAndUpdate(_id);
        serviceData.deletedAt = new Date();
        serviceData.save();
        if(!serviceData){
            res.json({
                status:false,
                message:"Unable To Delete Service"
            })
        }
        res.json({
            status:true,
            message:"Service Deleted Succesfully",
        })
    } catch (error) {
        res.json({
            status:false,
            message:"Unable To Delete Service. Try Again Later.",
            error:error
        })
    }
});

exports.showServiceDetails = (async (req,res) => {
    try {
        const id = req.params.id;
        const serviceData = await Service.findById(id);
        if(!serviceData){
            res.json({
                status:false,
                message:"Unable To Fetch Service Details"
            })
        }
        res.json({
            status:true,
            message:"Service Details Fetched Succesfully",
            serviceData:serviceData
        })
    } catch (error) {
        res.json({
            status:false,
            error: error
        })
        
    }
});

