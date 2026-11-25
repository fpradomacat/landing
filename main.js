// =========================================================
// Configuración: cambia estos valores y se actualizan en toda la página
// =========================================================
const CONFIG = {
  // Link de reserva de la llamada exploratoria (también está escrito en index.html
  // para que funcione sin JavaScript; si cambia, basta con cambiarlo aquí).
  bookingUrl: "https://calendly.com/pradomacat/exploratoria",
  // TODO: confirmar email de contacto
  email: "hola@pradomacat.com",
};

document.documentElement.classList.remove("no-js");

// Enlaces de reserva
if (CONFIG.bookingUrl) {
  document.querySelectorAll("[data-booking]").forEach((a) => {
    a.href = CONFIG.bookingUrl;
    a.target = "_blank";
    a.rel = "noopener";
  });
}

// Email
document.querySelectorAll("[data-email]").forEach((a) => {
  a.href = `mailto:${CONFIG.email}`;
  a.textContent = CONFIG.email;
});

// Año del pie
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Menú móvil
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("site-nav");

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector(".sr-only").textContent = open ? "Cerrar menú" : "Abrir menú";
  nav.classList.toggle("is-open", open);
}

toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Borde del header al hacer scroll
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Abrir una pregunta del FAQ si se llega por enlace (#contraindicaciones, #politica)
function openFromHash() {
  const target = location.hash && document.querySelector(location.hash);
  if (target && target.tagName === "DETAILS") target.open = true;
}
openFromHash();
window.addEventListener("hashchange", openFromHash);

// =========================================================
// Animaciones de scroll
// =========================================================
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const REVEAL = ".section-head, .step, .checklist li, .about-photo, .about-text > *, .plan, .fine-print, .faq details, .cta-inner > *";
const revealEls = [...document.querySelectorAll(REVEAL)];

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  // Escalonado: los elementos hermanos aparecen uno tras otro
  revealEls.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((s) => s.matches(REVEAL));
    const i = siblings.indexOf(el);
    if (i > 0) el.style.setProperty("--d", `${Math.min(i, 5) * 0.1}s`);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

  revealEls.forEach((el) => io.observe(el));

  // Parallax suave del fondo del hero y desvanecido del texto al bajar
  const hero = document.querySelector(".hero");
  const aura = document.querySelector(".hero-aura");
  const heroInner = document.querySelector(".hero-inner");
  let ticking = false;

  const updateHero = () => {
    ticking = false;
    const y = window.scrollY;
    const h = hero.offsetHeight;
    if (y > h) return;
    aura.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
    heroInner.style.opacity = String(1 - Math.min(y / h, 1) * 0.7);
    heroInner.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateHero); }
  }, { passive: true });
}
