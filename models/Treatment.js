const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true },
  },
  { _id: false }
);

const treatmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Preventive",
        "Restorative",
        "Endodontics",
        "Implants",
        "Prosthetics",
        "Cosmetic",
        "Orthodontics",
        "Pediatric",
        "Periodontics",
        "Oral Surgery",
      ],
      required: [true, "Category is required"],
    },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    seoCopy: { type: String },
    benefits: [{ type: String }],
    regularPrice: { type: String },
    memberPrice: { type: String },
    heroImage: { type: String },
    gallery: [{ type: String }],
    faqs: [faqSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Text search index
treatmentSchema.index(
  { title: "text", seoCopy: "text", category: "text" },
  { weights: { title: 5, category: 3, seoCopy: 1 } }
);

module.exports = mongoose.model("Treatment", treatmentSchema);
