#!/usr/bin/env python3
"""Static site generator for the Hanbit Korea website.

Edit the CONFIG / PRODUCTS / CATALOGUE / PROCESS blocks, then run:  python3 build.py
It regenerates every HTML page, assets/js/data.js, placeholder SVG artwork and placeholder PDFs
into ./site  (shared header/footer live here, so they are never duplicated by hand).
"""
import json, os, random, textwrap

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")

# ----------------------------------------------------------------------------
# CONFIG — every value marked PLACEHOLDER must be replaced with real business data
# ----------------------------------------------------------------------------
CONFIG = dict(
    name_en="Hanbit Korea",          # PLACEHOLDER company name
    name_ko="한빛코리아",              # PLACEHOLDER Korean brand name
    legal="Hanbit Korea Co., Ltd.",  # PLACEHOLDER legal entity
    phone="080-000-0000",            # PLACEHOLDER toll-free number
    phone_tel="+82800000000",
    email="info@example.com",        # PLACEHOLDER email
    address="[Business address — to be supplied]",
    hours="Mon–Fri 09:00–18:00 KST [to be confirmed]",
    tagline="Precision, tested and documented.",
    form_endpoint="",                # e.g. a Formspree/Getform URL; empty = opens visitor's email app
    year="2026",
)

CATS = [
    ("series-a", "Series A", "Core range"),
    ("series-b", "Series B", "Premium range"),
    ("series-c", "Series C", "Accessories & refills"),
]

SHAPES = ["jar", "bottle", "box", "tube", "can", "pump"]
PALETTES = [("#e4ebe2", "#1f3a2e", "#b08d4a"), ("#efe5cf", "#2c5242", "#8fa68f"), ("#e9e6dc", "#3a3f3b", "#b08d4a"),
            ("#dfe7df", "#4d6b57", "#efe5cf"), ("#f1ebdd", "#1f3a2e", "#8fa68f")]

# Sample dataset — REPLACE with real products. Spec values are "[TBC]" so nothing is claimed that is not verified.
PRODUCTS = []
_names = [
    ("Sample Product 01", "series-a"), ("Sample Product 02", "series-a"), ("Sample Product 03", "series-a"), ("Sample Product 04", "series-a"),
    ("Sample Product 05", "series-b"), ("Sample Product 06", "series-b"), ("Sample Product 07", "series-b"), ("Sample Product 08", "series-b"),
    ("Sample Product 09", "series-c"), ("Sample Product 10", "series-c"), ("Sample Product 11", "series-c"), ("Sample Product 12", "series-c"),
]
for i, (n, c) in enumerate(_names, 1):
    letter = {"series-a": "A", "series-b": "B", "series-c": "C"}[c]
    PRODUCTS.append(dict(
        id=f"p{i:02d}", slug=f"product-{i:02d}", name=n, cat=c, model=f"HK-{letter}{100 + i}",
        short="Short product description goes here. [Replace with real copy]",
        desc="Longer product description goes here. Describe materials, intended use and what makes this product different. [Replace with verified copy before publishing.]",
        specs=[["Model", f"HK-{letter}{100 + i}"], ["Size / capacity", "[TBC]"], ["Material", "[TBC]"], ["Test report", "[TBC]"]],
        shape=SHAPES[(i - 1) % len(SHAPES)], pal=(i - 1) % len(PALETTES)))

CATALOGUE = [
    dict(title="Full product catalogue", desc="All series, specifications and ordering information.", kind="Catalogue PDF", file="assets/docs/product-catalogue.pdf"),
    dict(title="Series A brochure", desc="Core range overview.", kind="Brochure PDF", file="assets/docs/series-a-brochure.pdf"),
    dict(title="Series B brochure", desc="Premium range overview.", kind="Brochure PDF", file="assets/docs/series-b-brochure.pdf"),
    dict(title="Technical specification sheet", desc="Dimensions, materials and tolerances.", kind="Technical PDF", file="assets/docs/technical-specifications.pdf"),
    dict(title="Quality & testing summary", desc="Testing procedure and reporting overview.", kind="Quality PDF", file="assets/docs/quality-testing-summary.pdf"),
    dict(title="Certificates pack", desc="Supporting certificates and declarations.", kind="Certificates PDF", file="assets/docs/certificates.pdf"),
]

# Process data drives BOTH the step cards and the stage indicators / timeline.
PROCESS = dict(
    testing=[
        ("Incoming inspection", "Materials and components are checked against the agreed specification before testing begins.", ["Visual check", "Dimensions"]),
        ("Laboratory testing", "Samples undergo the defined test procedures. [List the real test methods and standards here.]", ["Method: TBC", "Standard: TBC"]),
        ("Extended evaluation", "Samples are observed over an evaluation period. The wireframe notes about one month (“1M”) — confirm the real duration with the business owner.", ["≈ 1 month (to be confirmed)"]),
        ("Review & documentation", "Results are reviewed, recorded and compiled into a report.", ["Report", "Traceability"]),
        ("Release approval", "Only batches that pass every check are approved for the next stage.", ["Pass / fail record"]),
    ],
    development=[
        ("Concept & specification", "Requirements and target specification are agreed."),
        ("Intermediate product", "A development-stage sample is produced and evaluated."),
        ("Pilot production", "A small run validates the process before full production. [Adapt to your real process.]"),
        ("Final quality check", "Finished products are checked against the approved specification."),
        ("Packaging & dispatch", "Approved products are packed, labelled and shipped."),
    ],
)

