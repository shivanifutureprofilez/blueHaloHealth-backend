const mongoose = require("mongoose");
const Service = require("../Model/Service");
const { invalidateByUrl } = require("../middleware/cache");

// exports.addNewService = async (req, res) => {
//   try {
//     const { title, name, bannerImg, description, content, benefits } = req.body;

//     if (!name || !title) {
//       return res.status(400).json({
//         status: false,
//         message: "Name and title are required.",
//       });
//     }

//     const mappedBenefits = (benefits || []).map((b) => ({
//       title: b.name,
//       description: b.benefits,
//     }));

//     const newService = new Service({
//       name: title,
//       description,
//       content,
//       benefits: mappedBenefits,
//       agegroup: name,
//       bannerImg: bannerImg,
//     });

//     await newService.save();

//     return res.status(201).json({
//       status: true,
//       message: "Service added successfully.",
//       data: newService,
//     });
//   } catch (error) {
//     console.error("Error adding service:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Service not added. Something went wrong.",
//       error: error.message,
//     });
//   }
// };

exports.addNewService = async (req, res) => {
  try {
    console.log("req.file ",req.body);
    const { title, name, description, content,additionalContent, benefits, bannerImg } = req.body;
    
    let imgurl = bannerImg;
    if(req.file){ 
      imgurl = process.env.APP_URL + "/uploads/" + req.file?.filename;
    }

    const file = req.file;
    if (!name || !title) {
      return res.status(200).json({
        status: false,
        message: "Name and title are required.",
      });
    }
    console.log("reqbod",req.body)
    let mappedBenefits;
    mappedBenefits = (mappedBenefits || []).map((b) => ({
      title: b.name,
      description: b.benefits,
    }));

    const newService = new Service({
      name: title,
      description,
      content,
      additionalContent,
      benefits: mappedBenefits,
      agegroup: name,
      bannerImg: imgurl,
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


// exports.getServicebyId = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const serviceData = await Service.findById(id).populate(
//       "agegroup"
//     );
//     if (!serviceData && serviceData.length) {
//       return res.json({
//         status: false,
//         allServices: [],
//         message: "Unable To fetch service",
//       });
//     }
//     return res.json({
//       status: true,
//       message: "Service fetched successfully",
//       data: serviceData,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       status: false,
//       allServices: error || "",
//       message: "An error occured. Try again Later",
//     });
//   }
// };

exports.getServicebyId = async (req, res) => {
  try {
    const id = req.params.id;

    const serviceData = await Service.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          deletedAt: null
        }
      },
      {
        $lookup: {
          from: "agegroups",
          localField: "agegroup",
          foreignField: "_id",
          pipeline: [
            { $match: { deletedAt: null } },
            { $project: { _id: 1, title: 1, icon: 1 } }
          ],
          as: "agegroup"
        }
      },
      {
        $unwind: {
          path: "$agegroup",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        // IMPORTANT: Optimize large content field
        $project: {
          name: 1,
          title: 1,
          description: 1,
          bannerImg: 1,
          agegroup: 1,
          benefits: 1,
          content: 1, // keep this if needed; remove if not
          additionalContent: 1,
          createdAt: 1
        }
      }
    ]);

    if (!serviceData.length) {
      return res.status(404).json({
        status: false,
        message: "Service not found"
      });
    }

    return res.json({
      status: true,
      message: "Service fetched successfully",
      data: serviceData[0],
    });

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred. Try again later",
      error: error.message,
    });
  }
};











exports.showFeaturedServices = async (req, res) => {
  try {

    const serviceData = await Service.find({ featured: 1 });
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

        const matchStage = { deletedAt: null };

        if (age && age !== "") {
            matchStage.agegroup = new mongoose.Types.ObjectId(age);
        }

        const serviceData = await Service.aggregate([
            { $match: matchStage },

            {
                $lookup: {
                    from: "agegroups",
                    let: { agId: "$agegroup" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$_id", "$$agId"] },
                                        { $eq: ["$deletedAt", null] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                title: 1,   // return only what you need
                                icon: 1
                            }
                        }
                    ],
                    as: "agegroup"
                }
            },

            {
                $unwind: {
                    path: "$agegroup",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    bannerImg: 1,
                    icon: 1,
                    description: 1,
                    agegroup: 1
                }
            }
        ]);

        return res.status(200).json({
            status: true,
            allServices: serviceData,
            message: "Fetched All Services",

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            allServices: [],
            message: "Unable to fetch all services. Try again Later",
        });
    }
};



