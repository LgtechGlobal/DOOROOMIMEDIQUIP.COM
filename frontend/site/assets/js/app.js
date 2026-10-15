/* Hanbit Korea — site behaviour. Requires assets/js/data.js (window.SITE).
   GSAP + ScrollTrigger are optional: if they fail to load, all content stays visible. */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduced = function () { return mqReduce.matches; };
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  var S = window.SITE || { products: [], catalogue: [] };

  /* ---------- Header, menu, progress, back-to-top ---------- */
  var header = $(".site-header"), bar = $(".progress i"), toTop = $(".to-top");
  var ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
      if (header) header.classList.toggle("scrolled", y > 24);
      if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
      if (toTop) toTop.classList.toggle("show", y > 700);
      ticking = false;
    });
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  if (toTop) toTop.addEventListener("click", function () { scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" }); });

  var menuBtn = $(".menu-btn"), nav = $("#site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }); });
  }
  $$(".has-mega").forEach(function (li) {
    var b = $("button", li);
    b.addEventListener("click", function () { var o = li.classList.toggle("open"); b.setAttribute("aria-expanded", o); });
    li.addEventListener("keydown", function (e) { if (e.key === "Escape") { li.classList.remove("open"); b.setAttribute("aria-expanded", "false"); b.focus(); } });
    document.addEventListener("click", function (e) { if (!li.contains(e.target) && innerWidth > 1060) { li.classList.remove("open"); b.setAttribute("aria-expanded", "false"); } });
  });

  /* ---------- Reveal animations (once) ---------- */
  function initReveals() {
    if (!hasGsap || reduced()) return;
    $$("[data-reveal]").forEach(function (el) {
      var kind = el.getAttribute("data-reveal");
      var from = { opacity: 0, y: 28 };
      if (kind === "left") from = { opacity: 0, x: -40 };
      if (kind === "right") from = { opacity: 0, x: 40 };
      if (kind === "scale") from = { opacity: 0, scale: .96 };
      gsap.from(el, Object.assign({ duration: .9, ease: "power3.out", delay: parseFloat(el.getAttribute("data-delay") || 0),
        scrollTrigger: { trigger: el, start: "top 88%", once: true } }, from));
    });
    $$("[data-stagger]").forEach(function (wrap) {
      gsap.from(wrap.children, { opacity: 0, y: 30, duration: .8, ease: "power3.out", stagger: .09,
        scrollTrigger: { trigger: wrap, start: "top 85%", once: true } });
    });
    $$("[data-clip]").forEach(function (el) {
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true }, onComplete: function () { el.style.clipPath = "none"; } });
      var img = $("img", el);
      if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    });
    /* alternating storytelling: restrained horizontal movement */
    $$(".split, .dev-grid").forEach(function (row) {
      var media = row.children[0], text = row.children[1];
      var flip = row.classList.contains("flip");
      if (!media || !text) return;
      var tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 78%", once: true } });
      tl.from(media, { opacity: 0, x: flip ? 40 : -40, duration: .9, ease: "power3.out" })
        .from(text, { opacity: 0, x: flip ? -40 : 40, duration: .9, ease: "power3.out" }, "-=.65");
    });
  }

  /* ---------- Hero slider ---------- */
  function initHero() {
    var hero = $(".hero"); if (!hero) return;
    var slides = $$(".hero-slide", hero), dots = $$(".dots button", hero), cur = 0, timer = null, playing = !reduced();
    var dur = 6500, pauseBtn = $(".hc-pause", hero), live = $(".hero-live", hero);
    hero.style.setProperty("--dur", dur + "ms");
    function go(i, user) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("active", k === cur); s.setAttribute("aria-hidden", k !== cur); });
      dots.forEach(function (d, k) { d.classList.toggle("active", k === cur); d.setAttribute("aria-current", k === cur ? "true" : "false"); });
      if (live) live.textContent = "Slide " + (cur + 1) + " of " + slides.length;
      restart();
    }
    function restart() { clearTimeout(timer); if (playing) timer = setTimeout(function () { go(cur + 1); }, dur); }
    function setPlay(p) {
      playing = p; hero.classList.toggle("static", !p); hero.classList.toggle("paused", !p);
      if (pauseBtn) { pauseBtn.textContent = p ? "❚❚" : "▶"; pauseBtn.setAttribute("aria-label", p ? "Pause slideshow" : "Play slideshow"); }
      restart();
    }
    $(".hc-prev", hero).addEventListener("click", function () { go(cur - 1); });
    $(".hc-next", hero).addEventListener("click", function () { go(cur + 1); });
    dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); }); });
    if (pauseBtn) pauseBtn.addEventListener("click", function () { setPlay(!playing); });
    hero.addEventListener("mouseenter", function () { if (playing) { hero.classList.add("paused"); clearTimeout(timer); } });
    hero.addEventListener("mouseleave", function () { if (playing) { hero.classList.remove("paused"); go(cur); } });
    hero.addEventListener("focusin", function () { if (playing) clearTimeout(timer); });
    hero.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") go(cur - 1); if (e.key === "ArrowRight") go(cur + 1); });
    /* swipe */
    var x0 = null;
    hero.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) go(cur + (dx < 0 ? 1 : -1));
    });
    document.addEventListener("visibilitychange", function () { document.hidden ? clearTimeout(timer) : restart(); });
    if (!playing) hero.classList.add("static");
    setPlay(playing); go(0);
    /* parallax */
    if (hasGsap && !reduced()) {
      var mm = gsap.matchMedia();
      mm.add("(min-width: 701px)", function () {
        gsap.to($$(".hero-slide .bg", hero), { yPercent: 8, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      });
      mm.add("(max-width: 700px)", function () {
        gsap.to($$(".hero-slide .bg", hero), { yPercent: 3, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      });
    }
    if (hasGsap && !reduced()) gsap.from(".hero-slide.active .hero-copy > *", { opacity: 0, y: 24, duration: .9, stagger: .1, ease: "power3.out", delay: .1 });
  }

  /* ---------- Testing: progress rail + current step ---------- */
  function initTesting() {
    var steps = $$(".step"), rail = $(".rail i"), wrap = $(".steps");
    if (!steps.length || !wrap) return;
    if (!hasGsap || reduced()) { steps.forEach(function (s) { s.classList.add("done"); }); if (rail) rail.style.transform = "scaleY(1)"; return; }
    gsap.fromTo(rail, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: wrap, start: "top 70%", end: "bottom 60%", scrub: .4 } });
    steps.forEach(function (s, i) {
      gsap.from(s, { opacity: 0, y: 36, duration: .8, ease: "power3.out", scrollTrigger: { trigger: s, start: "top 88%", once: true } });
      ScrollTrigger.create({ trigger: s, start: "top 62%", end: "bottom 62%",
        onToggle: function (self) { if (self.isActive) { steps.forEach(function (o, k) { o.classList.toggle("current", k === i); o.classList.toggle("done", k < i); }); } },
        onEnterBack: function () { steps.forEach(function (o, k) { o.classList.toggle("current", k === i); o.classList.toggle("done", k < i); }); } });
    });
  }

  /* ---------- Connector line ---------- */
  function initConnector() {
    var c = $(".connector"); if (!c) return;
    var line = $(".line", c), head = $(".head", c); if (!line) return;
    var len = line.getTotalLength();
    line.style.strokeDasharray = len;
    if (!hasGsap || reduced()) { line.style.strokeDashoffset = 0; if (head) head.style.opacity = 1; return; }
    line.style.strokeDashoffset = len;
    gsap.to(line, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: c, start: "top 80%", end: "bottom 45%", scrub: .5,
      onUpdate: function (s) { if (head) head.style.opacity = s.progress > .96 ? 1 : 0; } } });
    gsap.from($(".connector-label", c), { opacity: 0, y: 12, duration: .7, scrollTrigger: { trigger: c, start: "top 70%", once: true } });
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    $$("[data-tabs]").forEach(function (root) {
      var tabs = $$('[role="tab"]', root), panels = $$('[role="tabpanel"]', root), ink = $(".tab-ink", root);
      function moveInk(t) { if (!ink) return; ink.style.width = t.offsetWidth + "px"; ink.style.transform = "translateX(" + t.offsetLeft + "px)"; }
      function select(t, focus, user) {
        tabs.forEach(function (x, i) { var on = x === t; x.setAttribute("aria-selected", on); x.tabIndex = on ? 0 : -1; panels[i].hidden = !on; });
        moveInk(t); if (focus) t.focus();
        if (user && history.replaceState && t.dataset.hash) history.replaceState(null, "", "#" + t.dataset.hash);
      }
      tabs.forEach(function (t, i) {
        t.addEventListener("click", function () { select(t, false, true); });
        t.addEventListener("keydown", function (e) {
          var k = e.key, n = null;
          if (k === "ArrowRight") n = tabs[(i + 1) % tabs.length]; else if (k === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
          else if (k === "Home") n = tabs[0]; else if (k === "End") n = tabs[tabs.length - 1];
          if (n) { e.preventDefault(); select(n, true, true); }
        });
      });
      var start = tabs.filter(function (t) { return t.dataset.hash && location.hash === "#" + t.dataset.hash; })[0] || tabs[0];
      select(start); addEventListener("resize", function () { moveInk($('[aria-selected="true"]', root)); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { moveInk($('[aria-selected="true"]', root)); });
    });
  }

  /* ---------- Product grid ---------- */
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  function cardHTML(p) {
    var specs = p.specs.slice(0, 3).map(function (s) { return "<li>" + esc(s[0]) + ": " + esc(s[1]) + "</li>"; }).join("");
    return '<article class="card" data-id="' + p.id + '">' +
      '<div class="ph"><img loading="lazy" decoding="async" width="480" height="480" src="' + p.img + '" alt="' + esc(p.name) + '"><span class="tag">' + esc(p.catLabel) + '</span>' +
      '<button class="qv" type="button" aria-label="Quick view ' + esc(p.name) + '" data-qv="' + p.id + '">⤢</button></div>' +
      '<div class="bd"><span class="model">' + esc(p.model) + '</span><h3><a href="' + p.url + '">' + esc(p.name) + '</a></h3><p>' + esc(p.short) + '</p>' +
      '<ul class="specs">' + specs + '</ul>' +
      '<div class="acts"><a class="arrow-link" href="' + p.url + '">View details <span>→</span></a>' +
      '<a class="btn btn-ghost btn-sm quote" href="contact.html?product=' + encodeURIComponent(p.model) + '#quote">Quote</a></div>' +
      '<label class="cmp"><input type="checkbox" data-cmp="' + p.id + '"> Compare</label></div></article>';
  }
  function initGrid() {
    $$("[data-product-grid]").forEach(function (root) {
      var grid = $(".grid", root), filters = $(".filters", root), search = $("input[type=search]", root), more = $(".more", root);
      var perPage = parseInt(root.dataset.perPage || "10", 10), shown = perPage, cat = "all", q = "", list = S.products || [];
      var cmp = [], bar = $(".compare-bar"), dlgQ = $("#qv-dialog"), dlgC = $("#cmp-dialog");
      function skeleton() { grid.innerHTML = Array(Math.min(perPage, 5)).fill('<div class="skeleton" aria-hidden="true"></div>').join(""); grid.setAttribute("aria-busy", "true"); }
      function filtered() { return list.filter(function (p) { return (cat === "all" || p.cat === cat) && (!q || (p.name + " " + p.model + " " + p.short).toLowerCase().indexOf(q) > -1); }); }
      function render(animate) {
        var f = filtered(), vis = f.slice(0, shown);
        grid.removeAttribute("aria-busy");
        if (!list.length) { grid.innerHTML = '<div class="state err" role="alert">Product data could not be loaded. Please refresh, or <a href="contact.html">contact us</a>.</div>'; more.hidden = true; return; }
        if (!f.length) { grid.innerHTML = '<div class="state">No products match your search. <button class="arrow-link" style="background-color:transparent;border:0;cursor:pointer;font:inherit" data-reset>Clear filters</button></div>'; more.hidden = true; return; }
        grid.innerHTML = vis.map(cardHTML).join("");
        more.hidden = f.length <= shown;
        if (more.querySelector("span")) more.querySelector("span").textContent = "Showing " + vis.length + " of " + f.length;
        cmp.forEach(function (id) { var c = $('[data-cmp="' + id + '"]', grid); if (c) c.checked = true; });
        if (animate && hasGsap && !reduced()) gsap.from(grid.children, { opacity: 0, y: 24, duration: .55, stagger: .05, ease: "power3.out", clearProps: "all" });
      }
      if (filters) filters.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        cat = b.dataset.cat; shown = perPage; render(true);
      });
      if (search) search.addEventListener("input", function () { q = search.value.trim().toLowerCase(); shown = perPage; render(false); });
      $("button", more).addEventListener("click", function () { shown += perPage; render(false); });
      grid.addEventListener("click", function (e) {
        if (e.target.closest("[data-reset]")) { cat = "all"; q = ""; if (search) search.value = ""; $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.cat === "all"); }); render(true); }
        var qv = e.target.closest("[data-qv]"); if (qv) openQV(qv.dataset.qv);
      });
      grid.addEventListener("change", function (e) {
        var c = e.target.closest("[data-cmp]"); if (!c) return;
        var id = c.dataset.cmp;
        if (c.checked) { if (cmp.length >= 3) { c.checked = false; alert("You can compare up to 3 products."); return; } cmp.push(id); }
        else cmp = cmp.filter(function (x) { return x !== id; });
        updateBar();
      });
      function updateBar() {
        if (!bar) return; bar.classList.toggle("show", cmp.length > 0);
        $(".cmp-count", bar).textContent = cmp.length + " selected";
        $(".cmp-go", bar).disabled = cmp.length < 2;
      }
      function byId(id) { return list.filter(function (p) { return p.id === id; })[0]; }
      function openQV(id) {
        var p = byId(id); if (!p || !dlgQ) return;
        $(".qv-body", dlgQ).innerHTML = '<img src="' + p.img + '" alt="' + esc(p.name) + '"><div class="qv-info"><span class="model" style="color:var(--gold);font-weight:600;font-size:.78rem;letter-spacing:.1em">' + esc(p.model) + '</span><h2 style="font-size:1.6rem;margin-top:.2em">' + esc(p.name) + '</h2><p style="color:var(--muted)">' + esc(p.desc) + '</p><table class="spec-table">' +
          p.specs.map(function (s) { return "<tr><th>" + esc(s[0]) + "</th><td>" + esc(s[1]) + "</td></tr>"; }).join("") + '</table><div class="pd-actions" style="margin-top:1rem"><a class="btn btn-primary btn-sm" href="' + p.url + '">Full details</a><a class="btn btn-ghost btn-sm" href="contact.html?product=' + encodeURIComponent(p.model) + '#quote">Request quote</a></div></div>';
        dlgQ.showModal();
      }
      if (bar) {
        $(".cmp-clear", bar).addEventListener("click", function () { cmp = []; $$("[data-cmp]", grid).forEach(function (c) { c.checked = false; }); updateBar(); });
        $(".cmp-go", bar).addEventListener("click", function () {
          var ps = cmp.map(byId), labels = []; ps.forEach(function (p) { p.specs.forEach(function (s) { if (labels.indexOf(s[0]) < 0) labels.push(s[0]); }); });
          var html = '<table class="cmp-table"><thead><tr><th></th>' + ps.map(function (p) { return "<th>" + esc(p.name) + "<br><small>" + esc(p.model) + "</small></th>"; }).join("") + "</tr></thead><tbody>" +
            labels.map(function (l) { return "<tr><th>" + esc(l) + "</th>" + ps.map(function (p) { var m = p.specs.filter(function (s) { return s[0] === l; })[0]; return "<td>" + (m ? esc(m[1]) : "—") + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table>";
          $(".cmp-wrap", dlgC).innerHTML = "<h2>Compare products</h2>" + html; dlgC.showModal();
        });
      }
      $$("dialog").forEach(function (d) {
        d.addEventListener("click", function (e) { if (e.target === d || e.target.closest(".dlg-x")) d.close(); });
      });
      var qc = new URLSearchParams(location.search).get("cat");
      if (qc && filters) { var cb = $('button[data-cat="' + qc + '"]', filters); if (cb) { cat = qc; $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", x === cb); }); } }
      skeleton(); setTimeout(function () { render(true); }, root.dataset.instant ? 0 : 450);
    });
  }

  /* ---------- Forms (no backend required) ---------- */
  function initForms() {
    $$("form[data-form]").forEach(function (f) {
      var msg = $(".form-msg", f), btn = $("button[type=submit]", f);
      var prod = new URLSearchParams(location.search).get("product");
      if (prod && f.elements.product) f.elements.product.value = prod;
      if (prod && f.elements.message && !f.elements.message.value) f.elements.message.value = "I would like a quote for " + prod + ".\n";
      f.addEventListener("submit", function (e) {
        e.preventDefault(); var ok = true;
        $$("[data-err]", f).forEach(function (x) { x.textContent = ""; });
        $$("[required]", f).forEach(function (inp) {
          var err = inp.parentElement.querySelector("[data-err]"), v = (inp.type === "checkbox" ? inp.checked : inp.value.trim()), bad = !v;
          if (!bad && inp.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) bad = true;
          inp.setAttribute("aria-invalid", bad);
          if (bad) { ok = false; if (err) err.textContent = inp.type === "email" ? "Enter a valid email address." : "This field is required."; }
        });
        if (f.elements.website && f.elements.website.value) return; /* honeypot */
        if (!ok) { var first = $('[aria-invalid="true"]', f); if (first) first.focus(); return; }
        var data = {}; new FormData(f).forEach(function (v, k) { if (k !== "website") data[k] = v; });
        var kind = f.dataset.form;
        if (kind === "login") { msg.className = "form-msg bad"; msg.textContent = "Login is not connected yet. Connect your authentication service (see README) to enable accounts."; return; }
        btn.disabled = true; var old = btn.textContent; btn.textContent = "Sending…";
        function done(okk, text) { btn.disabled = false; btn.textContent = old; msg.className = "form-msg " + (okk ? "ok" : "bad"); msg.textContent = text; msg.setAttribute("role", okk ? "status" : "alert"); if (okk) f.reset(); }
        if (S.formEndpoint) {
          fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
            .then(function (r) { if (!r.ok) throw 0; done(true, "Thank you — your message has been sent. We will reply soon."); })
            .catch(function () { done(false, "Sorry, we could not send your message. Please email us at " + S.email + "."); });
        } else {
          var body = Object.keys(data).map(function (k) { return k + ": " + data[k]; }).join("\n");
          location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("[" + kind + "] " + (data.subject || data.name || "Website enquiry")) + "&body=" + encodeURIComponent(body);
          done(true, "Your email app should open with the message prepared. (Set SITE.formEndpoint in assets/js/data.js to send directly.)");
        }
      });
    });
  }

  /* ---------- Sticky sub-navigation ---------- */
  function initSubnav() {
    var nav = $(".subnav"); if (!nav) return;
    var links = $$("a", nav), map = links.map(function (a) { return $(a.getAttribute("href")); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { var i = map.indexOf(en.target); links.forEach(function (l, k) { l.classList.toggle("active", k === i); if (k === i) l.scrollIntoView({ block: "nearest", inline: "center" }); }); } });
    }, { rootMargin: "-35% 0px -60% 0px" });
    map.forEach(function (s) { if (s) io.observe(s); });
  }

  /* ---------- Gallery ---------- */
  function initGallery() {
    var g = $(".gallery"); if (!g) return;
    var box = $("#lightbox");
    $$("figure", g).forEach(function (f) {
      f.tabIndex = 0; f.setAttribute("role", "button");
      function open() { var im = $("img", f); $("img", box).src = im.src; $("img", box).alt = im.alt; $("p", box).textContent = $("figcaption", f).textContent; box.showModal(); }
      f.addEventListener("click", open); f.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    box.addEventListener("click", function (e) { if (e.target === box || e.target.closest(".dlg-x")) box.close(); });
    var fl = $(".gallery-filter");
    if (fl) fl.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      $$("button", fl).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      $$("figure", g).forEach(function (f) { f.hidden = !(b.dataset.cat === "all" || f.dataset.cat === b.dataset.cat); });
    });
  }

  function boot() {
    initHero(); initTabs(); initGrid(); initForms(); initSubnav(); initGallery();
    initReveals(); initTesting(); initConnector();
    if (hasGsap) addEventListener("load", function () { ScrollTrigger.refresh(); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
