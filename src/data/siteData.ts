export interface Product {
  id: string;
  slug: string;
  name: string;
  nameKo: string;
  cat: 'series-a' | 'series-b' | 'series-c';
  catLabel: string;
  model: string;
  short: string;
  desc: string;
  volume: string;
  texture: string;
  keyActives: string[];
  specs: [string, string][];
  shape: string;
  badge?: string;
  imgUrl: string;
}

export interface CatalogueDoc {
  id: string;
  title: string;
  desc: string;
  kind: string;
  pages: number;
  size: string;
  file: string;
}

export interface ProcessStage {
  step: number;
  title: string;
  titleKo: string;
  duration: string;
  desc: string;
  tags: string[];
  details: string[];
}

export interface CertificateItem {
  id: string;
  name: string;
  issuer: string;
  validity: string;
  certNumber: string;
  scope: string;
  status: string;
}

export const SITE_CONFIG = {
  nameEn: "Doumi Beauty",
  nameKo: "도우미 美",
  legal: "Doumi Beauty Co., Ltd. (주식회사 도우미 美)",
  logoUrl: "./assets/img/brand-logo.jpg",
  phone: "080-850-2026",
  phoneTel: "+82808502026",
  email: "contact@doumibeauty.com",
  inquiryEmail: "export@doumibeauty.com",
  addressEn: "88 Bio-Venture Valley, Gangnam-daero, Gangnam-gu, Seoul, Republic of Korea",
  addressKo: "서울특별시 강남구 강남대로 88 바이오벤처밸리 R&D 센터",
  plantAddress: "142 Songdo Bio-Cluster, Yeonsu-gu, Incheon, Republic of Korea",
  hours: "Mon–Fri 09:00–18:00 KST (GMT+9)",
  tagline: "Precision Formulation, Clinically Verified.",
  subtagline: "Korean Precision Bio-Cosmetics & Certified Manufacturing Excellence Since 1998",
  year: "2026",
  stats: [
    { label: "Years in Bio-Formulation", value: 28, suffix: "+" },
    { label: "CGMP / ISO Cleanrooms", value: 100, suffix: "%" },
    { label: "Proprietary Bio-Actives", value: 45, suffix: "+" },
    { label: "Global Export Markets", value: 36, suffix: " Nations" },
  ]
};

export const CATEGORIES = [
  { id: "series-a", name: "Series A", label: "Botanical Bio-Actives", desc: "Core botanical fermentation & gentle barrier restoration formulations" },
  { id: "series-b", name: "Series B", label: "Cellular Longevity", desc: "Advanced peptides, NAD+, and clinically verified anti-aging concentrates" },
  { id: "series-c", name: "Series C", label: "Eco-Precision Systems", desc: "Airless dispensers, multi-chamber dispensers & monomaterial refillables" },
];