# ----------------------------------------------------------------------------
# Artwork (original, simple SVG illustrations — replace with real photography)
# ----------------------------------------------------------------------------
def svg_art(shape, pal, w, h, scene=False):
    bg, fg, ac = PALETTES[pal % len(PALETTES)]
    cx, base = w / 2, h * 0.78
    u = min(w, h) / 10
    parts = [f'<rect width="{w}" height="{h}" fill="{bg}"/>',
             f'<rect y="{base}" width="{w}" height="{h - base}" fill="#000" opacity=".05"/>',
             f'<ellipse cx="{cx}" cy="{base + u * .2}" rx="{u * 2.4}" ry="{u * .35}" fill="#000" opacity=".12"/>']
    def R(x, y, ww, hh, f, rx=0, op=1): return f'<rect x="{x:.1f}" y="{y:.1f}" width="{ww:.1f}" height="{hh:.1f}" rx="{rx:.1f}" fill="{f}" opacity="{op}"/>'
    if shape == "jar":
        parts += [R(cx - u * 1.9, base - u * 3.6, u * 3.8, u * 3.6, fg, u * .5), R(cx - u * 2.0, base - u * 4.6, u * 4.0, u * 1.1, ac, u * .25), R(cx - u * 1.3, base - u * 2.7, u * 2.6, u * 1.2, bg, u * .2, .9)]
    elif shape == "bottle":
        parts += [R(cx - u * 1.2, base - u * 5.2, u * 2.4, u * 5.2, fg, u * .6), R(cx - u * .55, base - u * 6.5, u * 1.1, u * 1.5, ac, u * .15), R(cx - u * .8, base - u * 3.4, u * 1.6, u * 1.8, bg, u * .15, .9)]
    elif shape == "box":
        parts += [R(cx - u * 2.1, base - u * 4.2, u * 4.2, u * 4.2, fg, u * .15), R(cx - u * 2.1, base - u * 4.2, u * 4.2, u * .35, ac), R(cx - u * 1.0, base - u * 2.6, u * 2.0, u * .12, bg, 0, .9), R(cx - u * 1.0, base - u * 2.2, u * 1.3, u * .12, bg, 0, .7)]
    elif shape == "tube":
        parts += [f'<path d="M{cx - u * 1.3:.1f} {base:.1f} L{cx - u * 1.0:.1f} {base - u * 5:.1f} L{cx + u * 1.0:.1f} {base - u * 5:.1f} L{cx + u * 1.3:.1f} {base:.1f}Z" fill="{fg}"/>',
                  R(cx - u * 1.0, base - u * 5.9, u * 2.0, u * 0.95, ac, u * .2), R(cx - u * .8, base - u * 3.0, u * 1.6, u * 1.2, bg, u * .1, .9)]
    elif shape == "can":
        parts += [R(cx - u * 1.5, base - u * 4.4, u * 3.0, u * 4.4, fg, u * .2), R(cx - u * 1.5, base - u * 4.4, u * 3.0, u * .5, ac, u * .2), R(cx - u * 1.0, base - u * 3.0, u * 2.0, u * 1.4, bg, u * .1, .9)]
    else:  # pump
        parts += [R(cx - u * 1.4, base - u * 4.4, u * 2.8, u * 4.4, fg, u * .5), R(cx - u * .25, base - u * 5.6, u * .5, u * 1.3, ac), R(cx - u * .25, base - u * 5.8, u * 1.6, u * .4, ac, u * .2), R(cx - u * .9, base - u * 3.0, u * 1.8, u * 1.4, bg, u * .12, .9)]
    if scene:  # companion props for wide hero images
        parts += [R(cx + u * 3.4, base - u * 2.4, u * 1.8, u * 2.4, ac, u * .3, .85), R(cx - u * 5.4, base - u * 3.0, u * 1.6, u * 3.0, fg, u * .3, .55),
                  f'<circle cx="{w * .86:.1f}" cy="{h * .2:.1f}" r="{u * 1.6:.1f}" fill="{ac}" opacity=".25"/>']
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">' + "".join(parts) + "</svg>"


def svg_lab(w, h, pal=0):
    bg, fg, ac = PALETTES[pal]
    p = [f'<rect width="{w}" height="{h}" fill="{bg}"/>', f'<rect y="{h * .72}" width="{w}" height="{h * .28}" fill="{fg}" opacity=".9"/>']
    for i, x in enumerate([.18, .36, .54, .72]):
        hh = h * (.22 + .05 * (i % 2))
        p.append(f'<rect x="{w * x:.1f}" y="{h * .72 - hh:.1f}" width="{w * .09:.1f}" height="{hh:.1f}" rx="6" fill="#fff" opacity=".85"/><rect x="{w * x:.1f}" y="{h * .72 - hh * .5:.1f}" width="{w * .09:.1f}" height="{hh * .5:.1f}" rx="6" fill="{ac}" opacity=".8"/>')
    p.append(f'<circle cx="{w * .86:.1f}" cy="{h * .2:.1f}" r="{h * .09:.1f}" fill="{ac}" opacity=".3"/>')
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">' + "".join(p) + "</svg>"


def write(path, content, binary=False):
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "wb" if binary else "w", encoding=None if binary else "utf-8") as f:
        f.write(content)


