const STORAGE_KEY = "portal-atividades";

const DEFAULT_COURSES = [
  "Português",
  "Matemática",
  "História",
  "Geografia",
  "Ciências",
  "Inglês",
];

// Dados pré-carregados de Atividades: adicione itens aqui (por curso) para
// que já apareçam no site sem precisar preencher o formulário manualmente.
// Formato do item: { title: "Título", date: "AAAA-MM-DD" (opcional), desc: "..." (opcional) }
const SEED_DATA = {
  // "Matemática": [{ title: "Lista de exercícios 1", date: "2026-08-10" }],
};

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = { courses: [...DEFAULT_COURSES], atividades: {}, deletedSeedIds: [] };
    DEFAULT_COURSES.forEach((course) => {
      initial.atividades[course] = [];
    });
    return initial;
  }
  try {
    const parsed = JSON.parse(raw);
    parsed.courses = parsed.courses || [];
    parsed.atividades = parsed.atividades || {};
    parsed.deletedSeedIds = parsed.deletedSeedIds || [];
    parsed.courses.forEach((course) => {
      parsed.atividades[course] = parsed.atividades[course] || [];
    });
    return parsed;
  } catch (err) {
    console.error("Falha ao ler dados salvos, iniciando do zero.", err);
    return { courses: [], atividades: {}, deletedSeedIds: [] };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

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

function mergeSeedData() {
  let changed = false;
  Object.entries(SEED_DATA).forEach(([course, items]) => {
    if (!state.courses.includes(course)) {
      state.courses.push(course);
      changed = true;
    }
    state.atividades[course] = state.atividades[course] || [];

    items.forEach((item, index) => {
      const seedId = `seed-${slugify(course)}-${index}`;
      const alreadyPresent = state.atividades[course].some((i) => i.id === seedId);
      const wasDeleted = state.deletedSeedIds.includes(seedId);
      if (!alreadyPresent && !wasDeleted) {
        state.atividades[course].push({
          id: seedId,
          title: item.title,
          date: item.date || "",
          desc: item.desc || "",
        });
        changed = true;
      }
    });
  });
  return changed;
}

let state = loadState();
if (mergeSeedData()) {
  saveState();
}

const courseCardTemplate = document.getElementById("course-card-template");
const itemTemplate = document.getElementById("item-template");
const atividadesContainer = document.getElementById("courses-atividades");

function formatDate(isoDate) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

function sortItemsByDate(items) {
  return [...items].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date.localeCompare(b.date);
  });
}

function renderItem(course, item) {
  const node = itemTemplate.content.firstElementChild.cloneNode(true);
  node.dataset.id = item.id;
  node.querySelector(".item-title").textContent = item.title;
  node.querySelector(".item-date").textContent = formatDate(item.date);
  node.querySelector(".item-desc").textContent = item.desc || "";
  node.querySelector(".remove-item-btn").addEventListener("click", () => {
    state.atividades[course] = state.atividades[course].filter((i) => i.id !== item.id);
    if (item.id.startsWith("seed-")) {
      state.deletedSeedIds.push(item.id);
    }
    saveState();
    renderCourse(course);
  });
  return node;
}

function renderCourse(course) {
  const existingCard = atividadesContainer.querySelector(
    `.course-card[data-course="${CSS.escape(course)}"]`
  );

  const card = existingCard || courseCardTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.course = course;
  card.querySelector(".course-title").textContent = course;
  if (!existingCard) {
    applyCourseIcon(card.querySelector(".course-icon"), course);
  }

  const list = card.querySelector(".item-list");
  list.innerHTML = "";
  sortItemsByDate(state.atividades[course] || []).forEach((item) => {
    list.appendChild(renderItem(course, item));
  });

  if (!existingCard) {
    card.querySelector(".remove-course-btn").addEventListener("click", () => {
      removeCourse(course);
    });

    const form = card.querySelector(".add-item-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const titleInput = form.querySelector(".item-title-input");
      const dateInput = form.querySelector(".item-date-input");
      const descInput = form.querySelector(".item-desc-input");

      const title = titleInput.value.trim();
      if (!title) return;

      state.atividades[course].push({
        id: crypto.randomUUID(),
        title,
        date: dateInput.value,
        desc: descInput.value.trim(),
      });
      saveState();
      form.reset();
      renderCourse(course);
    });

    atividadesContainer.appendChild(card);
  }
}

function renderAllCourses() {
  atividadesContainer.innerHTML = "";
  state.courses.forEach((course) => renderCourse(course));
}

function addCourse(name) {
  if (state.courses.includes(name)) return;
  state.courses.push(name);
  state.atividades[name] = state.atividades[name] || [];
  saveState();
  renderAllCourses();
}

function removeCourse(name) {
  if (!confirm(`Remover o curso "${name}" e todos os itens dele?`)) return;
  state.courses = state.courses.filter((c) => c !== name);
  delete state.atividades[name];
  saveState();
  renderAllCourses();
}

document.getElementById("course-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("course-input");
  const name = input.value.trim();
  if (!name) return;
  addCourse(name);
  input.value = "";
});

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });
    document.querySelectorAll(".tab-panel").forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.panel !== tab);
    });
  });
});

renderAllCourses();

// ---- Provas: lista os arquivos reais guardados em provas/<curso>/ ----
// O conteúdo vem de js/provas-data.js (gerado por
// scripts/generate-provas-manifest.py a partir da pasta provas/).

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

function renderProvasNav(categories, courseCategoryMap) {
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
  const manifest = typeof PROVAS_MANIFEST === "object" ? PROVAS_MANIFEST : {};
  const categories = typeof PROVAS_CATEGORIES === "object" ? PROVAS_CATEGORIES : [];
  const courseCategoryMap = buildCourseCategoryMap(categories);

  renderProvasNav(categories, courseCategoryMap);

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
      const quizItemTemplate = document.getElementById("provas-quiz-item-template");
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
        const link = node.querySelector(".file-link");
        link.href = encodeURI(file.path);
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
