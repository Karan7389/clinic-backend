const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    phone: { type: String, required: [true, "Phone is required"], trim: true },
    email: { type: String, lowercase: true, trim: true },
    message: { type: String },
    source: { type: String, default: "General Inquiry" },
    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