def make_pdf(title, lines):
    """Tiny valid one-page PDF (placeholder documents)."""
    def esc(s): return s.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")
    content = ["BT /F1 22 Tf 60 760 Td (" + esc(title) + ") Tj ET"]
    y = 720
    for ln in lines:
        content.append(f"BT /F1 12 Tf 60 {y} Td ({esc(ln)}) Tj ET"); y -= 20
    stream = "\n".join(content).encode("latin-1", "replace")
    objs = [b"<< /Type /Catalog /Pages 2 0 R >>", b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
            b"<< /Length " + str(len(stream)).encode() + b" >>\nstream\n" + stream + b"\nendstream",
            b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"]
    out = b"%PDF-1.4\n"; offs = []
    for i, o in enumerate(objs, 1):
        offs.append(len(out)); out += f"{i} 0 obj\n".encode() + o + b"\nendobj\n"
    x = len(out); out += f"xref\n0 {len(objs) + 1}\n0000000000 65535 f \n".encode()
    for o in offs: out += f"{o:010d} 00000 n \n".encode()
    out += f"trailer\n<< /Size {len(objs) + 1} /Root 1 0 R >>\nstartxref\n{x}\n%%EOF".encode()
    return out


# ----------------------------------------------------------------------------
# Shared components
# ----------------------------------------------------------------------------
C = CONFIG
NAV = [("index.html", "Home"), ("about.html", "About Us"), ("quality.html", "Certificate / Quality"), ("testing.html", "Testing Principle"),
       ("gallery.html", "Gallery"), ("services.html", "Services")]
LOGO = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f8f5ee" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c4 3 6 6 6 9a6 6 0 0 1-12 0c0-3 2-6 6-9z"/><path d="M12 21V11"/></svg>'


def brand(foot=False):
    return f'<a class="brand" href="index.html" aria-label="{C["name_en"]} home"><span class="mark">{LOGO}</span><span><b>{C["name_en"]} <span lang="ko">{C["name_ko"]}</span></b><small>{C["tagline"].upper() if foot else "KOREA · EST. [YEAR TBC]"}</small></span></a>'


def header(active):
    li = "".join(f'<li><a class="nl" href="{h}"{" aria-current=\"page\"" if h == active else ""}>{t}</a></li>' for h, t in NAV)
    # keep the mega menu short: first two products per category
    mega = ""
    for s, n, d in CATS:
        ps = [p for p in PRODUCTS if p["cat"] == s][:3]
        mega += f'<div><h4>{n} <span class="sr-only">— {d}</span></h4>' + "".join(f'<a href="{p["slug"]}.html">{p["name"]}</a>' for p in ps) + f'<a href="products.html?cat={s}"><strong>All {n} →</strong></a></div>'
    mega += '<div class="all"><a href="products.html"><strong>Browse the full product range →</strong></a> &nbsp; <a href="products.html#catalogue">Download catalogues →</a></div>'
    pa = ' aria-current="page"' if active == "products.html" else ""
    return f'''<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"><i></i></div>
<div class="topbar"><div class="wrap">
  <div class="group"><span class="lang" title="Korea">🇰🇷 <span lang="ko">한국어</span> · KR</span><a class="hide-s" href="tel:{C["phone_tel"]}">Toll-free: {C["phone"]}</a></div>
  <div class="group right"><a href="mailto:{C["email"]}">{C["email"]}</a><a href="login.html">Login</a></div>
</div></div>
<header class="site-header"><div class="wrap">
  {brand()}
  <button class="menu-btn" aria-expanded="false" aria-controls="site-nav" aria-label="Menu"><span></span></button>
  <nav class="nav" id="site-nav" aria-label="Main"><ul>{li}
    <li class="has-mega"><button class="nl" aria-expanded="false" aria-haspopup="true"{pa}>Products ▾</button><div class="mega">{mega}</div></li>
    <li><a class="nl" href="contact.html"{' aria-current="page"' if active == "contact.html" else ""}>Contact Us</a></li></ul></nav>
</div></header>'''


def footer():
    cats = "".join(f'<li><a href="products.html?cat={s}">{n}</a></li>' for s, n, d in CATS)
    return f'''<footer class="footer"><div class="wrap">
  <div class="fgrid">
    <div>{brand(True)}<p style="margin-top:1em;max-width:36ch">Korean product company. [Add a short, verified company description here.]</p>
      <div class="social" aria-label="Social media"><a href="#" aria-label="Instagram">IG</a><a href="#" aria-label="YouTube">YT</a><a href="#" aria-label="LinkedIn">in</a><a href="#" aria-label="Naver Blog">N</a></div></div>
    <div><h4>Quick links</h4><ul><li><a href="about.html">About us</a></li><li><a href="quality.html">Certificate / Quality</a></li><li><a href="testing.html">Testing principle</a></li><li><a href="gallery.html">Gallery</a></li><li><a href="services.html">Services</a></li><li><a href="contact.html">Contact us</a></li></ul></div>
    <div><h4>Products</h4><ul>{cats}<li><a href="products.html#catalogue">Catalogue downloads</a></li></ul></div>
    <div><h4>Customer support</h4><ul><li>Toll-free: <a href="tel:{C["phone_tel"]}">{C["phone"]}</a></li><li><a href="mailto:{C["email"]}">{C["email"]}</a></li><li>{C["address"]}</li><li>{C["hours"]}</li></ul></div>
  </div>
  <div class="fbottom"><span>© {C["year"]} {C["legal"]}. All rights reserved.</span>
    <span class="legal"><a href="privacy.html">Privacy Policy</a><a href="terms.html">Terms &amp; Conditions</a></span>
    <label class="sr-only" for="lang-sel">Language</label><select id="lang-sel" aria-label="Language"><option>English</option><option disabled>한국어 (coming soon)</option></select></div>
</div></footer>
<button class="to-top" aria-label="Back to top" type="button">↑</button>'''


def page(fname, title, body, desc="", active=None, extra_head="", scripts=True, dialogs=""):
    full_title = f"{title} | {C['name_en']} {C['name_ko']}" if title != "Home" else f"{C['name_en']} {C['name_ko']} — {C['tagline']}"
    html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{full_title}</title>
<meta name="description" content="{desc or C["tagline"]}">
<meta name="theme-color" content="#1f3a2e">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
{extra_head}
</head>
<body>
{header(active or fname)}
<main id="main">
{body}
</main>
{footer()}
{dialogs}
<script src="assets/js/data.js"></script>
<script src="assets/vendor/gsap.min.js" defer></script>
<script src="assets/vendor/ScrollTrigger.min.js" defer></script>
<script src="assets/js/app.js" defer></script>
</body></html>'''
    write(fname, html)


def hero_inner(title, lead, crumb, eyebrow=""):
    return f'''<section class="page-hero"><div class="wrap">
<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / {crumb}</nav>
{f'<span class="eyebrow">{eyebrow}</span><br>' if eyebrow else ""}<h1>{title}</h1><p class="lead">{lead}</p></div></section>'''


def img(name, alt, w=800, h=600, extra=""):
    return f'<img src="assets/img/{name}.svg" alt="{alt}" width="{w}" height="{h}" loading="lazy" decoding="async" {extra}>'


# ---------- reusable sections ----------
def testing_section(full=False):
    steps = "".join(
        f'<article class="step" data-n="{i}"><h3>{t}</h3><p>{d}</p><div class="meta">' + "".join(f'<span class="chip">{c}</span>' for c in tags) + '</div></article>'
        for i, (t, d, tags) in enumerate(PROCESS["testing"], 1))
    return f'''<section class="section" id="testing" aria-labelledby="t-h"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow" data-reveal>Testing process</span><h2 id="t-h" data-reveal>Every product is tested before it reaches you.</h2>
  <p class="lead" data-reveal data-delay=".1">An overview of our quality-assurance route, from incoming inspection to release approval. <span class="tbc">Content to be verified with the business owner</span></p></div>
  <a class="arrow-link" href="testing.html" data-reveal>Testing principle <span>→</span></a></div>
  <div class="test-grid">
    <div class="test-media"><div class="reveal-img" data-clip>{img("lab","Laboratory testing area (placeholder illustration)",1200,900)}
      <div class="badge-float"><b>≈ 1 month</b>Evaluation period shown on the wireframe as “1M” <span class="tbc">to be confirmed</span></div></div>
      <div class="doc-links"><a class="arrow-link" href="quality.html#reports">Test reports <span>→</span></a><a class="arrow-link" href="quality.html#certificates">Certificates <span>→</span></a></div></div>
    <div class="steps" aria-label="Testing steps"><div class="rail" aria-hidden="true"><i></i></div>{steps}</div>
  </div></div></section>'''


def connector():
    return '''<div class="connector" aria-hidden="true"><svg viewBox="0 0 60 170" fill="none">
<line class="line-bg" x1="30" y1="0" x2="30" y2="150" stroke-width="2" stroke-dasharray="4 6"/>
<line class="line" x1="30" y1="0" x2="30" y2="150" stroke-width="3" stroke-linecap="round"/>
<path class="head" d="M18 142 L30 160 L42 142 Z"/></svg></div>'''


def dev_section(flip=False):
    tl = "".join(f'<li><b>{t}</b><span>{d}</span></li>' for t, d in PROCESS["development"])
    return f'''<section class="section alt" id="development" aria-labelledby="d-h"><div class="wrap">
  <div class="dev-grid{" flip" if flip else ""}">
    <div class="dev-media"><div class="reveal-img" data-clip>{img("intermediate","Intermediate product development stage (placeholder illustration)",1200,900)}</div></div>
    <div><span class="eyebrow">Intermediate product</span><h2 id="d-h">From verified test results to finished product.</h2>
      <p class="lead">Tested results feed directly into the development stage, where an intermediate product is refined, checked and prepared for production. <span class="tbc">Adapt to your real process</span></p>
      <ol class="timeline">{tl}</ol>
      <table class="spec-table"><tr><th>Stage duration</th><td>[TBC]</td></tr><tr><th>Quality checkpoints</th><td>[TBC]</td></tr><tr><th>Manufacturing site</th><td>[TBC]</td></tr></table>
      <a class="btn btn-primary" href="products.html">Explore related products <span aria-hidden="true">→</span></a></div>
  </div></div></section>'''


def products_block(per_page=10, full=False, instant=False):
    chips = '<button type="button" data-cat="all" aria-pressed="true">All</button>' + "".join(f'<button type="button" data-cat="{s}" aria-pressed="false">{n}</button>' for s, n, d in CATS)
    docs = "".join(f'''<article class="doc-card" data-reveal><img src="assets/img/doc-{i % 3}.svg" alt="" width="96" height="128" loading="lazy">
      <div><h3>{d["title"]}</h3><p>{d["kind"]} — {d["desc"]}</p></div><a class="btn btn-ghost btn-sm" href="{d["file"]}" download>Download</a></article>''' for i, d in enumerate(CATALOGUE))
    return f'''<section class="section" id="products" aria-labelledby="p-h"><div class="wrap">
  <div class="sec-head"><div><span class="eyebrow">Products &amp; catalogue</span><h2 id="p-h">Find the right product.</h2>
  <p class="lead">Browse by series, compare specifications or download our catalogues. <span class="tbc">Sample dataset</span></p></div></div>
  <div data-tabs>
    <div class="tabs-bar" role="tablist" aria-label="Products and catalogue"><button role="tab" id="tab-products" aria-controls="panel-products" data-hash="products">Products</button>
      <button role="tab" id="tab-catalogue" aria-controls="panel-catalogue" data-hash="catalogue">Catalogue</button><span class="tab-ink" aria-hidden="true"></span></div>
    <div role="tabpanel" id="panel-products" aria-labelledby="tab-products" tabindex="0">
      <div data-product-grid data-per-page="{per_page}"{" data-instant=\"1\"" if instant else ""}>
        <div class="toolbar"><div class="filters" role="group" aria-label="Filter by series">{chips}</div>
          <div class="search"><label class="sr-only" for="q">Search products</label><input id="q" type="search" placeholder="Search products or model…"></div></div>
        <div class="grid" aria-live="polite"></div>
        <noscript><p class="state">Enable JavaScript to browse products, or <a href="products.html">view the product list</a>.</p></noscript>
        <div class="more" hidden><p><span></span></p><button class="btn btn-ghost" type="button">Load more</button></div>
      </div></div>
    <div role="tabpanel" id="panel-catalogue" aria-labelledby="tab-catalogue" tabindex="0" hidden>
      <div class="docs-list">{docs}</div>
      <div class="panel" style="margin-top:34px"><h3>Request the full catalogue</h3><p style="margin-bottom:1.2rem">Leave your details and we will send the latest full catalogue.</p>
        {contact_form("catalogue", compact=True)}</div>
    </div>
  </div></div></section>'''


def contact_form(kind="contact", compact=False):
    extra = '' if compact else '<div class="row"><div><label for="f-company-' + kind + '">Company</label><input id="f-company-' + kind + '" name="company" autocomplete="organization"></div><div><label for="f-product-' + kind + '">Product / model</label><input id="f-product-' + kind + '" name="product" placeholder="e.g. HK-A101"></div></div>'
    msg = '' if compact else f'<div><label for="f-msg-{kind}">Message *</label><textarea id="f-msg-{kind}" name="message" required></textarea><div class="field-err" data-err></div></div>'
    return f'''<form class="form" data-form="{kind}" novalidate>
<div class="row"><div><label for="f-name-{kind}">Name *</label><input id="f-name-{kind}" name="name" required autocomplete="name"><div class="field-err" data-err></div></div>
<div><label for="f-email-{kind}">Email *</label><input id="f-email-{kind}" name="email" type="email" required autocomplete="email"><div class="field-err" data-err></div></div></div>
{extra}{msg}
<input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
<label class="check"><span style="display:contents"><input type="checkbox" name="consent" required> <span>I agree to be contacted about my enquiry. See our <a href="privacy.html">Privacy Policy</a>.</span></span></label><div class="field-err" data-err></div>
<div><button class="btn btn-primary" type="submit">{"Request catalogue" if compact else "Send message"}</button></div>
<div class="form-msg" aria-live="polite"></div></form>'''


DIALOGS = '''<dialog id="qv-dialog" aria-label="Quick view"><button class="dlg-x" aria-label="Close">×</button><div class="qv-body"></div></dialog>
<dialog id="cmp-dialog" aria-label="Compare products"><button class="dlg-x" aria-label="Close">×</button><div class="cmp-wrap"></div></dialog>
<div class="compare-bar" role="region" aria-label="Compare"><span class="cmp-count">0 selected</span><button class="btn btn-gold btn-sm cmp-go" disabled>Compare</button><button class="btn btn-ghost-light btn-sm cmp-clear">Clear</button></div>'''

# ----------------------------------------------------------------------------
# Pages
# ----------------------------------------------------------------------------
def build_pages():
    # ---- Home
    slides = [
        ("Premium quality, proven by testing.", "A short supporting line about the featured product. [Replace with real copy]", "hero-1"),
        ("Crafted in Korea with care.", "Highlight a second product or collection here. [Replace with real copy]", "hero-2"),
        ("Documented from lab to delivery.", "Highlight quality, certification or service. [Replace with real copy]", "hero-3"),
    ]
    sl = "".join(f'''<div class="hero-slide" role="group" aria-roledescription="slide" aria-label="{i + 1} of {len(slides)}"><div class="bg" aria-hidden="true"><img src="assets/img/{im}.svg" alt="" width="1600" height="900"{" fetchpriority=\"high\"" if i == 0 else " loading=\"lazy\""}></div>
<div class="wrap"><div class="hero-copy"><span class="eyebrow">Featured {i + 1} / {len(slides)}</span><h1>{h}</h1><p>{p}</p>
<div class="hero-cta"><a class="btn btn-gold" href="#products">Explore Products</a><a class="btn btn-ghost-light" href="contact.html">Contact Sales</a></div></div></div></div>''' for i, (h, p, im) in enumerate(slides))
    dots = "".join(f'<button type="button" aria-label="Go to slide {i + 1}"></button>' for i in range(len(slides)))
    hero = f'''<section class="hero" aria-roledescription="carousel" aria-label="Featured products"><div class="hero-track">{sl}</div>
<div class="hero-ctrl"><div class="wrap"><div class="dots">{dots}</div><div class="hc-btns"><button class="hc-pause" type="button" aria-label="Pause slideshow">❚❚</button><button class="hc-prev arrow" type="button" aria-label="Previous slide">←</button><button class="hc-next arrow" type="button" aria-label="Next slide">→</button></div></div></div>
<span class="sr-only hero-live" aria-live="polite"></span></section>
<div class="stats"><div><b>[Years]</b><span>in business — to be confirmed</span></div><div><b>[Certifications]</b><span>to be supplied</span></div><div><b>[Products]</b><span>in the catalogue</span></div><div><b>[Markets]</b><span>served — to be confirmed</span></div></div>'''
    page("index.html", "Home", hero + testing_section() + connector() + dev_section() + products_block(10), "Korean product company: tested, documented, ready to quote.", dialogs=DIALOGS)

    # ---- About
    body = hero_inner("About us", "Who we are, what we make and how we work. [Replace with verified company story]", "About us", "한빛 · Our story") + f'''
<section class="section"><div class="wrap"><div class="split"><div class="split-media"><div class="reveal-img" data-clip>{img("about","Company building or team (placeholder illustration)",1200,900)}</div></div>
<div><span class="eyebrow">Our story</span><h2>A Korean company built on careful work.</h2><p class="lead">Write the real company history, founding year, location and mission here. <span class="tbc">Placeholder</span></p>
<p>Add two or three paragraphs about the company, its factory or laboratory, and the people behind the products.</p><a class="btn btn-primary" href="contact.html">Talk to our team</a></div></div></div></section>
<section class="section alt"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Values</span><h2>What we stand for</h2></div></div>
<div class="cards-3" data-stagger><div class="panel"><div class="ic">01</div><h3>Quality first</h3><p>Describe your quality commitment.</p></div><div class="panel"><div class="ic">02</div><h3>Transparent testing</h3><p>Describe how results are recorded and shared.</p></div><div class="panel"><div class="ic">03</div><h3>Long-term partnership</h3><p>Describe how you work with customers.</p></div></div></div></section>'''
    page("about.html", "About Us", body, "About the company")

    # ---- Quality
    certs = "".join(f'<div class="cert"><div class="seal">Certificate {i}<br>[scan / image to be supplied]</div><b>[Certificate name]</b><small style="color:var(--muted)">Issuer · Valid until [TBC]</small></div>' for i in range(1, 5))
    body = hero_inner("Certificate &amp; quality", "Certifications and quality-management information. No certification is claimed until real documents are supplied.", "Certificate / Quality", "Quality") + f'''
<nav class="subnav" aria-label="On this page"><div class="wrap"><a href="#policy">Quality policy</a><a href="#certificates">Certificates</a><a href="#reports">Reports</a><a href="#assurance">Assurance</a></div></nav>
<section class="section" id="policy"><div class="wrap"><div class="split"><div><span class="eyebrow">Quality policy</span><h2>Our quality commitment</h2><p class="lead">Write the real quality policy here.</p><p>Describe quality-management practices, responsibilities and review cycles.</p></div>
<div class="split-media"><div class="reveal-img" data-clip>{img("lab","Quality control (placeholder illustration)",1200,900)}</div></div></div></div></section>
<section class="section alt" id="certificates"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Certificates</span><h2>Certifications &amp; approvals</h2><p class="lead">Upload certificate scans and list issuer, number and validity. <span class="tbc">Placeholders</span></p></div></div><div class="cards-3" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))" data-stagger>{certs}</div></div></section>
<section class="section" id="reports"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Reports</span><h2>Test reports</h2></div></div>
<div class="docs-list"><article class="doc-card"><img src="assets/img/doc-1.svg" alt="" width="96" height="128"><div><h3>Quality &amp; testing summary</h3><p>Placeholder PDF — replace with real report.</p></div><a class="btn btn-ghost btn-sm" href="assets/docs/quality-testing-summary.pdf" download>Download</a></article>
<article class="doc-card"><img src="assets/img/doc-2.svg" alt="" width="96" height="128"><div><h3>Certificates pack</h3><p>Placeholder PDF — replace with real certificates.</p></div><a class="btn btn-ghost btn-sm" href="assets/docs/certificates.pdf" download>Download</a></article></div></div></section>
<section class="section alt" id="assurance"><div class="wrap"><div class="cards-3" data-stagger><div class="panel"><h3>Traceability</h3><p>Describe batch tracking.</p></div><div class="panel"><h3>Audits</h3><p>Describe internal / external audits.</p></div><div class="panel"><h3>Continuous improvement</h3><p>Describe corrective action process.</p></div></div>
<p style="margin-top:2rem"><a class="btn btn-primary" href="testing.html">See our testing principle</a></p></div></section>'''
    page("quality.html", "Certificate & Quality", body, "Certificates and quality assurance", active="quality.html")

    # ---- Testing
    stds = "".join(f'<tr><th>{t}</th><td>[Standard / method reference to be supplied]</td></tr>' for t, d, g in PROCESS["testing"][:4])
    body = hero_inner("Testing principle", "How every product is evaluated before release.", "Testing principle", "Testing & manufacturing") + f'''
