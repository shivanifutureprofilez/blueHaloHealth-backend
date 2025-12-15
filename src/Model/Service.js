const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    bannerImg: {
      type: String,
      required: [true, "Banner Image is Required"],
    },
    name: {
      type: String,
      required: [true, "Service name is required"],
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    additionalContent: {
      type: String,
    },
    benefits: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    agegroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "agegroups",
      required: true,
    },
    featured: {
      type: Number,
      default: 0
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

serviceSchema.index({ deletedAt: 1 });
serviceSchema.index({ agegroup: 1 });
serviceSchema.index({ agegroup: 1, deletedAt: 1 });

const Service = mongoose.model("services", serviceSchema);
module.exports = Service;
