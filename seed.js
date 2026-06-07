require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Treatment = require("./models/Treatment");

// ── High-quality Unsplash images per treatment type ──────────────────────────
// All images are free-to-use Unsplash photos relevant to each dental treatment

const TREATMENTS = [
  // ════════════════════════════════════════════════
  // PREVENTIVE & DIAGNOSTIC
  // ════════════════════════════════════════════════
  {
    title: "Consultation & Oral Check-up",
    slug: "consultation-oral-checkup",
    category: "Preventive",
    metaTitle: "Dental Consultation & Oral Check-up | Crown Dental Prayagraj",
    metaDescription:
      "Book a comprehensive oral check-up at Crown Dental, Prayagraj. Expert diagnosis, digital X-rays, and personalised treatment plan.",
    seoCopy:
      "A thorough oral check-up at Crown Dental covers a complete examination of teeth, gums, jaw, and soft tissues. Our dentists use the latest diagnostic tools to detect any issues early and create a personalised treatment plan for your best oral health.",
    benefits: [
      "Early detection of cavities and gum disease",
      "Personalised treatment planning",
      "Digital X-ray evaluation",
      "Oral cancer screening",
      "Completely painless and non-invasive",
    ],
    regularPrice: "₹200",
    memberPrice: "FREE",
    heroImage:
      "https://images.unsplash.com/photo-1588776814546-1ffbb172d936?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
    ],
    faqs: [
      {
        q: "How long does a check-up take?",
        a: "A thorough consultation typically takes 20–30 minutes.",
      },
      {
        q: "How often should I get a check-up?",
        a: "Every 6 months is recommended for most patients.",
      },
    ],
  },
  {
    title: "Digital X-ray (IOPA)",
    slug: "digital-xray-iopa",
    category: "Preventive",
    metaTitle: "Digital Dental X-ray (IOPA) | Crown Dental Prayagraj",
    metaDescription:
      "Instant digital intraoral X-rays at Crown Dental. Low radiation, high clarity imaging for accurate diagnosis.",
    seoCopy:
      "Digital IOPA (Intraoral Periapical) X-rays give our dentists a clear picture of your teeth roots, bone levels, and surrounding structures. Using digital sensors we reduce radiation by up to 90% compared to traditional films.",
    benefits: [
      "Up to 90% less radiation than film X-rays",
      "Instant high-resolution images",
      "Helps detect hidden decay and bone loss",
      "Stored digitally for easy comparison",
      "Quick and comfortable",
    ],
    regularPrice: "₹250",
    memberPrice: "FREE (1 per year)",
    heroImage:
      "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    ],
    faqs: [
      {
        q: "Is dental X-ray safe?",
        a: "Yes. Digital X-rays use very low radiation, well within safe limits.",
      },
      {
        q: "How often are X-rays needed?",
        a: "Typically once a year for routine monitoring.",
      },
    ],
  },
  {
    title: "Scaling & Polishing",
    slug: "scaling-polishing",
    category: "Preventive",
    metaTitle: "Dental Scaling & Polishing | Crown Dental Prayagraj",
    metaDescription:
      "Professional teeth cleaning, scaling & polishing at Crown Dental, Prayagraj. Remove tartar buildup and keep gums healthy.",
    seoCopy:
      "Professional scaling removes hardened tartar (calculus) that regular brushing cannot. Polishing then smoothens the tooth surface to prevent future plaque buildup. Regular scaling is the single most effective way to prevent gum disease.",
    benefits: [
      "Removes tartar and plaque professionally",
      "Prevents gum disease and bad breath",
      "Brightens tooth surface",
      "Recommended every 6 months",
      "Painless ultrasonic procedure",
    ],
    regularPrice: "₹1,200",
    memberPrice: "FREE (1 per year)",
    heroImage:
      "https://images.unsplash.com/photo-1598256989014-f2c11f044aac?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&q=80",
    ],
    faqs: [
      {
        q: "Does scaling weaken teeth?",
        a: "No. Scaling only removes deposits from around teeth, not the tooth itself.",
      },
      {
        q: "Will my teeth feel sensitive after scaling?",
        a: "Mild sensitivity for 1–2 days is normal and subsides quickly.",
      },
    ],
  },
  {
    title: "Fluoride Application",
    slug: "fluoride-application",
    category: "Preventive",
    metaTitle: "Fluoride Treatment for Teeth | Crown Dental Prayagraj",
    metaDescription:
      "Protect your teeth with professional fluoride application at Crown Dental. Ideal for children and cavity-prone adults.",
    seoCopy:
      "Fluoride application strengthens tooth enamel and significantly reduces the risk of cavities. It is quick, painless, and highly effective — especially for children and patients with a history of frequent cavities.",
    benefits: [
      "Strengthens tooth enamel",
      "Reduces cavity risk by up to 40%",
      "Completely painless",
      "Takes only a few minutes",
      "Ideal for children and cavity-prone adults",
    ],
    regularPrice: "₹800",
    memberPrice: "₹600",
    heroImage:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is fluoride safe for children?",
        a: "Yes, professional fluoride application is completely safe and recommended for children.",
      },
    ],
  },
  {
    title: "Pit & Fissure Sealant",
    slug: "pit-fissure-sealant",
    category: "Preventive",
    metaTitle: "Dental Sealants in Prayagraj | Crown Dental",
    metaDescription:
      "Protect deep grooves in back teeth from cavities with pit & fissure sealants at Crown Dental, Prayagraj.",
    seoCopy:
      "Pit and fissure sealants are thin protective coatings painted on the chewing surfaces of back teeth. They seal the deep grooves where bacteria hide, effectively preventing cavities — ideal for children and teenagers.",
    benefits: [
      "Prevents cavities in deep grooves",
      "Quick, painless procedure",
      "No drilling required",
      "Lasts several years",
      "Ideal for children 6–14 years",
    ],
    regularPrice: "₹600",
    memberPrice: "₹500",
    heroImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long do sealants last?",
        a: "Sealants typically last 5–10 years with proper care.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // RESTORATIVE (FILLINGS & ESTHETIC)
  // ════════════════════════════════════════════════
  {
    title: "GIC Filling",
    slug: "gic-filling",
    category: "Restorative",
    metaTitle: "GIC Tooth Filling | Crown Dental Prayagraj",
    metaDescription:
      "Affordable glass ionomer cement (GIC) fillings at Crown Dental, Prayagraj. Ideal for baby teeth and low-stress areas.",
    seoCopy:
      "Glass Ionomer Cement (GIC) fillings release fluoride to protect the tooth from further decay. They bond well to tooth structure and are the treatment of choice for baby teeth, non-load-bearing areas, and patients with high cavity risk.",
    benefits: [
      "Releases fluoride to prevent further decay",
      "Good adhesion to tooth structure",
      "Suitable for baby teeth",
      "Affordable option",
      "Mercury-free material",
    ],
    regularPrice: "₹500",
    memberPrice: "₹400",
    heroImage:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is GIC as strong as composite?",
        a: "GIC is less wear-resistant than composite and is best suited for baby teeth or low-stress areas.",
      },
    ],
  },
  {
    title: "Composite Filling – Posterior",
    slug: "composite-filling-posterior",
    category: "Restorative",
    metaTitle: "Composite Tooth Filling (Back Teeth) | Crown Dental Prayagraj",
    metaDescription:
      "Tooth-coloured composite resin fillings for back teeth at Crown Dental, Prayagraj. Strong, durable, and natural-looking.",
    seoCopy:
      "Composite resin fillings restore decayed back teeth with a tooth-coloured material that is both strong and aesthetically pleasing. They bond directly to the tooth, requiring less removal of healthy structure compared to amalgam.",
    benefits: [
      "Tooth-coloured for natural appearance",
      "Bonds directly to tooth structure",
      "Mercury-free",
      "Durable for back-tooth chewing",
      "Completed in a single visit",
    ],
    regularPrice: "₹1,200",
    memberPrice: "₹1,000",
    heroImage:
      "https://images.unsplash.com/photo-1588776814546-1ffbb172d936?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long does a composite filling last?",
        a: "With good oral hygiene, composite fillings last 7–10 years.",
      },
    ],
  },
  {
    title: "Composite Filling – Anterior",
    slug: "composite-filling-anterior",
    category: "Restorative",
    metaTitle: "Front Tooth Composite Filling | Crown Dental Prayagraj",
    metaDescription:
      "Invisible tooth-coloured composite fillings for front teeth at Crown Dental, Prayagraj. Restore your smile beautifully.",
    seoCopy:
      "Anterior composite fillings restore chipped or decayed front teeth with a colour-matched resin that blends seamlessly with your natural teeth. Our dentists expertly shade-match the material for invisible results.",
    benefits: [
      "Perfect shade matching for front teeth",
      "Restores chips, cracks, and decay",
      "Minimal tooth removal required",
      "Completed in a single visit",
      "Natural, invisible results",
    ],
    regularPrice: "₹1,500",
    memberPrice: "₹1,200",
    heroImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Can composite fillings fix a chipped front tooth?",
        a: "Yes, composite bonding is one of the best options for restoring chipped front teeth.",
      },
    ],
  },
  {
    title: "Inlay / Onlay (Ceramic / Composite)",
    slug: "inlay-onlay",
    category: "Restorative",
    metaTitle: "Dental Inlay & Onlay | Crown Dental Prayagraj",
    metaDescription:
      "Precision ceramic and composite inlays and onlays at Crown Dental, Prayagraj. Stronger than fillings for large cavities.",
    seoCopy:
      "Inlays and onlays are indirect restorations fabricated in a lab and bonded to the tooth. They are stronger than direct fillings and ideal for large cavities that don't require a full crown. Ceramic options are virtually invisible.",
    benefits: [
      "Stronger than direct fillings",
      "Ideal for large cavities",
      "Preserves more natural tooth",
      "Ceramic options look completely natural",
      "Long-lasting with proper care",
    ],
    regularPrice: "₹4,000",
    memberPrice: "₹3,500",
    heroImage:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "What is the difference between an inlay and onlay?",
        a: "An inlay fits within the cusps of the tooth; an onlay covers one or more cusps.",
      },
    ],
  },
  {
    title: "Indirect Pulp Capping",
    slug: "indirect-pulp-capping",
    category: "Restorative",
    metaTitle: "Indirect Pulp Capping | Crown Dental Prayagraj",
    metaDescription:
      "Save your tooth pulp with indirect pulp capping at Crown Dental, Prayagraj. Avoid root canal with early intervention.",
    seoCopy:
      "Indirect pulp capping is a conservative procedure used when decay is close to — but not yet exposing — the dental pulp. A medicated liner is placed to stimulate the tooth to form a protective layer, often avoiding the need for root canal treatment.",
    benefits: [
      "Avoids root canal in early cases",
      "Stimulates natural tooth defense",
      "Preserves tooth vitality",
      "Quick and relatively comfortable",
      "Cost-effective early intervention",
    ],
    regularPrice: "₹800",
    memberPrice: "₹600",
    heroImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is indirect pulp capping successful long-term?",
        a: "Success rates are high when the procedure is done before the pulp is actually exposed.",
      },
    ],
  },
  {
    title: "Direct Pulp Capping",
    slug: "direct-pulp-capping",
    category: "Restorative",
    metaTitle: "Direct Pulp Capping Treatment | Crown Dental Prayagraj",
    metaDescription:
      "Direct pulp capping to save exposed dental pulp at Crown Dental, Prayagraj. A conservative alternative to root canal.",
    seoCopy:
      "Direct pulp capping is performed when the pulp is minimally exposed. A biocompatible material (MTA or calcium hydroxide) is placed directly on the exposure to promote healing and protect the pulp from infection.",
    benefits: [
      "Last resort before root canal",
      "Preserves the living pulp",
      "Uses biocompatible materials",
      "Single visit procedure",
      "May prevent need for RCT",
    ],
    regularPrice: "₹1,000",
    memberPrice: "₹800",
    heroImage:
      "https://images.unsplash.com/photo-1588776814546-1ffbb172d936?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "What happens if direct pulp capping fails?",
        a: "If the pulp does not heal, root canal treatment will be recommended.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // ENDODONTICS (ROOT CANAL TREATMENT)
  // ════════════════════════════════════════════════
  {
    title: "Root Canal Treatment – Anterior",
    slug: "root-canal-anterior",
    category: "Endodontics",
    metaTitle: "Painless Front Tooth Root Canal | Crown Dental Prayagraj",
    metaDescription:
      "Single-visit painless root canal for front teeth at Crown Dental, Prayagraj. Save your natural tooth with expert endodontics.",
    seoCopy:
      "Root canal treatment for anterior (front) teeth removes infected pulp, relieves pain instantly, and saves your natural tooth. Front teeth have a single canal, making the procedure quicker and simpler. We use rotary endodontics for a comfortable single-visit experience.",
    benefits: [
      "Relieves tooth pain immediately",
      "Saves the natural tooth",
      "Usually a single-visit procedure",
      "Prevents spread of infection",
      "Rotary endodontics for precision",
    ],
    regularPrice: "₹2,500",
    memberPrice: "₹2,000",
    heroImage:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is root canal treatment painful?",
        a: "No. It is performed under local anaesthesia and most patients feel little to no pain.",
      },
      {
        q: "Do I need a crown after RCT?",
        a: "A crown is generally recommended to protect the treated tooth long-term.",
      },
    ],
  },
  {
    title: "Root Canal Treatment – Posterior",
    slug: "root-canal-posterior",
    category: "Endodontics",
    metaTitle: "Back Tooth Root Canal Treatment | Crown Dental Prayagraj",
    metaDescription:
      "Expert root canal treatment for posterior (back) teeth at Crown Dental, Prayagraj. Rotary endodontics for precise results.",
    seoCopy:
      "Posterior teeth have 2–4 canals, making them more complex than front teeth. Our rotary endodontic system cleans and shapes all canals precisely, achieving excellent results even in difficult multi-rooted teeth.",
    benefits: [
      "Handles complex multi-rooted teeth",
      "Rotary file system for precision",
      "Relieves severe tooth pain",
      "Saves your natural molar",
      "Expert endodontic care",
    ],
    regularPrice: "₹3,000",
    memberPrice: "₹2,500",
    heroImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How many visits are needed for a back-tooth RCT?",
        a: "Typically 1–2 visits, depending on the severity of infection.",
      },
    ],
  },
  {
    title: "Re-RCT (Retreatment Root Canal)",
    slug: "re-rct",
    category: "Endodontics",
    metaTitle: "Root Canal Retreatment | Crown Dental Prayagraj",
    metaDescription:
      "Failed root canal? Get expert re-treatment at Crown Dental, Prayagraj. Save your tooth even after a previous RCT.",
    seoCopy:
      "If a previously treated tooth becomes re-infected or fails to heal, retreatment involves removing the old filling material, re-cleaning the canals, and re-sealing them. Our specialists have a high success rate in retreating complex cases.",
    benefits: [
      "Saves a previously treated tooth",
      "High success rate in expert hands",
      "Removes old infected material completely",
      "Avoids extraction",
      "Comprehensive canal re-cleaning",
    ],
    regularPrice: "₹4,000",
    memberPrice: "₹3,500",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Why does a root canal sometimes fail?",
        a: "Causes include missed canals, new decay, cracked tooth, or inadequate crown protection.",
      },
    ],
  },
  {
    title: "Post & Core",
    slug: "post-and-core",
    category: "Endodontics",
    metaTitle: "Dental Post & Core Build-up | Crown Dental Prayagraj",
    metaDescription:
      "Post and core build-up after root canal at Crown Dental, Prayagraj. Provides a strong foundation for your crown.",
    seoCopy:
      "After root canal treatment, a post and core is used when there is insufficient tooth structure to support a crown. A metal or fibre post is placed inside the root canal and a core build-up is created to support the final crown.",
    benefits: [
      "Restores heavily broken-down teeth",
      "Strong foundation for crown placement",
      "Fibre posts mimic tooth flexibility",
      "Extends the life of the restored tooth",
      "Required before crown in weak teeth",
    ],
    regularPrice: "₹2,000",
    memberPrice: "₹1,800",
    heroImage:
      "https://images.unsplash.com/photo-1598256989014-f2c11f044aac?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is a post always needed after RCT?",
        a: "Only when significant tooth structure is lost. Your dentist will advise if it is necessary.",
      },
    ],
  },
  {
    title: "Apexification",
    slug: "apexification",
    category: "Endodontics",
    metaTitle: "Apexification Treatment | Crown Dental Prayagraj",
    metaDescription:
      "Expert apexification for teeth with open apices at Crown Dental, Prayagraj. Ideal for young patients with immature teeth.",
    seoCopy:
      "Apexification is performed on young patients whose teeth haven't fully formed (open apex). MTA or calcium hydroxide is used to induce closure of the root tip, allowing root canal treatment to be completed successfully.",
    benefits: [
      "Saves immature teeth in young patients",
      "Induces natural root-tip closure",
      "Uses biocompatible MTA material",
      "Avoids extraction of young teeth",
      "Specialist endodontic care",
    ],
    regularPrice: "₹3,500",
    memberPrice: "₹3,000",
    heroImage:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long does apexification take?",
        a: "Treatment may take several months, with regular review appointments.",
      },
    ],
  },
  {
    title: "Apexogenesis",
    slug: "apexogenesis",
    category: "Endodontics",
    metaTitle: "Apexogenesis | Crown Dental Prayagraj",
    metaDescription:
      "Apexogenesis to preserve vital pulp in young teeth at Crown Dental, Prayagraj. Allows natural root development to continue.",
    seoCopy:
      "Apexogenesis preserves the vital pulp in a young tooth, allowing the root to continue developing naturally. Unlike apexification, the tooth remains alive and the root grows to its full length and thickness.",
    benefits: [
      "Keeps the tooth pulp alive",
      "Allows continued natural root development",
      "Stronger root than apexification",
      "Best outcome for young patients",
      "Minimally invasive approach",
    ],
    regularPrice: "₹3,000",
    memberPrice: "₹2,500",
    heroImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "What is the difference between apexogenesis and apexification?",
        a: "Apexogenesis keeps the pulp alive for natural root growth; apexification treats a non-vital tooth to close the root tip.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // ORAL SURGERY
  // ════════════════════════════════════════════════
  {
    title: "Simple Tooth Extraction",
    slug: "simple-extraction",
    category: "Oral Surgery",
    metaTitle: "Simple Tooth Extraction | Crown Dental Prayagraj",
    metaDescription:
      "Painless simple tooth extraction at Crown Dental, Prayagraj. Quick, safe, and comfortable procedure.",
    seoCopy:
      "Simple extraction is performed on teeth that are visible in the mouth and can be removed with forceps under local anaesthesia. Our gentle technique ensures minimal discomfort and fast healing.",
    benefits: [
      "Quick procedure under local anaesthesia",
      "Minimal post-operative discomfort",
      "Prevents spread of infection",
      "Relieves tooth pain immediately",
      "Fast recovery",
    ],
    regularPrice: "₹700",
    memberPrice: "₹600",
    heroImage:
      "https://images.unsplash.com/photo-1588776814546-1ffbb172d936?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long does healing take after extraction?",
        a: "Most patients heal within 3–7 days with proper aftercare.",
      },
    ],
  },
  {
    title: "Complex Tooth Extraction",
    slug: "complex-extraction",
    category: "Oral Surgery",
    metaTitle: "Complex Tooth Extraction | Crown Dental Prayagraj",
    metaDescription:
      "Expert complex tooth extraction at Crown Dental, Prayagraj. For broken, badly decayed, or difficult teeth.",
    seoCopy:
      "Complex extractions involve broken, severely decayed, or multi-rooted teeth that require surgical sectioning under local anaesthesia. Our oral surgeons perform these with precision for minimal trauma and fast healing.",
    benefits: [
      "Expert handling of difficult teeth",
      "Surgical precision to minimise trauma",
      "Effective local anaesthesia",
      "Minimal post-op discomfort",
      "Detailed aftercare instructions provided",
    ],
    regularPrice: "₹1,200",
    memberPrice: "₹1,000",
    heroImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "What makes an extraction 'complex'?",
        a: "Broken roots, curved roots, or heavily decayed teeth that cannot be removed with simple forceps.",
      },
    ],
  },
  {
    title: "Surgical Extraction (Impacted Tooth)",
    slug: "surgical-extraction-impacted",
    category: "Oral Surgery",
    metaTitle: "Impacted Tooth Surgical Extraction | Crown Dental Prayagraj",
    metaDescription:
      "Expert surgical extraction of impacted teeth at Crown Dental, Prayagraj. Safe, precise minor oral surgery.",
    seoCopy:
      "Impacted teeth (teeth trapped below the gum line) require a minor surgical procedure under local anaesthesia. We reflect gum tissue, section the tooth if needed, and ensure thorough socket cleaning for optimal healing.",
    benefits: [
      "Removes teeth that cannot erupt normally",
      "Prevents damage to adjacent teeth",
      "Performed under local anaesthesia",
      "Expert surgical technique",
      "Post-operative care support",
    ],
    regularPrice: "₹2,500",
    memberPrice: "₹2,000",
    heroImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long is recovery after surgical extraction?",
        a: "Most patients recover within 5–7 days; full bone healing takes a few months.",
      },
    ],
  },
  {
    title: "Wisdom Tooth Surgery",
    slug: "wisdom-tooth-surgery",
    category: "Oral Surgery",
    metaTitle: "Wisdom Tooth Removal | Crown Dental Prayagraj",
    metaDescription:
      "Safe and comfortable wisdom tooth removal at Crown Dental, Prayagraj. Expert oral surgeons, complete post-op care.",
    seoCopy:
      "Problematic wisdom teeth can cause pain, swelling, crowding, and infection. Our oral surgeons safely remove impacted or problematic wisdom teeth under local anaesthesia, with thorough post-operative care instructions.",
    benefits: [
      "Relieves wisdom tooth pain and pressure",
      "Prevents infections and cysts",
      "Protects adjacent teeth",
      "Expert oral surgery team",
      "Comprehensive aftercare guidance",
    ],
    regularPrice: "₹3,500",
    memberPrice: "₹3,000",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Are all wisdom teeth removed?",
        a: "Only problematic or high-risk wisdom teeth need removal. Your dentist will evaluate yours.",
      },
    ],
  },
  {
    title: "Apicoectomy",
    slug: "apicoectomy",
    category: "Oral Surgery",
    metaTitle: "Apicoectomy (Root-End Surgery) | Crown Dental Prayagraj",
    metaDescription:
      "Apicoectomy for persistent tooth infections at Crown Dental, Prayagraj. Save your tooth when RCT is not enough.",
    seoCopy:
      "An apicoectomy removes the tip of a tooth's root and any infected tissue when conventional root canal treatment hasn't resolved the infection. It is a reliable minor surgical procedure performed under local anaesthesia.",
    benefits: [
      "Saves tooth when standard RCT fails",
      "Removes persistent root-tip infection",
      "Minor procedure under local anaesthesia",
      "High long-term success rate",
      "Quick outpatient procedure",
    ],
    regularPrice: "₹5,000",
    memberPrice: "₹4,000",
    heroImage:
      "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is apicoectomy painful?",
        a: "It is performed under local anaesthesia; patients may feel mild pressure but not pain.",
      },
    ],
  },
  {
    title: "Frenectomy",
    slug: "frenectomy",
    category: "Oral Surgery",
    metaTitle: "Frenectomy (Tongue-Tie / Lip-Tie) | Crown Dental Prayagraj",
    metaDescription:
      "Laser frenectomy for tongue-tie and lip-tie at Crown Dental, Prayagraj. Quick procedure for children and adults.",
    seoCopy:
      "Frenectomy removes a restrictive frenum (tissue attachment) that causes tongue-tie, lip-tie, or gum recession. We use laser or scalpel technique under local anaesthesia for a quick, comfortable procedure with minimal bleeding.",
    benefits: [
      "Relieves tongue-tie and lip-tie",
      "Improves speech and feeding in children",
      "Prevents gum recession",
      "Quick procedure with fast healing",
      "Laser option available for minimal bleeding",
    ],
    regularPrice: "₹2,500",
    memberPrice: "₹2,000",
    heroImage:
      "https://images.unsplash.com/photo-1598256989014-f2c11f044aac?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "At what age can frenectomy be done?",
        a: "It can be performed at any age, including newborns with tongue-tie affecting breastfeeding.",
      },
    ],
  },
  {
    title: "Alveoloplasty",
    slug: "alveoloplasty",
    category: "Oral Surgery",
    metaTitle: "Alveoloplasty (Ridge Reshaping) | Crown Dental Prayagraj",
    metaDescription:
      "Alveoloplasty for smooth, well-shaped ridges before dentures at Crown Dental, Prayagraj.",
    seoCopy:
      "Alveoloplasty reshapes and smoothens the jawbone ridge after extractions to create a better-fitting foundation for dentures. It removes sharp bony projections and creates an ideal ridge contour.",
    benefits: [
      "Ensures comfortable denture fit",
      "Removes sharp bony edges",
      "Smoothens the jaw ridge",
      "Improves long-term denture stability",
      "Performed at time of extraction",
    ],
    regularPrice: "₹4,000",
    memberPrice: "₹3,500",
    heroImage:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is alveoloplasty necessary before dentures?",
        a: "It is recommended when the ridge has irregular or sharp areas that would make denture-wearing painful.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // PERIODONTICS (GUM TREATMENTS)
  // ════════════════════════════════════════════════
  {
    title: "Deep Scaling / Curettage",
    slug: "deep-scaling-curettage",
    category: "Periodontics",
    metaTitle: "Deep Scaling & Curettage | Crown Dental Prayagraj",
    metaDescription:
      "Professional deep scaling and root planing for gum disease at Crown Dental, Prayagraj. Restore gum health.",
    seoCopy:
      "Deep scaling (root planing and curettage) removes tartar deposits from below the gum line and smoothens root surfaces. It is the primary non-surgical treatment for gum disease (periodontitis) and effectively halts bone loss.",
    benefits: [
      "Eliminates below-gum tartar deposits",
      "Reduces gum pocket depth",
      "Halts progressive bone loss",
      "Reduces bleeding and inflammation",
      "Non-surgical gum treatment",
    ],
    regularPrice: "₹2,500",
    memberPrice: "₹2,000",
    heroImage:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How many sessions does deep scaling require?",
        a: "Typically 2–4 sessions (one per quadrant) scheduled a week apart.",
      },
    ],
  },
  {
    title: "Flap Surgery",
    slug: "flap-surgery",
    category: "Periodontics",
    metaTitle: "Periodontal Flap Surgery | Crown Dental Prayagraj",
    metaDescription:
      "Advanced flap surgery for severe gum disease at Crown Dental, Prayagraj. Expert periodontist, lasting results.",
    seoCopy:
      "Periodontal flap surgery is required when gum pockets are too deep for non-surgical treatment. The gum is carefully lifted to allow thorough cleaning of roots and bone, then sutured back for optimal healing.",
    benefits: [
      "Accesses deep pockets not reachable by scaling",
      "Removes diseased tissue",
      "Reduces pocket depth permanently",
      "Performed by specialist periodontist",
      "Prevents tooth loss from advanced gum disease",
    ],
    regularPrice: "₹6,000",
    memberPrice: "₹5,000",
    heroImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is flap surgery very painful?",
        a: "It is done under local anaesthesia. Post-op discomfort is manageable with prescribed medications.",
      },
    ],
  },
  {
    title: "Gingivectomy / Gingivoplasty",
    slug: "gingivectomy-gingivoplasty",
    category: "Periodontics",
    metaTitle: "Gum Reshaping Surgery | Crown Dental Prayagraj",
    metaDescription:
      "Gingivectomy and gingivoplasty for gummy smile and gum disease at Crown Dental, Prayagraj.",
    seoCopy:
      "Gingivectomy removes excess or diseased gum tissue to treat gum disease or reduce a gummy smile. Gingivoplasty reshapes healthy gum tissue for better aesthetics. Both are quick procedures under local anaesthesia.",
    benefits: [
      "Treats excess or diseased gum tissue",
      "Reduces gummy smile",
      "Improves gum aesthetics",
      "Quick, minor surgical procedure",
      "Fast healing",
    ],
    regularPrice: "₹3,000",
    memberPrice: "₹2,500",
    heroImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Will my gums grow back after gingivectomy?",
        a: "A small amount may regrow, but proper oral hygiene will minimise this.",
      },
    ],
  },
  {
    title: "Crown Lengthening",
    slug: "crown-lengthening",
    category: "Periodontics",
    metaTitle: "Crown Lengthening Procedure | Crown Dental Prayagraj",
    metaDescription:
      "Crown lengthening surgery to expose more tooth structure at Crown Dental, Prayagraj. Enables crown placement on short teeth.",
    seoCopy:
      "Crown lengthening removes gum and/or bone tissue to expose more of the tooth surface. It is required before placing a crown on a short tooth and also used to improve a gummy smile aesthetically.",
    benefits: [
      "Enables crown placement on short teeth",
      "Corrects gummy smile",
      "Exposes hidden tooth structure",
      "Precise surgical reshaping",
      "Improves both function and aesthetics",
    ],
    regularPrice: "₹3,500",
    memberPrice: "₹3,000",
    heroImage:
      "https://images.unsplash.com/photo-1588776814546-1ffbb172d936?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long do I wait after crown lengthening to get a crown?",
        a: "Typically 6–8 weeks to allow the gum to fully heal before crown preparation.",
      },
    ],
  },
  {
    title: "Bone Grafting",
    slug: "bone-grafting-perio",
    category: "Periodontics",
    metaTitle: "Periodontal Bone Graft | Crown Dental Prayagraj",
    metaDescription:
      "Bone grafting to rebuild jaw bone lost to gum disease at Crown Dental, Prayagraj.",
    seoCopy:
      "Periodontal bone grafting rebuilds bone destroyed by advanced gum disease. Bone graft material is placed into the defect to stimulate new bone growth, stabilise the tooth, and potentially reverse bone loss.",
    benefits: [
      "Rebuilds bone lost to gum disease",
      "Helps save teeth at risk",
      "Stimulates natural bone regeneration",
      "Improves long-term tooth stability",
      "Required before implants in some cases",
    ],
    regularPrice: "₹6,000",
    memberPrice: "₹5,000",
    heroImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long does bone grafting take to heal?",
        a: "Initial healing takes 2–4 weeks; full bone maturation takes 3–6 months.",
      },
    ],
  },
  {
    title: "Guided Tissue Regeneration (GTR)",
    slug: "guided-tissue-regeneration",
    category: "Periodontics",
    metaTitle: "Guided Tissue Regeneration | Crown Dental Prayagraj",
    metaDescription:
      "GTR procedure to regenerate lost bone and tissue at Crown Dental, Prayagraj. Advanced periodontal treatment.",
    seoCopy:
      "Guided Tissue Regeneration uses a resorbable membrane to separate gum tissue from bone, directing the body to regenerate lost periodontal structures. It is used alongside bone grafting for superior results in advanced cases.",
    benefits: [
      "Regenerates bone and attachment lost to gum disease",
      "Uses resorbable membrane – no second surgery",
      "Superior results vs. bone graft alone",
      "Can save severely compromised teeth",
      "Advanced specialist technique",
    ],
    regularPrice: "₹7,000",
    memberPrice: "₹6,000",
    heroImage:
      "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is GTR always used with bone grafting?",
        a: "Often, yes. The membrane and graft work together for optimal regeneration.",
      },
    ],
  },
  {
    title: "LASER Gum / Lip Depigmentation",
    slug: "laser-gum-depigmentation",
    category: "Periodontics",
    metaTitle: "LASER Gum Depigmentation | Crown Dental Prayagraj",
    metaDescription:
      "Remove dark gum pigmentation with LASER treatment at Crown Dental, Prayagraj. Get pink, healthy-looking gums.",
    seoCopy:
      "LASER gum depigmentation safely removes dark melanin pigmentation from gums, giving you uniformly pink, attractive gums. The laser vaporises the pigmented layer with minimal bleeding and rapid healing — no scalpel required.",
    benefits: [
      "Removes dark gum pigmentation safely",
      "Laser precision – minimal bleeding",
      "Quick 30–45 minute procedure",
      "Rapid healing compared to traditional methods",
      "Long-lasting results",
    ],
    regularPrice: "₹5,000",
    memberPrice: "₹4,000",
    heroImage:
      "https://images.unsplash.com/photo-1598256989014-f2c11f044aac?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is laser gum depigmentation permanent?",
        a: "Results are long-lasting; pigmentation may slowly return in some patients over years.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // ORTHODONTICS
  // ════════════════════════════════════════════════
  {
    title: "Metal Braces",
    slug: "metal-braces",
    category: "Orthodontics",
    metaTitle: "Metal Braces in Prayagraj | Crown Dental",
    metaDescription:
      "Affordable metal braces for teeth straightening at Crown Dental, Prayagraj. Expert orthodontist, excellent results.",
    seoCopy:
      "Traditional metal braces are the most reliable and cost-effective way to straighten teeth and correct bite problems. Modern metal braces are smaller and more comfortable than ever, suitable for teens and adults.",
    benefits: [
      "Most effective for complex cases",
      "Cost-effective straightening solution",
      "Handles all types of misalignment",
      "Suitable for all ages",
      "Smaller, more comfortable modern brackets",
    ],
    regularPrice: "₹30,000",
    memberPrice: "₹24,999",
    heroImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long does metal brace treatment take?",
        a: "Typically 12–24 months depending on the complexity of the case.",
      },
    ],
  },
  {
    title: "Ceramic Braces",
    slug: "ceramic-braces",
    category: "Orthodontics",
    metaTitle: "Ceramic Braces in Prayagraj | Crown Dental",
    metaDescription:
      "Tooth-coloured ceramic braces for discreet teeth straightening at Crown Dental, Prayagraj.",
    seoCopy:
      "Ceramic braces use tooth-coloured or clear brackets that blend with your teeth, making them far less noticeable than metal braces. They are just as effective and a popular choice for image-conscious adults and teens.",
    benefits: [
      "Tooth-coloured brackets blend naturally",
      "As effective as metal braces",
      "Popular with adults and older teens",
      "Less visible in photos and videos",
      "Comfortable modern brackets",
    ],
    regularPrice: "₹35,000",
    memberPrice: "₹29,999",
    heroImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Do ceramic braces stain easily?",
        a: "The brackets are stain-resistant; ties may discolour slightly with certain foods.",
      },
    ],
  },
  {
    title: "Self-Ligating Braces",
    slug: "self-ligating-braces",
    category: "Orthodontics",
    metaTitle: "Self-Ligating Braces | Crown Dental Prayagraj",
    metaDescription:
      "Advanced self-ligating braces at Crown Dental, Prayagraj. Faster treatment, fewer appointments, greater comfort.",
    seoCopy:
      "Self-ligating braces use a built-in clip mechanism instead of elastic ties, reducing friction. This can mean shorter treatment time, fewer adjustment appointments, and improved oral hygiene during treatment.",
    benefits: [
      "Reduced friction for faster tooth movement",
      "Fewer adjustment appointments needed",
      "Easier to keep clean",
      "More comfortable than traditional braces",
      "Available in metal and ceramic",
    ],
    regularPrice: "₹50,000",
    memberPrice: "₹42,999",
    heroImage:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Are self-ligating braces really faster?",
        a: "They can reduce treatment time in some cases, though results depend on the individual.",
      },
    ],
  },
  {
    title: "Lingual Braces",
    slug: "lingual-braces",
    category: "Orthodontics",
    metaTitle: "Lingual Braces (Hidden Braces) | Crown Dental Prayagraj",
    metaDescription:
      "Completely hidden lingual braces at Crown Dental, Prayagraj. Straighten your teeth invisibly from behind.",
    seoCopy:
      "Lingual braces are bonded to the inside (tongue side) of teeth, making them completely invisible from the front. They are custom-made for each patient and offer the effectiveness of traditional braces with zero visibility.",
    benefits: [
      "Completely invisible from the outside",
      "As effective as conventional braces",
      "Custom-fabricated for each patient",
      "No compromise on smile aesthetics",
      "Ideal for professionals and public figures",
    ],
    regularPrice: "₹70,000",
    memberPrice: "₹59,000",
    heroImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Are lingual braces uncomfortable?",
        a: "There is an adjustment period of 1–2 weeks; most patients adapt comfortably.",
      },
    ],
  },
  {
    title: "Clear Aligners",
    slug: "clear-aligners",
    category: "Orthodontics",
    metaTitle: "Clear Aligners in Prayagraj | Crown Dental",
    metaDescription:
      "Invisible clear aligners for teeth straightening at Crown Dental, Prayagraj. Comfortable, removable, and virtually invisible.",
    seoCopy:
      "Clear aligners use a series of custom-made transparent trays to gradually straighten teeth. They are removable for eating and cleaning, virtually invisible, and highly comfortable — the preferred choice for modern adults.",
    benefits: [
      "Virtually invisible treatment",
      "Removable for eating and oral hygiene",
      "No dietary restrictions",
      "Fewer dental visits required",
      "Comfortable with no metal wires",
    ],
    regularPrice: "₹80,000 onwards",
    memberPrice: "₹65,000 onwards",
    heroImage:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How many hours a day must aligners be worn?",
        a: "Aligners must be worn 20–22 hours per day for best results.",
      },
    ],
  },
  {
    title: "Retainers",
    slug: "retainers",
    category: "Orthodontics",
    metaTitle: "Dental Retainers | Crown Dental Prayagraj",
    metaDescription:
      "Custom orthodontic retainers after braces at Crown Dental, Prayagraj. Maintain your perfect smile long-term.",
    seoCopy:
      "Retainers are worn after orthodontic treatment to hold teeth in their new position while the bone remodels. We provide both removable (Hawley, clear) and fixed (bonded) retainers depending on the patient's needs.",
    benefits: [
      "Maintains teeth alignment after braces",
      "Prevents relapse",
      "Available in removable and fixed types",
      "Custom-made for a perfect fit",
      "Essential after any orthodontic treatment",
    ],
    regularPrice: "₹3,000",
    memberPrice: "₹2,500",
    heroImage:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long must I wear retainers?",
        a: "Life-long retainer wear (at night) is the best way to maintain your result permanently.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // COSMETIC DENTISTRY
  // ════════════════════════════════════════════════
  {
    title: "Teeth Whitening (Bleaching)",
    slug: "teeth-whitening",
    category: "Cosmetic",
    metaTitle: "Professional Teeth Whitening | Crown Dental Prayagraj",
    metaDescription:
      "Brighten your smile in one visit with professional teeth whitening at Crown Dental, Prayagraj.",
    seoCopy:
      "Professional chair-side teeth whitening uses pharmaceutical-grade bleaching gel to lighten teeth by several shades in a single appointment. Safe, supervised, and dramatically more effective than over-the-counter products.",
    benefits: [
      "Noticeable results in a single session",
      "Professional-strength whitening gel",
      "Safe and supervised procedure",
      "Long-lasting results (6–12 months)",
      "Boosts confidence instantly",
    ],
    regularPrice: "₹6,000",
    memberPrice: "₹4,999",
    heroImage:
      "https://images.unsplash.com/photo-1598256989014-f2c11f044aac?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is teeth whitening safe for enamel?",
        a: "Yes, when done professionally with the correct concentration and exposure time.",
      },
      {
        q: "How long do whitening results last?",
        a: "6–12 months with good oral hygiene and diet management.",
      },
    ],
  },
  {
    title: "Dental Veneer (Porcelain)",
    slug: "dental-veneer-porcelain",
    category: "Cosmetic",
    metaTitle: "Porcelain Dental Veneers | Crown Dental Prayagraj",
    metaDescription:
      "Custom porcelain veneers for a celebrity smile at Crown Dental, Prayagraj. Durable, natural-looking, and stain-resistant.",
    seoCopy:
      "Porcelain veneers are ultra-thin, custom-made shells of ceramic bonded to the front of teeth. They correct discolouration, chips, gaps, and shape irregularities with stunning, natural-looking results that last a decade or more.",
    benefits: [
      "Transforms smile in just 2 visits",
      "Highly stain-resistant porcelain",
      "Custom shade and shape design",
      "Long-lasting (10–15 years)",
      "Minimal tooth reduction required",
    ],
    regularPrice: "₹8,000 per tooth",
    memberPrice: "₹6,499 per tooth",
    heroImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Do veneers require special care?",
        a: "Regular brushing, flossing, and avoiding very hard foods will keep veneers looking great.",
      },
    ],
  },
  {
    title: "Composite Veneer",
    slug: "composite-veneer",
    category: "Cosmetic",
    metaTitle: "Composite Dental Veneers | Crown Dental Prayagraj",
    metaDescription:
      "Affordable same-day composite veneers at Crown Dental, Prayagraj. Instant smile transformation without lab wait.",
    seoCopy:
      "Composite veneers are created chair-side using tooth-coloured resin, sculpted directly on your teeth in a single visit. They are an economical option for minor cosmetic improvements with immediate results.",
    benefits: [
      "Same-day transformation",
      "No lab wait time",
      "More affordable than porcelain",
      "Easily repaired if chipped",
      "Minimal to no tooth reduction",
    ],
    regularPrice: "₹3,000 per tooth",
    memberPrice: "₹2,500 per tooth",
    heroImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long do composite veneers last?",
        a: "5–7 years with proper maintenance; they can be polished or repaired if needed.",
      },
    ],
  },
  {
    title: "Smile Designing (Full Case)",
    slug: "smile-designing",
    category: "Cosmetic",
    metaTitle: "Smile Designing | Crown Dental Prayagraj",
    metaDescription:
      "Transform your entire smile with a customised smile design at Crown Dental, Prayagraj. Veneers, crowns, whitening & more.",
    seoCopy:
      "Smile designing combines multiple cosmetic procedures — veneers, crowns, whitening, and contouring — to create your ideal smile. We use digital smile design technology to show you a preview before any treatment begins.",
    benefits: [
      "Complete smile transformation",
      "Digital smile design preview",
      "Personalised to your face and preferences",
      "Combines multiple cosmetic procedures",
      "Long-lasting, celebrity-quality results",
    ],
    regularPrice: "₹25,000+",
    memberPrice: "₹19,999+",
    heroImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How many appointments does a smile design take?",
        a: "Typically 3–6 appointments spread over a few weeks depending on the complexity.",
      },
    ],
  },
  {
    title: "Tooth Jewellery",
    slug: "tooth-jewellery",
    category: "Cosmetic",
    metaTitle: "Tooth Jewellery | Crown Dental Prayagraj",
    metaDescription:
      "Add sparkle to your smile with safe, professional tooth jewellery at Crown Dental, Prayagraj.",
    seoCopy:
      "Tooth jewellery adds a small decorative gem or crystal to the tooth surface using a safe, non-invasive adhesive. No drilling required; it is completely reversible and a fun way to personalise your smile.",
    benefits: [
      "No drilling or enamel damage",
      "Completely reversible",
      "Variety of gem options available",
      "Quick, pain-free procedure",
      "Adds a unique touch to your smile",
    ],
    regularPrice: "₹2,000",
    memberPrice: "₹1,500",
    heroImage:
      "https://images.unsplash.com/photo-1588776814546-1ffbb172d936?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Does tooth jewellery damage the tooth?",
        a: "No. It is bonded to the enamel surface and removed cleanly when desired.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // PEDIATRIC DENTISTRY
  // ════════════════════════════════════════════════
  {
    title: "Pulpectomy (Children)",
    slug: "pulpectomy-children",
    category: "Pediatric",
    metaTitle: "Pulpectomy for Kids | Crown Dental Prayagraj",
    metaDescription:
      "Gentle pulpectomy (children's root canal) at Crown Dental, Prayagraj. Save baby teeth pain-free.",
    seoCopy:
      "Pulpectomy is a root canal procedure performed on baby teeth with infected pulp. Saving baby teeth is important for proper speech development, guiding permanent teeth, and maintaining jaw space. Our child-friendly team makes the experience comfortable.",
    benefits: [
      "Saves infected baby teeth",
      "Prevents premature tooth loss",
      "Maintains space for permanent teeth",
      "Child-friendly, gentle approach",
      "Completed with minimal discomfort",
    ],
    regularPrice: "₹2,000",
    memberPrice: "₹1,800",
    heroImage:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Why save a baby tooth if it will fall out anyway?",
        a: "Baby teeth hold space for permanent teeth. Early loss can cause crowding and alignment problems.",
      },
    ],
  },
  {
    title: "Stainless Steel Crown (SSC)",
    slug: "stainless-steel-crown",
    category: "Pediatric",
    metaTitle: "Stainless Steel Crown for Kids | Crown Dental Prayagraj",
    metaDescription:
      "Durable stainless steel crowns for children's teeth at Crown Dental, Prayagraj. Best protection after pulpectomy.",
    seoCopy:
      "Stainless steel crowns (SSC) are placed over baby teeth after pulpectomy or extensive decay. They are extremely durable, fit precisely, and are the gold standard for protecting severely decayed baby teeth.",
    benefits: [
      "Extremely durable protection for baby teeth",
      "Gold-standard after pulpectomy",
      "Single-visit placement",
      "Long-lasting until natural tooth falls out",
      "Prevents further decay",
    ],
    regularPrice: "₹2,000",
    memberPrice: "₹1,800",
    heroImage:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Will an SSC fall out with the baby tooth?",
        a: "Yes, the crown will come out naturally when the baby tooth sheds.",
      },
    ],
  },
  {
    title: "Space Maintainer",
    slug: "space-maintainer",
    category: "Pediatric",
    metaTitle: "Dental Space Maintainer for Kids | Crown Dental Prayagraj",
    metaDescription:
      "Space maintainers to preserve space for permanent teeth after early baby tooth loss at Crown Dental, Prayagraj.",
    seoCopy:
      "When a baby tooth is lost early, a space maintainer holds the gap open so the permanent tooth can erupt properly. Without it, adjacent teeth can drift and cause crowding or impaction of the permanent tooth.",
    benefits: [
      "Prevents crowding of permanent teeth",
      "Maintains natural space after tooth loss",
      "Avoids future orthodontic problems",
      "Custom-fitted, comfortable appliance",
      "Removed when permanent tooth erupts",
    ],
    regularPrice: "₹3,000",
    memberPrice: "₹2,500",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is a space maintainer always needed after losing a baby tooth?",
        a: "Only when the permanent replacement tooth is not expected to erupt soon.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // PROSTHETICS – CROWNS
  // ════════════════════════════════════════════════
  {
    title: "Metal Crown (Full Cast – Posterior)",
    slug: "metal-crown-full-cast",
    category: "Prosthetics",
    metaTitle: "Metal Full Cast Crown | Crown Dental Prayagraj",
    metaDescription:
      "Strong metal full-cast crowns for back teeth at Crown Dental, Prayagraj. Most economical crown option.",
    seoCopy:
      "Full-cast metal crowns are the strongest and most economical crown option. They require minimal tooth reduction and are virtually indestructible — ideal for posterior teeth where aesthetics is not the primary concern.",
    benefits: [
      "Extremely strong and durable",
      "Minimal tooth reduction required",
      "Most economical crown option",
      "Long-lasting without chipping",
      "Ideal for heavy chewing forces",
    ],
    regularPrice: "₹1,800",
    memberPrice: "₹1,500",
    heroImage:
      "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Will a metal crown be visible when I smile?",
        a: "Metal crowns are used only on back teeth and are rarely visible during normal smiling.",
      },
    ],
  },
  {
    title: "PFM Crown (Porcelain Fused to Metal)",
    slug: "pfm-crown",
    category: "Prosthetics",
    metaTitle: "PFM Dental Crown | Crown Dental Prayagraj",
    metaDescription:
      "PFM crowns combining strength and aesthetics at Crown Dental, Prayagraj. Suitable for front and back teeth.",
    seoCopy:
      "Porcelain Fused to Metal (PFM) crowns have a metal core for strength with a porcelain outer layer for a tooth-coloured appearance. They offer a balance of aesthetics and durability, suitable for both front and back teeth.",
    benefits: [
      "Strong metal core with aesthetic porcelain",
      "Suitable for front and back teeth",
      "More affordable than all-ceramic crowns",
      "Natural tooth-coloured appearance",
      "3-year warranty",
    ],
    regularPrice: "₹3,000",
    memberPrice: "₹2,500",
    heroImage:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Can you see a dark line at the gum with PFM crowns?",
        a: "With ageing gums, a dark metal margin may become visible. All-ceramic crowns avoid this.",
      },
    ],
  },
  {
    title: "CAD-CAM PFM Crown",
    slug: "cad-cam-pfm-crown",
    category: "Prosthetics",
    metaTitle: "CAD-CAM PFM Crown | Crown Dental Prayagraj",
    metaDescription:
      "Precision CAD-CAM fabricated PFM crowns at Crown Dental, Prayagraj. Better fit and stronger porcelain bonding.",
    seoCopy:
      "CAD-CAM (Computer-Aided Design / Computer-Aided Manufacturing) PFM crowns are milled to precise specifications, delivering a better fit and stronger porcelain bonding than conventional PFM crowns, with improved longevity.",
    benefits: [
      "Computer-precision for perfect fit",
      "Stronger porcelain-metal bond",
      "Better longevity than conventional PFM",
      "Improved marginal accuracy",
      "5-year warranty",
    ],
    regularPrice: "₹3,500",
    memberPrice: "₹2,900",
    heroImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How is CAD-CAM PFM better than regular PFM?",
        a: "Computer milling ensures more precise fit and a stronger porcelain-metal interface.",
      },
    ],
  },
  {
    title: "DMLS Crown (Direct Metal Laser Sintered)",
    slug: "dmls-crown",
    category: "Prosthetics",
    metaTitle: "DMLS Laser-Sintered Crown | Crown Dental Prayagraj",
    metaDescription:
      "Ultra-precise DMLS laser-sintered dental crowns at Crown Dental, Prayagraj. 10-year warranty, ideal for heavy chewing.",
    seoCopy:
      "DMLS (Direct Metal Laser Sintering) crowns are fabricated using laser sintering technology for an extremely precise, highly accurate fit. They handle heavy chewing loads superbly and are stronger than conventional PFM crowns.",
    benefits: [
      "Laser sintering precision for perfect fit",
      "Handles the heaviest chewing forces",
      "Stronger than conventional PFM",
      "Reliable for molar restorations",
      "10-year warranty",
    ],
    regularPrice: "₹5,500",
    memberPrice: "₹4,500",
    heroImage:
      "https://images.unsplash.com/photo-1598256989014-f2c11f044aac?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "What makes DMLS crowns different from standard metal crowns?",
        a: "DMLS uses laser sintering for superior precision and fit over traditional casting methods.",
      },
    ],
  },
  {
    title: "Titanium Crown (Posterior)",
    slug: "titanium-crown",
    category: "Prosthetics",
    metaTitle: "Titanium Dental Crown | Crown Dental Prayagraj",
    metaDescription:
      "Biocompatible titanium crowns for allergy-prone patients at Crown Dental, Prayagraj. 10-year warranty.",
    seoCopy:
      "Titanium crowns are the best choice for patients with metal allergies or sensitivity. Biocompatible, corrosion-resistant, and extremely strong — titanium crowns offer superior durability for posterior restorations.",
    benefits: [
      "Biocompatible — safe for metal-sensitive patients",
      "Extremely strong and corrosion-resistant",
      "Lightweight comfort",
      "Long-term durability",
      "10-year warranty",
    ],
    regularPrice: "₹10,000",
    memberPrice: "₹8,500",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is titanium safe in the mouth?",
        a: "Yes. Titanium is biocompatible and the same material used for dental implants.",
      },
    ],
  },
  {
    title: "Zirconia Crown – Basic",
    slug: "zirconia-crown-basic",
    category: "Prosthetics",
    metaTitle: "Zirconia Dental Crown | Crown Dental Prayagraj",
    metaDescription:
      "Beautiful, metal-free zirconia crowns at Crown Dental, Prayagraj. Tooth-coloured, strong, and stain-resistant.",
    seoCopy:
      "Basic zirconia crowns are metal-free, tooth-coloured, and stronger than PFM crowns. They are an excellent mid-range option for patients wanting both aesthetics and durability without premium pricing.",
    benefits: [
      "Completely metal-free",
      "Tooth-coloured and stain-resistant",
      "Stronger than PFM crowns",
      "No dark metal margin at gums",
      "Available with 5- or 10-year warranty",
    ],
    regularPrice: "₹8,000 – ₹10,000",
    memberPrice: "₹6,800 – ₹8,000",
    heroImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is zirconia better than PFM?",
        a: "For aesthetics, zirconia is superior as it has no dark metal margin and is more translucent.",
      },
    ],
  },
  {
    title: "Dentsply Cercon Zirconia (Premium – Anterior)",
    slug: "dentsply-cercon-zirconia",
    category: "Prosthetics",
    metaTitle: "Dentsply Cercon Zirconia Crown | Crown Dental Prayagraj",
    metaDescription:
      "International brand Dentsply Cercon zirconia crowns at Crown Dental. Premium esthetics with lab-certified 15-year warranty.",
    seoCopy:
      "Dentsply Cercon zirconia is an internationally certified premium brand known for exceptional esthetics, precise shade matching, and long-lasting durability. Comes with a lab-certified 15-year warranty.",
    benefits: [
      "International brand quality assurance",
      "Exceptional esthetics and shade matching",
      "Lab-certified 15-year warranty",
      "Ideal for front teeth",
      "Trusted globally by top clinics",
    ],
    regularPrice: "₹12,000",
    memberPrice: "₹9,500",
    heroImage:
      "https://images.unsplash.com/photo-1588776814546-1ffbb172d936?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Why choose a branded zirconia over basic?",
        a: "Branded zirconia offers certified quality, better esthetics, and guaranteed warranty.",
      },
    ],
  },
  {
    title: "BruxZir Solid Zirconia (Posterior – Bruxism Cases)",
    slug: "bruxzir-zirconia",
    category: "Prosthetics",
    metaTitle: "BruxZir Zirconia Crown for Grinders | Crown Dental Prayagraj",
    metaDescription:
      "BruxZir solid zirconia crowns for teeth grinders at Crown Dental, Prayagraj. Strongest crown available – 10-year warranty.",
    seoCopy:
      "BruxZir solid zirconia is specifically designed for patients with bruxism (teeth grinding). Its monolithic structure has no porcelain to chip, making it the strongest crown available and ideal for heavy grinders.",
    benefits: [
      "Extremely strong – designed for grinders",
      "No porcelain to chip",
      "Crack and wear-resistant",
      "Ideal for posterior heavy chewing",
      "10-year warranty",
    ],
    regularPrice: "₹15,000",
    memberPrice: "₹12,000",
    heroImage:
      "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "What is bruxism?",
        a: "Bruxism is habitual teeth grinding or clenching, often during sleep, that wears down teeth.",
      },
    ],
  },
  {
    title: "E-Max Crown (Lithium Disilicate – Anterior)",
    slug: "emax-crown",
    category: "Prosthetics",
    metaTitle: "E-Max Lithium Disilicate Crown | Crown Dental Prayagraj",
    metaDescription:
      "Highly esthetic E-Max lithium disilicate crowns for front teeth at Crown Dental, Prayagraj. Most natural-looking crown.",
    seoCopy:
      "E-Max (lithium disilicate) crowns are the top cosmetic choice for anterior teeth. Highly translucent like natural enamel, they allow custom shade matching for virtually invisible results. Backed by a 5–7 year warranty.",
    benefits: [
      "Most natural-looking crown material",
      "Highly translucent like natural enamel",
      "Custom shade matching for front teeth",
      "No metal – completely metal-free",
      "5–7 year warranty",
    ],
    regularPrice: "₹10,000",
    memberPrice: "₹8,000",
    heroImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Can E-Max crowns be used for back teeth?",
        a: "E-Max is primarily recommended for front and premolar teeth, not for heavy-chewing molars.",
      },
    ],
  },
  {
    title: "Ivoclar Zircad / E-Max Premium",
    slug: "ivoclar-zircad-emax-premium",
    category: "Prosthetics",
    metaTitle: "Ivoclar Premium Crown | Crown Dental Prayagraj",
    metaDescription:
      "Swiss Ivoclar Zircad / E-Max premium crowns at Crown Dental, Prayagraj. Best esthetics, 15-year warranty.",
    seoCopy:
      "Ivoclar Zircad and E-Max Premium represent the pinnacle of dental crown materials. Swiss-engineered for superior esthetics, translucency, and durability — the ultimate choice for patients who want the very best.",
    benefits: [
      "Swiss premium brand quality",
      "Superior esthetics and translucency",
      "Extremely strong and durable",
      "Trusted globally with premium warranty",
      "15-year warranty",
    ],
    regularPrice: "₹15,000",
    memberPrice: "₹12,500",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "What makes Ivoclar crowns special?",
        a: "Ivoclar is a globally trusted Swiss brand with strict quality standards and a certified 15-year warranty.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // PROSTHETICS – DENTURES
  // ════════════════════════════════════════════════
  {
    title: "Acrylic Partial Denture",
    slug: "acrylic-partial-denture",
    category: "Prosthetics",
    metaTitle: "Acrylic Partial Denture | Crown Dental Prayagraj",
    metaDescription:
      "Affordable removable acrylic partial dentures at Crown Dental, Prayagraj. Replace a few missing teeth economically.",
    seoCopy:
      "Acrylic partial dentures replace a few missing teeth with an economical, removable appliance. Lightweight and easy to fabricate, they are a suitable budget-friendly temporary or long-term option for select cases.",
    benefits: [
      "Economical tooth replacement option",
      "Lightweight and easy to clean",
      "No surgery required",
      "Quick fabrication",
      "Good temporary or budget solution",
    ],
    regularPrice: "₹3,500",
    memberPrice: "₹2,999",
    heroImage:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How are partial dentures held in place?",
        a: "Acrylic partial dentures use clasps that hook onto existing teeth for retention.",
      },
    ],
  },
  {
    title: "Complete Denture (Single Arch)",
    slug: "complete-denture-single-arch",
    category: "Prosthetics",
    metaTitle: "Complete Denture (Single Arch) | Crown Dental Prayagraj",
    metaDescription:
      "Custom complete denture for one arch at Crown Dental, Prayagraj. Replace all teeth in the upper or lower jaw.",
    seoCopy:
      "A complete denture replaces all teeth in one arch (upper or lower jaw). Custom-fitted for each patient, it restores chewing function, speech, and facial aesthetics. A comfortable and affordable full-mouth replacement option.",
    benefits: [
      "Replaces all teeth in one arch",
      "Restores chewing and speech",
      "Improves facial profile",
      "Custom-fitted for comfort",
      "Affordable full-arch solution",
    ],
    regularPrice: "₹8,000",
    memberPrice: "₹6,999",
    heroImage:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long does it take to adjust to dentures?",
        a: "Most patients adjust within 4–8 weeks with practice and follow-up adjustments.",
      },
    ],
  },
  {
    title: "Complete Denture (Both Arches)",
    slug: "complete-denture-both-arches",
    category: "Prosthetics",
    metaTitle: "Complete Full Denture (Upper & Lower) | Crown Dental Prayagraj",
    metaDescription:
      "Full upper and lower complete dentures at Crown Dental, Prayagraj. Comprehensive, affordable total tooth replacement.",
    seoCopy:
      "Full upper and lower complete dentures replace all teeth in both jaws. They restore chewing ability, improve speech, and give a natural-looking smile. Our custom fabrication ensures the best possible fit and comfort.",
    benefits: [
      "Complete tooth replacement for both jaws",
      "Restores chewing and speech",
      "Improves facial profile and appearance",
      "Removable for easy maintenance",
      "Best for fully edentulous patients",
    ],
    regularPrice: "₹15,000",
    memberPrice: "₹12,999",
    heroImage:
      "https://images.unsplash.com/photo-1598256989014-f2c11f044aac?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Are complete dentures comfortable?",
        a: "Modern dentures are well-fitted and comfortable; adjustments are made at follow-up visits.",
      },
    ],
  },
  {
    title: "Cast Partial Denture (Metal Base)",
    slug: "cast-partial-denture-metal",
    category: "Prosthetics",
    metaTitle: "Cast Metal Partial Denture | Crown Dental Prayagraj",
    metaDescription:
      "Durable metal-based cast partial dentures at Crown Dental, Prayagraj. Stronger and less bulky than acrylic.",
    seoCopy:
      "Cast metal partial dentures have a thin, rigid metal framework that provides superior strength, fit, and long-term durability compared to acrylic dentures. They are slimmer, less bulky, and offer better support.",
    benefits: [
      "Metal framework for superior strength",
      "Slimmer and less bulky than acrylic",
      "Better retention and stability",
      "Long-lasting with proper care",
      "Preferred for long-term use",
    ],
    regularPrice: "₹12,000",
    memberPrice: "₹9,999",
    heroImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long does a cast partial denture last?",
        a: "With proper care, they can last 10–15 years.",
      },
    ],
  },
  {
    title: "Flexible Denture (Valplast / Bioflex)",
    slug: "flexible-denture",
    category: "Prosthetics",
    metaTitle: "Flexible Valplast / Bioflex Denture | Crown Dental Prayagraj",
    metaDescription:
      "Comfortable Valplast/Bioflex flexible dentures at Crown Dental, Prayagraj. No metal clasps, esthetic and biocompatible.",
    seoCopy:
      "Flexible dentures are made from thermoplastic nylon, offering unmatched comfort and esthetics. With no visible metal clasps and a flesh-toned base that blends with gum tissue, they are the most esthetic removable option.",
    benefits: [
      "No visible metal clasps",
      "Flexible, comfortable material",
      "Lightweight and biocompatible",
      "Excellent esthetics",
      "Good for anterior tooth replacement",
    ],
    regularPrice: "₹12,000",
    memberPrice: "₹9,999",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Can flexible dentures be repaired?",
        a: "Repairs are more complex than acrylic dentures and require return to the lab.",
      },
    ],
  },

  // ════════════════════════════════════════════════
  // IMPLANTS
  // ════════════════════════════════════════════════
  {
    title: "Single Dental Implant (DIO)",
    slug: "single-implant-dio",
    category: "Implants",
    metaTitle: "DIO Single Dental Implant | Crown Dental Prayagraj",
    metaDescription:
      "DIO single dental implant at Crown Dental, Prayagraj. Permanent, natural-looking tooth replacement.",
    seoCopy:
      "DIO single implants provide a permanent, natural-feeling replacement for one missing tooth. The titanium post fuses with the jawbone (osseointegration), giving you a stable foundation for a crown that looks and functions like a natural tooth.",
    benefits: [
      "Permanent tooth replacement",
      "Preserves jaw bone",
      "No impact on adjacent teeth",
      "Natural look and feel",
      "DIO — trusted implant brand",
    ],
    regularPrice: "₹15,000",
    memberPrice: "₹12,999",
    heroImage:
      "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long does an implant take to heal?",
        a: "Osseointegration takes 3–6 months; the crown is placed after healing.",
      },
      {
        q: "Is the implant procedure painful?",
        a: "Performed under local anaesthesia; most patients report less discomfort than a tooth extraction.",
      },
    ],
  },
  {
    title: "Single Dental Implant (Neo Biotech)",
    slug: "single-implant-neo-biotech",
    category: "Implants",
    metaTitle: "Neo Biotech Dental Implant | Crown Dental Prayagraj",
    metaDescription:
      "Neo Biotech single dental implant at Crown Dental, Prayagraj. Premium implant system for natural-looking results.",
    seoCopy:
      "Neo Biotech implants use advanced surface technology for faster osseointegration and superior long-term stability. An excellent choice for patients wanting a premium implant experience.",
    benefits: [
      "Advanced surface for faster healing",
      "Superior long-term stability",
      "Premium implant brand",
      "Natural look and feel",
      "Lifetime implant foundation",
    ],
    regularPrice: "₹18,000",
    memberPrice: "₹15,000",
    heroImage:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "What makes Neo Biotech different from DIO?",
        a: "Neo Biotech uses a specialised surface treatment for faster osseointegration.",
      },
    ],
  },
  {
    title: "Single Dental Implant (Osteem)",
    slug: "single-implant-osteem",
    category: "Implants",
    metaTitle: "Osteem Dental Implant | Crown Dental Prayagraj",
    metaDescription:
      "Premium Osteem single dental implant at Crown Dental, Prayagraj. Natural look and durability.",
    seoCopy:
      "Osteem implants are designed for premium esthetics and long-term performance. Their unique surface technology promotes rapid bone integration for a secure, natural-feeling result.",
    benefits: [
      "Premium esthetics and feel",
      "Rapid bone integration",
      "Long-term durability",
      "Suitable for complex cases",
      "Trusted implant system",
    ],
    regularPrice: "₹20,000",
    memberPrice: "₹16,999",
    heroImage:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is Osteem a good brand?",
        a: "Yes, Osteem is a clinically proven, internationally recognised implant brand.",
      },
    ],
  },
  {
    title: "All-on-4 Dental Implants",
    slug: "all-on-4-implants",
    category: "Implants",
    metaTitle: "All-on-4 Dental Implants | Crown Dental Prayagraj",
    metaDescription:
      "Full-arch teeth-in-a-day with All-on-4 implants at Crown Dental, Prayagraj. Replace all upper or lower teeth with just 4 implants.",
    seoCopy:
      "All-on-4 uses just 4 strategically placed implants to support a full arch of fixed teeth. It offers permanent teeth-in-a-day results for patients who have lost all or most of their teeth, avoiding the need for removable dentures.",
    benefits: [
      "Full arch replacement with only 4 implants",
      "Permanent, fixed teeth — no dentures",
      "Immediate loading (teeth same day)",
      "Avoids bone grafting in many cases",
      "Life-changing restoration",
    ],
    regularPrice: "₹1,00,000",
    memberPrice: "₹89,999",
    heroImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Am I suitable for All-on-4?",
        a: "Most patients with adequate bone are candidates. A CT scan assessment is required.",
      },
    ],
  },
  {
    title: "All-on-6 Dental Implants",
    slug: "all-on-6-implants",
    category: "Implants",
    metaTitle: "All-on-6 Dental Implants | Crown Dental Prayagraj",
    metaDescription:
      "Stronger full-arch restoration with All-on-6 implants at Crown Dental, Prayagraj. Better bite force and stability.",
    seoCopy:
      "All-on-6 uses 6 implants per arch for superior bite force and stability compared to All-on-4. Ideal for patients with stronger requirements or who prefer extra implant support for their full-arch prosthesis.",
    benefits: [
      "Superior stability vs. All-on-4",
      "Better distribution of bite forces",
      "Permanent fixed teeth",
      "Suitable for patients needing extra support",
      "Long-term fixed solution",
    ],
    regularPrice: "₹1,50,000",
    memberPrice: "₹1,25,000",
    heroImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is All-on-6 better than All-on-4?",
        a: "All-on-6 distributes load over more implants, which can provide better long-term stability.",
      },
    ],
  },
  {
    title: "Implant-Supported Bridge (3-Unit)",
    slug: "implant-bridge-3-unit",
    category: "Implants",
    metaTitle: "Implant Bridge (3 Teeth) | Crown Dental Prayagraj",
    metaDescription:
      "3-unit implant bridge to replace 3 missing teeth at Crown Dental, Prayagraj. Stable, permanent, no bone loss.",
    seoCopy:
      "A 3-unit implant bridge uses 2 implants to support a 3-tooth fixed bridge — replacing 3 consecutive missing teeth without touching adjacent teeth. This preserves jaw bone and provides a permanent, stable result.",
    benefits: [
      "Replaces 3 missing teeth permanently",
      "No damage to adjacent natural teeth",
      "Preserves jaw bone",
      "Stable and natural-feeling",
      "Multiple implant brand options",
    ],
    regularPrice: "₹55,000 – ₹75,000",
    memberPrice: "₹49,999 – ₹65,000",
    heroImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long does an implant bridge last?",
        a: "With proper care, implant bridges can last 15–25 years or more.",
      },
    ],
  },
  {
    title: "Implant Overdenture",
    slug: "implant-overdenture",
    category: "Implants",
    metaTitle: "Implant-Supported Overdenture | Crown Dental Prayagraj",
    metaDescription:
      "Implant overdentures for superior stability at Crown Dental, Prayagraj. Snap-on or bar-retained options available.",
    seoCopy:
      "Implant overdentures are removable dentures that snap onto 2–4 implants, giving dramatically better stability and chewing power than conventional dentures. Available in snap-on, bar-retained, and magnetic attachment styles.",
    benefits: [
      "Far more stable than conventional dentures",
      "Snap or bar-retained for security",
      "Prevents bone loss under the denture",
      "Removable for easy cleaning",
      "Transforms quality of life",
    ],
    regularPrice: "₹60,000 – ₹95,000",
    memberPrice: "₹54,999 – ₹80,000",
    heroImage:
      "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How many implants are needed for an overdenture?",
        a: "A minimum of 2 implants for the lower jaw; 4 are recommended for the upper jaw.",
      },
    ],
  },
  {
    title: "Bone Graft (Commercial) – Implant",
    slug: "bone-graft-commercial",
    category: "Implants",
    metaTitle: "Bone Graft for Implants | Crown Dental Prayagraj",
    metaDescription:
      "Commercial bone grafting to create sufficient bone for dental implants at Crown Dental, Prayagraj.",
    seoCopy:
      "When insufficient bone volume exists for implant placement, commercial bone grafts rebuild the deficient area. Bone substitute material stimulates the patient's own bone growth, creating a strong foundation for implants.",
    benefits: [
      "Enables implants where bone is insufficient",
      "Stimulates natural bone regeneration",
      "Proven commercial graft material",
      "Makes previously unsuitable sites implantable",
      "Can be combined with extraction",
    ],
    regularPrice: "₹6,000",
    memberPrice: "₹5,000",
    heroImage:
      "https://images.unsplash.com/photo-1598256989014-f2c11f044aac?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How long do I wait after bone grafting before implant placement?",
        a: "Typically 4–6 months for sufficient bone maturation.",
      },
    ],
  },
  {
    title: "Sinus Lift (Indirect)",
    slug: "sinus-lift-indirect",
    category: "Implants",
    metaTitle: "Indirect Sinus Lift for Implants | Crown Dental Prayagraj",
    metaDescription:
      "Indirect sinus lift at Crown Dental, Prayagraj. Adds bone height for upper jaw implants with minimal elevation needed.",
    seoCopy:
      "An indirect (crestal approach) sinus lift gently lifts the sinus membrane through the implant site itself for minimal sinus elevation requirements. It is less invasive than direct sinus lift with faster healing.",
    benefits: [
      "Less invasive than direct sinus lift",
      "Performed through implant site",
      "Faster healing and recovery",
      "Enables implants in the upper jaw",
      "Suitable for minor sinus elevation",
    ],
    regularPrice: "₹15,000",
    memberPrice: "₹12,000",
    heroImage:
      "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "How is indirect sinus lift different from direct?",
        a: "Indirect requires less sinus elevation and is done through the implant osteotomy; direct is a separate lateral window surgery.",
      },
    ],
  },
  {
    title: "Sinus Lift (Direct / Open)",
    slug: "sinus-lift-direct",
    category: "Implants",
    metaTitle: "Direct Sinus Lift Surgery | Crown Dental Prayagraj",
    metaDescription:
      "Direct open sinus lift for significant bone gain in the upper jaw at Crown Dental, Prayagraj.",
    seoCopy:
      "A direct (lateral window) sinus lift is performed when significant bone height is needed in the upper jaw. A window is created in the sinus wall, the membrane is elevated, and bone graft is placed to create sufficient volume for implants.",
    benefits: [
      "Significant bone gain in upper jaw",
      "Enables implants in atrophic upper ridges",
      "Predictable long-term results",
      "Performed by specialist oral surgeon",
      "Highly effective for severe bone loss",
    ],
    regularPrice: "₹25,000",
    memberPrice: "₹20,000",
    heroImage:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is a direct sinus lift a major surgery?",
        a: "It is a specialised outpatient procedure under local anaesthesia; not major surgery.",
      },
    ],
  },
  {
    title: "PRF / PRP Therapy",
    slug: "prf-prp-therapy",
    category: "Implants",
    metaTitle: "PRF / PRP for Faster Healing | Crown Dental Prayagraj",
    metaDescription:
      "PRF and PRP platelet therapy to accelerate healing after implants and surgery at Crown Dental, Prayagraj.",
    seoCopy:
      "Platelet Rich Fibrin (PRF) and Platelet Rich Plasma (PRP) are prepared from the patient's own blood and applied to surgical sites to accelerate healing, reduce post-operative pain, and enhance bone and tissue regeneration.",
    benefits: [
      "Speeds up healing after surgery",
      "Reduces post-op swelling and pain",
      "Enhances bone and tissue regeneration",
      "Made from patient's own blood — no allergy risk",
      "Recommended alongside implants and bone grafts",
    ],
    regularPrice: "₹5,000",
    memberPrice: "₹4,000",
    heroImage:
      "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=1200&q=80",
    gallery: [],
    faqs: [
      {
        q: "Is PRF/PRP safe?",
        a: "Yes. It is prepared from your own blood, so there is no risk of rejection or allergy.",
      },
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
  let skipped = 0;

  for (const t of TREATMENTS) {
    const exists = await Treatment.findOne({ slug: t.slug });
    if (!exists) {
      await Treatment.create(t);
      created++;
      console.log(`  ✔ Created: ${t.title}`);
    } else {
      skipped++;
      console.log(`  ℹ️  Skipped (already exists): ${t.title}`);
    }
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Created : ${created} treatments`);
  console.log(`   Skipped : ${skipped} treatments (already existed)`);
  console.log(`   Total in DB: ${created + skipped} / ${TREATMENTS.length}`);

  await mongoose.disconnect();
  console.log("✅ Done. Start the server with: npm run dev");
}

seed().catch((err) => {
  console.error("❌ Seed error:", err.message);
  process.exit(1);
});
