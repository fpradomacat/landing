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
