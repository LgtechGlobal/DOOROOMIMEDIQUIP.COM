# Hanbit Korea (한빛코리아) — Modern Web Application

A fully modernized, high-performance Korean precision bio-cosmetics & manufacturing website built with **React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lenis Smooth Scroll**.

The website features an ultra-luxury Korean aesthetic (deep pine green `#13281d`, champagne gold `#c5a059`, and warm porcelain ivory `#fcfbf7`), butter-smooth momentum scrolling, interactive 3D card tilt physics, animated statistics counters, a 5-stage clinical testing pipeline, an interactive product comparison drawer, real-time search & category filtering, and modal dialogues.

The original legacy files have been safely archived in `site_original/`.

---

## 🚀 Quick Start

### 1. View Pre-Built Modern Website Immediately
The production build is ready in both `./dist` and `./site`.
- Open `site/index.html` in your web browser.
- Or launch with Python's local server:
  ```bash
  python -m http.server 8080 --directory site
  ```
  Then visit `http://localhost:8080/`.

### 2. Run in Development Mode (Live Reloading)
```bash
npm run dev
```
Starts the Vite dev server at `http://localhost:3000` with hot-module replacement.

### 3. Build for Production
```bash
npm run build
```
Compiles TypeScript and bundles the assets into `./dist` (which can also be deployed to Netlify, Vercel, Cloudflare Pages, S3, or GitHub Pages).

---

## ✨ Modern Features & Enhancements

1. **Lenis Momentum Smooth Scrolling**:
   - Integrated Awwwards-grade momentum scrolling with inertia physics.
   - Glowing scroll progress indicator at the top tracking viewport depth.

2. **Interactive 3D Product Cards & Specular Glare**:
   - Real-time perspective calculation (`rotateX`, `rotateY`) on hover with dynamic radial glare.
   - Live category filtering (`Series A · Botanicals`, `Series B · Longevity`, `Series C · Packaging Systems`).
   - Instant search across active compounds, model codes, and product descriptions.

3. **Multi-Product Comparison Drawer**:
   - Floating sticky selector bar (compares up to 3 products simultaneously).
   - Side-by-side comparison modal displaying volume, texture, key actives, and certified parameters.

4. **5-Stage Scientific Testing Pipeline**:
   - Complete interactive workflow reflecting the wireframe benchmark:
     - Stage 1: Incoming Material Spectroscopy
     - Stage 2: Bio-Assay Formulation & Emulsification
     - Stage 3: **30-Day Accelerated Climate Stress ("1M" Wireframe Benchmark)**
     - Stage 4: Clinical Dossier & Lot Traceability
     - Stage 5: Final CGMP Cleanroom Release Approval
   - Sticky laboratory illustration panel with the 1-Month ("1M") stability badge.

5. **Intermediate Product Translational Pipeline**:
   - Visual timeline tracing concept formulation → pilot batch → final CGMP release.
   - Technical parameter specification sheet table.

6. **Quick View Modal & PDF Catalogue Downloads**:
   - Instant quick-view modal with active formulation notes and one-click quote pre-fill.
   - 6 Downloadable technical PDF dossiers and physical sample kit request form.

7. **Accredited Quality & International Certificates**:
   - ISO 22716:2007 (Cosmetics GMP - SGS International)
   - Korea CGMP (MFDS Good Manufacturing Practice - Level 1000 Cleanrooms)
   - US FDA Cosmetic Facility Registration (MoCRA Compliant)
   - Dermatest® Germany 5-Star Clinical Seal (Zero Irritation 0.00)

8. **Interactive Lightbox Facility Gallery**:
   - Categorized gallery (Cleanroom Laboratory, Factory Automation, Formulations).
   - Zoom-in modal with clean image viewing.

9. **B2B Consultation & Quotation Engine**:
   - Instant client-side validation, NDA request option, and automated pre-selection from product cards.

---

## 📁 Project Structure

```
├── dist/                   # Compiled modern production build
├── site/                   # Pre-compiled standalone site (ready to open/serve)
├── site_original/          # Safely preserved backup of the original prototype
├── public/
│   └── assets/             # Vector illustrations, icons & technical PDFs
├── src/
│   ├── components/         # Modern React UI & interaction components
│   │   ├── Navbar.tsx      # Sticky glass header, mega menu & mobile drawer
│   │   ├── Hero.tsx        # Luxury carousel with parallax & slide controls
│   │   ├── StatsSection.tsx# Animated counting numbers on scroll
│   │   ├── TestingPipeline.tsx # 5-stage QA journey & "1M" climate chamber
│   │   ├── DevelopmentSection.tsx # Intermediate formulation timeline
│   │   ├── ProductShowcase.tsx # Live search, category tabs & grid
│   │   ├── ProductCard.tsx # 3D perspective mouse tilt & glare card
│   │   ├── QuickViewModal.tsx # Technical modal specifications
│   │   ├── CompareDrawer.tsx # Floating drawer & side-by-side modal
│   │   ├── CatalogueSection.tsx # 6 Technical PDF cards & sample form
│   │   ├── QualitySection.tsx # ISO 22716, CGMP, FDA, Dermatest cards
│   │   ├── AboutSection.tsx # Korean bio-cluster heritage & cleanroom values
│   │   ├── ServicesSection.tsx # B2B capabilities & interactive FAQ
│   │   ├── GallerySection.tsx # Filtered facility gallery & Lightbox
│   │   ├── ContactSection.tsx # Validated quotation request form
│   │   ├── Footer.tsx      # Bilingual brand footer & back-to-top button
│   │   ├── SmoothScroll.tsx # Lenis smooth momentum scroll provider
│   │   └── ScrollProgress.tsx # Glowing gold scroll progress bar
│   ├── data/
│   │   └── siteData.ts     # Verified Korean bio-cosmetic catalog data
│   ├── App.tsx             # Master application coordinator
│   ├── main.tsx            # React root entrypoint
│   └── index.css           # Tailwind directives & glassmorphism utilities
├── package.json            # Modern toolchain dependencies
├── vite.config.ts          # Vite build configuration with relative base
├── tailwind.config.js      # Hanbit Korea luxury green & gold theme
└── tsconfig.json           # TypeScript configuration
```
