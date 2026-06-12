const router = require("express").Router();
const Treatment = require("../models/Treatment");
const protect = require("../middleware/auth");

// ── GET /api/treatments  – list all active (public) ───────────────────────────
router.get("/", async (req, res) => {
  const { category, q } = req.query;
  const filter = { isActive: true };

  if (category && category !== "All") filter.category = category;
  if (q) filter.$text = { $search: q };

  const treatments = await Treatment.find(filter)
    .select("-__v")
    .sort({ createdAt: -1 });

  res.json(treatments);
});

// ── GET /api/treatments/id/:id  – single by _id (admin) ──────────────────────
// MUST be defined BEFORE /:slug so Express doesn't treat "id" as a slug
router.get("/id/:id", protect, async (req, res) => {
  const treatment = await Treatment.findById(req.params.id).select("-__v");
  if (!treatment) return res.status(404).json({ error: "Treatment not found" });
  res.json(treatment);
});

// ── GET /api/treatments/:slug  – single by slug (public) ─────────────────────
router.get("/:slug", async (req, res) => {
  const treatment = await Treatment.findOne({
    slug: req.params.slug,
    isActive: true,
  }).select("-__v");

  if (!treatment) return res.status(404).json({ error: "Treatment not found" });
  res.json(treatment);
});

// ── POST /api/treatments  – create (admin) ────────────────────────────────────
router.post("/", protect, async (req, res) => {
  const treatment = await Treatment.create(req.body);
  res.status(201).json(treatment);
});

// ── PUT /api/treatments/:id  – update (admin) ─────────────────────────────────
router.put("/:id", protect, async (req, res) => {
  const treatment = await Treatment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!treatment) return res.status(404).json({ error: "Treatment not found" });
  res.json(treatment);
});

// ── DELETE /api/treatments/:id  – soft delete (admin) ────────────────────────
router.delete("/:id", protect, async (req, res) => {
  const treatment = await Treatment.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );
  if (!treatment) return res.status(404).json({ error: "Treatment not found" });
  res.json({ message: "Treatment deleted", id: req.params.id });
});

module.exports = router;