export const PRODUCTS: Product[] = [
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
    keyActives: ["Panax Ginseng Root Extract 68%", "Ceramide NP/AP/EOP", "Fermented Centella Asiatica"],
    specs: [
      ["Model Identifier", "DM-A101"],
      ["Net Volume", "50 ml / 1.69 fl. oz."],
      ["Target Indication", "Barrier repair & elasticity loss"],
      ["pH Level", "5.4 ± 0.3 (Skin Neutral)"],
      ["Clinical Efficacy", "Dermatest '5-Star Excellent'"],
      ["Preservation System", "Clean 1,2-Hexanediol Bio-System"],
      ["Standard Compliance", "ISO 22716 / Korea CGMP / EVE Vegan"],
    ],
    shape: "bottle",
    badge: "Flagship",
    imgUrl: "./assets/products/product-real-01.jpeg",
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
    desc: "A rapid-action relief ampoule developed for compromised skin post-laser and dermatological procedures. Formulated with Jeju organically harvested Cica and liposomal zinc PCA to soothe immediate erythema.",
    volume: "30 ml / 1.01 fl. oz.",
    texture: "Weightless Hydrating Elixir",
    keyActives: ["Madecassoside 20,000 ppm", "Asiatic Acid", "Panthenol (Pro-Vitamin B5) 5%"],
    specs: [
      ["Model Identifier", "DM-A102"],
      ["Net Volume", "30 ml / 1.01 fl. oz."],
      ["Target Indication", "Erythema, irritation & acne-prone"],
      ["pH Level", "5.8 ± 0.2"],
      ["Clinical Efficacy", "Zero Irritation Index (0.00)"],
      ["Preservation System", "Microbiome Friendly Self-Stabilized"],
      ["Standard Compliance", "US FDA OTC Registered / CGMP"],
    ],
    shape: "bottle",
    badge: "Best Seller",
    imgUrl: "./assets/products/product-real-02.jpeg",
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
    desc: "Replaces traditional purified water with 78% Betula Platyphylla Birch Sap to optimize trans-epidermal nutrient delivery. Infuses deep cellular hydration while promoting fibroblast rejuvenation.",
    volume: "120 ml / 4.05 fl. oz.",
    texture: "Dewy Micro-Essence",
    keyActives: ["Birch Sap (Betula Platyphylla) 78%", "Copper Tripeptide-1", "Oligopeptide-29"],
    specs: [
      ["Model Identifier", "DM-A103"],
      ["Net Volume", "120 ml / 4.05 fl. oz."],
      ["Target Indication", "Deep dehydration & fine lines"],
      ["pH Level", "5.6 ± 0.3"],
      ["Clinical Efficacy", "+184% Immediate Stratum Hydration"],
      ["Preservation System", "Plant-derived Glycols"],
      ["Standard Compliance", "ISO 22716 / EWG Green Grade 100%"],
    ],
    shape: "jar",
    badge: "Hydra Shield",
    imgUrl: "./assets/products/product-real-03.jpeg",
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
    desc: "Engineered via traditional Korean ceramic dual-fermentation. Refines pore texture, gently clears micro-keratin debris without harsh acids, and restores natural sebum-to-water equilibrium.",
    volume: "180 ml / 6.08 fl. oz.",
    texture: "Crystal Clear Hydrating Water",
    keyActives: ["Galactomyces Ferment Filtrate 93.5%", "Niacinamide 4%", "Polyglutamic Acid"],
    specs: [
      ["Model Identifier", "DM-A104"],
      ["Net Volume", "180 ml / 6.08 fl. oz."],
      ["Target Indication", "Dull tone, texture roughness & enlarged pores"],
      ["pH Level", "5.2 ± 0.3"],
      ["Clinical Efficacy", "+42% Translucency in 14 Days"],
      ["Preservation System", "Fermentation Bio-Protection"],
      ["Standard Compliance", "ISO 22716 / CGMP Certified"],
    ],
    shape: "tube",
    badge: "Clarifying",
    imgUrl: "./assets/products/product-real-04.jpeg",
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
    desc: "A medical-grade anti-aging matrix stabilized with lipid nanotechnology. Delivers continuous overnight cell renewal without the erythema or peeling common with synthetic tretinoin.",
    volume: "50 ml / 1.69 fl. oz.",
    texture: "Velvety Cushion Cream",
    keyActives: ["Encapsulated Pure Retinol 0.5%", "Bakuchiol 2.0%", "Adenosine 0.04%"],
    specs: [
      ["Model Identifier", "DM-B105"],
      ["Net Volume", "50 ml / 1.69 fl. oz."],
      ["Target Indication", "Deep wrinkles, photo-damage & laxity"],
      ["pH Level", "6.0 ± 0.3"],
      ["Clinical Efficacy", "-27.4% Wrinkle Depth in 28 Days"],
      ["Preservation System", "Liposomal Nitrogen Purge Packaging"],
      ["Standard Compliance", "Korea MFDS Functional Certified"],
    ],
    shape: "jar",
    badge: "Clinical Grade",
    imgUrl: "./assets/products/product-real-05.jpeg",
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
    desc: "Targeting mitochondrial vitality in cutaneous fibroblasts. Protects genomic DNA from UV and oxidative stress, dramatically accelerating intracellular cellular repair mechanisms.",
    volume: "40 ml / 1.35 fl. oz.",
    texture: "Concentrated Bio-Gel Serum",
    keyActives: ["NAD+ Precursor Complex 5%", "Pure Resveratrol 1.5%", "Marine Glycogen"],
    specs: [
      ["Model Identifier", "DM-B106"],
      ["Net Volume", "40 ml / 1.35 fl. oz."],
      ["Target Indication", "Cellular senescence & environmental fatigue"],
      ["pH Level", "5.5 ± 0.2"],
      ["Clinical Efficacy", "Mitochondrial ATP Vitality +68%"],
      ["Preservation System", "Amber Glass Photoprotection"],
      ["Standard Compliance", "ISO 22716 / GMP Cleanroom Level 1000"],
    ],
    shape: "bottle",
    badge: "Bio-Tech",
    imgUrl: "./assets/products/product-real-06.jpeg",
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
    desc: "Formulated using ultra-purified marine salmon DNA identical to human base sequences by 95%. Stimulates micro-vascular cutaneous circulation, epidermal thickness, and collagen matrix density.",
    volume: "35 ml / 1.18 fl. oz.",
    texture: "Rich Density Elixir",
    keyActives: ["PDRN (Salmon DNA) 30,000 ppm", "EGF / FGF / IGF Complex", "Hydrolyzed Collagen"],
    specs: [
      ["Model Identifier", "DM-B107"],
      ["Net Volume", "35 ml / 1.18 fl. oz."],
      ["Target Indication", "Sagging jawline, scar recovery & thin skin"],
      ["pH Level", "6.2 ± 0.2"],
      ["Clinical Efficacy", "+34.2% Dermal Elasticity Recovery"],
      ["Preservation System", "Aseptic Unit-Dose Compatible"],
      ["Standard Compliance", "Korea MFDS Dual Functional Approval"],
    ],
    shape: "tube",
    badge: "High Potency",
    imgUrl: "./assets/products/product-real-07.jpeg",
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
    desc: "A multi-depth moisture reservoir. High-molecular polymers form a breathable shield on the surface, while ultra-low nano-hyaluronate penetrates deep into the dermis to lock in cellular volume.",
    volume: "60 ml / 2.02 fl. oz.",
    texture: "Plumping Moisture Gel",
    keyActives: ["8D Hyaluronic Acid Matrix 3.5%", "Polyglutamic Acid", "Beta-Glucan"],
    specs: [
      ["Model Identifier", "DM-B108"],
      ["Net Volume", "60 ml / 2.02 fl. oz."],
      ["Target Indication", "Severe dehydration, post-flight dryness"],
      ["pH Level", "5.7 ± 0.2"],
      ["Clinical Efficacy", "Moisture Depth Penetration to 2.5 mm"],
      ["Preservation System", "Preservative-Free Multi-Chelator"],
      ["Standard Compliance", "ISO 22716 / Dermatest Excellent"],
    ],
    shape: "can",
    badge: "Deep Moisture",
    imgUrl: "./assets/products/product-real-08.jpeg",
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
    desc: "Engineered for active formulations prone to atmospheric oxidation (Retinol, Vitamin C, PDRN). Patented internal silicone piston prevents contamination and eliminates product residue wastage.",
    volume: "50 ml (Custom 15ml / 30ml / 50ml)",
    texture: "Engineered Recyclable PP/PETG",
    keyActives: ["Zero Metal Spring", "Oxygen Barrier < 0.05 cc/m²·day", "100% PCR Recycled Option"],
    specs: [
      ["Model Identifier", "DM-C109"],
      ["Dosage Output", "0.20 ml ± 0.01 per actuation"],
      ["Closure Type", "Airless Snap-on / Screw neck"],
      ["Material Specs", "Medical Grade PP / PETG / PCR"],
      ["Vacuum Tightness", "-0.08 MPa Leakage Test 60min PASS"],
      ["Compatibility", "Viscosity 500 cps to 45,000 cps"],
      ["Standard Compliance", "RoHS / REACH / FDA Food Contact Safe"],
    ],
    shape: "pump",
    badge: "Eco-Tech",
    imgUrl: "./assets/products/product-real-09.jpeg",
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
    desc: "Designed for premium dual-phase serums (e.g., pure L-Ascorbic Acid in chamber A, lipid barrier oil in chamber B). Mixes at an exact 1:1 ratio at the pump nozzle upon finger depression.",
    volume: "2 x 20 ml (Total 40 ml)",
    texture: "Dual-Cylinder Crystal Acrylic / PP",
    keyActives: ["Twin Independent Reservoirs", "Simultaneous Synchronous Actuator"],
    specs: [
      ["Model Identifier", "DM-C110"],
      ["Dosage Output", "0.15 ml + 0.15 ml synchronized"],
      ["Closure Type", "Dual Airless Piston Actuator"],
      ["Material Specs", "BPA-Free PMMA Outer + PP Inner"],
      ["Vacuum Tightness", "Class 1 Hermetic Seal Test PASS"],
      ["Customization", "Silk-screen, Hot-stamping, UV Coating"],
      ["Standard Compliance", "ISO 9001 / ISO 14001 Quality Certified"],
    ],
    shape: "bottle",
    badge: "Dual Action",
    imgUrl: "./assets/products/product-real-10.jpeg",
  },
  {
    id: "p11",
    slug: "product-11",
    name: "Monomaterial Recyclable Serum Dropper",
    nameKo: "단일소재 리사이클 세럼 드로퍼",
    cat: "series-c",
    catLabel: "Series C · Packaging Systems",
    model: "DM-C111",
    short: "100% Monomaterial Polypropylene (PP) push-button dropper for effortless circular recycling.",
    desc: "Solves the traditional cosmetic recycling dilemma where rubber teats and glass pipettes must be discarded in landfills. Fully recyclable in municipal PP streams without disassembly.",
    volume: "30 ml Glass/PET Reservoir",
    texture: "Precision Click Metering Cap",
    keyActives: ["Single Material PP Mechanism", "Child-Resistant Lock Option"],
    specs: [
      ["Model Identifier", "DM-C111"],
      ["Pipette Metering", "0.45 ml per single depress"],
      ["Closure Type", "20/410 Screw Thread"],
      ["Material Specs", "100% Polypropylene (Cap, Body, Tube)"],
      ["Recyclability", "RIC Class 5 (PP) 100% Recyclable"],
      ["Chemical Resistance", "Tested with essential oils & alcohol"],
      ["Standard Compliance", "EU Packaging & Packaging Waste Directive"],
    ],
    shape: "bottle",
    badge: "Eco Pioneer",
    imgUrl: "./assets/products/product-real-11.jpeg",
  },
  {
    id: "p12",
    slug: "product-12",
    name: "Ultra-Fine Micro-Mist Nebulizer",
    nameKo: "초미세 마이크로 미스트 분사기",
    cat: "series-c",
    catLabel: "Series C · Packaging Systems",
    model: "DM-C112",
    short: "Propellant-free mechanical aerosol delivering a continuous cloud of 0.03mm droplet mist.",
    desc: "Replaces flammable aerosol cans with clean pre-compression mechanical pump technology. Provides an ultra-delicate, cloud-like facial mist distribution that will not disrupt makeup.",
    volume: "100 ml / 150 ml / 200 ml",
    texture: "Aero-Grade PP Micro-Nozzle",
    keyActives: ["Propellant-Free Clean Dispersion", "0.03mm Micron Atomizer"],
    specs: [
      ["Model Identifier", "DM-C112"],
      ["Droplet Spectrum", "30 to 45 microns average size"],
      ["Spray Angle", "65° Wide-Angle Conical Dispersion"],
      ["Material Specs", "Recyclable PET Bottle + PP Engine"],
      ["Drop Resistance", "1.5m drop test onto concrete PASS"],
      ["Airless Operation", "360-degree upside down spraying"],
      ["Standard Compliance", "ISO 22716 / REACH Annex XVII Safe"],
    ],
    shape: "can",
    badge: "Aero Pure",
    imgUrl: "./assets/products/product-real-12.jpeg",
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
    keyActives: ["24K Pure Gold Nano-Flakes", "Royal Jelly Peptide Complex", "Acetyl Hexapeptide-8"],
    specs: [
      ["Model Identifier", "DM-B113"],
      ["Net Volume", "50 ml / 1.69 fl. oz."],
      ["Target Indication", "Facial contour sag & deep expression lines"],
      ["pH Level", "5.8 ± 0.3"],
      ["Clinical Efficacy", "+41.8% Dermal Density Score in 21 Days"],
      ["Preservation System", "Bio-Cellular Self-Protection"],
      ["Standard Compliance", "ISO 22716 / Korea CGMP"],
    ],
    shape: "jar",
    badge: "Royal Luxury",
    imgUrl: "./assets/products/product-real-13.jpeg",
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
    keyActives: ["500 Da Marine Collagen 65%", "Spirulina Maxima Extract", "Adenosine 0.05%"],
    specs: [
      ["Model Identifier", "DM-B114"],
      ["Net Volume", "60 ml / 2.02 fl. oz."],
      ["Target Indication", "Loss of skin firmness & bounce"],
      ["pH Level", "5.5 ± 0.2"],
      ["Clinical Efficacy", "+29.5% Elastic Recovery in 14 Days"],
      ["Preservation System", "Cold-Aseptic Micro-Filtered"],
      ["Standard Compliance", "ISO 22716 / CGMP Certified"],
    ],
    shape: "bottle",
    badge: "Collagen Matrix",
    imgUrl: "./assets/products/product-real-14.jpeg",
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
    keyActives: ["Silk Amino Acid Complex", "Phytosphingosine", "Ceramide Complex 5%"],
    specs: [
      ["Model Identifier", "DM-A115"],
      ["Net Volume", "150 ml / 5.07 fl. oz."],
      ["Target Indication", "Severe barrier dryness & winter tightness"],
      ["pH Level", "5.4 ± 0.2"],
      ["Clinical Efficacy", "98.7% TEWL Reduction in 1 Hour"],
      ["Preservation System", "Plant Squalane Self-Emulsified"],
      ["Standard Compliance", "ISO 22716 / Dermatest Excellent"],
    ],
    shape: "bottle",
    badge: "Barrier Shield",
    imgUrl: "./assets/products/product-real-15.jpeg",
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
    keyActives: ["Jeju Camellia Seed Oil 85%", "Natural Astaxanthin", "Tocopherol (Vit E)"],
    specs: [
      ["Model Identifier", "DM-A116"],
      ["Net Volume", "30 ml / 1.01 fl. oz."],
      ["Target Indication", "Oxidative stress, dull skin tone & moisture loss"],
      ["pH Level", "Lipid Neutral (Anhydrous)"],
      ["Clinical Efficacy", "+88% Radical Scavenging Capacity (ORAC)"],
      ["Preservation System", "Naturally Preserved with Vit E"],
      ["Standard Compliance", "EVE Vegan Certified / ISO 22716"],
    ],
    shape: "bottle",
    badge: "Pure Radiance",
    imgUrl: "./assets/products/product-real-16.jpeg",
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: 1,
    title: "Incoming Material Spectroscopy",
    titleKo: "원료 분광 분석 및 수입 검사",
    duration: "24–48 Hours",
    desc: "Every raw botanical, bio-ferment, and active compound is quarantined and analyzed via HPLC and FTIR spectrometry to verify raw molecular purity, absence of heavy metals, and batch identity.",
    tags: ["FTIR Spectrometry", "Heavy Metal Screen", "Microbial Purity", "Raw Assay Check"],
    details: [
      "Verification of raw Certificate of Analysis (COA)",
      "Screening for 14 prohibited heavy metals and pesticides",
      "Endotoxin & total viable bacterial count screening",
      "Quarantine authorization before formulation loading",
    ]
  },
  {
    step: 2,
    title: "Bio-Assay Formulation & Emulsification",
    titleKo: "생체 활성 포뮬레이션 및 유화 공정",
    duration: "3–5 Days",
    desc: "Compounding in Class 1,000 laminar cleanroom reactors under nitrogen blanket protection. Particle sizing is measured via dynamic light scattering to guarantee sub-micron liposomal stability.",
    tags: ["Class 1000 Cleanroom", "Sub-Micron Sizing", "Nitrogen Blanketing", "Batch Viscosity"],
    details: [
      "Dynamic light scattering particle size analysis (< 150 nm)",
      "High-shear vacuum emulsification at calibrated temperatures",
      "Continuous digital pH and refractive index tracking",
      "In-line optical clarity & rheology certification",
    ]
  },
  {
    step: 3,
    title: "30-Day Accelerated Climate Stress ('1M')",
    titleKo: "30일 가속 기후 안정성 시험 (1M 평가)",
    duration: "30 Days (1 Month)",
    desc: "The critical wireframe benchmark: Samples endure 30 days in accelerated climate chambers at 45°C / 75% RH and freeze-thaw cycles (-10°C to +40°C) to simulate 24+ months of shelf longevity.",
    tags: ["45°C / 75% RH Chamber", "Freeze-Thaw Cycling", "Centrifuge Stress (5000rpm)", "Preservative Challenge"],
    details: [
      "Continuous monitoring for phase separation or precipitation",
      "Active ingredient degradation rate measured via HPLC",
      "Challenge testing against 5 microbial strains (USP 51)",
      "Packaging organoleptic and seal integrity verification",
    ]
  },
  {
    step: 4,
    title: "Clinical Dossier & Traceability Verification",
    titleKo: "임상 자료화 및 전산 이력 추적",
    duration: "48 Hours",
    desc: "Complete batch genealogy is compiled into digital ERP logs. Patch-testing dermal safety data and analytical chromatography charts are formatted for global regulatory submission.",
    tags: ["ERP Lot Traceability", "Dermal Patch Test", "Analytical Certificate", "Regulatory Dossier"],
    details: [
      "Generation of Lot-Specific Master Certificate of Analysis",
      "Dermatest 48-hour human patch test safety compilation",
      "End-to-end QR code generation for supply chain transparency",
      "EU CPNP, US MoCRA, and ASEAN cosmetic compliance sign-off",
    ]
  },
  {
    step: 5,
    title: "Final CGMP Cleanroom Release Approval",
    titleKo: "최종 CGMP 클린룸 출하 승인",
    duration: "Immediate Sign-off",
    desc: "The Quality Assurance Committee reviews the complete audit trail. Only lots satisfying 100% of physical, chemical, and microbiological specifications receive the golden release seal.",
    tags: ["QA Committee Sign-Off", "Gold Release Seal", "Aseptic Packaging", "Global Dispatch"],
    details: [
      "100% automated optical fill-line inspection",
      "Weight and torque seal verification on packaging lines",
      "Final batch release quarantine clearance",
      "Export containerization with temperature data-loggers",
    ]
  }
];

