const mongoose = require("mongoose");
const Service = require("./Service");

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
    }, {
        timestamps :true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

ageGroupSchema.pre(/^find/, function(next) {
  this.where({ deletedAt: { $exists: false } });
  next();
});

ageGroupSchema.virtual('services', {
  ref: 'services', 
  localField: '_id',
  foreignField: 'agegroup',
});

const AgeGroup=mongoose.model("agegroups", ageGroupSchema)
module.exports =AgeGroup;