// ==========================================================================
// script.js — núcleo do site
// Navegação entre as views, carrossel e modo escuro.
// A área de provas fica em js/provas.js; os dados dela, em js/provas-data.js.
// ==========================================================================

// ---- Navegação entre as views (navbar + rodapé) ----

function showView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("hidden", view.id !== `view-${viewName}`);
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.view === viewName);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-view]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showView(link.dataset.view);
  });
});

// ---- Carrossel das atividades ----

function scrollCourses(direction) {
  const list = document.getElementById("courseList");
  if (!list) return;
  const card = list.querySelector(".course");
  const step = card ? card.getBoundingClientRect().width + 20 : 300;
  list.scrollBy({ left: direction * step, behavior: "smooth" });
}

// ---- Modo escuro ----

const DARK_MODE_KEY = "portal-dark-mode";
const darkModeToggle = document.getElementById("darkModeToggle");

function applyDarkMode(enabled) {
  document.body.classList.toggle("dark-mode", enabled);
  if (darkModeToggle) {
    darkModeToggle.textContent = enabled ? "☀️" : "🌙";
  }
}

applyDarkMode(localStorage.getItem(DARK_MODE_KEY) === "1");

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    const enabled = !document.body.classList.contains("dark-mode");
    localStorage.setItem(DARK_MODE_KEY, enabled ? "1" : "0");
    applyDarkMode(enabled);
  });
}
