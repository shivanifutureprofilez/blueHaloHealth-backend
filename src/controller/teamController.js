const Team = require("../Model/Team");

exports.addTeamMember = async (req,res) => {
    try {
        const {name, designation, description, imageLink} = req.body;
        if(!name || !designation || !description || !imageLink){
            return res.status(400).json({
                status:false,
                message:"All fields are required"
            })
        }
        const result = new Team({
            name, 
            designation, 
            description, 
            imageLink
        })
        const data = await result.save();
        if(!data){
            return res.status(400).json({
                status:false,
                message:"Unable to add team member",
                data:[]
            })
        }
        return res.status(200).json({
            status:true,
            message:"Team member is added succesfully",
            data:data
        })
    } catch (error) {
        console.log("error ",error);
        return res.status(500).json({
            status:false,
            message:"Unable To add team member",
            error:error
        })
    }
}

exports.listTeamMember = (async (req,res) => {
    try {
        const list = await Team.find({deletedAt: null});
        if(!list){
            return res.status(400).json({
                status:false,
                message:"Unable To fetch Team Members.",
                teamList : []
            })
        }
        return res.status(200).json({
            status:true,
            message:"Fetched All Team Members Successfully",
            teamList : list
        })
    } catch (error) {
        console.log("Error : ",error);
        return res.status(500).json({
            status:false,
            message:"Unable To fetch Team Members. Something went wrong.",
            error:error
        })        
    }
});

exports.deleteTeamMember = async (req,res) => {
    try {
        const id = req.params.id;
        const teamData = await Team.findByIdAndUpdate(id);
        teamData.deletedAt = new Date();
        teamData.save();
        if(!teamData){
            return res.status(400).json({
                status:false,
                message:"Unable To Delete Team Data"
            })
        }
        return res.status(200).json({
            status:true,
            message:"Team Member Data Deleted Successfully"
        })
    } catch (error) {
        console.log("error ",error);
        return res.status(500).json({
            status:false,
            error:error,
            message:"Unable To delete Team member data. Please try again later"
        });
    }
};

exports.editTeam = async (req,res) => {
    try {
        const id = req.params.id;
        const {name, designation, description, imageLink} = req.body;
        if(!name || !designation || !description || !imageLink){
            return res.status(400).json({
                status:false,
                message:"All fields are required"
            })
        }
        const teamData = await Team.findByIdAndUpdate(id, { name, designation, description, imageLink});
        if (!teamData) {
            return res.status(400).json({
                status: false,
                message: "Unable To Update Team Member Data",
                teamData:[]
            })
        }
        return res.status(200).json({
            status: true,
            message: "Team Member Data Updated Successfully",
            teamData: teamData
        })
    } catch (error) {
        console.log("error ",error);
        return res.status(500).json({
            status:false,
            error:error,
            message:"Unable To Edit. Something Went Wrong"
        })        
    }
};





