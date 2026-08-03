// ==========================================================================
// pages/provas.js — área de provas (protegida por senha)
//
// Lista os arquivos reais guardados em provas/<curso>/ e filtra por
// categoria. Quem sabe rodar uma prova interativa (*.prova.js) é o
// js/pages/quiz.js, um motor à parte — este arquivo só chama
// Quiz.abrir(...) quando o botão "Fazer prova" é clicado.
//
// Depende de js/data/provas-data.js (gerado por
// scripts/generate-provas-manifest.py), que precisa ser carregado ANTES
// deste arquivo no provas.html.
// ==========================================================================

// ---- Ícone do curso ----

function slugDoCurso(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
}

// Tenta carregar images/cursos/<slug>.png como capa do curso; se não
// existir, mantém a letra inicial como marcador de posição. Basta colocar
// o arquivo de imagem nessa pasta (mesmo nome do slug) que ela passa a
// aparecer automaticamente, sem precisar mexer no código.
function aplicarIconeDoCurso(el, nomeDoCurso) {
  el.textContent = (nomeDoCurso.trim().charAt(0) || "?").toUpperCase();
  const img = new Image();
  img.alt = "";
  img.onload = () => {
    el.textContent = "";
    el.appendChild(img);
  };
  img.onerror = () => {};
  img.src = `images/cursos/${slugDoCurso(nomeDoCurso)}.png`;
}

// ---- Ícone por tipo de arquivo ----

const ICONES_ARQUIVO = {
  pdf: "📄",
  doc: "📝",
  docx: "📝",
  rtf: "📝",
  txt: "🔗",
  url: "🔗",
  lnk: "🔗",
  png: "🖼️",
  jpg: "🖼️",
  jpeg: "🖼️",
  bmp: "🖼️",
  mp4: "🎬",
  xlsx: "📊",
  html: "🌐",
  db: "🗄️",
};

function iconeDoArquivo(nome) {
  const ext = nome.split(".").pop().toLowerCase();
  return ICONES_ARQUIVO[ext] || "📎";
}

// ---- Listagem dos cursos e arquivos ----

function mapaCursoCategoria(categorias) {
  const mapa = {};
  categorias.forEach((cat) => {
    cat.courses.forEach((curso) => {
      mapa[curso] = cat.name;
    });
  });
  return mapa;
}

function montarNavCategorias(categorias) {
  const nav = document.getElementById("provas-nav");
  const template = document.getElementById("provas-nav-item-template");
  nav.innerHTML = "";

  const todos = template.content.firstElementChild.cloneNode(true);
  todos.textContent = "Todos os cursos";
  todos.dataset.category = "";
  todos.classList.add("active");
  nav.appendChild(todos);

  categorias.forEach((cat) => {
    const btn = template.content.firstElementChild.cloneNode(true);
    btn.textContent = `${cat.name} (${cat.courses.length})`;
    btn.dataset.category = cat.name;
    nav.appendChild(btn);
  });

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".provas-nav-btn");
    if (!btn) return;
    nav.querySelectorAll(".provas-nav-btn").forEach((b) => b.classList.toggle("active", b === btn));
    const categoria = btn.dataset.category;
    document.querySelectorAll("#courses-provas .course-card").forEach((card) => {
      card.classList.toggle("hidden", Boolean(categoria) && card.dataset.category !== categoria);
    });
  });
}

