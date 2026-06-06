const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = require("../middleware/auth");

// ── Helper: sign JWT ──────────────────────────────────────────────────────────
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Explicitly select password (it's hidden by default)
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken(user._id);

  res.json({
    token,
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
  });
});

// ── PUT /api/auth/change-password ─────────────────────────────────────────────
router.put("/change-password", protect, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "Both passwords are required" });
  }
  if (newPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters" });
  }

  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.correctPassword(oldPassword))) {
    return res.status(401).json({ message: "Old password is incorrect" });
  }

  user.password = newPassword; // pre-save hook will hash it
  await user.save();

  res.json({ message: "Password updated successfully" });
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
