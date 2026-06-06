const router = require("express").Router();
const Subscriber = require("../models/Subscriber");
const protect = require("../middleware/auth");

// ── GET /api/subscribers  – admin list ────────────────────────────────────────
router.get("/", protect, async (_req, res) => {
  const subscribers = await Subscriber.find({ active: true })
    .select("email date createdAt")
    .sort({ createdAt: -1 });

  res.json(subscribers);
});

// ── GET /api/subscribers/export/csv  – admin CSV download ────────────────────
router.get("/export/csv", protect, async (_req, res) => {
  const subscribers = await Subscriber.find({ active: true })
    .select("email date")
    .sort({ date: -1 });

  const rows = [
    "Email,Date Subscribed",
    ...subscribers.map(
      (s) => `${s.email},${new Date(s.date || s.createdAt).toLocaleString()}`
    ),
  ];

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="subscribers-${Date.now()}.csv"`
  );
  res.send(rows.join("\n"));
});

// ── DELETE /api/subscribers/:id  – admin unsubscribe ─────────────────────────
router.delete("/:id", protect, async (req, res) => {
  const sub = await Subscriber.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );
  if (!sub) return res.status(404).json({ error: "Subscriber not found" });
  res.json({ message: "Unsubscribed", id: req.params.id });
});

module.exports = router;
