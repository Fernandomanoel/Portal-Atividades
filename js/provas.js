// ==========================================================================
// provas.js — área de provas (protegida por senha)
// Lista os arquivos reais guardados em provas/<curso>/, filtra por categoria
// e roda as provas interativas.
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

document.getElementById("quiz-modal-close")?.addEventListener("click", closeQuiz);
document.querySelector(".quiz-modal-backdrop")?.addEventListener("click", closeQuiz);

function renderQuizMultiplaEscolha(data) {
  const questionTemplate = document.getElementById("quiz-question-template");
  const optionTemplate = document.getElementById("quiz-option-template");

  (data.perguntas || []).forEach((pergunta, qIndex) => {
    const question = questionTemplate.content.firstElementChild.cloneNode(true);
    question.querySelector(".quiz-question-text").textContent = `${qIndex + 1}. ${pergunta.pergunta}`;
    const optionsContainer = question.querySelector(".quiz-options");

    (pergunta.opcoes || []).forEach((opcao, oIndex) => {
      const option = optionTemplate.content.firstElementChild.cloneNode(true);
      const input = option.querySelector("input");
      input.name = `pergunta-${qIndex}`;
      input.value = String(oIndex);
      input.required = true;
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

// ---- Provas descritivas (perguntas abertas, sem correção automática) ----
// O aluno escreve as respostas, envia uma única vez (sem opção de refazer,
// para não incentivar cola tentando de novo) e o instrutor lê e digita a
// nota na mesma tela, olhando o que foi escrito. Não existe "certo/errado"
// automático aqui — quem avalia é o instrutor, não o código.
//
// A prova enviada (respostas + nota) fica salva no localStorage do
// navegador, então é por aparelho, não por aluno: nesse mesmo navegador,
// reabrir a prova sempre mostra a revisão travada, nunca um formulário
// novo. Limpar os dados do navegador ou usar outro dispositivo contorna
// isso — é uma trava simples, do mesmo nível da senha da aba Provas, não
// um controle de identidade de verdade.

function quizStorageKey(path) {
  return `portal-prova-enviada:${path}`;
}

function loadQuizSubmission(path) {
  try {
    const raw = localStorage.getItem(quizStorageKey(path));
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function saveQuizSubmission(path, submissao) {
  localStorage.setItem(quizStorageKey(path), JSON.stringify(submissao));
}

function renderQuizDescritivaRevisao(perguntas, submissao, path) {
  quizForm.innerHTML = "";
  quizForm.onsubmit = null;

  const aviso = document.createElement("p");
  aviso.className = "quiz-descritiva-enviado";
  aviso.textContent = "Prova já enviada — não é possível respondê-la novamente neste navegador.";
  quizForm.appendChild(aviso);

  const reviewTemplate = document.getElementById("quiz-descritiva-review-template");
  perguntas.forEach((pergunta, index) => {
    const node = reviewTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".quiz-question-text").textContent = `${index + 1}. ${pergunta}`;
    node.querySelector(".quiz-descritiva-resposta").textContent =
      submissao.respostas[index] || "(sem resposta)";
    quizForm.appendChild(node);
  });

  const notaBloco = document.createElement("div");
  notaBloco.className = "quiz-nota-bloco";

  const notaLabel = document.createElement("label");
  notaLabel.setAttribute("for", "quiz-nota-input");
  notaLabel.textContent = "Nota (preenchida pelo instrutor)";

  const notaInput = document.createElement("input");
  notaInput.type = "text";
  notaInput.id = "quiz-nota-input";
  notaInput.className = "quiz-nota-input";
  notaInput.placeholder = "Ex: 8,5";
  notaInput.value = submissao.nota || "";
  notaInput.addEventListener("change", () => {
    submissao.nota = notaInput.value;
    saveQuizSubmission(path, submissao);
  });

  notaBloco.appendChild(notaLabel);
  notaBloco.appendChild(notaInput);
  quizForm.appendChild(notaBloco);
}

function renderQuizDescritiva(data, path) {
  const perguntas = data.perguntas || [];
  const submissaoSalva = loadQuizSubmission(path);

  if (submissaoSalva) {
    renderQuizDescritivaRevisao(perguntas, submissaoSalva, path);
    return;
  }

  const questionTemplate = document.getElementById("quiz-descritiva-question-template");
  const textareas = [];

  perguntas.forEach((pergunta, index) => {
    const node = questionTemplate.content.firstElementChild.cloneNode(true);
    node.querySelector(".quiz-question-text").textContent = `${index + 1}. ${pergunta}`;
    const textarea = node.querySelector(".quiz-descritiva-input");
    textarea.required = true;
    textareas.push(textarea);
    quizForm.appendChild(node);
  });

  const aviso = document.createElement("p");
  aviso.className = "quiz-aviso-descritiva";
  aviso.textContent = "Depois de enviar não dá para refazer esta prova — revise suas respostas antes.";
  quizForm.appendChild(aviso);

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "quiz-submit-btn";
  submitBtn.textContent = "Enviar respostas";
  quizForm.appendChild(submitBtn);

  quizForm.onsubmit = (e) => {
    e.preventDefault();
    const submissao = {
      respostas: textareas.map((t) => t.value.trim()),
      nota: "",
    };
    saveQuizSubmission(path, submissao);
    renderQuizDescritivaRevisao(perguntas, submissao, path);
  };
}

function renderQuiz(data, path) {
  quizTitleEl.textContent = data.titulo || "Prova";
  quizForm.innerHTML = "";
  quizResultEl.classList.add("hidden");
  quizResultEl.textContent = "";

  if (data.tipo === "descritiva") {
    renderQuizDescritiva(data, path);
  } else {
    renderQuizMultiplaEscolha(data);
  }
}

function openQuiz(path, fallbackLabel) {
  quizModal.classList.remove("hidden");
  quizTitleEl.textContent = `Carregando "${fallbackLabel}"...`;
  quizForm.innerHTML = "";
  quizResultEl.classList.add("hidden");

  loadQuiz(path)
    .then((data) => renderQuiz(data, path))
    .catch((err) => {
      quizTitleEl.textContent = fallbackLabel;
      quizForm.innerHTML = `<p class="quiz-load-error">${err.message}</p>`;
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
