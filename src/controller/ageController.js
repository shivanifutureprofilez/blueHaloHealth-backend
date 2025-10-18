const AgeGroup = require("../Model/AgeGroup");
exports.addAgesGroup = (async (req,res)=>{
    try {
        const {title,description ,minAge,maxAge, image } = req.body;
        if(!title || !description){
            res.json({
                status:false,
                message:"All fields Required"
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
        if(data?._id){
            res.json({
                data: data,
                status:true,
                message:"Age Group Added Successfully"
            })
        }
        else{
            res.json({
                status:false,
                message:"Unable to add age group."
            })
        }
    } catch (error) {
        res.json({
            status:false,
            error:error,
            message:"Unable To Add Ages. Try Again later."
        })
    }
});
exports.listAgeGroups = (async (req,res)=>{
    try {
        //const list = await AgeGroup.find({ deletedAt: { $exists: true } });
        const list = await AgeGroup.find({deletedAt : null});
        if(list && list.length){
            res.json({
                ageGroupList : list,
                status: true,
                message:"Fetched All Age Groups"
            })
        }
        else{
            res.json({
                ageGroupList : [],
                status:false,
                message:"Unable to fetch age group."
            })
        }
    } catch (error) {
        res.json({
            status:false,
            ageGroupList : [],
            message:"Unable To Fetch Age Groups. Try Again later."
        })
    }
});

exports.updateAgeGroup = (async(req,res)=> {
    try {
        const {id, title,description ,minAge , maxAge, image} = req.body;
          if(!title || !description || !id){
            res.json({
                status:false,
                message:"All fields Required"
            })
        }
        const ageGroupList = await AgeGroup.findByIdAndUpdate(id, {title, description ,minAge , maxAge, image});
        if(!ageGroupList){
            res.json({
                status:false,
                message:"Unable To Update age group"
            })
        }
        res.json({
            status:true,
            message:"Age Group Updated Successfully",
            ageGroupList : ageGroupList
        })
    } catch (error) {
        res.json({
            status:false,
            message:"Age group Not Updated.Try again Later",
            error:error
        })
    }
});

exports.deleteAgeGroup = (async (req,res) => {
    try {
        const _id = req.params.id;
        const ageGroupList = await AgeGroup.findByIdAndUpdate(_id);
        ageGroupList.deletedAt = new Date();
        ageGroupList.save();
        if(!ageGroupList){
            res.json({
                status:false,
                message:"Unable to Delete Age Group"
            })
        }
        res.json({
            status:true,
            message:"Successfully Deleted Age Group"
        })
    } catch (error) {
        res.json({
            status:false,
            message:"Unable To delete Age Group. Try Again Later",
            error:error
        })
    }
});

exports.showAgeGroupDetails = (async (req,res) => {
    try {
        const _id = req.params.id;
        const ageGroupData = await AgeGroup.findById(_id);
        if(!ageGroupData){
            res.json({
                status:false,
                message:"Unable to fetch age group data"
            })
        }
        res.json({
            status:true,
            message:"Succcessfully fetched age group data",
            ageGroupData : ageGroupData
        })
    } catch (error) {
        res.json({
            status:false,
            message:'Unable To Show Age Group Details. Try Again Later!!',
            error:error
        })
    }
});