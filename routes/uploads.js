const router = require("express").Router();
const path = require("path");
const protect = require("../middleware/auth");
const { upload, useCloudinary } = require("../middleware/upload");

// Helper: build URL for local disk storage
const localUrl = (req, filename) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

// ── POST /api/uploads/image  – single image upload (admin) ───────────────────
router.post("/image", protect, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const url = useCloudinary
    ? req.file.path          // Cloudinary returns the full URL as `path`
    : localUrl(req, req.file.filename);

  const publicId = useCloudinary ? req.file.filename : null;

  res.json({ url, publicId });
});

// ── POST /api/uploads/images  – multiple images upload (admin) ───────────────
router.post("/images", protect, upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const urls = req.files.map((f) =>
    useCloudinary ? f.path : localUrl(req, f.filename)
  );

  res.json({ urls });
});

module.exports = router;
