(() => {
  const c = document.getElementById("bg-stars"),
    x = c.getContext("2d");
  let s = [],
    n = [],
    t = [
      "+1%",
      "+2%",
      "+5%",
      "+12%",
      "+30%",
      "-3%",
      "-7%",
      "-15%",
      "+0.5%",
      "+9%",
      "-2%",
      "+900%",
    ];
  const r = () => {
    c.width = innerWidth;
    c.height = innerHeight;
    s = [];
    n = [];
    let a = Math.max(80, (c.width * c.height) / 12000);
    for (let i = 0; i < a; i++)
      s.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        z: Math.random() * 3 + 0.8,
        v: Math.random() * 0.6 + 0.15,
        c: Math.random() > 0.5 ? "#0f0" : "#f33",
      });
    for (let i = 0; i < a * 0.25; i++) {
      let e = t[Math.floor(Math.random() * t.length)];
      n.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        t: e,
        v: Math.random() * 0.4 + 0.2,
        z: Math.random() * 8 + 6,
        c: e.startsWith("-") ? "#f33" : "#0f0",
        o: Math.random() * 0.8 + 0.2,
      });
    }
  };
  const d = () => {
    x.clearRect(0, 0, c.width, c.height);
    s.forEach((e) => {
      x.fillStyle = e.c;
      x.fillRect(e.x, e.y, e.z, e.z);
      e.y += e.v;
      if (e.y > c.height) {
        e.y = -e.z;
        e.x = Math.random() * c.width;
      }
    });
    n.forEach((e) => {
      x.font = `${e.z}px Orbitron`;
      x.fillStyle = e.c;
      x.globalAlpha = e.o;
      x.fillText(e.t, e.x, e.y);
      x.globalAlpha = 1;
      e.y += e.v;
      if (e.y > c.height + 20) {
        e.y = -10;
        e.x = Math.random() * c.width;
        let m = t[Math.floor(Math.random() * t.length)];
        e.t = m;
        e.c = m.startsWith("-") ? "#f33" : "#0f0";
      }
    });
    requestAnimationFrame(d);
  };
  addEventListener("resize", r);
  r();
  d();
})();
// Menú responsive
(() => {
  const m = document.getElementById("menuToggle"),
    n = document.getElementById("mainNav");
  const a = (o) => m.setAttribute("aria-expanded", o ? "true" : "false");
  m.addEventListener("click", () => {
    n.classList.toggle("open");
    m.classList.toggle("open");
    a(n.classList.contains("open"));
  });
  n.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && innerWidth <= 700) {
      n.classList.remove("open");
      m.classList.remove("open");
      a(false);
    }
  });
  addEventListener("resize", () => {
    if (innerWidth > 700) {
      n.classList.remove("open");
      m.classList.remove("open");
      a(false);
    }
  });
})();
