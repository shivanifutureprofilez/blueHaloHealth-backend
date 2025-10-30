const mongoose = require("mongoose");
const Service = require("../Model/Service");

exports.addNewService = async (req, res) => {
  try {
    const { title, name, bannerImg, description, content, benefits } = req.body;

    if (!name || !title) {
      return res.status(400).json({
        status: false,
        message: "Name and title are required.",
      });
    }

    const mappedBenefits = (benefits || []).map((b) => ({
      title: b.name,
      description: b.benefits,
    }));

    const newService = new Service({
      name: title,
      description,
      content,
      benefits: mappedBenefits,
      agegroup: name,
      bannerImg: bannerImg,
    });

    await newService.save();

    return res.status(201).json({
      status: true,
      message: "Service added successfully.",
      data: newService,
    });
  } catch (error) {
    console.error("Error adding service:", error);
    return res.status(500).json({
      status: false,
      message: "Service not added. Something went wrong.",
      error: error.message,
    });
  }
};

exports.getServicebyId = async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new mongoose.Types.ObjectId(id);
    const serviceData = await Service.findById(objectId).populate(
      "agegroup"
    );
    if (!serviceData && serviceData.length) {
      return res.json({
        status: false,
        allServices: [],
        message: "Unable To fetch service",
      });
    } 
    return res.json({
        status: true,
        message: "Service fetched successfully",
        data:serviceData,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      allServices: error || "",
      message: "An error occured. Try again Later",
    });
  }
};

exports.showFeaturedServices = async (req, res) => {
  try {
     
    const serviceData = await Service.find({featured:1});
    if (!serviceData) {
      return res.status(400).json({
        status: false,
        allServices: [],
        message: "Unable To fetch All Services",
      });
    }
    res.status(200).json({
      allServices: serviceData,
      status: true,
      message: "Fetched All Services",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: false,
      allServices: error || "",
      message: "Unable to fetch all services. Try again Later",
    });
  }
};


exports.showAllServices = async (req, res) => {
  try {
    const { age } = req.query;
    const filter = { deletedAt: null };
    if (age && age!="") {
      filter.agegroup = age;
    }
    const serviceData = await Service.find(filter).populate("agegroup");
    if (!serviceData) {
      return res.status(400).json({
        status: false,
        allServices: [],
        message: "Unable To fetch All Services",
      });
    }
    res.status(200).json({
      allServices: serviceData,
      status: true,
      message: "Fetched All Services",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: false,
      allServices: error || "",
      message: "Unable to fetch all services. Try again Later",
    });
  }
};


exports.updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, name, bannerImg, description, content, benefits } = req.body;

    // Validate required fields
    if (!name || !title) {
      return res.status(400).json({
        status: false,
        message: "Name and title are required.",
      });
    }

    // Find the existing service
    const existingService = await Service.findById(id);
    if (!existingService) {
      return res.status(404).json({
        status: false,
        message: "Service not found.",
      });
    }

    // Map benefits properly if provided
    const mappedBenefits = (benefits || []).map((b) => ({
      title: b.name,
      description: b.benefits,
    }));

    // Update the service fields
    existingService.name = title;
    existingService.agegroup = name;
    existingService.description = description;
    existingService.content = content;
    existingService.bannerImg = bannerImg;
    existingService.benefits = mappedBenefits;

    // Save updated service
    const updatedService = await existingService.save();

    return res.status(200).json({
      status: true,
      message: "Service updated successfully.",
      data: updatedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    return res.status(500).json({
      status: false,
      message: "Service not updated. Something went wrong.",
      error: error.message,
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const _id = req.params.id;
    const serviceData = await Service.findByIdAndUpdate(_id);
    serviceData.deletedAt = new Date();
    serviceData.save();
    if (!serviceData) {
      return res.status(400).json({
        status: false,
        message: "Unable To Delete Service",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Service Deleted Succesfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Unable To Delete Service. Try Again Later.",
      error: error,
    });
  }
};


exports.featureService = async (req, res) => {
  try {
    const _id = req.params.id;
    const serviceData = await Service.findByIdAndUpdate(_id);
    serviceData.featured = serviceData?.featured == 1 ? 0 : 1 ;
    serviceData.save();
    if (!serviceData) {
      return res.status(400).json({
        status: false,
        message: "Unable to update service.",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Service updated Succesfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Unable To update Service. Try Again Later.",
      error: error,
    });
  }
};

exports.showServiceDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const serviceData = await Service.findById(id);
    if (!serviceData) {
      res.status(400).json({
        status: false,
        message: "Unable To Fetch Service Details",
      });
    }
    res.status(200).json({
      status: true,
      message: "Service Details Fetched Succesfully",
      serviceData: serviceData,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error,
    });
  }
};