export const CATALOGUE_DOCS: CatalogueDoc[] = [
  {
    id: "doc-1",
    title: "2026 Hanbit Korea OEM/ODM Master Catalogue",
    desc: "Comprehensive portfolio of Series A, B, and C formulations, packaging options, MOQ terms, and turnkey manufacturing timelines.",
    kind: "Full Product Catalogue PDF",
    pages: 48,
    size: "8.4 MB",
    file: "./assets/docs/product-catalogue.pdf",
  },
  {
    id: "doc-2",
    title: "Series A: Botanical Fermentation Technical Dossier",
    desc: "Scientific rationale, active ginsenoside HPLC graphs, and dermatological efficacy clinical trials for the Series A line.",
    kind: "Botanical Research Brochure PDF",
    pages: 24,
    size: "4.2 MB",
    file: "./assets/docs/series-a-brochure.pdf",
  },
  {
    id: "doc-3",
    title: "Series B: Clinical Peptides & Cellular Longevity Guide",
    desc: "In-vitro collagen synthesis data, NAD+ stability profiles, and encapsulation specifications for clinical skincare formulations.",
    kind: "Clinical Specification PDF",
    pages: 32,
    size: "5.8 MB",
    file: "./assets/docs/series-b-brochure.pdf",
  },
  {
    id: "doc-4",
    title: "Precision Engineering & Packaging Technical Spec Sheet",
    desc: "Engineering schematics, vacuum seal testing tolerances, material safety data sheets (MSDS), and circular recycling metrics.",
    kind: "Engineering Spec Sheet PDF",
    pages: 18,
    size: "3.1 MB",
    file: "./assets/docs/technical-specifications.pdf",
  },
  {
    id: "doc-5",
    title: "Quality Assurance & 30-Day Testing Protocol Summary",
    desc: "Methodological overview of our 5-stage testing route, accelerated climate stress chambers, and microbial challenge criteria.",
    kind: "QA Testing Protocol PDF",
    pages: 20,
    size: "3.9 MB",
    file: "./assets/docs/quality-testing-summary.pdf",
  },
  {
    id: "doc-6",
    title: "Accreditation Pack: ISO 22716, CGMP & FDA Registrations",
    desc: "Official copies of Hanbit Korea's international manufacturing certificates, facility audits, and vegan declarations.",
    kind: "Compliance & Certifications PDF",
    pages: 14,
    size: "2.6 MB",
    file: "./assets/docs/certificates.pdf",
  },
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-1",
    name: "ISO 22716:2007 (Cosmetics GMP)",
    issuer: "SGS International Certification",
    validity: "2024–2027 (Current Audit Passed)",
    certNumber: "KR24/09884-GMP",
    scope: "Design, Development, Testing & Manufacturing of Skincare, Toners, Creams & Ampoules",
    status: "Verified & Current",
  },
  {
    id: "cert-2",
    name: "Korea CGMP (MFDS Good Manufacturing Practice)",
    issuer: "Ministry of Food and Drug Safety, Republic of Korea",
    validity: "2023–2026 (Annual Renewal)",
    certNumber: "MFDS-KCGMP-2023-412",
    scope: "Full Cleanroom Production, Aseptic Fill & Finish Facilities",
    status: "Level 1000 Certified",
  },
  {
    id: "cert-3",
    name: "US FDA Cosmetic Facility Registration (MoCRA)",
    issuer: "United States Food & Drug Administration (FDA)",
    validity: "Annual Registration Active",
    certNumber: "FEI: 3021948810",
    scope: "Compliant Export Facility for OTC & Premium Cosmetic Formulations",
    status: "US Compliant",
  },
  {
    id: "cert-4",
    name: "Dermatest® Germany 5-Star Clinical Seal",
    issuer: "Dermatest GmbH Münster, Germany",
    validity: "Clinical Trial Protocols 2024–2026",
    certNumber: "DT-CLIN-2024-KOR",
    scope: "Zero Hypersensitivity & 0.00 Irritation Index in Human Repeated Insult Patch Test",
    status: "5-Star Excellent",
  },
];