<nav class="subnav" aria-label="On this page"><div class="wrap"><a href="#testing">Procedure</a><a href="#standards">Standards</a><a href="#development">Development</a><a href="#reports">Reports</a></div></nav>
{testing_section()}{connector()}{dev_section(flip=True)}
<section class="section" id="standards"><div class="wrap"><div class="sec-head"><div><span class="eyebrow">Standards</span><h2>Methods &amp; standards</h2><p class="lead">List the real test methods and standards. <span class="tbc">To be supplied</span></p></div></div><table class="spec-table" style="max-width:820px">{stds}</table></div></section>
<section class="section dark" id="reports"><div class="wrap" style="text-align:center"><h2>Want to see the results?</h2><p class="lead" style="margin-inline:auto">Request available test reports for any product.</p><a class="btn btn-gold" href="contact.html#quote">Request reports</a></div></section>'''
    page("testing.html", "Testing Principle", body, "Testing principles and procedure")

    # ---- Gallery
    cats = ["Products", "Laboratory", "Factory"]
    figs = ""
    for i in range(9):
        figs += f'<figure data-cat="{cats[i % 3]}" data-reveal><img src="assets/img/gallery-{i + 1}.svg" alt="Gallery image {i + 1} (placeholder)" width="800" height="{[800, 600, 1000][i % 3]}" loading="lazy"><figcaption>[Caption {i + 1}] — {cats[i % 3]}</figcaption></figure>'
    chips = '<button type="button" data-cat="all" aria-pressed="true" class="">All</button>' + "".join(f'<button type="button" data-cat="{c}" aria-pressed="false">{c}</button>' for c in cats)
    body = hero_inner("Gallery", "Products, laboratory and production. Replace the placeholder artwork with real photography.", "Gallery") + f'''
