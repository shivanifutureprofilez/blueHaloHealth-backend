const SubService = require("../Model/SubService");
const { invalidateByUrl } = require("../middleware/cache");

exports.addNewSubService = async (req, res) => {
  try {
    console.log("req.file ", req.body);
    const { name, bannerImg, description, content, service } = req.body;
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
      service
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
    const id = req.params.id;
    const subServiceData = await SubService.findOne({
      _id: id,
      deletedAt: null,   // ensures soft-deleted services are excluded
    }).lean();           // makes it faster (returns plain object)

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
    const id = req.params.serviceid;
    console.log("id",id);
    const list = await SubService.find({service:id});
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
