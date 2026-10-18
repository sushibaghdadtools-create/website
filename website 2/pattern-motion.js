(function () {
  if (window.__sbPat) return; window.__sbPat = true;
  var rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = [], seen = new WeakSet(), px = -9999, py = -9999, sy = window.scrollY;
  function isDarkLine(el) { var bg = getComputedStyle(el).backgroundColor; var m = bg.match(/\d+(\.\d+)?/g) || []; return +m[0] > 200 && +m[1] > 200 && +m[2] > 200; }
  function firstPos(el) { var s = el.style.webkitMaskPosition || el.style.maskPosition || getComputedStyle(el).webkitMaskPosition || "0 0"; var parts = s.split(","); return { first: parts[0].trim(), rest: parts.slice(1).join(",") }; }
  function setPos(el, base, dx, dy) {
    var xy = base.first.split(/\s+/); var x = xy[0] || "0px", y = xy[1] || "0px";
    var v = "calc(" + x + " + " + dx.toFixed(1) + "px) calc(" + y + " + " + dy.toFixed(1) + "px)" + (base.rest ? "," + base.rest : "");
    el.style.webkitMaskPosition = v; el.style.maskPosition = v;
  }
  function scan() {
    document.querySelectorAll('[style*="pattern-loops"],[style*="pattern-rings"],[style*="--pat-"]').forEach(function (el) {
      if (seen.has(el) || el.dataset.sbClone) return; seen.add(el);
      var onDark = isDarkLine(el);
      var shadow = el.cloneNode(false), light = el.cloneNode(false);
      shadow.dataset.sbClone = light.dataset.sbClone = "1";
      var cs = getComputedStyle(el), am = (cs.backgroundColor.match(/rgba?\(([^)]+)\)/) || [])[1];
      var ca = am && am.split(",").length > 3 ? parseFloat(am.split(",")[3]) : 1;
      var op = (parseFloat(cs.opacity) || 1) * ca;
      shadow.style.background = onDark ? "rgba(0,0,0,.5)" : "rgba(17,17,17,.5)";
      shadow.style.opacity = String(Math.min(1, op * .35));
      light.style.opacity = String(Math.min(1, op * 1.5));
      light.style.background = onDark
        ? "radial-gradient(240px circle at var(--lx,-999px) var(--ly,-999px), rgba(255,255,255,.55), transparent 70%)"
        : "radial-gradient(200px circle at var(--lx,-999px) var(--ly,-999px), rgba(225,6,6,.35), transparent 70%)";
      el.parentNode.insertBefore(shadow, el);
      el.parentNode.insertBefore(light, el.nextSibling);
      var it = { el: el, shadow: shadow, light: light, base: firstPos(el), seed: Math.random() * 1000, vis: true, cx: 0, cy: 0 };
      items.push(it);
      if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { it.vis = en[0].isIntersecting; }).observe(el);
      apply(it, 0);
    });
  }
  function apply(it, t) {
    var r = it.el.getBoundingClientRect();
    var mx = px - r.left, my = py - r.top;
    var inside = px > r.left - 200 && px < r.right + 200 && py > r.top - 200 && py < r.bottom + 200;
    var nx = inside ? (mx / Math.max(1, r.width) - .5) : 0, ny = inside ? (my / Math.max(1, r.height) - .5) : 0;
    it.cx += (nx - it.cx) * .08; it.cy += (ny - it.cy) * .08;
    var s = it.seed, dx = 0, dy = 0;
    if (!rm) { dx = Math.sin(t / 5200 + s) * 10 + Math.sin(t / 2300 + s * 2) * 3 - it.cx * 22; dy = Math.cos(t / 6100 + s) * 8 - it.cy * 16 - (sy * .04) % 400; }
    setPos(it.el, it.base, dx, dy);
    setPos(it.light, it.base, dx, dy);
    var lx = inside ? -it.cx : Math.sin(t / 4000 + s) * .3, ly = inside ? -it.cy : -.4;
    setPos(it.shadow, it.base, dx + lx * 4 + 1, dy + ly * 4 + 1.5);
    var gx = inside ? mx : r.width * (.5 + Math.sin(t / 7000 + s) * .4), gy = inside ? my : r.height * (.35 + Math.cos(t / 9000 + s) * .25);
    it.light.style.setProperty("--lx", gx.toFixed(0) + "px"); it.light.style.setProperty("--ly", gy.toFixed(0) + "px");
  }
  function loop(t) { for (var i = 0; i < items.length; i++) if (items[i].vis) apply(items[i], t); requestAnimationFrame(loop); }
  window.addEventListener("pointermove", function (e) { px = e.clientX; py = e.clientY; }, { passive: true });
  window.addEventListener("pointerdown", function (e) { px = e.clientX; py = e.clientY; }, { passive: true });
  window.addEventListener("scroll", function () { sy = window.scrollY; }, { passive: true });
  function start() { scan(); new MutationObserver(scan).observe(document.body, { childList: true, subtree: true }); requestAnimationFrame(loop); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
