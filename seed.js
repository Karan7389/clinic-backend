require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Treatment = require("./models/Treatment");

const TREATMENTS = [
  {
    title: "Dental Implants",
    slug: "dental-implants",
    category: "Implants",
    metaTitle: "Dental Implants in Prayagraj | Crown Dental",
    metaDescription:
      "Get permanent, natural-looking dental implants at Crown Dental, Prayagraj. Expert implant surgeons, latest technology.",
    seoCopy:
      "Dental implants are titanium posts surgically placed into the jawbone to replace missing teeth roots. At Crown Dental we use premium implant systems for a lifetime of confident smiling.",
    benefits: [
      "Permanent solution for missing teeth",
      "Looks and feels natural",
      "Preserves jawbone",
      "No adhesives required",
      "Easy maintenance",
    ],
    regularPrice: "₹25,000 – ₹40,000",
    memberPrice: "₹22,000 – ₹36,000",
    heroImage: "",
    gallery: [],
    faqs: [
      { q: "Is the implant procedure painful?", a: "No – it is performed under local anesthesia. Most patients report less discomfort than a tooth extraction." },
      { q: "How long do implants last?", a: "With proper care, dental implants can last a lifetime." },
    ],
  },
  {
    title: "Root Canal Treatment",
    slug: "root-canal-treatment",
    category: "Endodontics",
    metaTitle: "Painless Root Canal Treatment | Crown Dental Prayagraj",
    metaDescription:
      "Single-visit painless root canal treatment at Crown Dental using rotary endodontics. Save your natural tooth today.",
    seoCopy:
      "Root canal treatment removes infected pulp, relieves pain, and saves your natural tooth. Our rotary endodontics system ensures a single-visit, pain-free experience.",
    benefits: [
      "Relieves tooth pain instantly",
      "Saves the natural tooth",
      "Single-visit procedure available",
      "Prevents spread of infection",
    ],
    regularPrice: "₹5,000 – ₹12,000",
    memberPrice: "₹4,500 – ₹10,000",
    heroImage: "",
    gallery: [],
    faqs: [
      { q: "How many visits are needed?", a: "Usually 1–2 visits depending on the complexity of the case." },
      { q: "What happens after RCT?", a: "A crown is placed over the tooth for long-term protection." },
    ],
  },
  {
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    category: "Cosmetic",
    metaTitle: "Professional Teeth Whitening | Crown Dental Prayagraj",
    metaDescription:
      "Get a brighter smile in just one visit with professional teeth whitening at Crown Dental, Prayagraj.",
    seoCopy:
      "Professional teeth whitening removes years of staining from coffee, tea, and tobacco in a single visit. Safe, effective, and long-lasting results.",
    benefits: [
      "Instant brighter smile",
      "Safe and supervised",
      "Long-lasting results",
      "Boosts confidence",
    ],
    regularPrice: "₹8,000 – ₹15,000",
    memberPrice: "₹7,000 – ₹13,000",
    heroImage: "",
    gallery: [],
    faqs: [
      { q: "How long does whitening last?", a: "Results last 6–12 months depending on diet and oral hygiene." },
    ],
  },
  {
    title: "Braces & Aligners",
    slug: "braces-aligners",
    category: "Orthodontics",
    metaTitle: "Braces & Aligners in Prayagraj | Crown Dental",
    metaDescription:
      "Metal braces, ceramic braces, and Invisalign aligners at Crown Dental Prayagraj. Straighten your smile affordably.",
    seoCopy:
      "Orthodontic treatment corrects misaligned teeth and jaw issues. We offer metal braces, ceramic braces, and clear aligners for teens and adults.",
    benefits: [
      "Corrects misaligned teeth",
      "Improves bite and jaw function",
      "Discreet aligner options",
      "Long-term smile improvement",
    ],
    regularPrice: "₹30,000 – ₹80,000",
    memberPrice: "₹27,000 – ₹72,000",
    heroImage: "",
    gallery: [],
    faqs: [
      { q: "How long does orthodontic treatment take?", a: "Treatment duration varies from 12 to 24 months depending on the case." },
    ],
  },
  {
    title: "Smile Makeover",
    slug: "smile-makeover",
    category: "Cosmetic",
    metaTitle: "Smile Makeover | Crown Dental Prayagraj",
    metaDescription:
      "Transform your smile with a comprehensive smile makeover at Crown Dental, Prayagraj. Veneers, crowns, whitening & more.",
    seoCopy:
      "A smile makeover combines multiple cosmetic dentistry procedures — veneers, crowns, whitening, and contouring — to completely transform your smile.",
    benefits: [
      "Complete smile transformation",
      "Customized treatment plan",
      "Combines multiple procedures",
      "Boosts self-confidence",
    ],
    regularPrice: "₹50,000 – ₹2,00,000",
    memberPrice: "₹45,000 – ₹1,80,000",
    heroImage: "",
    gallery: [],
    faqs: [
      { q: "How many appointments does a smile makeover take?", a: "Typically 3–6 appointments spread over a few weeks." },
    ],
  },
  {
    title: "Pediatric Dentistry",
    slug: "pediatric-dentistry",
    category: "Pediatric",
    metaTitle: "Kids Dentist in Prayagraj | Crown Dental",
    metaDescription:
      "Gentle, fun dental care for children at Crown Dental, Prayagraj. Cavity treatment, fluoride, and habit counselling.",
    seoCopy:
      "Our pediatric dentistry team makes dental visits fun and stress-free for children. Services include cleaning, fluoride treatment, sealants, and cavity management.",
    benefits: [
      "Child-friendly environment",
      "Gentle and painless care",
      "Early cavity prevention",
      "Habit counselling",
    ],
    regularPrice: "₹500 – ₹8,000",
    memberPrice: "₹400 – ₹7,000",
    heroImage: "",
    gallery: [],
    faqs: [
      { q: "At what age should a child first visit the dentist?", a: "By age 1 or within 6 months of the first tooth appearing." },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");

  // ── Admin user ───────────────────────────────────────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL || "admin@crowndental.in";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

  const existing = await User.findOne({ email: adminEmail });
  if (existing) {
    console.log(`ℹ️  Admin already exists: ${adminEmail}`);
  } else {
    await User.create({ email: adminEmail, password: adminPassword, role: "admin" });
    console.log(`✅ Admin created: ${adminEmail} / ${adminPassword}`);
  }

  // ── Treatments ───────────────────────────────────────────────────────────────
  let created = 0;
  for (const t of TREATMENTS) {
    const exists = await Treatment.findOne({ slug: t.slug });
    if (!exists) {
      await Treatment.create(t);
      created++;
    }
  }
  console.log(`✅ ${created} treatments seeded (${TREATMENTS.length - created} already existed)`);

  await mongoose.disconnect();
  console.log("✅ Done. You can now start the server with: npm run dev");
}

seed().catch((err) => {
  console.error("❌ Seed error:", err.message);
  process.exit(1);
});
