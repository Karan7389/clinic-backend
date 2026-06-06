const router = require("express").Router();
const Lead = require("../models/Lead");
const protect = require("../middleware/auth");

// ── POST /api/leads  – public form submission ─────────────────────────────────
router.post("/", async (req, res) => {
  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
});

// ── GET /api/leads  – admin list ──────────────────────────────────────────────
router.get("/", protect, async (req, res) => {
  const { status } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const leads = await Lead.find(filter)
    .select("-__v")
    .sort({ createdAt: -1 });

  res.json(leads);
});

// ── PUT /api/leads/:id  – update status (admin) ───────────────────────────────
router.put("/:id", protect, async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json(lead);
});

// ── DELETE /api/leads/:id  – admin ────────────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ error: "Lead not found" });
  res.json({ message: "Lead deleted", id: req.params.id });
});

module.exports = router;