function montarCursosDeProvas() {
  const container = document.getElementById("courses-provas");
  const cardTemplate = document.getElementById("provas-course-card-template");
  const arquivoTemplate = document.getElementById("provas-file-template");
  const quizTemplate = document.getElementById("provas-quiz-item-template");
  const quizHtmlTemplate = document.getElementById("provas-quiz-html-item-template");
  const manifest = typeof PROVAS_MANIFEST === "object" ? PROVAS_MANIFEST : {};
  const categorias = typeof PROVAS_CATEGORIES === "object" ? PROVAS_CATEGORIES : [];
  const categoriaDoCurso = mapaCursoCategoria(categorias);

  // Sem js/data/provas-data.js a área abriria em branco, sem explicação.
  if (Object.keys(manifest).length === 0) {
    document.getElementById("provas-nav").innerHTML = "";
    container.innerHTML =
      '<div class="aviso">' +
      "<strong>Nenhum curso carregado.</strong>" +
      "<p>O arquivo <code>js/data/provas-data.js</code> não foi encontrado ou está vazio. " +
      "Gere ele rodando <code>python3 scripts/generate-provas-manifest.py</code> na pasta do projeto, " +
      "e confira se a pasta <code>provas/</code> está junto do <code>provas.html</code>.</p>" +
      "</div>";
    return;
  }

  montarNavCategorias(categorias);

  container.innerHTML = "";
  Object.keys(manifest)
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .forEach((curso) => {
      const arquivos = manifest[curso] || [];
      const card = cardTemplate.content.firstElementChild.cloneNode(true);
      card.dataset.category = categoriaDoCurso[curso] || "Outros";
      card.querySelector(".course-title").textContent = curso;
      aplicarIconeDoCurso(card.querySelector(".course-icon"), curso);
      card.querySelector(".provas-count").textContent =
        arquivos.length === 1 ? "1 arquivo" : `${arquivos.length} arquivos`;

      const lista = card.querySelector(".file-list");
      arquivos.forEach((arquivo) => {
        if (arquivo.type === "quiz") {
          const node = quizTemplate.content.firstElementChild.cloneNode(true);
          const nomeEl = node.querySelector(".file-name");
          nomeEl.textContent = arquivo.label;
          nomeEl.title = arquivo.label;
          node.querySelector(".quiz-start-btn").addEventListener("click", () => {
            Quiz.abrir(arquivo.path, arquivo.label);
          });
          lista.appendChild(node);
          return;
        }
        // Prova em HTML autossuficiente (*.prova.html): não passa pelo motor
        // de quiz.js, é só um link — o arquivo cuida da própria tela,
        // correção e navegação de volta.
        if (arquivo.type === "quiz_html") {
          const node = quizHtmlTemplate.content.firstElementChild.cloneNode(true);
          node.querySelector(".quiz-start-btn").href = encodeURI(arquivo.path);
          const nomeEl = node.querySelector(".file-name");
          nomeEl.textContent = arquivo.label;
          nomeEl.title = arquivo.label;
          lista.appendChild(node);
          return;
        }
        const node = arquivoTemplate.content.firstElementChild.cloneNode(true);
        node.querySelector(".file-link").href = encodeURI(arquivo.path);
        node.querySelector(".file-icon").textContent = iconeDoArquivo(arquivo.label);
        const nomeEl = node.querySelector(".file-name");
        nomeEl.textContent = arquivo.label;
        nomeEl.title = arquivo.label;
        node.querySelector(".file-size").textContent = arquivo.size;
        lista.appendChild(node);
      });

      container.appendChild(card);
    });
}

// ---- Trava de senha ----
// Aviso: isto é só uma trava simples de interface, não é segurança de
// verdade — o código e os arquivos em provas/ continuam acessíveis a quem
// souber ler o JS ou acessar os arquivos diretamente pelo repositório.
// Por isso a lista só é montada no DOM depois da senha certa: antes disso,
// abrir o "Inspecionar elemento" não mostra nenhum curso ou arquivo.

const PROVAS_PASSWORD = "Instrutores@Cazzo10";
const PROVAS_UNLOCK_KEY = "portal-provas-unlocked";

const provasLock = document.getElementById("provas-lock");
const provasContent = document.getElementById("provas-content");
const provasLogoutBtn = document.getElementById("provas-logout");
const provasPasswordForm = document.getElementById("provas-password-form");
const provasPasswordInput = document.getElementById("provas-password-input");
const provasPasswordError = document.getElementById("provas-password-error");

// Se algum elemento esperado não estiver no provas.html, avisa no console em
// vez de estourar um erro. Um erro aqui interrompia o resto do arquivo e o
// formulário de senha ficava sem handler: ao clicar em "Entrar" o navegador
// enviava o form do jeito padrão, recarregava a página e voltava ao início.
const provasFaltando = Object.entries({
  "#provas-lock": provasLock,
  "#provas-content": provasContent,
  "#provas-logout": provasLogoutBtn,
  "#provas-password-form": provasPasswordForm,
  "#provas-password-input": provasPasswordInput,
  "#provas-password-error": provasPasswordError,
})
  .filter(([, el]) => !el)
  .map(([id]) => id);

if (provasFaltando.length) {
  console.error(
    "[provas.js] Elementos não encontrados no provas.html:",
    provasFaltando.join(", "),
    "— o provas.html está desatualizado em relação ao provas.js."
  );
}

function destrancarProvas() {
  sessionStorage.setItem(PROVAS_UNLOCK_KEY, "1");
  provasLock?.classList.add("hidden");
  provasContent?.classList.remove("hidden");
  provasLogoutBtn?.classList.remove("hidden");
  if (provasContent && !provasContent.dataset.rendered) {
    montarCursosDeProvas();
    provasContent.dataset.rendered = "1";
  }
}

// Volta para a tela de senha. Sem isso, quem já entrou uma vez ficava
// preso na listagem até fechar o navegador, sem jeito de rever o login.
function trancarProvas() {
  sessionStorage.removeItem(PROVAS_UNLOCK_KEY);
  provasContent?.classList.add("hidden");
  provasLogoutBtn?.classList.add("hidden");
  provasLock?.classList.remove("hidden");
  provasPasswordError?.classList.add("hidden");
  if (provasPasswordInput) provasPasswordInput.value = "";
}

// O handler do formulário vem primeiro: mesmo que algo abaixo falhe, o
// "Entrar" nunca recarrega a página.
provasPasswordForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (provasPasswordInput?.value === PROVAS_PASSWORD) {
    provasPasswordError?.classList.add("hidden");
    provasPasswordInput.value = "";
    destrancarProvas();
  } else {
    provasPasswordError?.classList.remove("hidden");
  }
});

provasLogoutBtn?.addEventListener("click", trancarProvas);

if (sessionStorage.getItem(PROVAS_UNLOCK_KEY) === "1") {
  destrancarProvas();
}
