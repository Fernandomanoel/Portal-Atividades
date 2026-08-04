// ==========================================================================
// pages/home.js — PÁGINA INICIAL
//
// Monta as duas grades de cursos a partir de js/data/atividades.js:
//   grupo "cursos" → "Atividades disponíveis"
//   grupo "extras" → "Mais Atividades"
//
// Não há nenhuma lista de cursos escrita no index.html: para acrescentar
// um curso na home, basta acrescentá-lo no catálogo.
// ==========================================================================

const secoes = [
  { grupo: "cursos", lista: document.getElementById("lista-cursos") },
  { grupo: "extras", lista: document.getElementById("lista-extras") },
];

secoes.forEach(({ grupo, lista }) => {
  ATIVIDADES.filter((curso) => curso.grupo === grupo).forEach((curso) => {
    lista.appendChild(cardCurso(curso));
  });
});

// ---- Busca ----
// Filtra os cards das duas seções ao mesmo tempo. Uma seção que fica sem
// nenhum card some junto com o próprio título, para não sobrar um título
// solto no meio da página.

const buscaCurso = document.getElementById("busca-curso");
const semResultado = document.getElementById("home-sem-resultado");

function filtrar(termo) {
  const alvo = termo.trim().toLowerCase();
  let encontrados = 0;

  secoes.forEach(({ lista }) => {
    let visiveisNaSecao = 0;
    lista.querySelectorAll(".curso-card").forEach((card) => {
      const combina = !alvo || card.dataset.busca.includes(alvo);
      card.classList.toggle("hidden", !combina);
      if (combina) visiveisNaSecao += 1;
    });
    encontrados += visiveisNaSecao;
    // O título da seção é o irmão logo acima da grade.
    lista.previousElementSibling.classList.toggle("hidden", visiveisNaSecao === 0);
    lista.classList.toggle("hidden", visiveisNaSecao === 0);
  });

  semResultado.classList.toggle("hidden", encontrados > 0);
}

buscaCurso.addEventListener("input", (e) => filtrar(e.target.value));
