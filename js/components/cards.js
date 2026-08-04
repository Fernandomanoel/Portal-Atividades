// ==========================================================================
// components/cards.js — COMPONENTES DE CARD
//
// Funções que recebem um objeto de dados e devolvem um elemento pronto pra
// colocar na tela. São usadas pelas páginas (js/pages/*.js).
//
//   cardCurso(curso)        → card grande de curso, usado nas duas
//                             seções da página inicial
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

// Card de curso da página inicial: capa em cima, faixa na cor do curso
// e, no rodapé, quantos materiais ele tem — o aluno já sabe se vale o
// clique antes de entrar.
function cardCurso(curso) {
  const total = (curso.materiais || []).length;
  const el = document.createElement("a");
  el.className = "curso-card";
  el.href = Rotas.url("atividade", { curso: curso.slug });
  el.style.setProperty("--cor", curso.cor);
  el.dataset.busca = `${curso.titulo} ${curso.descricao || ""}`.toLowerCase();
  el.innerHTML = `
    <div class="curso-capa">
      <img alt="" loading="lazy">
      <span class="curso-sigla" aria-hidden="true"></span>
    </div>
    <div class="curso-info">
      <h3 class="curso-titulo"></h3>
      <p class="curso-desc"></p>
      <span class="curso-contagem"></span>
    </div>
  `;
  aplicarCapa(el.querySelector("img"), curso);
  el.querySelector(".curso-sigla").textContent = curso.sigla || "";
  el.querySelector(".curso-titulo").textContent = curso.titulo;
  el.querySelector(".curso-desc").textContent = curso.descricao;
  el.querySelector(".curso-contagem").textContent =
    total === 0 ? "Em breve" : total === 1 ? "1 material" : `${total} materiais`;
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
