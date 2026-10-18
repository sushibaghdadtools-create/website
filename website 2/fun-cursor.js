(function () {
  if (window.__sbFun) return; window.__sbFun = true;
  var rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var R = window.__resources || {};
  var CF = R.cursorFace || ((window.__resources||{})["r-cursor-face"]||"assets/cursor-face.png"), CH = R.cursorFaceHover || ((window.__resources||{})["r-cursor-face-hover"]||"assets/cursor-face-hover.png"), FI = R.faceImg || ((window.__resources||{})["r-face"]||"assets/face.png");
  var css = document.createElement("style");
  css.textContent =
    "@media (hover:hover) and (pointer:fine){html,body{cursor:url(" + CF + ") 16 16, auto}" +
    "a,button,[role=button],summary,label,input[type=submit]{cursor:url(" + CH + ") 20 20, pointer}}" +
    "*{-webkit-tap-highlight-color:transparent}" +
    ".sbf-pop{position:fixed;left:0;top:0;pointer-events:none;z-index:9999;will-change:transform,opacity}" +
    ".sbf-face{width:56px;height:56px;margin:-28px 0 0 -28px;border-radius:50%;background:#fff url(" + FI + ") center 58%/64% auto no-repeat;box-shadow:0 0 0 3px #E10606,0 8px 20px rgba(17,17,17,.18);animation:sbfFace .7s cubic-bezier(.34,1.56,.64,1) forwards}" +
    ".sbf-dot{width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;animation:sbfDot .6s cubic-bezier(.22,.76,.28,1) forwards}" +
    ".sbf-mini{width:22px;height:16px;margin:-8px 0 0 -11px;background:url(" + FI + ") center/contain no-repeat;animation:sbfDot .8s cubic-bezier(.22,.76,.28,1) forwards}" +
    "@keyframes sbfFace{0%{transform:translate(var(--x),var(--y)) scale(.2) rotate(-20deg);opacity:0}35%{transform:translate(var(--x),var(--y)) scale(1.1) rotate(6deg);opacity:1}70%{transform:translate(var(--x),calc(var(--y) - 14px)) scale(1) rotate(0);opacity:1}100%{transform:translate(var(--x),calc(var(--y) - 34px)) scale(.7);opacity:0}}" +
    "@keyframes sbfDot{0%{transform:translate(var(--x),var(--y)) scale(.4) rotate(0);opacity:1}100%{transform:translate(calc(var(--x) + var(--dx)),calc(var(--y) + var(--dy))) scale(1) rotate(var(--r));opacity:0}}";
  document.head.appendChild(css);
  if (rm) return;
  var colors = ["#E10606", "#7A9E3A", "#111111", "#E10606"];
  var n = 0;
  function spawn(cls, x, y, extra, life) {
    var el = document.createElement("div");
    el.className = "sbf-pop " + cls;
    el.style.setProperty("--x", x + "px"); el.style.setProperty("--y", y + "px");
    for (var k in extra) el.style.setProperty(k, extra[k]);
    if (extra.bg) el.style.background = extra.bg;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, life);
  }
  document.addEventListener("pointerdown", function (e) {
    if (e.button && e.button !== 0) return;
    var x = e.clientX, y = e.clientY; n++;
    spawn("sbf-face", x, y, {}, 750);
    var count = 7;
    for (var i = 0; i < count; i++) {
      var a = (i / count) * Math.PI * 2 + Math.random() * .5, d = 34 + Math.random() * 30;
      var mini = (i + n) % 4 === 0;
      spawn(mini ? "sbf-mini" : "sbf-dot", x, y, {
        "--dx": Math.cos(a) * d + "px", "--dy": Math.sin(a) * d + "px",
        "--r": (Math.random() * 180 - 90) + "deg",
        bg: mini ? undefined : colors[(i + n) % colors.length]
      }, 850);
    }
  }, { passive: true });
})();
