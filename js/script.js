// ---- Navegação entre as views (navbar + footer) ----

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

// ---- Provas: lista os arquivos reais guardados em provas/<curso>/ ----
// O conteúdo vem de js/provas-data.js (gerado por
// scripts/generate-provas-manifest.py a partir da pasta provas/).

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
  const manifest = typeof PROVAS_MANIFEST === "object" ? PROVAS_MANIFEST : {};
  const categories = typeof PROVAS_CATEGORIES === "object" ? PROVAS_CATEGORIES : [];
  const courseCategoryMap = buildCourseCategoryMap(categories);

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

// ---- Provas interativas: arquivos "*.prova.js" que rodam dentro do portal ----
// Formato documentado em scripts/exemplo.prova.js. O arquivo, ao ser
// carregado, chama window.registerProvaInterativa(dados) — carregamos sob
// demanda (só quando o aluno clica) e guardamos em cache pra não recarregar.

const quizCache = new Map();

function loadQuiz(path) {
  if (quizCache.has(path)) {
    return Promise.resolve(quizCache.get(path));
  }
  return new Promise((resolve, reject) => {
    window.registerProvaInterativa = (data) => {
      quizCache.set(path, data);
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = encodeURI(path);
    script.onerror = () => reject(new Error("Não foi possível carregar esta prova."));
    document.body.appendChild(script);
  });
}

const quizModal = document.getElementById("quiz-modal");
const quizTitleEl = document.getElementById("quiz-title");
const quizForm = document.getElementById("quiz-form");
const quizResultEl = document.getElementById("quiz-result");

function closeQuiz() {
  quizModal.classList.add("hidden");
  quizForm.innerHTML = "";
  quizResultEl.classList.add("hidden");
  quizResultEl.textContent = "";
}

document.getElementById("quiz-modal-close").addEventListener("click", closeQuiz);
document.querySelector(".quiz-modal-backdrop").addEventListener("click", closeQuiz);

function renderQuiz(data) {
  const questionTemplate = document.getElementById("quiz-question-template");
  const optionTemplate = document.getElementById("quiz-option-template");

  quizTitleEl.textContent = data.titulo || "Prova";
  quizForm.innerHTML = "";
  quizResultEl.classList.add("hidden");
  quizResultEl.textContent = "";

  (data.perguntas || []).forEach((pergunta, qIndex) => {
    const question = questionTemplate.content.firstElementChild.cloneNode(true);
    question.querySelector(".quiz-question-text").textContent = `${qIndex + 1}. ${pergunta.pergunta}`;
    const optionsContainer = question.querySelector(".quiz-options");

    (pergunta.opcoes || []).forEach((opcao, oIndex) => {
      const option = optionTemplate.content.firstElementChild.cloneNode(true);
      const input = option.querySelector("input");
      input.name = `pergunta-${qIndex}`;
      input.value = String(oIndex);
      option.querySelector(".quiz-option-text").textContent = opcao;
      optionsContainer.appendChild(option);
    });

    quizForm.appendChild(question);
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "quiz-submit-btn";
  submitBtn.textContent = "Corrigir";
  quizForm.appendChild(submitBtn);

  quizForm.onsubmit = (e) => {
    e.preventDefault();
    const perguntas = data.perguntas || [];
    let acertos = 0;
    perguntas.forEach((pergunta, qIndex) => {
      const selected = quizForm.querySelector(`input[name="pergunta-${qIndex}"]:checked`);
      if (selected && Number(selected.value) === pergunta.correta) {
        acertos += 1;
      }
    });
    quizResultEl.textContent = `Você acertou ${acertos} de ${perguntas.length} perguntas.`;
    quizResultEl.classList.remove("hidden");
    quizResultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
}

function openQuiz(path, fallbackLabel) {
  quizModal.classList.remove("hidden");
  quizTitleEl.textContent = `Carregando "${fallbackLabel}"...`;
  quizForm.innerHTML = "";
  quizResultEl.classList.add("hidden");

  loadQuiz(path)
    .then((data) => renderQuiz(data))
    .catch((err) => {
      quizTitleEl.textContent = fallbackLabel;
      quizForm.innerHTML = `<p class="quiz-load-error">${err.message}</p>`;
    });
}

// Aviso: isto é só uma trava simples de interface, não é segurança de
// verdade — o código e os arquivos em provas/ continuam acessíveis a
// quem souber ler o JS ou acessar os arquivos diretamente pelo repositório.
// Por isso a lista só é montada no DOM depois da senha certa: antes disso,
// abrir o "Inspecionar elemento" não mostra nenhum curso ou arquivo.
const PROVAS_PASSWORD = "Instrutores@Cazzo10";
const PROVAS_UNLOCK_KEY = "portal-provas-unlocked";

const provasLock = document.getElementById("provas-lock");
const provasContent = document.getElementById("provas-content");
const provasPasswordForm = document.getElementById("provas-password-form");
const provasPasswordInput = document.getElementById("provas-password-input");
const provasPasswordError = document.getElementById("provas-password-error");

function unlockProvas() {
  sessionStorage.setItem(PROVAS_UNLOCK_KEY, "1");
  provasLock.classList.add("hidden");
  provasContent.classList.remove("hidden");
  if (!provasContent.dataset.rendered) {
    renderProvasCourses();
    provasContent.dataset.rendered = "1";
  }
}

if (sessionStorage.getItem(PROVAS_UNLOCK_KEY) === "1") {
  unlockProvas();
}

provasPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (provasPasswordInput.value === PROVAS_PASSWORD) {
    provasPasswordError.classList.add("hidden");
    provasPasswordInput.value = "";
    unlockProvas();
  } else {
    provasPasswordError.classList.remove("hidden");
  }
});
