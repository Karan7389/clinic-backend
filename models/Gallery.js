const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: [true, "Image URL is required"] },
    caption: { type: String, trim: true },
    publicId: { type: String }, // Cloudinary public_id for deletion
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
