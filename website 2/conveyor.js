(function () {
  if (customElements.get("sb-conveyor")) return;
  var NS = "http://www.w3.org/2000/svg";
  var TONES = {
    ink: { rail: "rgba(17,17,17,.26)", slat: "rgba(17,17,17,.09)", plate: "rgba(17,17,17,.5)", fill: "#FFFFFF", accent: "#E10606" },
    light: { rail: "rgba(255,255,255,.26)", slat: "rgba(255,255,255,.08)", plate: "rgba(255,255,255,.5)", fill: "#111111", accent: "#E10606" }
  };
  var rm = window.matchMedia("(prefers-reduced-motion: reduce)");
  function mk(tag, at) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); return e; }
  class Conveyor extends HTMLElement {
    static get observedAttributes() { return ["tone", "shape", "turn", "gap", "speed", "dir", "fill"]; }
    connectedCallback() {
      this.style.display = "block"; this.style.width = "100%"; this.style.height = "100%"; this.style.pointerEvents = "none";
      if (!this.svg) {
        this.svg = mk("svg", { "aria-hidden": "true" });
        this.svg.style.cssText = "display:block;width:100%;height:100%;overflow:visible";
        this.appendChild(this.svg);
      }
      this.s = Math.random() * 400; this.last = performance.now(); this.vis = true;
      this.ro = new ResizeObserver(() => this.build()); this.ro.observe(this);
      this.io = new IntersectionObserver((e) => { this.vis = e[0].isIntersecting; }); this.io.observe(this);
      var tick = (t) => {
        this.raf = requestAnimationFrame(tick);
        var dt = Math.min(64, t - this.last); this.last = t;
        if (!this.vis || !this.plates) return;
        var sp = this.speedNow(); if (!sp) return;
        this.s += sp * dt / 1000; this.place();
      };
      this.raf = requestAnimationFrame(tick);
    }
    disconnectedCallback() { cancelAnimationFrame(this.raf); if (this.ro) this.ro.disconnect(); if (this.io) this.io.disconnect(); }
    attributeChangedCallback() { if (this.svg && this.w) this.build(); }
    speedNow() {
      if (rm.matches) return 0;
      var v = parseFloat(this.getAttribute("speed")); var sp = isNaN(v) ? 16 : v;
      return window.innerWidth < 900 ? sp * 0.35 : sp;
    }
    geom(o) {
      var w = this.w, h = this.h;
      if (this.getAttribute("shape") === "corner") {
        var R = 56, y0 = 22, tx = Math.max(R + 10, w * (parseFloat(this.getAttribute("turn")) || 0.7));
        return "M -60 " + (y0 - o) + " L " + (tx - R) + " " + (y0 - o) + " A " + (R + o) + " " + (R + o) + " 0 0 1 " + (tx + o) + " " + (y0 + R) + " L " + (tx + o) + " " + (h + 60);
      }
      var y = h / 2; return "M -60 " + (y - o) + " L " + (w + 60) + " " + (y - o);
    }
    build() {
      var r = this.getBoundingClientRect(); this.w = r.width; this.h = r.height; if (!this.w || !this.h) return;
      var light = this.getAttribute("tone") === "light", T = TONES[light ? "light" : "ink"], fill = this.getAttribute("fill") || T.fill, svg = this.svg;
      var uid = "cv" + Math.random().toString(36).slice(2, 7);
      svg.innerHTML = ""; svg.setAttribute("viewBox", "0 0 " + this.w + " " + this.h);
      var defs = mk("defs", {});
      defs.innerHTML = '<radialGradient id="' + uid + 'p" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="' + (light ? "#3A3A3D" : "#FFFFFF") + '"/><stop offset=".7" stop-color="' + fill + '"/><stop offset="1" stop-color="' + (light ? "#000000" : "#E4E5E8") + '"/></radialGradient>' +
        '<filter id="' + uid + 's" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter>';
      svg.appendChild(defs);
      var ink = light ? "rgba(255,255,255,.55)" : "rgba(17,17,17,.62)";
      // belt side (depth), surface, slats, rails, top highlight
      svg.appendChild(mk("path", { d: this.geom(-4), fill: "none", stroke: light ? "rgba(0,0,0,.45)" : "rgba(17,17,17,.10)", "stroke-width": 34, filter: "url(#" + uid + "s)" }));
      svg.appendChild(mk("path", { d: this.geom(4), fill: "none", stroke: light ? "#1A1A1C" : "#D9DBDF", "stroke-width": 30 }));
      svg.appendChild(mk("path", { d: this.geom(0), fill: "none", stroke: light ? "#2A2A2D" : "#F1F2F4", "stroke-width": 28 }));
      this.slats = mk("path", { d: this.geom(0), fill: "none", stroke: light ? "rgba(255,255,255,.12)" : "rgba(17,17,17,.13)", "stroke-width": 26, "stroke-dasharray": "2.5 16" });
      svg.appendChild(this.slats);
      [-14, 14].forEach((o) => svg.appendChild(mk("path", { d: this.geom(o), fill: "none", stroke: ink, "stroke-width": 2.75, "stroke-linecap": "round" })));
      svg.appendChild(mk("path", { d: this.geom(-12), fill: "none", stroke: light ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.9)", "stroke-width": 1.5 }));
      this.center = mk("path", { d: this.geom(0), fill: "none", stroke: "none" }); svg.appendChild(this.center);
      this.L = this.center.getTotalLength();
      var gap = parseFloat(this.getAttribute("gap")) || 170, n = Math.ceil(this.L / gap) + 1;
      this.gap = gap; this.loop = n * gap; this.plates = [];
      var seed = 7, rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      var pf = "url(#" + uid + "p)", sh = "url(#" + uid + "s)", food = light ? "rgba(255,255,255,.75)" : "rgba(17,17,17,.75)";
      for (var i = 0; i < n; i++) {
        if (rnd() < 0.3) { rnd(); rnd(); continue; }
        var col = rnd() < 0.22 ? T.accent : ink, g = mk("g", {}), inner = mk("g", {});
        g.appendChild(mk("ellipse", { cx: 2, cy: 5, rx: 16, ry: 14, fill: "rgba(0,0,0," + (light ? .55 : .22) + ")", filter: sh }));
        inner.appendChild(mk("circle", { r: 16, fill: pf, stroke: col, "stroke-width": 2.5 }));
        inner.appendChild(mk("circle", { r: 11.5, fill: "none", stroke: col, "stroke-width": 1.25, opacity: 0.6 }));
        if (rnd() < 0.5) {
          inner.appendChild(mk("circle", { cy: 1, r: 7, fill: "rgba(0,0,0,.12)" }));
          inner.appendChild(mk("circle", { r: 7, fill: light ? "#2A2A2D" : "#FFFFFF", stroke: food, "stroke-width": 2.25 }));
          inner.appendChild(mk("circle", { r: 2.8, fill: T.accent, opacity: .85 }));
        } else {
          inner.appendChild(mk("rect", { x: -8.5, y: -3, width: 17, height: 9, rx: 4.5, fill: "rgba(0,0,0,.12)" }));
          inner.appendChild(mk("rect", { x: -8.5, y: -4.5, width: 17, height: 9, rx: 4.5, fill: light ? "#2A2A2D" : "#FFFFFF", stroke: food, "stroke-width": 2.25 }));
          inner.appendChild(mk("path", { d: "M -2 -4.5 L -2 4.5", stroke: food, "stroke-width": 1.75 }));
        }
        inner.appendChild(mk("path", { d: "M -11 -8 A 13 13 0 0 1 2 -14", fill: "none", stroke: "rgba(255,255,255,.85)", "stroke-width": 1.5, "stroke-linecap": "round" }));
        g.appendChild(inner); svg.appendChild(g); this.plates.push({ g: inner, sh: g.firstChild, wrap: g, i: i });
      }
      this.place();
    }
    place() {
      var dir = this.getAttribute("dir") === "-1" ? -1 : 1, L = this.L, s = this.s;
      this.slats.setAttribute("stroke-dashoffset", (-dir * s).toFixed(1));
      for (var k = 0; k < this.plates.length; k++) {
        var p = this.plates[k];
        var pos = ((p.i * this.gap + s) % this.loop + this.loop) % this.loop - this.gap * 0.5;
        if (dir < 0) pos = L - pos;
        if (pos < -20 || pos > L + 20) { p.wrap.setAttribute("visibility", "hidden"); continue; }
        p.wrap.setAttribute("visibility", "visible");
        var a = this.center.getPointAtLength(Math.max(0, Math.min(L, pos))), b = this.center.getPointAtLength(Math.max(0, Math.min(L, pos + 1)));
        var ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
        p.wrap.setAttribute("transform", "translate(" + a.x.toFixed(1) + " " + a.y.toFixed(1) + ")");
        p.g.setAttribute("transform", "rotate(" + ang.toFixed(1) + ")");
      }
    }
  }
  customElements.define("sb-conveyor", Conveyor);
})();