export const SERVICES = [
  {
    num: "01",
    title: "Custom OEM/ODM Formulation",
    desc: "From initial molecular concept to pilot batch. Tailor-made textures, active concentrations, and custom scent signatures crafted by veteran Korean cosmetic chemists.",
    tags: ["Turnkey Development", "Custom Textures", "Vegan / Clean Beauty", "Patented Actives"]
  },
  {
    num: "02",
    title: "30-Day Accelerated Testing & Stability",
    desc: "Rigorous thermal, microbial, and centrifuge challenge testing in state-of-the-art climate chambers to guarantee international shelf life and export stability.",
    tags: ["Climate Chambers", "USP 51 Challenge", "Viscosity Rheology", "Centrifuge Stress"]
  },
  {
    num: "03",
    title: "Global Regulatory Dossier Support",
    desc: "Turnkey paperwork preparation for US FDA MoCRA, European CPNP, UK SCPN, and ASEAN Cosmetic Directives with complete chemical safety assessments.",
    tags: ["FDA MoCRA", "EU CPNP Dossier", "Safety Assessment", "Export COA"]
  },
  {
    num: "04",
    title: "Precision Cleanroom Manufacturing",
    desc: "High-capacity automated filling, labelling, and laser-coding in ISO Class 1,000 cleanrooms with capacity exceeding 2,500,000 units monthly.",
    tags: ["Class 1000 Cleanroom", "Aseptic Fill Lines", "High Speed Labeling", "Multi-Format Pack"]
  }
];

