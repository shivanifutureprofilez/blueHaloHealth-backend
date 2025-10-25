const AgeGroup = require("../Model/AgeGroup");
exports.addAgesGroup = (async (req, res) => {
    try {
        const { title, description, minAge, maxAge, image } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                status: false,
                message: "All fields Required"
            })
        }
        const result = new AgeGroup({
            title,
            description,
            minAge,
            maxAge,
            image
        });

        const data = await result.save();
        if (data?._id) {
            return res.status(200).json({
                data: data,
                status: true,
                message: "Age Group Added Successfully"
            })
        }
        else {
            return res.status(400).json({
                status: false,
                message: "Unable to add age group."
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: error,
            message: "Unable To Add Ages. Try Again later."
        })
    }
});
exports.listAgeGroups = (async (req, res) => {
    try {
        //const list = await AgeGroup.find({ deletedAt: { $exists: true } });
        const list = await AgeGroup.find({ deletedAt: null })
            .populate('services');
        console.log("list", list)
        if (!list) {
            return res.status(400).json({
                ageGroupList: [],
                status: false,
                message: "Unable to fetch age group."
            });
        }
        return res.status(200).json({
            ageGroupList: list,
            status: true,
            message: "Fetched All Age Groups"
        });
    } catch (error) {
        console.log("error", error)
        return res.status(500).json({
            status: false,
            ageGroupList: [],
            error: error,
            message: "Unable To Fetch Age Groups. Try Again later."
        })
    }
});

exports.updateAgeGroup = (async (req, res) => {
    try {
        const { _id, title, description, minAge, maxAge, image } = req.body;
        if (!title || !description || !_id) {
            return res.status(400).json({
                status: false,
                message: "All fields Required"
            })
        }
        const ageGroupList = await AgeGroup.findByIdAndUpdate(_id, { title, description, minAge, maxAge, image });
        if (!ageGroupList) {
            return res.status(400).json({
                status: false,
                message: "Unable To Update age group"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Age Group Updated Successfully",
            ageGroupList: ageGroupList
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Age group Not Updated.Try again Later",
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
                message: "Unable to Delete Age Group"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Age Group has been removed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Unable To delete Age Group. Try Again Later",
            error: error
        })
    }
});

exports.showAgeGroupDetails = (async (req, res) => {
    try {
        const _id = req.params.id;
        const ageGroupData = await AgeGroup.findById(_id).populate("services");
        if (!ageGroupData) {
            return res.status(400).json({
                status: false,
                message: "Unable to fetch age group data"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Succcessfully fetched age group data",
            ageGroupData: ageGroupData
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'Unable To Show Age Group Details. Try Again Later!!',
            error: error
        })
    }
});