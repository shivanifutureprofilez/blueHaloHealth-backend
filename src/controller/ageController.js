const AgeGroup = require("../Model/AgeGroup");
exports.addAgesGroup = (async (req, res) => {
    try {
        const { title, description, icon } = req.body;
        if (!title || !icon) {
            return res.status(400).json({
                status: false,
                message: "Title and icon are Required"
            })
        }
        const result = new AgeGroup({
            title,
            description,
            icon
        });

        const data = await result.save();
        if (data?._id) {
            return res.status(200).json({
                data: data,
                status: true,
                message: "Mega Service Added Successfully"
            })
        }
        else {
            return res.status(400).json({
                status: false,
                message: "Unable to Mega Service"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error,
            message: "Unable To Mega Service. Try Again later."
        })
    }
});
exports.listAgeGroups = (async (req, res) => {
    try {
        //const list = await AgeGroup.find({ deletedAt: { $exists: true } });
        const list = await AgeGroup.find({ deletedAt: null })
            .populate({
                path: "services",
                match: { deletedAt: null },
            });

        if (!list) {
            return res.status(400).json({
                ageGroupList: [],
                status: false,
                message: "Unable to fetch Mega Service."
            });
        }
        return res.status(200).json({
            ageGroupList: list,
            status: true,
            message: "Fetched All Mega Service"
        });
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            status: false,
            ageGroupList: [],
            error: error,
            message: "Unable To Fetch Mega Service. Try Again later."
        })
    }
});

exports.updateAgeGroup = (async (req, res) => {
    try {
        const { _id, title, description, icon } = req.body;
        // if (!title || icon || !_id) {
        //     return res.status(400).json({
        //         status: false,
        //         message: "All fields Required"
        //     })
        // }
        const ageGroupList = await AgeGroup.findByIdAndUpdate(_id, { title, description, icon });
        if (!ageGroupList) {
            return res.status(400).json({
                status: false,
                message: "Unable To Update Mega ServiceMega Service"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Mega Service Updated Successfully",
            ageGroupList: ageGroupList
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Mega Service Not Updated.Try again Later",
            error: error
        })
    }
});

exports.deleteAgeGroup = (async (req, res) => {
    try {
        const _id = req.params.id;
        const ageGroupList = await AgeGroup.findByIdAndUpdate(_id);
        ageGroupList.deletedAt = new Date();
        ageGroupList.save();
        if (!ageGroupList) {
            return res.status(400).json({
                status: false,
                message: "Unable to Delete Mega Service"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Mega Service has been removed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Unable To delete Mega Service. Try Again Later",
            error: error
        })
    }
});

exports.showAgeGroupDetails = (async (req, res) => {
    try {
        const _id = req.params.id;
        //const ageGroupData = await AgeGroup.findById(_id).populate("services");

        const ageGroupData = await AgeGroup.findOne({
            _id,
            deletedAt: null,
        })
            .populate({
                path: "services",
                match: { deletedAt: null },
            });

        if (!ageGroupData) {
            return res.status(400).json({
                status: false,
                message: "Unable to fetch Mega Service data"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Succcessfully fetched Mega Service data",
            ageGroupData: ageGroupData
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Unable To Show Mega Service Details. Try Again Later!!',
            error: error
        })
    }
});