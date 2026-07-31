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

function renderProvasCourses() {
  const container = document.getElementById("courses-provas");
  const provasCourseCardTemplate = document.getElementById("provas-course-card-template");
  const provasFileTemplate = document.getElementById("provas-file-template");
  const manifest = typeof PROVAS_MANIFEST === "object" ? PROVAS_MANIFEST : {};

  container.innerHTML = "";
  Object.keys(manifest)
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .forEach((course) => {
      const files = manifest[course] || [];
      const card = provasCourseCardTemplate.content.firstElementChild.cloneNode(true);
      card.querySelector(".course-title").textContent = course;
      card.querySelector(".provas-count").textContent =
        files.length === 1 ? "1 arquivo" : `${files.length} arquivos`;

      const list = card.querySelector(".file-list");
      files.forEach((file) => {
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

renderProvasCourses();

// Aviso: isto é só uma trava simples de interface, não é segurança de
// verdade — o código e os arquivos em provas/ continuam acessíveis a
// quem souber ler o JS ou acessar os arquivos diretamente pelo repositório.
const PROVAS_PASSWORD = "Instrutores@Cazzo10";
const PROVAS_UNLOCK_KEY = "portal-provas-unlocked";

const provasLock = document.getElementById("provas-lock");
const provasGrid = document.getElementById("courses-provas");
const provasPasswordForm = document.getElementById("provas-password-form");
const provasPasswordInput = document.getElementById("provas-password-input");
const provasPasswordError = document.getElementById("provas-password-error");

function unlockProvas() {
  sessionStorage.setItem(PROVAS_UNLOCK_KEY, "1");
  provasLock.classList.add("hidden");
  provasGrid.classList.remove("hidden");
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
