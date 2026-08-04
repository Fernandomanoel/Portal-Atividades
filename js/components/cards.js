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
  doc: "📝",
  planilha: "📊",
  link: "🔗",
};

const ROTULOS_MATERIAL = {
  pdf: "PDF",
  doc: "Word",
  planilha: "Planilha",
  link: "Link",
};

// Caminhos de arquivo têm espaço e acento; encodeURI evita link quebrado.
function enderecoDoMaterial(material) {
  return material.tipo === "link" ? material.url : encodeURI(material.arquivo || "");
}

// ---- Imagem do card -------------------------------------------------
// A capa de um curso é procurada nesta ordem:
//
//   1. o campo `imagem` do curso, se ele existir no catálogo;
//   2. img/<slug>.jpg — a foto do curso (basta soltar o arquivo lá com
//      o nome do slug; não precisa mexer em código nenhum);
//   3. img/capas/<slug>.svg — a capa colorida gerada por
//      scripts/generate-capas.py, para nenhum card ficar com o quadrado
//      cinza de imagem quebrada enquanto a foto não chega.
function aplicarCapa(img, curso) {
  const tentativas = [
    curso.imagem,
    `img/${curso.slug}.jpg`,
    `img/capas/${curso.slug}.svg`,
  ].filter(Boolean);

  let atual = 0;
  img.addEventListener("error", () => {
    atual += 1;
    if (atual < tentativas.length) img.src = tentativas[atual];
  });
  img.src = tentativas[0];
}

function cardCurso(curso) {
  const el = document.createElement("a");
  el.className = "course";
  el.href = Rotas.url("atividade", { curso: curso.slug });
  el.innerHTML = `
    <img alt="" loading="lazy">
    <div class="course-content">
      <h3></h3>
      <p></p>
    </div>
  `;
  aplicarCapa(el.querySelector("img"), curso);
  el.querySelector("h3").textContent = curso.titulo;
  el.querySelector("p").textContent = curso.descricao;
  return el;
}

// Card colorido de "Mais Atividades": a capa ocupa o card inteiro por
// baixo, e um véu da cor do curso entra por cima para o texto continuar
// legível em qualquer foto.
function cardExtra(curso) {
  const el = document.createElement("a");
  el.className = "game-card";
  el.href = Rotas.url("atividade", { curso: curso.slug });
  el.style.setProperty("--cor", curso.cor);
  el.innerHTML = `
    <img class="game-capa" alt="" loading="lazy">
    <div class="game-info">
      <h3></h3>
      <span></span>
      <button type="button" tabindex="-1">▶ Inicie</button>
    </div>
  `;
  aplicarCapa(el.querySelector("img"), curso);
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
