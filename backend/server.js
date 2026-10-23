import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRouter } from './routes/auth.js';
import { inquiriesRouter } from './routes/inquiries.js';
import { productsRouter } from './routes/products.js';
import { centersRouter } from './routes/centers.js';
import { testimonialsRouter } from './routes/testimonials.js';
import { adsRouter } from './routes/ads.js';
import { galleryRouter } from './routes/gallery.js';
import { uploadRouter } from './routes/upload.js';
import { Inquiry } from './models/Inquiry.js';
import { Product } from './models/Product.js';
import { Center } from './models/Center.js';
import { Testimonial } from './models/Testimonial.js';
import { Ad } from './models/Ad.js';
import { GalleryItem } from './models/GalleryItem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is always loaded regardless of working directory
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config(); // fallback

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// CORS Configuration - Fully supports production https://www.dooroomimediquip.com and local development
const rawAllowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []),
  'https://www.dooroomimediquip.com',
  'https://dooroomimediquip.com',
  'https://dooroomimediquip-com.onrender.com',
  'http://www.dooroomimediquip.com',
  'http://dooroomimediquip.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
].filter(Boolean).map(url => url.trim().replace(/\/$/, ''));

const allowedOriginsSet = new Set(rawAllowedOrigins);

const corsOptions = {
  origin: true, // Universal origin reflection for dooroomimediquip.com, onrender.com, and local development
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'x-admin-key',
    'x-admin-session',
    'x-requested-with',
    'Accept',
    'Origin',
    '*'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/centers', centersRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/ads', adsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/upload', uploadRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  res.json({
    status: 'online',
    server: 'Dooroomi Mediquip Backend API',
    database: states[dbState] || 'Unknown',
    timestamp: new Date().toISOString()
  });
});