<section class="section"><div class="wrap"><div class="filters gallery-filter" role="group" aria-label="Filter gallery">{chips}</div><div class="gallery">{figs}</div></div></section>
<dialog id="lightbox" class="lightbox" aria-label="Image viewer"><button class="dlg-x" aria-label="Close">×</button><img alt="" src=""><p></p></dialog>'''
    page("gallery.html", "Gallery", body, "Photo gallery")
    gal = open(os.path.join(OUT, "gallery.html"), encoding="utf-8").read()
    gal = gal.replace(".filters button", ".filters button")
    write("gallery.html", gal)

    # ---- Services
    svc = [("Product consulting", "Help choosing the right product for your application."), ("Custom specification", "Tailored products and packaging. [Confirm availability]"), ("Testing & reporting", "Test reports for your batches. [Confirm availability]"), ("Logistics support", "Packing, labelling and shipping coordination.")]
    sv = "".join(f'<div class="panel"><div class="ic">0{i}</div><h3>{t}</h3><p>{d}</p></div>' for i, (t, d) in enumerate(svc, 1))
    faq = "".join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in [("What is the minimum order quantity?", "[To be supplied]"), ("Do you ship internationally?", "[To be supplied]"), ("Can I get samples?", "[To be supplied]")])
    body = hero_inner("Services", "How we support you before and after purchase.", "Services", "Services") + f'''<section class="section"><div class="wrap"><div class="cards-3" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))" data-stagger>{sv}</div></div></section>
