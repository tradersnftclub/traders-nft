document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "img/1.png",
    "img/2.png",
    "img/3.png",
    "img/4.png",
    "img/5.png",
    "img/6.png",
    "img/7.png",
    "img/8.png",
    "img/9.png",
    "img/10.png",
  ];
  let cards = [...images, ...images],
    flipped = [],
    matched = [],
    attempts = 0,
    matches = 0;
  const modal = document.getElementById("game-modal"),
    openBtn = document.getElementById("game-btn"),
    closeBtn = document.getElementById("close-btn"),
    resetBtn = document.getElementById("reset-btn"),
    board = document.getElementById("game-board"),
    score = document.getElementById("score"),
    canvas = document.getElementById("confetti"),
    ctx = canvas.getContext("2d");
  let confetti = [];

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function createBoard() {
    board.innerHTML = "";
    shuffle(cards).forEach((src) => {
      const c = document.createElement("div");
      c.classList.add("card");
      c.innerHTML = `<div class='front'></div><img class='back' src='${src}' alt=''>`;
      c.onclick = () => flip(c, src);
      board.appendChild(c);
    });
  }
  function flip(card, src) {
    if (flipped.length === 2 || card.classList.contains("flip")) return;
    card.classList.add("flip");
    flipped.push({ card, src });
    if (flipped.length === 2) {
      attempts++;
      if (flipped[0].src === flipped[1].src) {
        matches++;
        matched.push(...flipped);
        flipped = [];
        checkWin();
      } else
        setTimeout(() => {
          flipped.forEach((o) => o.card.classList.remove("flip"));
          flipped = [];
        }, 700);
      updateScore();
    }
  }
  function updateScore() {
    score.textContent = `Attempts: ${attempts} | Matches: ${matches}`;
    localStorage.setItem("traders_game", JSON.stringify({ attempts, matches }));
  }
  function checkWin() {
    if (matched.length === cards.length) {
      launchConfetti();
      const win = document.createElement("div");
      win.textContent = `🎉 You won in ${attempts} attempts!`;
      win.style.color = "#5cffc9";
      win.style.marginTop = "10px";
      win.style.fontSize = "12px";
      score.after(win);
      setTimeout(() => win.remove(), 4000);
    }
  }
  function resetGame() {
    attempts = 0;
    matches = 0;
    flipped = [];
    matched = [];
    updateScore();
    createBoard();
  }
  function launchConfetti() {
    const total = 120;
    confetti = [];
    for (let i = 0; i < total; i++)
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - 20,
        r: Math.random() * 6 + 2,
        c: `hsl(${Math.random() * 360},100%,70%)`,
        s: Math.random() * 3 + 2,
      });
    animateConfetti();
    setTimeout(() => (confetti = []), 3000);
  }
  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.fill();
      p.y += p.s;
      if (p.y > canvas.height) p.y = -10;
    });
    if (confetti.length > 0) requestAnimationFrame(animateConfetti);
  }

  openBtn.onclick = () => {
    modal.classList.add("active");
    const s = JSON.parse(localStorage.getItem("traders_game") || "{}");
    attempts = s.attempts || 0;
    matches = s.matches || 0;
    updateScore();
    createBoard();
    canvas.width = modal.offsetWidth;
    canvas.height = modal.offsetHeight;
  };
  closeBtn.onclick = () => modal.classList.remove("active");
  resetBtn.onclick = resetGame;

  // Botón movible
  let isDragging = false,
    offsetX,
    offsetY;
  openBtn.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - openBtn.getBoundingClientRect().left;
    offsetY = e.clientY - openBtn.getBoundingClientRect().top;
    openBtn.style.transition = "none";
  });
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    openBtn.style.left = e.clientX - offsetX + "px";
    openBtn.style.top = e.clientY - offsetY + "px";
    openBtn.style.right = "auto";
    openBtn.style.bottom = "auto";
  });
  document.addEventListener("mouseup", () => {
    isDragging = false;
    openBtn.style.transition = "transform .3s, box-shadow .3s";
  });
});