// exports.updateService = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { title, name, bannerImg, description, content, benefits } = req.body;

//     // Validate required fields
//     if (!name || !title) {
//       return res.status(200).json({
//         status: false,
//         message: "Name and title are required.",
//       });
//     }

//     // Find the existing service
//     const existingService = await Service.findById(id);
//     if (!existingService) {
//       return res.status(404).json({
//         status: false,
//         message: "Service not found.",
//       });
//     }

//     // Map benefits properly if provided
//     const mappedBenefits = (benefits || []).map((b) => ({
//       title: b.name,
//       description: b.benefits,
//     }));

//     // Update the service fields
//     existingService.name = title;
//     existingService.agegroup = name;
//     existingService.description = description;
//     existingService.content = content;
//     existingService.bannerImg = bannerImg;
//     existingService.benefits = mappedBenefits;

//     // Save updated service
//     const updatedService = await existingService.save();

//     return res.status(200).json({
//       status: true,
//       message: "Service updated successfully.",
//       data: updatedService,
//     });
//   } catch (error) {
//     console.error("Error updating service:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Service not updated. Something went wrong.",
//       error: error.message,
//     });
//   }
// };

exports.updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, name, bannerImg, description, content, additionalContent, benefits } = req.body;

    // Validate
    if (!name || !title) {
      return res.status(400).json({
        status: false,
        message: "Name and title are required.",
      });
    }

    // Map benefits (if provided)
    const mappedBenefits = (benefits || []).map((b) => ({
      title: b.name,
      description: b.benefits,
    }));

    const updateData = {
      name: title,
      agegroup: name,
      description,
      content,
      additionalContent,
      bannerImg,
      benefits: mappedBenefits,
      updatedAt: new Date()
    };

    // ⚡ One fast DB operation (no find, no save)
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, lean: true }   // lean = very fast
    );

    if (!updatedService) {
      return res.status(404).json({
        status: false,
        message: "Service not found.",
      });
    }

    await invalidateByUrl(`/api/service/${id}`);
    await invalidateByUrl('/api/service/list');
    await invalidateByUrl('/api/agegroup/list');
    await invalidateByUrl('/api/service/featured/list');
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
    await invalidateByUrl('/api/service/list');
    await invalidateByUrl('/api/agegroup/list');
    await invalidateByUrl('/api/service/featured/list');
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
    serviceData.featured = serviceData?.featured == 1 ? 0 : 1;
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

// exports.showServiceDetails = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const serviceData = await Service.findOne({
//       _id: id,
//       deletedAt: null,   // ensures soft-deleted services are excluded
//     }).lean().populate("agegroup");           // makes it faster (returns plain object)

//     if (!serviceData) {
//       return res.status(404).json({
//         status: false,
//         message: "Service not found",
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       message: "Service Details Fetched Successfully",
//       serviceData,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       status: false,
//       error,
//       message: "Unable To Fetch Service Details",
//     });
//   }
// };

exports.showServiceDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const serviceData = await Service.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          deletedAt: null
        }
      },
      {
        $lookup: {
          from: "agegroups",
          localField: "agegroup",
          foreignField: "_id",
          as: "agegroup"
        }
      },
      { $unwind: "$agegroup" },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          bannerImg: 1,
          content: 1,
          benefits: 1,
          agegroup: {
            _id: 1,
            title: 1,
          },
          createdAt: 1,
        }
      }
    ]);

    if (!serviceData.length) {
      return res.status(404).json({
        status: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Service Details Fetched Successfully",
      serviceData: serviceData[0],
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      error,
      message: "Unable To Fetch Service Details",
    });
  }
};


exports.servicesListOfGroup = async (req, res) => {
  try {
    const _id = req.params.id;
    const services = await Service.aggregate([
      {
        $match: {
          agegroup:new mongoose.Types.ObjectId(_id) ,
          deletedAt: null
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1
        }
      }
    ]);

    return res.status(200).json({
      status: true,
      allServices: services,
      message: "Fetched All Services",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      allServices: [],
      message: "Unable to fetch all services. Try again later",
    });
  }
};