<section class="section alt"><div class="wrap" style="max-width:820px"><h2>Frequently asked questions</h2><div class="faq">{faq}</div></div></section>'''
    page("services.html", "Services", body, "Services")

    # ---- Products listing
    body = hero_inner("Products", "Browse the range, compare specifications and download catalogues.", "Products", "Product catalogue") + products_block(12)
    page("products.html", "Products", body, "Product catalogue", dialogs=DIALOGS)

    # ---- Product detail pages
    for p in PRODUCTS:
        cat = [c for c in CATS if c[0] == p["cat"]][0]
        rel = "".join(f'<article class="card"><div class="ph">{img("product-" + q["id"], q["name"], 480, 480)}<span class="tag">{cat[1]}</span></div><div class="bd"><span class="model">{q["model"]}</span><h3><a href="{q["slug"]}.html">{q["name"]}</a></h3></div></article>' for q in [x for x in PRODUCTS if x["cat"] == p["cat"] and x["id"] != p["id"]][:3])
        specs = "".join(f'<tr><th>{a}</th><td>{b}</td></tr>' for a, b in p["specs"])
        body = hero_inner(p["name"], p["short"], f'<a href="products.html">Products</a> / {p["name"]}', p["model"]) + f'''
<section class="section"><div class="wrap"><div class="pd-grid"><div class="reveal-img" data-clip>{img("product-" + p["id"], p["name"], 900, 900)}</div>
<div><span class="eyebrow">{cat[1]} · {cat[2]}</span><h2>{p["name"]}</h2><p class="lead">{p["desc"]}</p><table class="spec-table">{specs}</table>
<div class="pd-actions"><a class="btn btn-primary" href="contact.html?product={p["model"]}#quote">Request a quote</a><a class="btn btn-ghost" href="assets/docs/technical-specifications.pdf" download>Technical sheet</a><a class="btn btn-ghost" href="products.html">← All products</a></div></div></div></div></section>
<section class="section alt"><div class="wrap"><div class="sec-head"><div><h2>Related products</h2></div></div><div class="grid cols-3">{rel}</div></div></section>'''
        page(p["slug"] + ".html", p["name"], body, p["short"], active="products.html")

    # ---- Contact
    body = hero_inner("Contact us", "Questions, quotes or catalogue requests — we will reply as soon as we can.", "Contact us", "Get in touch") + f'''
