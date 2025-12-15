const mongoose = require("mongoose");
const Service = require("./Service");

const ageGroupSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    slug: {
        type: String, 
    },
    description: {
        type: String,
    },
    icon: {
        type: String,
        // required: [true, "Icon is required"]
    },
    coverImg: {
        type:String,
    },
    // minAge: {
    //     type : Number
    // },
    // maxAge: {
    //     type : Number
    // },
    // image: {
    //     type:String
    // },
    deletedAt: {
        type: Date,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);

ageGroupSchema.index({ deletedAt: 1 });

Service.schema.index({ agegroup: 1, deletedAt: 1 });

ageGroupSchema.pre(/^find/, function (next) {
    this.where({ deletedAt: { $exists: false } });
    next();
});

ageGroupSchema.virtual('services', {
    ref: 'services',
    localField: '_id',
    foreignField: 'agegroup',
});

const AgeGroup = mongoose.model("agegroups", ageGroupSchema)
module.exports = AgeGroup;