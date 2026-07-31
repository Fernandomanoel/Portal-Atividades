const STORAGE_KEY = "portal-atividades";
const TABS = ["atividades", "provas"];

const DEFAULT_COURSES = [
  "Português",
  "Matemática",
  "História",
  "Geografia",
  "Ciências",
  "Inglês",
];

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const initial = {
      courses: [...DEFAULT_COURSES],
      atividades: {},
      provas: {},
    };
    DEFAULT_COURSES.forEach((course) => {
      initial.atividades[course] = [];
      initial.provas[course] = [];
    });
    return initial;
  }
  try {
    const parsed = JSON.parse(raw);
    parsed.courses = parsed.courses || [];
    parsed.atividades = parsed.atividades || {};
    parsed.provas = parsed.provas || {};
    parsed.courses.forEach((course) => {
      parsed.atividades[course] = parsed.atividades[course] || [];
      parsed.provas[course] = parsed.provas[course] || [];
    });
    return parsed;
  } catch (err) {
    console.error("Falha ao ler dados salvos, iniciando do zero.", err);
    return { courses: [], atividades: {}, provas: {} };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

const courseCardTemplate = document.getElementById("course-card-template");
const itemTemplate = document.getElementById("item-template");
const containers = {
  atividades: document.getElementById("courses-atividades"),
  provas: document.getElementById("courses-provas"),
};

function formatDate(isoDate) {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

function renderItem(tab, course, item) {
  const node = itemTemplate.content.firstElementChild.cloneNode(true);
  node.dataset.id = item.id;
  node.querySelector(".item-title").textContent = item.title;
  node.querySelector(".item-date").textContent = formatDate(item.date);
  node.querySelector(".item-desc").textContent = item.desc || "";
  node.querySelector(".remove-item-btn").addEventListener("click", () => {
    state[tab][course] = state[tab][course].filter((i) => i.id !== item.id);
    saveState();
    renderCourse(tab, course);
  });
  return node;
}

function renderCourse(tab, course) {
  const container = containers[tab];
  const existingCard = container.querySelector(
    `.course-card[data-course="${CSS.escape(course)}"]`
  );

  const card = existingCard || courseCardTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.course = course;
  card.querySelector(".course-title").textContent = course;

  const list = card.querySelector(".item-list");
  list.innerHTML = "";
  (state[tab][course] || []).forEach((item) => {
    list.appendChild(renderItem(tab, course, item));
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

      state[tab][course].push({
        id: crypto.randomUUID(),
        title,
        date: dateInput.value,
        desc: descInput.value.trim(),
      });
      saveState();
      form.reset();
      renderCourse(tab, course);
    });

    container.appendChild(card);
  }
}

function renderAllCourses() {
  TABS.forEach((tab) => {
    const container = containers[tab];
    container.innerHTML = "";
    state.courses.forEach((course) => renderCourse(tab, course));
  });
}

function addCourse(name) {
  if (state.courses.includes(name)) return;
  state.courses.push(name);
  TABS.forEach((tab) => {
    state[tab][name] = state[tab][name] || [];
  });
  saveState();
  renderAllCourses();
}

function removeCourse(name) {
  if (!confirm(`Remover o curso "${name}" e todos os itens dele?`)) return;
  state.courses = state.courses.filter((c) => c !== name);
  TABS.forEach((tab) => delete state[tab][name]);
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
