(function () {
  if (window.sbRoll) return;
  var rm = window.matchMedia("(prefers-reduced-motion: reduce)");
  function clear(c) { return !c || c === "transparent" || c === "rgba(0, 0, 0, 0)"; }
  window.sbRoll = function (container, opts) {
    opts = opts || {};
    var kids = [].slice.call(container.children).filter(function (n) { return n.nodeType === 1 && getComputedStyle(n).position !== "absolute"; });
    var bgs = opts.backgrounds || [];
    var angled = [];
    kids.forEach(function (s, i) {
      s.style.position = s.style.position || "relative";
      if (getComputedStyle(s).position === "static") s.style.position = "relative";
      s.style.zIndex = String(i + 1);
      s.style.transformOrigin = "50% 0";
      var cbg = getComputedStyle(s).backgroundColor;
      if (opts.overlay && (clear(cbg) || /255, 255, 255/.test(cbg)) && !s.querySelector(":scope > [data-roll-overlay]")) {
        s.style.isolation = "isolate";
        var ov = document.createElement("div"); ov.setAttribute("data-roll-overlay", ""); ov.setAttribute("aria-hidden", "true");
        ov.style.cssText = opts.overlay; ov.style.position = "absolute"; ov.style.inset = "0"; ov.style.zIndex = "-1"; ov.style.pointerEvents = "none";
        s.insertBefore(ov, s.firstChild);
      }
      if (i === 0 && !opts.angleFirst) { if (bgs[i]) s.style.background = bgs[i]; return; }
      var cs = getComputedStyle(s);
      if (s.tagName !== "SECTION" || (cs.clipPath && cs.clipPath !== "none")) return;
      var bg = bgs[i] || (clear(cs.backgroundColor) ? (opts.fallback || "#FFFFFF") : cs.backgroundColor);
      var pt = parseFloat(cs.paddingTop) || 0;
      s.style.background = bg;
      s.style.boxShadow = "0 0 0 100vw " + bg;
      var prev = kids[i - 1]; if (prev && !prev.dataset.rollPad) { prev.dataset.rollPad = "1"; prev.style.paddingBottom = "calc(" + (parseFloat(getComputedStyle(prev).paddingBottom) || 0) + "px + 7vw + 64px)"; }
      s.style.marginTop = "calc(-7vw - 64px)";
      s.style.paddingTop = "calc(" + pt + "px + 7vw + 64px)";
      angled.push(s);
    });
    function clip() {
      var W = window.innerWidth;
      angled.forEach(function (s) {
        var L = s.getBoundingClientRect().left + (s.style.transform ? 0 : 0);
        L = (W - s.offsetWidth) / 2;
        s.style.clipPath = "polygon(" + (-L - W) + "px " + (0.14 * W) + "px, " + (2 * W - L) + "px " + (-0.07 * W) + "px, " + (2 * W - L) + "px calc(100% + 1px), " + (-L - W) + "px calc(100% + 1px))";
      });
    }
    var raf = 0;
    function tick() {
      raf = 0; if (rm.matches) return;
      var D = opts.depth || 1, vh = window.innerHeight, A = (window.innerWidth < 900 ? 14 : 22) * Math.min(D, 1.6), n = kids.length;
      var inP = kids.map(function (s) { var t = s.getBoundingClientRect().top; return Math.min(1, Math.max(0, (vh - t) / (vh * (D > 1 ? .8 : .55)))); });
      kids.forEach(function (s, i) {
        var p = (i === 0 && !opts.angleFirst) ? 1 : inP[i], e = 1 - Math.pow(1 - p, 3);
        var next = i + 1 < n ? inP[i + 1] : 0;
        var lag = D > 1 ? next * vh * .12 * D : 0;
        s.style.transform = "perspective(1400px) translateY(" + ((1 - e) * 40 * D + lag).toFixed(1) + "px) rotateX(" + ((1 - e) * A).toFixed(2) + "deg)";
        s.style.filter = (!opts.noDim && next > 0) ? "brightness(" + (1 - .12 * next).toFixed(3) + ")" : "";
      });
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(tick); }
    function onResize() { clip(); onScroll(); }
    clip(); tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return function () { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  };
})();
