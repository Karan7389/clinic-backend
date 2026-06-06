const router = require("express").Router();
const Gallery = require("../models/Gallery");
const protect = require("../middleware/auth");
const { cloudinary, useCloudinary } = require("../middleware/upload");

// ── GET /api/gallery  – public ────────────────────────────────────────────────
router.get("/", async (_req, res) => {
  const images = await Gallery.find().select("-__v").sort({ createdAt: -1 });
  res.json(images);
});

// ── POST /api/gallery  – admin (imageUrl already uploaded via /uploads/image) ─
router.post("/", protect, async (req, res) => {
  const { imageUrl, caption, publicId, category } = req.body;
  if (!imageUrl) return res.status(400).json({ error: "imageUrl is required" });

  const item = await Gallery.create({ imageUrl, caption, publicId, category });
  res.status(201).json(item);
});

// ── DELETE /api/gallery/:id  – admin ─────────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Image not found" });

  // Remove from Cloudinary if applicable
  if (useCloudinary && item.publicId) {
    try {
      await cloudinary.uploader.destroy(item.publicId);
    } catch (err) {
      console.warn("Cloudinary delete warning:", err.message);
    }
  }

  await item.deleteOne();
  res.json({ message: "Image deleted", id: req.params.id });
});

module.exports = router;
