// ==========================================================================
// provas.js — área de provas (protegida por senha)
// Lista os arquivos reais guardados em provas/<curso>/ e filtra por
// categoria. Quem sabe rodar uma prova interativa (*.prova.js) é o
// js/quiz.js, um motor à parte — este arquivo só chama window.openQuiz(...)
// quando o botão "Fazer prova" é clicado.
//
// Depende de js/provas-data.js (gerado por scripts/generate-provas-manifest.py),
// que precisa ser carregado ANTES deste arquivo no index.html.
// ==========================================================================

// ---- Ícone do curso ----

function slugify(str) {
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
function applyCourseIcon(el, courseName) {
  el.textContent = (courseName.trim().charAt(0) || "?").toUpperCase();
  const img = new Image();
  img.alt = "";
  img.onload = () => {
    el.textContent = "";
    el.appendChild(img);
  };
  img.onerror = () => {};
  img.src = `images/cursos/${slugify(courseName)}.png`;
}

// ---- Ícone por tipo de arquivo ----

const FILE_ICONS = {
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

function fileIcon(filename) {
  const ext = filename.split(".").pop().toLowerCase();
  return FILE_ICONS[ext] || "📎";
}

// ---- Listagem dos cursos e arquivos ----

function buildCourseCategoryMap(categories) {
  const map = {};
  categories.forEach((cat) => {
    cat.courses.forEach((course) => {
      map[course] = cat.name;
    });
  });
  return map;
}

function renderProvasNav(categories) {
  const nav = document.getElementById("provas-nav");
  const navItemTemplate = document.getElementById("provas-nav-item-template");
  nav.innerHTML = "";

  const allBtn = navItemTemplate.content.firstElementChild.cloneNode(true);
  allBtn.textContent = "Todos os cursos";
  allBtn.dataset.category = "";
  allBtn.classList.add("active");
  nav.appendChild(allBtn);

  categories.forEach((cat) => {
    const btn = navItemTemplate.content.firstElementChild.cloneNode(true);
    btn.textContent = `${cat.name} (${cat.courses.length})`;
    btn.dataset.category = cat.name;
    nav.appendChild(btn);
  });

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".provas-nav-btn");
    if (!btn) return;
    nav.querySelectorAll(".provas-nav-btn").forEach((b) => b.classList.toggle("active", b === btn));
    const category = btn.dataset.category;
    document.querySelectorAll("#courses-provas .course-card").forEach((card) => {
      card.classList.toggle("hidden", Boolean(category) && card.dataset.category !== category);
    });
  });
}

function renderProvasCourses() {
  const container = document.getElementById("courses-provas");
  const provasCourseCardTemplate = document.getElementById("provas-course-card-template");
  const provasFileTemplate = document.getElementById("provas-file-template");
  const quizItemTemplate = document.getElementById("provas-quiz-item-template");
  const quizHtmlItemTemplate = document.getElementById("provas-quiz-html-item-template");
  const manifest = typeof PROVAS_MANIFEST === "object" ? PROVAS_MANIFEST : {};
  const categories = typeof PROVAS_CATEGORIES === "object" ? PROVAS_CATEGORIES : [];
  const courseCategoryMap = buildCourseCategoryMap(categories);

  // Sem js/provas-data.js a área abriria em branco, sem explicação nenhuma.
  if (Object.keys(manifest).length === 0) {
    document.getElementById("provas-nav").innerHTML = "";
    container.innerHTML =
      '<div class="provas-vazio">' +
      "<strong>Nenhum curso carregado.</strong>" +
      "<p>O arquivo <code>js/provas-data.js</code> não foi encontrado ou está vazio. " +
      "Gere ele rodando <code>python3 scripts/generate-provas-manifest.py</code> na pasta do projeto, " +
      "e confira se a pasta <code>provas/</code> está junto do <code>index.html</code>.</p>" +
      "</div>";
    return;
  }

  renderProvasNav(categories);

  container.innerHTML = "";
  Object.keys(manifest)
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .forEach((course) => {
      const files = manifest[course] || [];
      const card = provasCourseCardTemplate.content.firstElementChild.cloneNode(true);
      card.dataset.category = courseCategoryMap[course] || "Outros";
      card.querySelector(".course-title").textContent = course;
      applyCourseIcon(card.querySelector(".course-icon"), course);
      card.querySelector(".provas-count").textContent =
        files.length === 1 ? "1 arquivo" : `${files.length} arquivos`;

      const list = card.querySelector(".file-list");
      files.forEach((file) => {
        if (file.type === "quiz") {
          const node = quizItemTemplate.content.firstElementChild.cloneNode(true);
          const nameEl = node.querySelector(".file-name");
          nameEl.textContent = file.label;
          nameEl.title = file.label;
          node.querySelector(".quiz-start-btn").addEventListener("click", () => {
            openQuiz(file.path, file.label);
          });
          list.appendChild(node);
          return;
        }
        // Prova em HTML autossuficiente (*.prova.html): não passa pelo motor
        // de quiz.js, é só um link — o arquivo cuida da própria tela,
        // correção e navegação de volta.
        if (file.type === "quiz_html") {
          const node = quizHtmlItemTemplate.content.firstElementChild.cloneNode(true);
          const link = node.querySelector(".quiz-start-btn");
          link.href = encodeURI(file.path);
          const nameEl = node.querySelector(".file-name");
          nameEl.textContent = file.label;
          nameEl.title = file.label;
          list.appendChild(node);
          return;
        }
        const node = provasFileTemplate.content.firstElementChild.cloneNode(true);
        node.querySelector(".file-link").href = encodeURI(file.path);
        node.querySelector(".file-icon").textContent = fileIcon(file.label);
        const nameEl = node.querySelector(".file-name");
        nameEl.textContent = file.label;
        nameEl.title = file.label;
        node.querySelector(".file-size").textContent = file.size;
        list.appendChild(node);
      });

      container.appendChild(card);
    });
}

// ---- Trava de senha ----
// Aviso: isto é só uma trava simples de interface, não é segurança de
// verdade — o código e os arquivos em provas/ continuam acessíveis a
// quem souber ler o JS ou acessar os arquivos diretamente pelo repositório.
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

// Se algum elemento esperado não estiver no index.html, avisa no console em
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
    "[provas.js] Elementos não encontrados no index.html:",
    provasFaltando.join(", "),
    "— o index.html está desatualizado em relação ao provas.js."
  );
}

function unlockProvas() {
  sessionStorage.setItem(PROVAS_UNLOCK_KEY, "1");
  provasLock?.classList.add("hidden");
  provasContent?.classList.remove("hidden");
  provasLogoutBtn?.classList.remove("hidden");
  if (provasContent && !provasContent.dataset.rendered) {
    renderProvasCourses();
    provasContent.dataset.rendered = "1";
  }
}

// Volta para a tela de senha. Sem isso, quem já entrou uma vez ficava
// preso na listagem até fechar o navegador, sem jeito de rever o login.
function lockProvas() {
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
    unlockProvas();
  } else {
    provasPasswordError?.classList.remove("hidden");
  }
});

provasLogoutBtn?.addEventListener("click", lockProvas);

if (sessionStorage.getItem(PROVAS_UNLOCK_KEY) === "1") {
  unlockProvas();
}
