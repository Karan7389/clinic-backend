require("dotenv").config();
require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
// All allowed origins come from environment variables (no hardcoding)
const buildAllowedOrigins = () => {
  const origins = [];

  // Primary client URL (e.g. https://crown-dental.in)
  if (process.env.CLIENT_URL) origins.push(process.env.CLIENT_URL);

  // Secondary URLs (comma-separated in env)
  if (process.env.CLIENT_URLS) {
    process.env.CLIENT_URLS.split(",").forEach((u) => {
      const trimmed = u.trim();
      if (trimmed) origins.push(trimmed);
    });
  }

  // Always allow localhost in development
  if (process.env.NODE_ENV !== "production") {
    origins.push("http://localhost:3000");
    origins.push("http://localhost:5173");
  }

  return origins;
};

const allowedOrigins = buildAllowedOrigins();

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow server-to-server calls (Postman / health checks) and listed origins
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      cb(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Static uploads (fallback if not using Cloudinary) ────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth", require("./routes/auth"));
app.use("/api/treatments", require("./routes/treatments"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/leads", require("./routes/leads"));
app.use("/api/gallery", require("./routes/gallery"));
app.use("/api/uploads", require("./routes/uploads"));
app.use("/api/subscribe", require("./routes/subscribe"));
app.use("/api/subscribers", require("./routes/subscribers"));

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", env: process.env.NODE_ENV })
);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error("❌ Error:", err.message);
  const status = err.statusCode || err.status || 500;
  res.status(status).json({ error: err.message || "Internal server error" });
});

// ── MongoDB + start ───────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
