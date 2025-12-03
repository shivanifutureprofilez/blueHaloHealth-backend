const mongoose = require("mongoose");

const subServiceSchema = new mongoose.Schema(
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
    // benefits: [
    //   {
    //     title: { type: String },
    //     description: { type: String },
    //   },
    // ],
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const SubService = mongoose.model("subservices", subServiceSchema);
module.exports = SubService;
