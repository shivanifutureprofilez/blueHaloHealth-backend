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
    description: {
      type: String,
    },
    content: {
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
      type:Number,
      default:0
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("services", serviceSchema);
module.exports = Service;
