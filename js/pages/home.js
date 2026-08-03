// ==========================================================================
// pages/home.js — PÁGINA INICIAL
//
// Monta os dois blocos da home a partir de js/data/atividades.js:
//   grupo "cursos" → carrossel "Atividades disponíveis"
//   grupo "extras" → cards coloridos "Mais Atividades"
//
// Não há nenhuma lista de cursos escrita no index.html: para acrescentar um
// curso na home, basta acrescentá-lo no catálogo.
// ==========================================================================

const carrossel = document.getElementById("lista-cursos");
const extras = document.getElementById("lista-extras");

ATIVIDADES.filter((curso) => curso.grupo === "cursos").forEach((curso) => {
  carrossel.appendChild(cardCurso(curso));
});

ATIVIDADES.filter((curso) => curso.grupo === "extras").forEach((curso) => {
  extras.appendChild(cardExtra(curso));
});

// ---- Setas do carrossel ----
// Rola exatamente a largura de um card, então nunca para "no meio" de um.

document.querySelectorAll("[data-rolar]").forEach((botao) => {
  botao.addEventListener("click", () => {
    const direcao = Number(botao.dataset.rolar);
    const card = carrossel.querySelector(".course");
    const passo = card ? card.getBoundingClientRect().width + 25 : 300;
    carrossel.scrollBy({ left: direcao * passo, behavior: "smooth" });
  });
});
