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

ageGroupSchema.pre(/^find/, function(next) {
  this.where({ deletedAt: { $exists: false } });
  next();
});

const AgeGroup=mongoose.model("agegroups", ageGroupSchema)
module.exports =AgeGroup;