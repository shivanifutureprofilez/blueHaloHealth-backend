const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, "Name is required"],
        },
        designation:{
            type:String,
            required:[true, "Designation is Required"],
        },
        description:{
            type:String,
            required:[true, "Description is Required"],
        },
        imageLink:{
            type:String,
            required:[true, "Image Link is Required"],
        },
        deletedAt:{
            type:Date,
            default:null,
        },
    },
    {timestamp: true},
);

const Team = mongoose.model('teams',teamSchema);
module.exports = Team;