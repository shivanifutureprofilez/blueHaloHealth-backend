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

// productSchema.virtual('product_rating').get(function () {
//     if (!this.reviews || this.reviews.length === 0) return 0;
//     const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
//     return +(sum / this.reviews.length).toFixed(1);
// });

ageGroupSchema.virtual('servicesz').get(function () {
    const services =  Service.find({ agegroup: this._id  });
    console.log("services---------------------------",services)
    return services || [];
});

ageGroupSchema.virtual('servicesz', {
  ref: 'services', 
  localField: '_id',
  foreignField: 'agegroup',
});
// productSchema.statics.services = async function (ageGroupId) {
//     const services = await Service.find({ agegroup: ageGroupId });
//     return services;
// };


const AgeGroup=mongoose.model("agegroups", ageGroupSchema)
module.exports =AgeGroup;