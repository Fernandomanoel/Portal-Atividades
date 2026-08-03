// ==========================================================================
// components/cards.js — COMPONENTES DE CARD
//
// Funções que recebem um objeto de dados e devolvem um elemento pronto pra
// colocar na tela. São usadas pelas páginas (js/pages/*.js).
//
//   cardCurso(curso)        → card com foto, usado no carrossel da home
//   cardExtra(curso)        → card colorido, usado em "Mais Atividades"
//   cardMaterial(material)  → linha de um PDF/planilha/link na página do curso
// ==========================================================================

const ICONES_MATERIAL = {
  pdf: "📄",
  planilha: "📊",
  link: "🔗",
};

const ROTULOS_MATERIAL = {
  pdf: "PDF",
  planilha: "Planilha",
  link: "Link",
};

// Caminhos de arquivo têm espaço e acento; encodeURI evita link quebrado.
function enderecoDoMaterial(material) {
  return material.tipo === "link" ? material.url : encodeURI(material.arquivo || "");
}

function cardCurso(curso) {
  const el = document.createElement("a");
  el.className = "course";
  el.href = Rotas.url("atividade", { curso: curso.slug });
  el.innerHTML = `
    <img src="${curso.imagem}" alt="" loading="lazy">
    <div class="course-content">
      <h3></h3>
      <p></p>
    </div>
  `;
  el.querySelector("h3").textContent = curso.titulo;
  el.querySelector("p").textContent = curso.descricao;
  return el;
}

function cardExtra(curso) {
  const el = document.createElement("a");
  el.className = "game-card";
  el.href = Rotas.url("atividade", { curso: curso.slug });
  el.style.background = `linear-gradient(135deg, ${curso.cor}, ${curso.cor}b3)`;
  el.innerHTML = `
    <div class="game-info">
      <h3></h3>
      <span></span>
      <button type="button" tabindex="-1">▶ Inicie</button>
    </div>
    <img src="${curso.imagem}" alt="" loading="lazy">
  `;
  el.querySelector("h3").textContent = curso.titulo;
  el.querySelector("span").textContent = curso.descricao;
  return el;
}

function cardMaterial(material) {
  const tipo = material.tipo || "pdf";
  const el = document.createElement("article");
  el.className = "material";
  el.innerHTML = `
    <div class="material-icone" aria-hidden="true">${ICONES_MATERIAL[tipo] || "📎"}</div>

    <div class="material-info">
      <h3 class="material-titulo"></h3>
      <p class="material-desc"></p>
      <span class="material-tag">${ROTULOS_MATERIAL[tipo] || "Arquivo"}</span>
    </div>

    <a class="material-btn" target="_blank" rel="noopener">
      ${tipo === "link" ? "Abrir" : "Baixar"}
    </a>
  `;
  el.querySelector(".material-titulo").textContent = material.titulo;
  el.querySelector(".material-desc").textContent = material.descricao || "";
  el.querySelector(".material-btn").href = enderecoDoMaterial(material);
  return el;
}
