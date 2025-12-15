const { default: mongoose } = require("mongoose");
const Service = require("../Model/Service");
const SubService = require("../Model/SubService");
const { connectDB } = require("../db");
const { invalidateByUrl } = require("../middleware/cache");
const { toSlug } = require("../utils/toSlug");

exports.addNewSubService = async (req, res) => {
  try {
    console.log("req.file ", req.body);
    const { name, bannerImg, description, content, service } = req.body;
    const slug = toSlug(name);
    console.log("req.body ", req.body);
    let imgurl = bannerImg;
    if (req.file) {
      imgurl = process.env.APP_URL + "/uploads/" + req.file?.filename;
    }

    const file = req.file;
    if (!name || !description) {
      return res.status(200).json({
        status: false,
        message: "Name and description are required.",
      });
    }
    const newSubService = new SubService({
      name: name,
      description,
      content,
      bannerImg: imgurl,
      service,
      slug
    });

    await newSubService.save();

    return res.status(201).json({
      status: true,
      message: "Service added successfully.",
      data: newSubService,
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

exports.singleSubServiceDetails = async (req, res) => {
  try {
    await connectDB();
    const id = req.params.id;
    const subServiceData = await SubService.findOne({
      slug: id,
    }).populate("service");

    if (!subServiceData) {
      return res.status(404).json({
        status: false,
        message: "Sub Service not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Sub-Service Details Fetched Successfully",
      subServiceData,
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      error,
      message: "Unable To Fetch Service Details",
    });
  }
};

exports.allSubService = (async (req, res) => {
  try {
    await connectDB();
  
    const id = req.params.serviceid;
    const s = await Service.findOne({slug:id});

    let serviceid_slug;
    if (s) {
       serviceid_slug = s?._id;
    } else {
      serviceid_slug = id;
    }
    const list = await SubService.find({
        service: serviceid_slug
    });


    if (!list) {
      return res.status(200).json({
        status: false,
        message: "No Sub Services Found",
        subServiceList: []
      });
    }
    return res.status(200).json({
      status: true,
      message: "Fetched All Sub Services Successfully",
      subServiceList: list
    });
  } catch (error) {
    console.log("Error : ", error);
    return res.status(500).json({
      status: false,
      message: "Unable To Fetch Sub Service. Please Try Again Later",
      error: error
    });
  }
});

exports.updateSubService = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("_id", id);
    console.log("req.body", req.body);
    const { name, bannerImg, description, content } = req.body;
    const slug = toSlug(name);
    const subService = await SubService.findByIdAndUpdate(
      id,
      { name, bannerImg, description, content,slug },
      { new: true }
    );

    if (!subService) {
      return res.status(200).json({
        status: false,
        errro: subService,
        message: "Unable To Update Sub-Service"
      });
    }
    await invalidateByUrl(`/api/subservice/${id}`);
    await invalidateByUrl(`/api/service/${subService?.service}`);

    return res.status(200).json({
      status: true,
      message: "Sub Service Updated Successfully",
      data: subService
    });

  } catch (error) {
    console.log("error", error)
    return res.status(500).json({
      status: false,
      message: "Sub Service Not Updated. Try again Later",
      error
    });
  }
};

exports.deleteSubService = (async (req, res) => {
  try {
    const _id = req.params.id;
    const subServiceData = await SubService.findByIdAndUpdate(_id);
    subServiceData.deletedAt = new Date();
    subServiceData.save();
    if (!subServiceData) {
      return res.status(200).json({
        status: false,
        message: "Unable To delete Sub service"
      })
    }
    await invalidateByUrl(`/api/subservice/${_id}`);
    return res.status(200).json({
      status: true,
      message: "Sub service deleted succesfully"
    })
  } catch (error) {
    console.log("error : ", error);
    return res.status(500).json({
      status: false,
      message: "Unable to delete sub services. Try again later",
      error: error
    });
  }
});