export const GALLERY_ITEMS = [
  { id: 1, title: "High-Performance Cleanroom R&D Center", cat: "Laboratory", img: "./assets/img/lab.svg" },
  { id: 2, title: "Botanical Ultrasonic Extraction Suite", cat: "Laboratory", img: "./assets/img/gallery-1.svg" },
  { id: 3, title: "Series A & B Bio-Active Formulation Library", cat: "Products", img: "./assets/img/gallery-2.svg" },
  { id: 4, title: "Automated Vacuum Nitrogen Emulsifier 500L", cat: "Factory", img: "./assets/img/gallery-3.svg" },
  { id: 5, title: "High-Precision 0.01g Quality Weight Check Line", cat: "Factory", img: "./assets/img/gallery-4.svg" },
  { id: 6, title: "Spectrophotometric Microbial Incubation Room", cat: "Laboratory", img: "./assets/img/gallery-5.svg" },
  { id: 7, title: "Eco-Precision Monomaterial Dispenser Assemblies", cat: "Products", img: "./assets/img/gallery-6.svg" },
  { id: 8, title: "Robotic Unit Carton Packing & Tamper Sealing", cat: "Factory", img: "./assets/img/gallery-7.svg" },
  { id: 9, title: "Sterile Nitrogen Inert Gas Purge Storage Facility", cat: "Factory", img: "./assets/img/gallery-8.svg" },
];