<section class="section" id="quote"><div class="wrap"><div class="contact-grid"><div><h2>Contact details</h2><ul class="info-list">
<li><b>Toll-free</b><a href="tel:{C["phone_tel"]}">{C["phone"]}</a> <span class="tbc">placeholder</span></li><li><b>Email</b><a href="mailto:{C["email"]}">{C["email"]}</a> <span class="tbc">placeholder</span></li>
<li><b>Address</b>{C["address"]}</li><li><b>Hours</b>{C["hours"]}</li></ul><div class="map-ph">Map placeholder — embed your map here once the address is confirmed.</div></div>
<div class="panel"><h2 style="font-size:1.5rem">Send us a message</h2>{contact_form("contact")}</div></div></div></section>'''
    page("contact.html", "Contact Us", body, "Contact and request a quote")

    # ---- Login
    body = hero_inner("Login", "Account access for customers and staff.", "Login") + f'''<section class="section"><div class="wrap"><div class="login-box"><p class="notice" style="margin-bottom:1.2rem">Login is a front-end placeholder. This is a B2B catalogue site, so accounts are optional — connect an auth provider (see README) or remove this page.</p>
<form class="form" data-form="login" novalidate><div><label for="l-email">Email *</label><input id="l-email" name="email" type="email" required autocomplete="username"><div class="field-err" data-err></div></div>
<div><label for="l-pass">Password *</label><input id="l-pass" name="password" type="password" required autocomplete="current-password"><div class="field-err" data-err></div></div>
<button class="btn btn-primary" type="submit">Log in</button><div class="form-msg" aria-live="polite"></div></form></div></div></section>'''
    page("login.html", "Login", body, "Login")

    # ---- Legal
    def legal(fname, title, secs):
        s = "".join(f"<h2>{h}</h2><p>{t}</p>" for h, t in secs)
        page(fname, title, hero_inner(title, "Draft template — have it reviewed by a qualified professional before publishing.", title) + f'<section class="section"><div class="wrap prose"><p class="notice">This is a template, not legal advice. Replace bracketed items and obtain legal review (including Korea’s PIPA and any GDPR requirements that apply to you).</p>{s}</div></section>', title)
    legal("privacy.html", "Privacy Policy", [("Who we are", f"{C['legal']} [registration details to be supplied] operates this website."), ("Information we collect", "Information you submit through forms (name, email, company, message) and basic technical data. [Confirm analytics and cookies actually used.]"), ("How we use it", "To respond to enquiries, send requested catalogues and improve the website."), ("Retention and your rights", "[State retention period and how to access, correct or delete data.]"), ("Contact", f"Privacy questions: {C['email']}.")])
    legal("terms.html", "Terms & Conditions", [("Use of this website", "Content is provided for information. Product details may change without notice."), ("Quotations and orders", "Prices and availability are confirmed by written quotation. [Add payment, delivery and returns terms.]"), ("Intellectual property", "Website content, logos and images belong to the company or its licensors."), ("Liability", "[Add limitation of liability wording.]"), ("Governing law", "[Specify governing law and jurisdiction.]")])


def main():
    # images
    write("assets/img/favicon.svg", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#1f3a2e"/><path d="M16 7c4 3 6 6 6 9a6 6 0 0 1-12 0c0-3 2-6 6-9z" fill="none" stroke="#f8f5ee" stroke-width="2"/></svg>')
    for p in PRODUCTS:
        write(f"assets/img/product-{p['id']}.svg", svg_art(p["shape"], p["pal"], 800, 800))
    for i, sh in enumerate(["jar", "bottle", "box"], 1):
        write(f"assets/img/hero-{i}.svg", svg_art(sh, i + 1 if i < 3 else 0, 1600, 900, scene=True))
    write("assets/img/lab.svg", svg_lab(1200, 900, 1)); write("assets/img/intermediate.svg", svg_art("tube", 3, 1200, 900, scene=True)); write("assets/img/about.svg", svg_art("box", 4, 1200, 900, scene=True))
    for i in range(9):
        w, h = 800, [800, 600, 1000][i % 3]
        write(f"assets/img/gallery-{i + 1}.svg", svg_lab(w, h, i % 5) if i % 3 == 1 else svg_art(SHAPES[i % 6], i % 5, w, h, scene=True))
    for i in range(3):
        write(f"assets/img/doc-{i}.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 128"><rect width="96" height="128" fill="{PALETTES[i][1]}"/><rect x="12" y="14" width="44" height="6" fill="{PALETTES[i][2]}"/><rect x="12" y="28" width="60" height="3" fill="#fff" opacity=".5"/><rect x="12" y="36" width="52" height="3" fill="#fff" opacity=".4"/><rect x="12" y="84" width="72" height="30" fill="{PALETTES[i][0]}" opacity=".9"/></svg>')
    # PDFs (placeholders)
    for d in CATALOGUE:
        write(d["file"], make_pdf(d["title"], ["PLACEHOLDER DOCUMENT", "", "Replace this file with the real document,", "keeping the same file name (or edit build.py).", "", C["legal"] + " - " + C["email"]]), binary=True)
    # data.js
    prods = []
    for p in PRODUCTS:
        cl = [c[1] for c in CATS if c[0] == p["cat"]][0]
        prods.append(dict(id=p["id"], name=p["name"], model=p["model"], cat=p["cat"], catLabel=cl, short=p["short"], desc=p["desc"], specs=p["specs"], img=f"assets/img/product-{p['id']}.svg", url=p["slug"] + ".html"))
    site = dict(name=C["name_en"], phone=C["phone"], email=C["email"], formEndpoint=C["form_endpoint"], products=prods, catalogue=CATALOGUE)
    write("assets/js/data.js", "/* Generated by build.py — edit build.py (or this file for quick tweaks). */\nwindow.SITE = " + json.dumps(site, ensure_ascii=False, indent=2) + ";\n")
    build_pages()
    print("built", len([f for f in os.listdir(OUT) if f.endswith(".html")]), "pages")


if __name__ == "__main__":
    main()
