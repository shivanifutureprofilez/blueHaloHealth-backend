const mongoose = require("mongoose")

const ageGroupSchema = mongoose.Schema({
    title: String,
    description: String,
    minAge: {
        type : Number
    },
    maxAge: {
        type : Number
    },
    image: {
        type:String
    },
    deletedAt: {
        type: Date,
    }
}, {timestamps :true}
)

const AgeGroup=mongoose.model("agegroups", ageGroupSchema)
module.exports =AgeGroup;