export const FAQS = [
  {
    q: "What is your standard Minimum Order Quantity (MOQ) for custom OEM production?",
    a: "For standard formulations packaged in our stocked precision containers (Series A/B/C), our MOQ is 1,000 units per SKU. For fully customized formulation development with custom pantone packaging and tooling, our typical MOQ is 3,000–5,000 units."
  },
  {
    q: "What does the 30-day accelerated testing ('1M' wireframe marker) cover?",
    a: "The '1M' label designates our standardized 1-Month Accelerated Stability Evaluation protocol. Formulations reside in climate simulation chambers at 45°C and 75% relative humidity for 30 consecutive days. By Arrhenius kinetics, passing 1 month under these severe thermal conditions statistically correlates to 12–24 months of stable shelf room performance without active breakdown, phase separation, or color shift."
  },
  {
    q: "Can Hanbit Korea ship export orders and assist with overseas import compliance?",
    a: "Yes. Over 65% of our production is exported worldwide, including the United States, EU, Japan, Southeast Asia, and the Middle East. We provide full export documentation including Certificate of Free Sale (CFS), Lot COA, MSDS, BSE/TSE statements, and European PIF (Product Information File) dossiers."
  },
  {
    q: "Can I receive physical formulation samples prior to placing a bulk order?",
    a: "Yes! Prospective B2B partners can request sample batches of any Series A, B, or C product through our contact form. Standard laboratory evaluation samples are dispatched via DHL/FedEx Express within 3–5 business days."
  }
];
