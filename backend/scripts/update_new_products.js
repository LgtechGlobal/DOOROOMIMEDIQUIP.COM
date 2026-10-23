import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI || 'mongodb+srv://gumansinghlgtechglobal_db_user:0bYvMxMPPaVvTm1l@dooroomimediquip.72damgv.mongodb.net/dooroomimediquip?retryWrites=true&w=majority';

export const NEW_PRODUCTS = [
  {
    "id": "p-bedro-smart-1",
    "slug": "bedro-smart-1-thermal-spine-traction",
    "name": "BEDRO Smart-1 Thermal Spine Traction Bed",
    "nameKo": "베드로 스마트-1 척추 온열 견인기",
    "cat": "flagship",
    "catLabel": "Flagship Medical Systems",
    "model": "BEDRO SMART-1 (DM-BST1)",
    "short": "Automated spinal thermal decompression bed with internal natural jade rollers (40°C–70°C), spinal lordosis traction & external 9-ball projector.",
    "desc": "The BEDRO Smart-1 is Dooroomi's flagship medical-grade spinal thermal traction and decompression therapy system. Engineered in South Korea under ISO 13485 and Korean CGMP standards, it features automated cervical, thoracic, and lumbar spinal traction. Motorized internal jade rollers deliver far-infrared moxibustion heat deep into paravertebral tissues, relieving disc herniation, sciatica, spondylosis, and postural nerve impingement. Equipped with an articulated digital control console and auxiliary 9-ball jade projector.",
    "volume": "Full-Body Medical Traction Bed",
    "texture": "Heavy-Duty Ergonomic Alloy Frame & Medical Antibacterial Upholstery",
    "badge": "Flagship Medical",
    "imgUrl": "/assets/products/bedro-smart-1-traction-bed.png",
    "keyActives": [
      "Internal Natural Jade Heated Rollers (40°C–70°C)",
      "Motorized Cervical & Lumbar Spinal Traction Guidance",
      "Deep Far-Infrared Resonance Heat (9–10 µm wavelength)",
      "External Multi-Ball Heated Jade Projector Included",
      "Articulated Digital Control Console Arm",
      "Moxibustion & Acupressure Reflex Point Stimulation"
    ],
    "specs": [
      [
        "Authorized Price (INR)",
        "₹2,60,000"
      ],
      [
        "Model Identifier",
        "BEDRO SMART-1 (DM-BST1)"
      ],
      [
        "Medical Device Classification",
        "Class II Medical Device (Korea MFDS / CE / ISO 13485)"
      ],
      [
        "Internal Thermal Core",
        "Natural Jade Rollers with Moxibustion Core"
      ],
      [
        "Operating Temperature",
        "40°C – 70°C Micro-Adjustable"
      ],
      [
        "Traction Mechanisms",
        "Automated Cervical, Thoracic & Lumbar Lordosis Decompression"
      ],
      [
        "Auxiliary Projector",
        "9-Ball Jade Folding Heating Applicator"
      ],
      [
        "Display Console",
        "Articulating Digital Controller Arm"
      ],
      [
        "Power Specification",
        "220V AC / 50-60Hz (250W Max)"
      ],
      [
        "Target Indications",
        "Herniated Disc, Sciatica, Spondylosis, Scoliosis, Chronic Back Pain"
      ]
    ],
    "price": "₹2,60,000",
    "priceNumber": 260000
  },
  {
    "id": "p-taeyangsuk-plus",
    "slug": "taeyangsuk-plus-far-infrared-bio-mat",
    "name": "TAEYANGSUK PLUS Far-Infrared Bio-Mat",
    "nameKo": "태양석 플러스 원적외선 온열 매트",
    "cat": "biominerals",
    "catLabel": "Bio-Mineral Mats",
    "model": "TAEYANGSUK PLUS (DM-TSKP)",
    "short": "Full-length Korean thermal medical mat with thousands of hexagonal tourmaline & jade discs, negative ions & deep far-infrared heat.",
    "desc": "The TAEYANGSUK PLUS Bio-Mat is hand-crafted with precision-sintered hexagonal ceramic discs composed of 7 Korean rare-earth minerals including tourmaline, germanium, elvan, and nephrite jade. Certified by Korea MFDS, it emits deep-penetrating far-infrared heat and over 1,200 ions/cc of negative ions to stimulate blood microcirculation, clear vascular blockages, and promote cellular vitality.",
    "volume": "Full-Length Medical Bio-Mat",
    "texture": "Hexagonal Sintered Mineral Discs, Bio-Ceramic Core & Vegan Leather Trim",
    "badge": "Bio-Mineral Therapy",
    "imgUrl": "/assets/products/taeyangsuk-plus-mat.png",
    "keyActives": [
      "Hexagonal Jade & Tourmaline Sintered Ceramic Tiles",
      "Negative Ion Emission (>1,200 ions/cm³)",
      "Deep Far-Infrared Moxibustion (30°C–70°C)",
      "Bone Marrow Activation & Blood Microcirculation",
      "EMF Shielding Multi-Layer Protection Matrix"
    ],
    "specs": [
      [
        "Authorized Price (INR)",
        "₹1,50,000"
      ],
      [
        "Model Identifier",
        "TAEYANGSUK PLUS (DM-TSKP)"
      ],
      [
        "Surface Layer",
        "Nephrite Jade & Tourmaline Hexagonal Discs"
      ],
      [
        "Negative Ions",
        ">1,200 ions/cm³"
      ],
      [
        "Temperature Range",
        "30°C – 70°C Micro-Adjustable"
      ],
      [
        "EMF Safety",
        "99.9% Electromagnetic Field Attenuation"
      ]
    ],
    "price": "₹1,50,000",
    "priceNumber": 150000
  },
  {
    "id": "p-taeyangsuk-mini",
    "slug": "dooroomi-taeyangsuk-mini-bio-mat",
    "name": "DOOROOMI Taeyangsuk Mini Bio-Mat",
    "nameKo": "두루미 태양석 미니 온열 매트",
    "cat": "biominerals",
    "catLabel": "Bio-Mineral Mats",
    "model": "TAEYANGSUK MINI (DM-TSKM)",
    "short": "Authentic Made in Korea compact Taeyangsuk thermal mat with hexagonal ceramic mineral discs, ideal for chairs, sofas, and localized therapy.",
    "desc": "The DOOROOMI Taeyangsuk Mini Bio-Mat brings the therapeutic power of Korean bio-mineral thermal therapy into a portable, versatile design. Featuring genuine sintered jade and tourmaline hexagonal discs with an authentic embossed leather badge ('DOOROOMI Taeyangsuk Mini - Made in Korea'), it delivers targeted far-infrared thermotherapy for the lumbar region, abdomen, thighs, and knees.",
    "volume": "Portable Multi-Purpose Mini Bio-Mat",
    "texture": "High-Density Hexagonal Mineral Discs & Premium Edge-Bound Leather",
    "badge": "Portable Bio-Mat",
    "imgUrl": "/assets/products/taeyangsuk-mini-mat.png",
    "keyActives": [
      "Authentic Made-in-Korea Korean Bio-Ceramic Minerals",
      "Dense Hexagonal Nephrite Jade & Tourmaline Array",
      "Targeted Far-Infrared Heat & Acupoint Moxibustion",
      "Negative Ion Emission & EMF Multi-Shielding",
      "Compact Ergonomic Size for Chairs, Beds & Sofas"
    ],
    "specs": [
      [
        "Authorized Price (INR)",
        "₹50,000"
      ],
      [
        "Model Identifier",
        "TAEYANGSUK MINI (DM-TSKM)"
      ],
      [
        "Origin",
        "Made in Korea (두루미 정품)"
      ],
      [
        "Ceramic Discs",
        "Hexagonal Sintered Jade & Tourmaline"
      ],
      [
        "Operating Temperature",
        "30°C – 70°C Adjustable"
      ],
      [
        "Application",
        "Lumbar, Abdomen, Knees, Office & Home Seating"
      ]
    ],
    "price": "₹50,000",
    "priceNumber": 50000
  },
  {
    "id": "p-bedro-controller",
    "slug": "bedro-smart-digital-controller",
    "name": "BEDRO Smart Digital Laser & Frequency Controller",
    "nameKo": "스마트 디지털 주파수 치료 리모컨",
    "cat": "accessories",
    "catLabel": "Controllers & Belts",
    "model": "BEDRO SMART-RC (DM-SRC500)",
    "short": "Intelligent medical frequency controller featuring 500Hz therapeutic stimulation, backlit digital display, countdown timer & safety cutoffs.",
    "desc": "The BEDRO Smart Digital Therapeutic Controller delivers customized electro-stimulation and thermal management for Dooroomi medical treatment systems. Featuring a high-contrast backlit LED interface, it displays output frequency (up to 500 Hz), cycle progress, and high-precision therapy countdown timers. Ergonomically shaped with one-touch power, intensity adjustment (+/-), and cycling mode switches, it allows patients and therapists to fine-tune spinal decompression protocols safely and effortlessly.",
    "volume": "Handheld Frequency & Thermal Controller",
    "texture": "Medical Grade Antibacterial ABS & Backlit High-Contrast LED",
    "badge": "Smart Laser & Controller",
    "imgUrl": "/assets/products/bedro-digital-controller.png",
    "keyActives": [
      "Up to 500 Hz Bio-Frequency Pulse Wave Generation",
      "High-Contrast Digital LED Diagnostic Display",
      "30:00 Precise Countdown Timer & Auto Shutoff",
      "One-Touch Mode Cycling & Frequency Modulation",
      "Ergonomic Silicone Tactile Sealed Buttons",
      "Integrated Safety Overload & Thermal Cutoff Protection"
    ],
    "specs": [
      [
        "Authorized Price (INR)",
        "₹42,500"
      ],
      [
        "Model Identifier",
        "BEDRO SMART-RC (DM-SRC500)"
      ],
      [
        "Frequency Output",
        "Up to 500 Hz Micro-Pulse Modulation"
      ],
      [
        "Timer Range",
        "0 – 60 Minutes (Default 30:00 Session)"
      ],
      [
        "Display Interface",
        "Digital Monochrome High-Contrast LED Screen"
      ],
      [
        "Controls",
        "Power, Cycle Mode, Frequency (+/-), Timer"
      ],
      [
        "Compatibility",
        "BEDRO Smart-1, Bio-Thermal Arrays, Champion Series"
      ]
    ],
    "price": "₹42,500",
    "priceNumber": 42500
  },
  {
    "id": "p-champion-belt",
    "slug": "dooroomi-champion-lumbar-support-belt",
    "name": "DOOROOMI Champion Lumbar Support Belt",
    "nameKo": "두루미 챔피언 요추 벨트",
    "cat": "accessories",
    "catLabel": "Controllers & Belts",
    "model": "CHAMPION-L1 (DM-CH1)",
    "short": "Ergonomic lumbar & sacroiliac stabilization belt with embedded tourmaline and far-infrared ceramic discs for disc relief.",
    "desc": "The DOOROOMI Champion Belt delivers orthopedic lumbar support and natural tourmaline thermal emission. Engineered to decompress L4-L5-S1 lumbar discs and correct pelvic tilt while walking, sitting, or working. Embedded with hexagonal Korean bio-mineral discs that warm upon body contact, stimulating lumbar microcirculation and calming nerve pressure.",
    "volume": "Ergonomic Orthopedic Support Belt",
    "texture": "Reinforced Breathable Neoprene & Ceramic Tourmaline Discs",
    "badge": "Targeted Lumbar",
    "imgUrl": "/assets/products/dooroomi-champion-lumbar-belt.png",
    "keyActives": [
      "Direct L4-L5-S1 Spinal Disc Decompression",
      "Embedded Tourmaline & Jade FIR Discs",
      "Dual Tension High-Elastic Fastening System",
      "Pelvic Tilt & Postural Stabilization",
      "Comfortable for All-Day Wear & Mobility"
    ],
    "specs": [
      [
        "Authorized Price (INR)",
        "₹37,500"
      ],
      [
        "Model Identifier",
        "CHAMPION-L1 (DM-CH1)"
      ],
      [
        "Target Area",
        "Lumbar Spine (L1-S1) & Sacroiliac Joint"
      ],
      [
        "Active Material",
        "Tourmaline & Bio-Ceramic Inserts"
      ],
      [
        "Closure",
        "Dual High-Grade Velcro Tension Bands"
      ]
    ],
    "price": "₹37,500",
    "priceNumber": 37500
  },
  {
    "id": "p-knee-joint-wrap",
    "slug": "dooroomi-thermal-knee-joint-therapy-wrap",
    "name": "DOOROOMI Joint King Knee & Joint Therapy Wrap",
    "nameKo": "두루미 관절 및 무릎 온열 치료 랩",
    "cat": "accessories",
    "catLabel": "Controllers & Belts",
    "model": "KNEE-THERAPY-K1 (DM-KW1)",
    "short": "Targeted thermal joint applicator with ergonomic anatomical contouring, tourmaline ceramic matrix, and dedicated thermostat controller.",
    "desc": "Designed specifically for knee osteoarthritis, meniscus recovery, patellar stiffness, and ligament rehabilitation. The DOOROOMI Thermal Knee Wrap combines a dense embedded matrix of far-infrared ceramic stones with an ergonomic multi-strap wrap that contours closely to the knee, elbow, or shoulder. Includes a dedicated electronic thermostat controller to adjust deep therapeutic warmth.",
    "volume": "Targeted Joint Therapy Wrap System",
    "texture": "Anatomical Neoprene Harness, Ceramic Mineral Matrix & Digital Thermostat",
    "badge": "Joint King Therapy",
    "imgUrl": "/assets/products/dooroomi-knee-joint-therapy-wrap.png",
    "keyActives": [
      "Targeted 360° Joint & Patella Thermal Decompression",
      "Embedded Bio-Ceramic Hexagonal Array",
      "Dedicated Electronic Temperature Controller",
      "Multi-Wing Flexible Contoured Fastening",
      "Accelerates Synovial Fluid Circulation & Cartilage Ease"
    ],
    "specs": [
      [
        "Authorized Price (INR)",
        "₹26,500"
      ],
      [
        "Model Identifier",
        "KNEE-THERAPY-K1 (DM-KW1)"
      ],
      [
        "Target Joints",
        "Knees, Elbows, Shoulders"
      ],
      [
        "Temperature Control",
        "Digital Precision Thermostat"
      ],
      [
        "Active Elements",
        "Bio-Mineral Far-Infrared Ceramics"
      ],
      [
        "Indications",
        "Osteoarthritis, Knee Stiffness, Ligament Strain, Joint Pain"
      ]
    ],
    "price": "₹26,500",
    "priceNumber": 26500
  },
  {
    "id": "p-jade-bracelet",
    "slug": "dooroomi-bio-ceramic-tourmaline-jade-bracelet",
    "name": "DOOROOMI Bio-Ceramic Tourmaline Jade Therapy Bracelet",
    "nameKo": "두루미 천연옥 토르말린 건강 팔찌",
    "cat": "accessories",
    "catLabel": "Controllers & Belts",
    "model": "JADE-BRACELET-B1 (DM-JB1)",
    "short": "Polished Korean natural jade & tourmaline bio-mineral health bracelet emitting continuous far-infrared rays and negative ions.",
    "desc": "Handcrafted with polished curved rectangular links of natural Korean jade and tourmaline bio-ceramic stones. Designed to be worn on the wrist over the radial and ulnar arteries, it continuously delivers micro-circulation stimulation, bio-magnetic balance, and negative ions throughout the day, easing wrist fatigue, carpal strain, and overall tension.",
    "volume": "Wearable Bio-Mineral Therapy Bracelet",
    "texture": "Polished Natural Jade Links & High-Tensile Elastic Core",
    "badge": "Everyday Wellness",
    "imgUrl": "/assets/products/dooroomi-jade-bracelet.png",
    "keyActives": [
      "Natural Korean Nephrite Jade & Bio-Ceramics",
      "Continuous Negative Ion & Far-Infrared Emission",
      "Radial & Ulnar Acupoint Meridian Stimulation",
      "Water-Resistant, Hypoallergenic & Skin-Friendly",
      "Comfortable Elastic Expansion Fit for All Wrist Sizes"
    ],
    "specs": [
      [
        "Authorized Price (INR)",
        "₹6,000"
      ],
      [
        "Model Identifier",
        "JADE-BRACELET-B1 (DM-JB1)"
      ],
      [
        "Material",
        "100% Genuine Korean Jade & Bio-Ceramics"
      ],
      [
        "Energy Output",
        "Far-Infrared Resonance (8–14 µm)"
      ],
      [
        "Fit",
        "Stretch-Expandable Ergonomic Wrist Band"
      ]
    ],
    "price": "₹6,000",
    "priceNumber": 6000
  },
  {
    "id": "p-jade-necklace",
    "slug": "dooroomi-natural-jade-tourmaline-necklace",
    "name": "DOOROOMI Natural Jade & Tourmaline Health Therapy Necklace",
    "nameKo": "두루미 천연옥 원적외선 건강 목걸이",
    "cat": "accessories",
    "catLabel": "Controllers & Belts",
    "model": "JADE-NECKLACE-N1 (DM-JN1)",
    "short": "Circlet of polished natural Korean jade spheres designed for cervical spine relaxation, shoulder tension relief, and systemic bio-resonance.",
    "desc": "Strung with dozens of calibrated spherical beads of natural Korean jade and tourmaline bio-minerals. Rests comfortably around the neck over the cervical vertebrae (C1–C7) and trapezius acupoints. Natural body warmth activates the jade's thermal resonance, easing stiff neck muscles, tension headaches, and shoulder fatigue caused by modern desk work and stress.",
    "volume": "Wearable Cervical Bio-Mineral Necklace",
    "texture": "Polished Spherical Jade & Tourmaline Beads",
    "badge": "Cervical Wellness",
    "imgUrl": "/assets/products/dooroomi-jade-necklace.png",
    "keyActives": [
      "Calibrated Natural Jade & Tourmaline Spheres",
      "Continuous Cervical Acupressure & Microcirculation",
      "Alleviates Neck Stiffness & Trapezius Fatigue",
      "Negative Ion Induction & Electromagnetic Shielding",
      "Durable Safety Clasp & Ergonomic Length"
    ],
    "specs": [
      [
        "Authorized Price (INR)",
        "₹8,000"
      ],
      [
        "Model Identifier",
        "JADE-NECKLACE-N1 (DM-JN1)"
      ],
      [
        "Bead Composition",
        "Natural Korean Jade & Tourmaline Bio-Minerals"
      ],
      [
        "Target Area",
        "Cervical Spine (C1-C7), Trapezius, Shoulders"
      ],
      [
        "Safety",
        "Hypoallergenic & Lead-Free Certified"
      ]
    ],
    "price": "₹8,000",
    "priceNumber": 8000
  }
];

async function updateProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected.');

    // 1. Remove all old products from database
    console.log('Removing old products from database...');
    const delResult = await Product.deleteMany({});
    console.log(`Deleted ${delResult.deletedCount} old products.`);

    // 2. Insert new products
    console.log('Inserting 8 new products into database...');
    for (const item of NEW_PRODUCTS) {
      const saved = await Product.create(item);
      console.log(`+ Added: ${saved.id} - ${saved.name}`);
    }

    const count = await Product.countDocuments();
    console.log(`Total products now in database: ${count}`);

    await mongoose.disconnect();
    console.log('Database product update complete!');
  } catch (err) {
    console.error('Update error:', err);
    process.exit(1);
  }
}

updateProducts();
