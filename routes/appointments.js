const router = require("express").Router();
const Appointment = require("../models/Appointment");
const protect = require("../middleware/auth");

// ── POST /api/appointments  – public booking ──────────────────────────────────
router.post("/", async (req, res) => {
  const appointment = await Appointment.create(req.body);
  res.status(201).json(appointment);
});

// ── GET /api/appointments  – admin list ───────────────────────────────────────
router.get("/", protect, async (req, res) => {
  const { status, date } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (date) filter.date = date;

  const appointments = await Appointment.find(filter)
    .select("-__v")
    .sort({ createdAt: -1 });

  res.json(appointments);
});

// ── PUT /api/appointments/:id  – update status (admin) ───────────────────────
router.put("/:id", protect, async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!appointment) return res.status(404).json({ error: "Appointment not found" });
  res.json(appointment);
});

// ── DELETE /api/appointments/:id  – admin ─────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);
  if (!appointment) return res.status(404).json({ error: "Appointment not found" });
  res.json({ message: "Appointment deleted", id: req.params.id });
});

module.exports = router;
