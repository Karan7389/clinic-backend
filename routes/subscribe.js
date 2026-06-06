const router = require("express").Router();
const Subscriber = require("../models/Subscriber");

// ── POST /api/subscribe ───────────────────────────────────────────────────────
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const exists = await Subscriber.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "You are already subscribed!" });
  }

  await Subscriber.create({ email });
  res.status(201).json({ message: "Subscribed successfully!" });
});

module.exports = router;
