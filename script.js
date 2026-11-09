(() => {
  "use strict";

  const body = document.body;
  const lightButton = document.getElementById("light-button");
  const lightHint = document.getElementById("light-hint");
  const revealMessage = document.getElementById("reveal-message");
  const openCardButton = document.getElementById("open-card-button");
  const overlay = document.getElementById("card-overlay");
  const closeCardButton = document.getElementById("close-card-button");
  const previousButton = document.getElementById("previous-card");
  const nextButton = document.getElementById("next-card");
  const dots = [...document.querySelectorAll(".card-dot")];
  const toast = document.getElementById("toast");
  const shareButton = document.getElementById("share-button");
  const shareCardButton = document.getElementById("share-card-button");
  const cardHeading = document.getElementById("card-heading");
  const cardKicker = document.getElementById("card-kicker");
  const cardMessage = document.getElementById("card-message");
  const cardSignoff = document.getElementById("card-signoff");
  const cardGujarati = document.getElementById("card-gujarati");
  const cardNumber = document.getElementById("card-number");
  const cardContent = document.querySelector(".wish-card-content");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const wishes = [
    {
      kicker: "A NEW BEGINNING",
      title: "Saal Mubarak",
      message: "May this new year open the doors to beautiful beginnings, fresh hopes and countless reasons to smile. May every step ahead bring something wonderful.",
      signoff: "Wishing you a year filled with light.",
      gujarati: "નૂતન વર્ષાભિનંદન"
    },
    {
      kicker: "FOR FAMILY & LOVED ONES",
      title: "A Home Full of Happiness",
      message: "May every home be filled with good health, togetherness and peaceful moments. May laughter echo around the table and love make every day feel special.",
      signoff: "Warmth, wellness and blessings to all.",
      gujarati: "સુખ, શાંતિ અને સમૃદ્ધિ"
    },
    {
      kicker: "FOR FRIENDS & COMMUNITY",
      title: "More Joy, More Memories",
      message: "May friendships grow stronger, dreams move closer and little moments turn into beautiful memories. Here is to supporting one another and celebrating every win.",
      signoff: "With friendship and heartfelt wishes.",
      gujarati: "પ્રેમ અને આનંદથી ભરેલું વર્ષ"
    },
    {
      kicker: "FOR EVERYONE, EVERYWHERE",
      title: "A Brighter Year Ahead",
      message: "May the year bring new opportunities, meaningful work, kind hearts and calm days. May prosperity find its way to every doorstep and hope shine through every challenge.",
      signoff: "May peace and prosperity be with you.",
      gujarati: "નવું વર્ષ મંગળમય રહે"
    }
  ];

  let currentWish = 0;
  let previousFocus = null;
  let toastTimer = null;
  let lit = false;

  // Tiny hand-built star field keeps the scene crisp without an image dependency.
  const starfield = document.getElementById("starfield");
  if (starfield) {
    const count = window.innerWidth < 620 ? 48 : 88;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const star = document.createElement("i");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 68}%`;
      star.style.setProperty("--star-opacity", (0.25 + Math.random() * 0.58).toFixed(2));
      star.style.setProperty("--twinkle", `${2.2 + Math.random() * 4.8}s`);
      star.style.setProperty("--delay", `${Math.random() * -6}s`);
      fragment.appendChild(star);
    }
    starfield.appendChild(fragment);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  // Canvas fireworks scale with device pixel ratio for sharp high-density screens.
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d", { alpha: true });
  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let animationFrame = 0;
  let lastFrame = 0;
  let burstTimer = null;
  let fireworksActive = false;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resizeCanvas, { passive: true });
  resizeCanvas();

  const palette = ["#ffe7ad", "#ffd078", "#ff9d70", "#f6b9d3", "#b9d7ff", "#fff7d6"];
  function burst(x, y, power = 1) {
    const color = palette[Math.floor(Math.random() * palette.length)];
    const amount = Math.round((42 + Math.random() * 23) * power);
    const speed = (2.1 + Math.random() * 2.3) * power;
    for (let i = 0; i < amount; i += 1) {
      const angle = (Math.PI * 2 * i) / amount + Math.random() * 0.09;
      const velocity = speed * (0.45 + Math.random() * 0.65);
      particles.push({
        x, y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        decay: 0.009 + Math.random() * 0.012,
        size: 1 + Math.random() * 1.8,
        color,
        trail: Math.random() > 0.55
      });
    }
  }

  function animateFireworks(timestamp) {
    if (!fireworksActive) return;
    const delta = Math.min((timestamp - (lastFrame || timestamp)) / 16.67, 2.2);
    lastFrame = timestamp;
    ctx.clearRect(0, 0, width, height);
    particles = particles.filter((p) => p.life > 0.015);
    for (const p of particles) {
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.vx *= Math.pow(0.987, delta);
      p.vy = p.vy * Math.pow(0.987, delta) + 0.025 * delta;
      p.life -= p.decay * delta;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = p.trail ? 8 : 4;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * Math.max(.25, p.life), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    if (particles.length > 0 || fireworksActive) {
      animationFrame = window.requestAnimationFrame(animateFireworks);
    }
  }

  function startFireworks() {
    if (reducedMotion) return;
    fireworksActive = true;
    window.cancelAnimationFrame(animationFrame);
    lastFrame = 0;
    const positions = [
      [width * 0.67, height * 0.20],
      [width * 0.83, height * 0.31],
      [width * 0.52, height * 0.28],
      [width * 0.74, height * 0.43]
    ];
    positions.slice(0, 3).forEach((pos, index) => {
      window.setTimeout(() => burst(pos[0], pos[1], index === 0 ? 1.2 : 0.88), index * 460);
    });
    animationFrame = window.requestAnimationFrame(animateFireworks);
    window.clearInterval(burstTimer);
    burstTimer = window.setInterval(() => {
      if (!fireworksActive || !body.classList.contains("lit")) return;
      const pos = positions[Math.floor(Math.random() * positions.length)];
      burst(pos[0] + (Math.random() - .5) * 80, pos[1] + (Math.random() - .5) * 48, .72);
    }, 2600);
  }

  lightButton.addEventListener("click", () => {
    if (lit) {
      openCard();
      return;
    }
    lit = true;
    body.classList.add("lit");
    lightButton.innerHTML = '<span class="button-icon" aria-hidden="true">✦</span><span>Open the wishes</span><span class="button-arrow" aria-hidden="true">↗</span>';
    lightHint.textContent = "The city is glowing. Your wishes are ready.";
    revealMessage.hidden = false;
    startFireworks();
  });

  function renderWish(index) {
    currentWish = Math.max(0, Math.min(wishes.length - 1, index));
    const wish = wishes[currentWish];
    cardContent.classList.remove("card-in");
    // Restart the entrance animation for each page.
    void cardContent.offsetWidth;
    cardContent.style.animation = "none";
    requestAnimationFrame(() => { cardContent.style.animation = ""; });
    cardKicker.textContent = wish.kicker;
    cardHeading.textContent = wish.title;
    cardMessage.textContent = wish.message;
    cardSignoff.textContent = wish.signoff;
    cardGujarati.textContent = wish.gujarati;
    cardNumber.textContent = `${String(currentWish + 1).padStart(2, "0")} / 04`;
    previousButton.disabled = currentWish === 0;
    nextButton.disabled = currentWish === wishes.length - 1;
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentWish;
      dot.classList.toggle("active", active);
      if (active) dot.setAttribute("aria-current", "step");
      else dot.removeAttribute("aria-current");
    });
  }

  function openCard() {
    previousFocus = document.activeElement;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
    renderWish(0);
    closeCardButton.focus({ preventScroll: true });
  }
  function closeCard() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus({ preventScroll: true });
  }

  openCardButton.addEventListener("click", openCard);
  closeCardButton.addEventListener("click", closeCard);
  overlay.addEventListener("click", (event) => {
    if (event.target && event.target.dataset.close === "true") closeCard();
  });
  previousButton.addEventListener("click", () => renderWish(currentWish - 1));
  nextButton.addEventListener("click", () => renderWish(currentWish + 1));
  dots.forEach((dot) => dot.addEventListener("click", () => renderWish(Number(dot.dataset.index))));

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("open")) return;
    if (event.key === "Escape") closeCard();
    if (event.key === "ArrowRight") renderWish(currentWish + 1);
    if (event.key === "ArrowLeft") renderWish(currentWish - 1);
    if (event.key === "Tab") {
      const focusable = [...overlay.querySelectorAll("button:not(:disabled)")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  // Mobile users can swipe horizontally between cards.
  let touchStartX = 0;
  let touchStartY = 0;
  const wishCard = document.getElementById("wish-card");
  wishCard.addEventListener("touchstart", (event) => {
    if (!event.changedTouches.length) return;
    touchStartX = event.changedTouches[0].clientX;
    touchStartY = event.changedTouches[0].clientY;
  }, { passive: true });
  wishCard.addEventListener("touchend", (event) => {
    if (!event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) renderWish(currentWish + (dx < 0 ? 1 : -1));
  }, { passive: true });

  async function shareGreeting() {
    const shareText = "Saal Mubarak! ✨ Wishing you and your family a year filled with health, happiness, peace and prosperity. Open these wishes:";
    const shareData = { title: "Saal Mubarak · A Brighter Beginning", text: shareText, url: window.location.href };
    try {
      if (navigator.share && window.location.protocol !== "file:") {
        await navigator.share(shareData);
        return;
      }
      if (navigator.clipboard && window.location.protocol !== "file:") {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        showToast("Greeting link copied. Share it with your family and friends!");
        return;
      }
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${window.location.href}`)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      if (error && error.name === "AbortError") return;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${window.location.href}`)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  }
  shareButton.addEventListener("click", shareGreeting);
  shareCardButton.addEventListener("click", shareGreeting);

  // The page remains fully usable with motion disabled; fireworks are simply omitted.
  if (reducedMotion) {
    lightHint.textContent = "Light the diya to reveal your New Year wishes.";
  }
})();
