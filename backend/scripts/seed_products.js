import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Product } from '../models/Product.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const uri = process.env.MONGODB_URI || 'mongodb+srv://gumansinghlgtechglobal_db_user:0bYvMxMPPaVvTm1l@dooroomimediquip.72damgv.mongodb.net/dooroomimediquip?retryWrites=true&w=majority';

const productsToInsert = [
  {
    id: 'p-bedro-smart-1',
    slug: 'bedro-smart-1-thermal-spine-traction',
    name: 'BEDRO Smart-1 Thermal Spine Traction Bed',
    nameKo: '베드로 스마트-1 척추 온열 견인기',
    cat: 'flagship',
    catLabel: 'Flagship Medical Systems',
    model: 'BEDRO SMART-1 (DM-BST1)',
    short: 'Automated spinal thermal decompression bed with internal natural jade rollers (40°C–70°C), spinal lordosis traction & external 9-ball projector.',
    desc: 'The BEDRO Smart-1 is Dooroomi\'s flagship medical-grade spinal thermal traction and decompression therapy system. Engineered in South Korea under ISO 13485 and Korean CGMP standards, it features automated cervical, thoracic, and lumbar spinal traction. Motorized internal jade rollers deliver far-infrared moxibustion heat deep into paravertebral tissues, relieving disc herniation, sciatica, spondylosis, and postural nerve impingement. Equipped with an articulated digital control console and auxiliary 9-ball jade projector.',
    volume: 'Full-Body Medical Traction Bed',
    texture: 'Heavy-Duty Ergonomic Alloy Frame & Medical Antibacterial Upholstery',
    badge: 'Flagship Medical',
    imgUrl: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792664022/dooroomi_mediquip/bedro-smart-1-traction.png',
    keyActives: [
      'Internal Natural Jade Heated Rollers (40°C–70°C)',
      'Motorized Cervical & Lumbar Spinal Traction Guidance',
      'Deep Far-Infrared Resonance Heat (9–10 µm wavelength)',
      'External Multi-Ball Heated Jade Projector Included',
      'Articulated Digital Control Console Arm',
      'Moxibustion & Acupressure Reflex Point Stimulation'
    ],
    specs: [
      ['Model Identifier', 'BEDRO SMART-1 (DM-BST1)'],
      ['Medical Device Classification', 'Class II Medical Device (Korea MFDS / CE / ISO 13485)'],
      ['Internal Thermal Core', 'Natural Jade Rollers with Moxibustion Core'],
      ['Operating Temperature', '40°C – 70°C Micro-Adjustable'],
      ['Traction Mechanisms', 'Automated Cervical, Thoracic & Lumbar Lordosis Decompression'],
      ['Auxiliary Projector', '9-Ball Jade Folding Heating Applicator'],
      ['Display Console', 'Articulating Digital Controller Arm'],
      ['Power Specification', '220V AC / 50-60Hz (250W Max)'],
      ['Target Indications', 'Herniated Disc, Sciatica, Spondylosis, Scoliosis, Chronic Back Pain']
    ]
  },
  {
    id: 'p-taeyangsuk-mat',
    slug: 'taeyangsuk-7-mineral-tourmaline-bio-mat',
    name: 'TAEYANGSUK 7-Mineral Tourmaline Bio-Mat',
    nameKo: '태양석 바이오 7-광물 온열 매트',
    cat: 'biominerals',
    catLabel: 'Bio-Mineral Mats',
    model: 'TAEYANGSUK 7M (DM-TSK7)',
    short: 'Full-length Korean thermal mat embedded with thousands of hexagonal tourmaline & jade discs, 12,000 Gauss magnetic induction & negative ions.',
    desc: 'The TAEYANGSUK 7-Mineral Bio-Mat is a medical-grade thermal therapy mat hand-crafted with precision-sintered hexagonal ceramic discs composed of 7 Korean rare-earth minerals including tourmaline, germanium, elvan, and nephrite jade. Certified by Korea MFDS, it emits 12,000 Gauss alternating magnetic fields and over 1,200 ions/cc of negative ions. The deep-penetrating far-infrared heat stimulates bone marrow stem cells, promotes healthy red and white blood cell generation, clears microvascular blockages, and revitalizes deep tissue.',
    volume: 'Full-Length Thermal Medical Bio-Mat',
    texture: 'Hexagonal Sintered Mineral Discs, Bio-Ceramic Core & Vegan Leather Trim',
    badge: 'Bio-Mineral Therapy',
    imgUrl: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792664024/dooroomi_mediquip/taeyangsuk-mineral-mat-real.png',
    keyActives: [
      'Hexagonal Jade & Tourmaline Sintered Ceramic Tiles',
      '12,000 Gauss Alternating Magnetic Field Induction',
      'Negative Ion Emission (>1,200 ions/cm³)',
      'Bone Marrow Activation & Blood Microcirculation',
      'Deep Far-Infrared Moxibustion (30°C–70°C)',
      'EMF Shielding Multi-Layer Protection Matrix'
    ],
    specs: [
      ['Model Identifier', 'TAEYANGSUK 7M (DM-TSK7)'],
      ['Surface Layer', 'Natural Nephrite Jade & Tourmaline Hexagonal Tiles'],
      ['Magnetic Strength', '12,000 Gauss Alternating Magnetic Flux'],
      ['Negative Ions', '>1,200 ions/cm³'],
      ['Heat Penetration', 'Deep Far-Infrared up to 14 cm into Soft Tissue'],
      ['Temperature Range', '30°C – 70°C Micro-Adjustable'],
      ['EMF Safety', '99.9% Electromagnetic Field Attenuation Layer'],
      ['Target Indications', 'Bone Marrow Stimulation, Arthritis, Hypertension, Insomnia, Chronic Fatigue']
    ]
  },
  {
    id: 'p-bedro-controller',
    slug: 'bedro-smart-digital-controller',
    name: 'BEDRO Smart Digital Therapeutic Controller',
    nameKo: '스마트 디지털 주파수 치료 리모컨',
    cat: 'accessories',
    catLabel: 'Controllers & Belts',
    model: 'BEDRO SMART-RC (DM-SRC500)',
    short: 'Intelligent medical frequency controller featuring 500Hz therapeutic stimulation, backlit digital display, countdown timer & safety cutoffs.',
    desc: 'The BEDRO Smart Digital Therapeutic Controller delivers customized electro-stimulation and thermal management for Dooroomi medical treatment systems. Featuring a high-contrast backlit LED interface, it displays output frequency (up to 500 Hz), cycle progress, and high-precision therapy countdown timers. Ergonomically shaped with one-touch power, intensity adjustment (+/-), and cycling mode switches, it allows patients and therapists to fine-tune spinal decompression protocols safely and effortlessly.',
    volume: 'Handheld Frequency & Thermal Controller',
    texture: 'Medical Grade Antibacterial ABS & Backlit High-Contrast LED',
    badge: 'Smart Controller',
    imgUrl: 'https://res.cloudinary.com/lgtechglobal/image/upload/v1792664023/dooroomi_mediquip/bedro-smart-remote-controller.png',
    keyActives: [
      'Up to 500 Hz Bio-Frequency Pulse Wave Generation',
      'High-Contrast Digital LED Diagnostic Display',
      '30:00 Precise Countdown Timer & Auto Shutoff',
      'One-Touch Mode Cycling & Frequency Modulation',
      'Ergonomic Silicone Tactile Sealed Buttons',
      'Integrated Safety Overload & Thermal Cutoff Protection'
    ],
    specs: [
      ['Model Identifier', 'BEDRO SMART-RC (DM-SRC500)'],
      ['Frequency Output', 'Up to 500 Hz Micro-Pulse Modulation'],
      ['Timer Range', '0 – 60 Minutes (Default 30:00 Session)'],
      ['Display Interface', 'Digital Monochrome High-Contrast LED Screen'],
      ['Controls', 'Power, Cycle Mode, Frequency (+/-), Timer'],
      ['Compatibility', 'BEDRO Smart-1, Bio-Thermal Arrays, Champion Series'],
      ['Safety Certification', 'IEC 60601-1 Medical Electrical Safety']
    ]
  },
  {
    id: 'p-champion-belt',
    slug: 'dooroomi-champion-lumbar-support-belt',
    name: 'DOOROOMI Champion Lumbar Support Belt',
    nameKo: '두루미 챔피언 요추 벨트',
    cat: 'accessories',
    catLabel: 'Controllers & Belts',
    model: 'CHAMPION-L1 (DM-CH1)',
    short: 'Ergonomic lumbar & sacroiliac stabilization belt with embedded tourmaline and far-infrared ceramic discs for disc relief.',
    desc: 'The DOOROOMI Champion Belt delivers orthopedic lumbar support and natural tourmaline thermal emission. Engineered to decompress L4-L5-S1 lumbar discs and correct pelvic tilt while walking, sitting, or working.',
    volume: 'Ergonomic Orthopedic Support Belt',
    texture: 'Reinforced Breathable Neoprene & Ceramic Tourmaline Discs',
    badge: 'Targeted Lumbar',
    imgUrl: '/assets/therapy/therapy-champion-belt-page12.png',
    keyActives: [
      'Direct L4-L5-S1 Spinal Disc Support',
      'Embedded Tourmaline FIR Discs',
      'Dual Tension Elastic Fastening System',
      'Pelvic Tilt & Postural Stabilization'
    ],
    specs: [
      ['Model Identifier', 'CHAMPION-L1 (DM-CH1)'],
      ['Target Area', 'Lumbar Spine (L1-S1) & Sacroiliac Joint'],
      ['Active Material', 'Tourmaline & Bio-Ceramic Inserts'],
      ['Standard Compliance', 'ISO 13485 Medical Device']
    ]
  },
  {
    id: 'p-taeyangsuk-plus',
    slug: 'taeyangsuk-plus-compact-mat',
    name: 'TAEYANGSUK PLUS Compact Bio-Mat',
    nameKo: '태양석 플러스 소형 온열 매트',
    cat: 'biominerals',
    catLabel: 'Bio-Mineral Mats',
    model: 'TAEYANGSUK PLUS (DM-TSKP)',
    short: 'Portable Korean 7-mineral thermal mat ideal for chairs, sofas, and targeted abdominal or lumbar therapy.',
    desc: 'A compact version of the renowned Taeyangsuk therapeutic mat. Sintered Korean jade and rare minerals emit concentrated far-infrared heat and magnetic flux in a portable format.',
    volume: 'Compact Multi-Purpose Bio-Mat',
    texture: 'High-Density Sintered Ceramic Tiles',
    badge: 'Portable Bio-Mat',
    imgUrl: '/assets/therapy/therapy-taeyangsuk-mat-page11.png',
    keyActives: [
      '7-Rare Korean Minerals Formula',
      'Localized FIR Heating (30°C–70°C)',
      'Negative Ion Emitter',
      'Portable Ergonomic Size'
    ],
    specs: [
      ['Model Identifier', 'TAEYANGSUK PLUS (DM-TSKP)'],
      ['Material', '7-Mineral Sintered Ceramics'],
      ['Application', 'Seated, Lumbar, Abdominal Therapy']
    ]
  },
  {
    id: 'p-9ball-projector',
    slug: 'dooroomi-9-ball-jade-thermal-projector',
    name: 'DOOROOMI 9-Ball Jade Thermal Projector',
    nameKo: '두루미 9구 천연옥 온열기',
    cat: 'accessories',
    catLabel: 'Controllers & Belts',
    model: 'DM-9BALL (DM-PJ9)',
    short: 'Contoured 9-sphere natural jade heating projector for targeted acupressure on knees, shoulders, neck, and abdomen.',
    desc: 'Handcrafted with 9 polished spheres of natural Korean jade. Placed directly over affected joints, spine, or internal organs to deliver concentrated deep far-infrared heat and moxibustion relief.',
    volume: 'Handheld 9-Sphere Jade Applicator',
    texture: 'Polished Pure Natural Jade & Ergonomic Handle',
    badge: 'Acupressure Core',
    imgUrl: '/assets/therapy/therapy-principles-page7.png',
    keyActives: [
      '9 Polished Natural Jade Spheres',
      'Concentrated Moxibustion Heat (40°C–70°C)',
      'Ergonomic Contoured Grip',
      'Direct Joint & Acupoint Application'
    ],
    specs: [
      ['Model Identifier', 'DM-9BALL (DM-PJ9)'],
      ['Spheres', '9 Pure Nephrite Jade Spheres'],
      ['Application', 'Knees, Shoulders, Cervical Spine, Abdomen']
    ]
  }
];

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB database');

    for (const item of productsToInsert) {
      const res = await Product.findOneAndUpdate(
        { id: item.id },
        { $set: item },
        { upsert: true, new: true }
      );
      console.log('Saved product:', res.id, '-', res.name);
    }

    const count = await Product.countDocuments();
    console.log('Total products currently in MongoDB database:', count);
    await mongoose.disconnect();
    console.log('Database seeding completed successfully.');
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
}

seed();