// Admin Stats Endpoint
app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalInquiries = await Inquiry.countDocuments().catch(() => 0);
    const pendingInquiries = await Inquiry.countDocuments({ status: 'Pending' }).catch(() => 0);
    const completedInquiries = await Inquiry.countDocuments({ status: 'Completed' }).catch(() => 0);
    const totalProducts = await Product.countDocuments().catch(() => 0);
    const totalCenters = await Center.countDocuments().catch(() => 0);
    const totalTestimonials = await Testimonial.countDocuments().catch(() => 0);
    const totalGalleryItems = await GalleryItem.countDocuments().catch(() => 0);
    const totalGalleryImages = await GalleryItem.countDocuments({ type: 'image' }).catch(() => 0);
    const totalGalleryVideos = await GalleryItem.countDocuments({ type: 'video' }).catch(() => 0);
    
    res.json({
      success: true,
      stats: {
        totalCenters,
        totalInquiries,
        pendingInquiries,
        completedInquiries,
        totalProducts,
        totalTestimonials,
        totalGalleryItems,
        totalGalleryImages,
        totalGalleryVideos,
        activeDevices: ['BEDRO Smart-1', 'Super TAEYANGSUK Mat', 'Dooroomi Champion Belt', '9-Sphere Projector'],
        globalCountries: 51,
        satisfactionRate: '98.6%',
        dbConnected: mongoose.connection.readyState === 1
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Seed Initial Data into MongoDB Atlas
const seedInitialData = async () => {
  try {
    // 1. Seed Inquiries
    const inqCount = await Inquiry.countDocuments();
    if (inqCount === 0) {
      console.log('Seeding initial authentic inquiry records into MongoDB...');
      await Inquiry.insertMany([
        {
          name: 'Dr. Debasis Pattnaik',
          email: 'dr.pattnaik.spine@gmail.com',
          phone: '+91 94371 88201',
          company: 'Bhubaneswar Ortho Rehabilitation Clinic',
          type: 'quote',
          productInterest: 'BEDRO Smart-1 Automatic Thermal Massager',
          message: 'Interested in procuring 2 units of BEDRO Smart-1 for our spine physiotherapy wing. Please send commercial quotes and clinical certifications.',
          status: 'In Progress',
          notes: 'Spoke on phone, clinic demo requested for next Monday.'
        },
        {
          name: 'Sunita Dash',
          email: 'sunita.dash84@yahoo.com',
          phone: '+91 98610 44320',
          company: 'Private Citizen',
          type: 'therapy_center_visit',
          productInterest: 'TAEYANGSUK PLUS Far-Infrared Mat',
          message: 'My mother is 68 suffering from severe knee osteoarthritis and sciatica. Would like to book a free daily morning trial at Khandagiri Center.',
          status: 'Pending',
          notes: 'New attendee inquiry from website.'
        },
        {
          name: 'Vikramaditya Rao',
          email: 'vikram.rao@meditech-distributors.in',
          phone: '+91 98102 77411',
          company: 'Meditech Healthcare Distributors',
          type: 'b2b_distributor',
          productInterest: 'Dooroomi Champion Belt & Taeyangsuk Ceramics',
          message: 'We distribute medical orthopedic supports across Delhi NCR. Requesting wholesale distributor catalog and volume pricing.',
          status: 'Pending',
          notes: 'Priority B2B distributor inquiry.'
        }
      ]);
      console.log('Initial inquiry records seeded successfully.');
    }

    // 2. Seed Products
    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      console.log('Seeding initial products into MongoDB Atlas...');
      await Product.insertMany([
        {
          id: "p01",
          slug: "product-01",
          name: "Imperial Royal Ginseng Essence",
          nameKo: "황실 홍삼 발효 진액",
          cat: "series-a",
          catLabel: "Series A · Botanicals",
          model: "DM-A101",
          short: "Micro-fermented Panax Red Ginseng extract with 5-layer Ceramide moisture barrier matrix.",
          desc: "Clinically formulated using cold ultrasonic extraction to preserve ginsenoside bioactivity. Enhances skin barrier resiliency, stimulates collagen synthesis, and provides 72-hour moisture retention with zero greasiness.",
          volume: "50 ml / 1.69 fl. oz.",
          texture: "Silky Golden Fluid (Fast Absorbing)",
          badge: "Flagship",
          imgUrl: "./assets/products/product-real-01.jpeg",
          keyActives: ["Panax Ginseng Root Extract 68%", "Ceramide NP/AP/EOP", "Fermented Centella Asiatica"],
          specs: [["Model Identifier", "DM-A101"], ["Standard Compliance", "ISO 22716 / Korea CGMP / EVE Vegan"]]
        },
        {
          id: "p02",
          slug: "product-02",
          name: "Centella Barrier Calming Ampoule",
          nameKo: "시카 베리어 카밍 앰플",
          cat: "series-a",
          catLabel: "Series A · Botanicals",
          model: "DM-A102",
          short: "High-concentration Madecassoside and fermented Green Tea polyphenols for hypersensitive skin.",
          desc: "A rapid-action relief ampoule developed for compromised skin post-laser and dermatological procedures.",
          volume: "30 ml / 1.01 fl. oz.",
          texture: "Weightless Hydrating Elixir",
          badge: "Best Seller",
          imgUrl: "./assets/products/product-real-02.jpeg",
          keyActives: ["Madecassoside 20,000 ppm", "Asiatic Acid", "Panthenol (Pro-Vitamin B5) 5%"],
          specs: [["Model Identifier", "DM-A102"], ["Standard Compliance", "US FDA OTC Registered / CGMP"]]
        },
        {
          id: "p03",
          slug: "product-03",
          name: "Micro-Peptide Hydra Essence",
          nameKo: "마이크로 펩타이드 하이드라 에센스",
          cat: "series-a",
          catLabel: "Series A · Botanicals",
          model: "DM-A103",
          short: "Quadruple oligopeptide matrix infused with low-molecular fermented Birch Sap water.",
          desc: "Replaces traditional purified water with 78% Betula Platyphylla Birch Sap to optimize trans-epidermal nutrient delivery.",
          volume: "120 ml / 4.05 fl. oz.",
          texture: "Dewy Micro-Essence",
          badge: "Hydra Shield",
          imgUrl: "./assets/products/product-real-03.jpeg",
          keyActives: ["Birch Sap 78%", "Copper Tripeptide-1", "Oligopeptide-29"],
          specs: [["Model Identifier", "DM-A103"], ["Standard Compliance", "ISO 22716 / EWG Green Grade 100%"]]
        },
        {
          id: "p04",
          slug: "product-04",
          name: "Fermented Galactomyces Balancing Toner",
          nameKo: "갈락토미세스 밸런싱 토너",
          cat: "series-a",
          catLabel: "Series A · Botanicals",
          model: "DM-A104",
          short: "93% pure Galactomyces ferment filtrate combined with Niacinamide 4% for luminous clarity.",
          desc: "Engineered via traditional Korean ceramic dual-fermentation. Refines pore texture and restores natural equilibrium.",
          volume: "180 ml / 6.08 fl. oz.",
          texture: "Crystal Clear Hydrating Water",
          badge: "Clarifying",
          imgUrl: "./assets/products/product-real-04.jpeg",
          keyActives: ["Galactomyces Ferment Filtrate 93.5%", "Niacinamide 4%", "Polyglutamic Acid"],
          specs: [["Model Identifier", "DM-A104"], ["Standard Compliance", "ISO 22716 / CGMP Certified"]]
        },
        {
          id: "p05",
          slug: "product-05",
          name: "Triple Retinol Precision Night Cream",
          nameKo: "트리플 레티놀 프리시전 나이트 크림",
          cat: "series-b",
          catLabel: "Series B · Cellular Longevity",
          model: "DM-B105",
          short: "Micro-encapsulated Retinol (0.5%), Retinyl Palmitate, and Bakuchiol in an airtight nitrogen jar.",
          desc: "A medical-grade anti-aging matrix stabilized with lipid nanotechnology.",
          volume: "50 ml / 1.69 fl. oz.",
          texture: "Velvety Cushion Cream",
          badge: "Clinical Grade",
          imgUrl: "./assets/products/product-real-05.jpeg",
          keyActives: ["Encapsulated Pure Retinol 0.5%", "Bakuchiol 2.0%", "Adenosine 0.04%"],
          specs: [["Model Identifier", "DM-B105"], ["Standard Compliance", "Korea MFDS Functional Certified"]]
        },
        {
          id: "p06",
          slug: "product-06",
          name: "NAD+ Cellular Repair Elixir",
          nameKo: "NAD+ 셀룰러 리페어 엘릭서",
          cat: "series-b",
          catLabel: "Series B · Cellular Longevity",
          model: "DM-B106",
          short: "Bio-synthesized Nicotinamide Adenine Dinucleotide with Marine Glycogen and Resveratrol.",
          desc: "Targeting mitochondrial vitality in cutaneous fibroblasts. Protects genomic DNA from UV and oxidative stress.",
          volume: "40 ml / 1.35 fl. oz.",
          texture: "Concentrated Bio-Gel Serum",
          badge: "Bio-Tech",
          imgUrl: "./assets/products/product-real-06.jpeg",
          keyActives: ["NAD+ Precursor Complex 5%", "Pure Resveratrol 1.5%", "Marine Glycogen"],
          specs: [["Model Identifier", "DM-B106"], ["Standard Compliance", "ISO 22716 / GMP Cleanroom Level 1000"]]
        },
        {
          id: "p07",
          slug: "product-07",
          name: "PDRN Biomimetic Lifting Concentrate",
          nameKo: "PDRN 바이오미메틱 리프팅 농축액",
          cat: "series-b",
          catLabel: "Series B · Cellular Longevity",
          model: "DM-B107",
          short: "Salmon DNA Polydeoxyribonucleotide (PDRN 30,000 ppm) with 8 Biomimetic Growth Factor Peptides.",
          desc: "Formulated using ultra-purified marine salmon DNA identical to human base sequences by 95%. Accompanied with Dooroomi 9-sphere ergonomic thermal projector.",
          volume: "35 ml / 1.18 fl. oz.",
          texture: "Rich Density Elixir",
          badge: "High Potency",
          imgUrl: "./assets/products/product-real-07.jpeg",
          keyActives: ["PDRN (Salmon DNA) 30,000 ppm", "EGF / FGF / IGF Complex", "Hydrolyzed Collagen"],
          specs: [["Model Identifier", "DM-B107"], ["Standard Compliance", "Korea MFDS Dual Functional Approval"]]
        },
        {
          id: "p08",
          slug: "product-08",
          name: "Multi-Molecular Hyaluronic Infusion",
          nameKo: "멀티 분자 히알루론산 인퓨전",
          cat: "series-b",
          catLabel: "Series B · Cellular Longevity",
          model: "DM-B108",
          short: "8 molecular weights of Sodium Hyaluronate spanning from 3,000 Da to 2,000,000 Da.",
          desc: "A multi-depth moisture reservoir. High-molecular polymers form a breathable shield on the surface.",
          volume: "60 ml / 2.02 fl. oz.",
          texture: "Plumping Moisture Gel",
          badge: "Deep Moisture",
          imgUrl: "./assets/products/product-real-08.jpeg",
          keyActives: ["8D Hyaluronic Acid Matrix 3.5%", "Polyglutamic Acid", "Beta-Glucan"],
          specs: [["Model Identifier", "DM-B108"], ["Standard Compliance", "ISO 22716 / Dermatest Excellent"]]
        },
        {
          id: "p09",
          slug: "product-09",
          name: "Airless Vacuum Precision Dispenser 50ml",
          nameKo: "에어리스 진공 프리시전 디스펜서 50ml",
          cat: "series-c",
          catLabel: "Series C · Packaging Systems",
          model: "DM-C109",
          short: "100% metal-free springless airless pump ensuring zero oxidation and 99.2% formula evacuation.",
          desc: "Engineered for active formulations prone to atmospheric oxidation. Patented internal silicone piston.",
          volume: "50 ml (Custom 15ml / 30ml / 50ml)",
          texture: "Engineered Recyclable PP/PETG",
          badge: "Eco-Tech",
          imgUrl: "./assets/products/product-real-09.jpeg",
          keyActives: ["Zero Metal Spring", "Oxygen Barrier < 0.05 cc/m²·day", "100% PCR Recycled Option"],
          specs: [["Model Identifier", "DM-C109"], ["Standard Compliance", "RoHS / REACH / FDA Food Contact Safe"]]
        },
        {
          id: "p10",
          slug: "product-10",
          name: "Dual-Chamber Bio-Preserve Flacon",
          nameKo: "듀얼 챔버 바이오 프리저브 플라콘",
          cat: "series-c",
          catLabel: "Series C · Packaging Systems",
          model: "DM-C110",
          short: "Separates oil and water phases or incompatible actives until the exact moment of dispensation.",
          desc: "Designed for premium dual-phase serums. Mixes at an exact 1:1 ratio at the pump nozzle upon finger depression.",
          volume: "2 x 20 ml (Total 40 ml)",
          texture: "Ultra-Clear Heavy Wall PMMA",
          badge: "Patented System",
          imgUrl: "./assets/products/product-real-10.jpeg",
          keyActives: ["Dual Chamber Chamber Isolation", "Micro-Synchronized Actuator", "UV 400 Inhibitor Coating"],
          specs: [["Model Identifier", "DM-C110"], ["Standard Compliance", "US FDA 21 CFR Compliant"]]
        },
        {
          id: "p11",
          slug: "product-11",
          name: "BEDRO Smart-1 Thermal Spinal Massager",
          nameKo: "베드로 스마트-1 척추 온열 마사지기",
          cat: "series-c",
          catLabel: "Flagship Medical Equipment",
          model: "DM-MED01",
          short: "Medical-grade automatic spinal thermal acupressure system with internal jade projectors and far-infrared moxibustion.",
          desc: "Dooroomi flagship medical device engineered in Seoul. Provides spinal alignment, cervical traction, and deep far-infrared warmth along 12 meridian points.",
          volume: "Full Length Medical Bed",
          texture: "Heavy Duty Medical Vinyl & Natural Taeyangsuk",
          badge: "Flagship Medical Device",
          imgUrl: "./assets/products/product-real-11.jpeg",
          keyActives: ["Natural Jade Projector 9-Sphere", "Far-Infrared Heating Matrix", "Spine Scanning Auto-Sensor"],
          specs: [["Model Identifier", "DM-MED01"], ["Standard Compliance", "CE Medical Class IIa / Korea CGMP / ISO 13485"]]
        },
        {
          id: "p12",
          slug: "product-12",
          name: "Super TAEYANGSUK Bio-Mineral Heating Mat",
          nameKo: "슈퍼 태양석 원적외선 온열 매트",
          cat: "series-c",
          catLabel: "Thermal Therapy Mats",
          model: "DM-MAT02",
          short: "Far-infrared therapeutic heating mattress infused with thousands of high-density hexagonal Taeyangsuk ceramic disks.",
          desc: "Emits continuous far-infrared rays (8-14 microns) and negative ions, promoting deep microcirculation, restorative sleep, and joint pain relief.",
          volume: "Queen Size / Single Size",
          texture: "Breathable Jacquard & Korean Ceramic Disks",
          badge: "Best Seller",
          imgUrl: "./assets/products/product-real-12.jpeg",
          keyActives: ["Taeyangsuk Natural Bio-Ceramics", "EMF Shielding Multi-Layer Carbon Wire", "Micro-Controller Digital Temp"],
          specs: [["Model Identifier", "DM-MAT02"], ["Standard Compliance", "EMF Safe / ISO 9001 / Korea Medical Certification"]]
        },
        {
          id: "p13",
          slug: "product-13",
          name: "Golden Crane Intensive Lifting Cream",
          nameKo: "황금 학 인텐시브 리프팅 크림",
          cat: "series-b",
          catLabel: "Series B · Cellular Longevity",
          model: "DM-B113",
          short: "Infused with 24K nano-gold flakes, royal jelly peptides, and adenosine for deep dermal density.",
          desc: "An opulent sculpting cream that firms the facial contour and visibly tightens relaxed dermal tissue. Harnesses bio-peptide complexes and pure Korean gold for an illuminated, porcelain glow.",
          volume: "50 ml / 1.69 fl. oz.",
          texture: "Luxurious Cashmere Balm",
          badge: "Royal Luxury",
          imgUrl: "./assets/products/product-real-13.jpeg",
          keyActives: ["24K Pure Gold Nano-Flakes", "Royal Jelly Peptide Complex", "Acetyl Hexapeptide-8"],
          specs: [["Model Identifier", "DM-B113"], ["Standard Compliance", "ISO 22716 / Korea CGMP"]]
        },
        {
          id: "p14",
          slug: "product-14",
          name: "Marine Collagen Firming Treatment",
          nameKo: "마린 콜라겐 퍼밍 트리트먼트",
          cat: "series-b",
          catLabel: "Series B · Cellular Longevity",
          model: "DM-B114",
          short: "Deep-sea low-dalton hydrolyzed collagen with spirulina extract for structural elasticity.",
          desc: "Delivers intensive elasticity restoration by replenishing the extracellular matrix. Features 500-Dalton marine collagen peptides that penetrate stratum corneum barriers seamlessly.",
          volume: "60 ml / 2.02 fl. oz.",
          texture: "Hydro-Rich Firming Jelly",
          badge: "Collagen Matrix",
          imgUrl: "./assets/products/product-real-14.jpeg",
          keyActives: ["500 Da Marine Collagen 65%", "Spirulina Maxima Extract", "Adenosine 0.05%"],
          specs: [["Model Identifier", "DM-B114"], ["Standard Compliance", "ISO 22716 / CGMP Certified"]]
        },
        {
          id: "p15",
          slug: "product-15",
          name: "Silk Ceramide Barrier Softener",
          nameKo: "실크 세라마이드 베리어 소프너",
          cat: "series-a",
          catLabel: "Series A · Botanicals",
          model: "DM-A115",
          short: "Natural silk amino acids blended with phytosphingosine to nourish and comfort lipid-depleted skin.",
          desc: "Acts as an ultra-nourishing preparatory step that restores skin's natural acidic protective mantle while quenching micro-cracks and rough dry patches instantly.",
          volume: "150 ml / 5.07 fl. oz.",
          texture: "Milky Conditioning Emulsion",
          badge: "Barrier Shield",
          imgUrl: "./assets/products/product-real-15.jpeg",
          keyActives: ["Silk Amino Acid Complex", "Phytosphingosine", "Ceramide Complex 5%"],
          specs: [["Model Identifier", "DM-A115"], ["Standard Compliance", "ISO 22716 / Dermatest Excellent"]]
        },
        {
          id: "p16",
          slug: "product-16",
          name: "Camellia Bio-Defense Radiance Oil",
          nameKo: "동백 바이오 디펜스 래디언스 오일",
          cat: "series-a",
          catLabel: "Series A · Botanicals",
          model: "DM-A116",
          short: "Cold-pressed Jeju Camellia Japonica seed oil enriched with astaxanthin antioxidant shield.",
          desc: "A velvety dry facial oil rich in oleic acid (Omega-9) and Polyphenols. Shields skin against urban oxidative stress and blue-light radiation while locking in luminous moisture.",
          volume: "30 ml / 1.01 fl. oz.",
          texture: "Featherlight Non-Greasy Dry Oil",
          badge: "Pure Radiance",
          imgUrl: "./assets/products/product-real-16.jpeg",
          keyActives: ["Jeju Camellia Seed Oil 85%", "Natural Astaxanthin", "Tocopherol (Vit E)"],
          specs: [["Model Identifier", "DM-A116"], ["Standard Compliance", "EVE Vegan Certified / ISO 22716"]]
        }
      ]);
      console.log('Initial products seeded into MongoDB Atlas successfully.');
    }

    // 3. Seed Therapy Centers
    const centerCount = await Center.countDocuments();
    if (centerCount === 0) {
      console.log('Seeding initial therapy centers into MongoDB Atlas...');
      await Center.insertMany([
        {
          id: "tc-1",
          city: "Bhubaneswar",
          area: "Palasuni Center (Corporate Office)",
          state: "Odisha",
          address: "Plot no 3557, 1st floor, palasuni square, bhubaneswar 751010",
          phone: "0674 291 6680",
          timing: "Mon–Sat: 8:00 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "180+ Patients/Day"
        },
        {
          id: "tc-2",
          city: "Bhubaneswar",
          area: "Patia Infocity Center",
          state: "Odisha",
          address: "HIG-45, Phase-2, Near Infocity Square, Patia, Bhubaneswar",
          phone: "+91 94371 88205",
          timing: "Mon–Sat: 8:00 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "160+ Patients/Day"
        },
        {
          id: "tc-3",
          city: "Cuttack",
          area: "Badambadi Center",
          state: "Odisha",
          address: "Link Road, Opp. Reliance Trends, Badambadi, Cuttack",
          phone: "+91 98610 33410",
          timing: "Mon–Sat: 8:30 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "150+ Patients/Day"
        },
        {
          id: "tc-4",
          city: "New Delhi",
          area: "Nawada Corporate Center & Factory",
          state: "Delhi NCR",
          address: "Metro Pillar 734, Main Najafgarh Road, Nawada, New Delhi - 110059",
          phone: "1800-419-5278",
          timing: "Mon–Sat: 9:00 AM – 6:00 PM",
          status: "Active · India HQ & Free Therapy",
          dailyCapacity: "220+ Patients/Day"
        },
        {
          id: "tc-5",
          city: "New Delhi",
          area: "Rohini Sector 7 Center",
          state: "Delhi NCR",
          address: "Ayodhya Chowk, Sector 7, Rohini, New Delhi",
          phone: "+91 98110 55432",
          timing: "Mon–Sat: 8:00 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "140+ Patients/Day"
        },
        {
          id: "tc-6",
          city: "Kolkata",
          area: "Salt Lake Sector 1 Center",
          state: "West Bengal",
          address: "Block BD, Sector 1, Salt Lake City, Kolkata",
          phone: "+91 98300 44120",
          timing: "Mon–Sat: 8:00 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "175+ Patients/Day"
        },
        {
          id: "tc-7",
          city: "Kolkata",
          area: "Howrah Center",
          state: "West Bengal",
          address: "Grand Trunk Road South, Shibpur, Howrah",
          phone: "+91 98310 99870",
          timing: "Mon–Sat: 8:30 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "130+ Patients/Day"
        },
        {
          id: "tc-8",
          city: "Rourkela",
          area: "Panposh Road Center",
          state: "Odisha",
          address: "Civil Township, Near Daily Market, Rourkela",
          phone: "+91 94370 66521",
          timing: "Mon–Sat: 8:00 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "120+ Patients/Day"
        },
        {
          id: "tc-9",
          city: "Ranchi",
          area: "Harmu Bypass Center",
          state: "Jharkhand",
          address: "Harmu Housing Colony, Near Patel Chowk, Ranchi",
          phone: "+91 94311 77650",
          timing: "Mon–Sat: 8:00 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "110+ Patients/Day"
        },
        {
          id: "tc-10",
          city: "Patna",
          area: "Kankarbagh Center",
          state: "Bihar",
          address: "Main Colony Road, Near Tiwary Bechar, Kankarbagh, Patna",
          phone: "+91 93341 22980",
          timing: "Mon–Sat: 8:30 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "140+ Patients/Day"
        },
        {
          id: "tc-11",
          city: "Lucknow",
          area: "Gomti Nagar Center",
          state: "Uttar Pradesh",
          address: "Vikas Khand, Gomti Nagar, Lucknow",
          phone: "+91 94150 99821",
          timing: "Mon–Sat: 9:00 AM – 5:30 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "150+ Patients/Day"
        },
        {
          id: "tc-12",
          city: "Jaipur",
          area: "Mansarovar Center",
          state: "Rajasthan",
          address: "Madhyam Marg, Sector 5, Mansarovar, Jaipur",
          phone: "+91 98290 66543",
          timing: "Mon–Sat: 8:30 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "120+ Patients/Day"
        },
        {
          id: "tc-13",
          city: "Ahmedabad",
          area: "Navrangpura Center",
          state: "Gujarat",
          address: "Near University Road, Navrangpura, Ahmedabad",
          phone: "+91 98250 11234",
          timing: "Mon–Sat: 9:00 AM – 5:30 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "130+ Patients/Day"
        },
        {
          id: "tc-14",
          city: "Bengaluru",
          area: "Jayanagar Center",
          state: "Karnataka",
          address: "4th Block, 11th Main Road, Jayanagar, Bengaluru",
          phone: "+91 98450 77890",
          timing: "Mon–Sat: 8:30 AM – 5:30 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "170+ Patients/Day"
        },
        {
          id: "tc-15",
          city: "Hyderabad",
          area: "Kukatpally Center",
          state: "Telangana",
          address: "KPHB Colony Phase 1, Road No. 1, Kukatpally, Hyderabad",
          phone: "+91 98490 33456",
          timing: "Mon–Sat: 8:30 AM – 5:00 PM",
          status: "Active · 100% Free Daily Therapy",
          dailyCapacity: "150+ Patients/Day"
        }
      ]);
      console.log('Initial therapy centers seeded into MongoDB Atlas successfully.');
    }

    // 4. Seed Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      console.log('Seeding initial testimonials into MongoDB Atlas...');
      await Testimonial.insertMany([
        {
          id: "p1",
          name: "Smt. Kmamari Sahoo",
          age: "55 Years",
          location: "Maa Mangala Sahi, Bhubaneswar, Odisha",
          disease: "Severe Back Pain & Blood Pressure",
          diseaseKo: "만성 요통 및 고혈압 완치",
          duration: "Suffering for 5 Years",
          treatment: "BEDRO Smart-1 & Thermal Acupressure",
          image: "/assets/testimonials/patient-kmamari-sahoo.jpg",
          rating: 5,
          docPage: 14,
          quote: "After suffering for 5 years with severe Back Pain and High BP, I spent huge amounts on hospital tests with zero relief. At Dooroomi, after 3 months of continuous free therapy, all my problems are cured and now I am living a healthy and happy life!",
          fullStory: "My name is Kmamari Sahoo and my age is 55yrs, I am a resident of Maa Mangala Sahi, Bhubaneswar. Since last 5 yrs, I was suffering from the problem of severe Back Pain & Blood Pressure. When I went to hospital for the check-up, doctor asked me to undergo several tests. As my financial condition is not very sound so I got worried about the expenses in the treatment. Despite this fact I went for the treatment but didn't get any relief & my condition started to deteriorate day by day.\n\nThen I heard about Dooroomi India from a known person & I went to and started taking the therapy. Initially by taking the therapy my pain increased, but I was told by the Dooroomi staff that it is a positive sign of healing. After taking the therapy for about 1 month I started feeling change in my body. After taking the continuous therapy for 3 months, all my problems are cured and now I am living a healthy & happy life. I am thankful to the Global CEO, CEO Mam and President of Dooroomi Medical for bringing such a miraculous machine to India."
        },
        {
          id: "p2",
          name: "Sri Ramesh Chandra Jena",
          age: "74 Years",
          location: "Jagamara, Bhubaneswar, Odisha",
          disease: "Asthma, Blood Pressure & Knee Pain",
          diseaseKo: "천식 · 혈압 및 무릎 관절염 완치",
          duration: "Suffering for 6 Years",
          treatment: "BEDRO Smart-1 (2 Months Therapy)",
          image: "/assets/testimonials/patient-ramesh-jena.jpg",
          rating: 5,
          docPage: 14,
          quote: "I spent 2-3 lakhs rupees across Allopathic, Homeopathy and Ayurveda with no positive results. At Dooroomi Khandagiri Center on BEDRO Smart-1, my pain got cured, my body regained vitality, and my memory power returned!",
          fullStory: "My name is Ramesh Chandra Jena and my age is 74 yrs, I am a resident of Jagamara, Bhubaneswar, Odisha. For the last 6 years I was suffering from the problem of Blood Pressure, Asthma & Knee Pain. Due to the problem in my body I tend to forget things and even my body wasn't working properly. For the treatment I went to many hospitals and underwent many treatments like Allopathic, Homeopathy and even did Ayurvedic treatment but I didn't get any relief. For its treatment I spent near about 2-3 lakhs rupees in various Health Centers but no positive result was seen.\n\nThen one of my relatives told me about Dooroomi India & took me to Khandagiri Center. I took the therapy on BEDRO Smart-1 for 2 months, initially I faced some problem due to healing action but then also I continued taking the therapy. After taking therapy, I felt relief & my problems got cured. Now I have regained my memory power and I can remember everything. Dooroomi India is very good and I am proud to be a Dooroomi India Family Member."
        },
        {
          id: "p3",
          name: "Sri Tapan Kumar Dhal",
          age: "48 Years",
          location: "Khandagiri Bari, Bhubaneswar, Odisha",
          disease: "Blood Pressure & Chronic Insomnia",
          diseaseKo: "고혈압 및 만성 불면증 극복",
          duration: "Suffering for 3 Years",
          treatment: "Taeyangsuk Bio-Mineral Mat",
          image: "/assets/testimonials/patient-tapan-dhal.jpg",
          rating: 5,
          docPage: 14,
          quote: "Insomnia for 1 year and high BP for 3 years left my whole family depressed. After coming to DOOROOMI centre and taking Taeyangsuk therapy, my sleeplessness vanished and my blood pressure normalized completely!",
          fullStory: "My name is Tapan Kumar Dhal, Age: 48, My Address: Khandagiri Bari, Bhubaneswar, Odisha. My problem was Blood Pressure suffering for past 3 years & Insomnia suffering from past 1 year. First I thought it might be because of weakness. After tests were cleared then my whole family was so depressed. Before coming to DOOROOMI centre I used only medicines.\n\nI saw the demo Design Board on roadside and then came to DOOROOMI centre. After that I realized that my condition was improving rapidly, my insomnia diseases fell and declined. I felt convinced about DOOROOMI and Taeyangsuk. I already told about DOOROOMI to my neighbors, friends & senior citizens and they also joined DOOROOMI. I would heartily like to thanks Dooroomi India and would pray that Dooroomi India gets success in their work and keeps helping people like me."
        },
        {
          id: "p4",
          name: "Smt. Snehalata Sahu",
          age: "54 Years",
          location: "K4/ LIG-622, Kalinga Vihar, Bhubaneswar",
          disease: "Thyroid, Joint Pain, Overweight & Asthma",
          diseaseKo: "갑상선 · 관절통 · 과체중 · 천식 완치",
          duration: "Suffering for 12 Years",
          treatment: "BEDRO Smart-1 & Taeyangsuk Mat",
          image: "/assets/testimonials/patient-snehalata-sahu.jpg",
          rating: 5,
          docPage: 14,
          quote: "Suffering for 12 years with joint pain, thyroid and shortness of breath, I was helpless. 3 months at Dooroomi center gave me a new life, reduced my weight, and healed my breathing!",
          fullStory: "My name is Snehalata Sahu, 54 yrs, Kalinga Vihar. Suffering for 12 years with joint pain, thyroid and asthma. At Dooroomi, using BEDRO Smart-1 and Taeyangsuk Mat cured my joint pains and restored my normal breathing without inhalers."
        },
        {
          id: "p5",
          name: "Sri Ullash Chandra Mohapatra",
          age: "72 Years",
          location: "Pokhariput (Near D.A.V. School), Bhubaneswar",
          disease: "Knee Osteoarthritis, High BP & Constipation",
          diseaseKo: "무릎 관절염 · 고혈압 · 소화기 개선",
          duration: "Suffering for 1+ Years",
          treatment: "Natural Taeyangsuk Sintered Therapy",
          image: "/assets/testimonials/patient-ullash-mohapatra.jpg",
          rating: 5,
          docPage: 15,
          quote: "Suffering from severe knee pain for over a year, I couldn't walk peacefully. At the Pokhariput Dooroomi center, I became 100% free from knee pain! Taeyangsuk natural therapy replaced my anxiety with immense happiness.",
          fullStory: "My name is Ullash Chandra Mohapatra, Age 72 years, At-Pokhariput, Near D.A.V. Public School, P.O- Pokhariput, Bhubaneswar. I was suffering from knee pain for about one year. Now I am 100% free from knee pain! I have not taken any other treatment before coming to DOOROOMI centre for knee pain. I got information through Ramesh Chandra Panda who was taking treatment from DOOROOMI centre.\n\nI felt happiness emerge from anxiety. All the people of DOOROOMI centre are gentle, excellent and helpful. DOOROOMI is an auspicious organization. It gives treatment through TAEYANGSUK. TAEYANGSUK is a natural substance prepared from several sacred natural minerals. I will go door to door and tell everyone about DOOROOMI."
        },
        {
          id: "p6",
          name: "Sri Ramesh Chandra Sahu",
          age: "58 Years",
          location: "Chandapur, Dist- Nayagarh, Odisha",
          disease: "Chronic Slipped Disc, Back Pain & High BP",
          diseaseKo: "만성 허리 디스크 및 고혈압 완치",
          duration: "Suffering for 5 Years",
          treatment: "Dooroomi Thermal Spine Realignment",
          image: "/assets/testimonials/patient-ramesh-sahu.jpg",
          rating: 5,
          docPage: 15,
          quote: "After 5 years of painful injections and medicines for back pain and high blood pressure, Dooroomi therapy made me completely fine. I can now do my daily work with full strength and joy!",
          fullStory: "My name is Ramesh Chandra Sahu, Age 58 years, At-Chandapur, P.O- Chandapur, Dist- Nayagarh, Odisha. I had Back Pain and Blood Pressure problems since 5 years. I have taken many medicines and injections and many types of treatments before coming to DOOROOMI.\n\nThen I heard about DOOROOMI Medical Treatments from a known person. I went to the DOOROOMI center, and now I am perfectly fine and can do my work on a regular basis. I would heartily like to thanks DOOROOMI Medical and would pray that may DOOROOMI Medical get succeed in their work and keep helping people like me."
        }
      ]);
      console.log('Initial testimonials seeded into MongoDB Atlas successfully.');
    }

    // Seed default advertisement if empty
    const adCount = await Ad.countDocuments();
    if (adCount === 0) {
      await Ad.create({
        id: "ad-franchise-2026",
        title: "DOOROOMI Official Franchise & Health Center Partner Program 2026",
        badge: "EXCLUSIVE OPPORTUNITY",
        subtitle: "Expand Korea's Leading Medical Equipment & Free Daily Therapy Centers Across India",
        description: "Join hands with DOOROOMIMEDIQUIP and SKS International. Open a high-demand, fully certified Korean Medical Therapy Center in your city with complete technical guidance, certified equipment, and brand support.",
        imageUrl: "/assets/products/product-real-01.jpeg",
        buttonText: "Inquire for Franchise",
        buttonLink: "#/therapy",
        buttonActionType: "franchise",
        isEnabled: true,
        priority: 1,
        discountTag: "100% Free Daily Therapy Model"
      });
      console.log('Initial advertisement seeded into MongoDB Atlas successfully.');
    }
  } catch (e) {
    console.warn('Note: Could not seed data:', e.message);
  }
};

// Connect to MongoDB & Start Server
console.log('Connecting to MongoDB Atlas...');
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 8000
})
  .then(async () => {
    console.log('Connected successfully to MongoDB Atlas (dooroomimediquip)!');
    await seedInitialData();
  })
  .catch((err) => {
    console.error('MongoDB Atlas connection notice:', err.message);
    console.log('Server continuing to run with in-memory auth fallback.');
  });

app.listen(PORT, () => {
  console.log(`Dooroomi Backend Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Primary Frontend: ${process.env.FRONTEND_URL || 'https://www.dooroomimediquip.com'}`);
  console.log(`CORS allowed origins: ${Array.from(allowedOriginsSet).join(', ')}`);
  console.log(`Admin credentials: username=${process.env.ADMIN_USERNAME}, password=${process.env.ADMIN_PASSWORD}`);
});
