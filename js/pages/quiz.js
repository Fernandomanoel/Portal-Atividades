// ==========================================================================
// quiz.js — motor de provas interativas (independente do resto do site)
//
// O QUE ESTE ARQUIVO FAZ
// Sabe carregar e rodar um arquivo de prova (*.prova.js) dentro da página:
// mostra as perguntas, recebe as respostas do aluno e — dependendo do tipo
// da prova — corrige na hora ou monta uma tela de revisão para o instrutor
// avaliar. Não sabe nada sobre listagem de cursos, categorias ou senha;
// isso é responsabilidade de js/pages/provas.js.
//
// PROVA COMEÇADA NÃO SE ABANDONA
// Enquanto uma prova está em andamento a página fica travada: o menu, o
// rodapé e o botão de voltar somem, e o navegador avisa se alguém tentar
// fechar ou recarregar. A saída só reaparece depois de enviar.
//
// COMO ESTE ARQUIVO É ACIONADO
// Alguém (hoje, js/pages/provas.js) chama Quiz.abrir(caminhoDoArquivo,
// rotuloDeEspera) quando o usuário clica em "Fazer prova".
//
// DEPENDÊNCIAS NO provas.html
// - As seções com id view-provas e view-quiz.
// - Os elementos com id quiz-title, quiz-nota, quiz-form, quiz-result,
//   quiz-aviso-travado e quiz-voltar-btn.
// - Os <template> com id quiz-question-template, quiz-option-template,
//   quiz-descritiva-question-template e quiz-descritiva-review-template.
// Para usar este motor em outro site, basta copiar esses elementos, o
// css/quiz.css e este arquivo.
//
// FORMATO DOS ARQUIVOS DE PROVA (*.prova.js)
// Documentado em detalhe em COMO-CRIAR-PROVAS.md, na raiz do projeto —
// esse arquivo foi escrito para ser copiado e colado para qualquer pessoa
// (ou IA) criar provas novas sem precisar entender o resto do código.
// Resumo rápido: o arquivo .prova.js só precisa chamar, uma vez,
//   registerProvaInterativa({ tipo, titulo, perguntas })
// ==========================================================================

const Quiz = (() => {
  const NOTA_APROVACAO = 7;

  const viewProvas = document.getElementById("view-provas");
  const viewQuiz = document.getElementById("view-quiz");
  const quizTitleEl = document.getElementById("quiz-title");
  const quizNotaEl = document.getElementById("quiz-nota");
  const quizForm = document.getElementById("quiz-form");
  const quizResultEl = document.getElementById("quiz-result");
  const quizVoltarBtn = document.getElementById("quiz-voltar-btn");
  const quizAvisoTravado = document.getElementById("quiz-aviso-travado");

  // ---- Trava de saída ----------------------------------------------
  // Prova aberta e não enviada = não dá pra sair. Some tudo que leva
  // para fora (menu, rodapé, botão voltar) e o navegador pergunta antes
  // de fechar ou recarregar a aba.

  function avisarAntesDeSair(e) {
    e.preventDefault();
    e.returnValue = "";
    return "";
  }

  function travarSaida() {
    document.body.classList.add("prova-em-andamento");
    window.addEventListener("beforeunload", avisarAntesDeSair);
  }

  function liberarSaida() {
    document.body.classList.remove("prova-em-andamento");
    window.removeEventListener("beforeunload", avisarAntesDeSair);
  }

  // ---- Troca entre a lista de provas e a prova aberta ----

  function mostrarProva() {
    viewProvas?.classList.add("hidden");
    viewQuiz?.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function voltarParaLista() {
    liberarSaida();
    viewQuiz?.classList.add("hidden");
    viewProvas?.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  quizVoltarBtn?.addEventListener("click", voltarParaLista);

  // ---- Painel da nota ----------------------------------------------
  // Fica no topo da prova, antes das perguntas: é a primeira coisa que o
  // aluno vê ao terminar. Verde a partir de 7, vermelho abaixo disso.

  function formatarNota(nota) {
    return nota.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  // Aceita "8", "8,5" e "8.5"; devolve null se não for um número.
  function lerNota(texto) {
    const numero = Number(String(texto).replace(",", ".").trim());
    return Number.isFinite(numero) && String(texto).trim() !== "" ? numero : null;
  }

  function esconderNota() {
    quizNotaEl.classList.add("hidden");
    quizNotaEl.innerHTML = "";
  }

  // nota = número (0 a 10) ou null, quando ainda depende do instrutor.
  function mostrarNota(nota, detalhe) {
    const temNota = nota !== null;
    const aprovado = temNota && nota >= NOTA_APROVACAO;

    quizNotaEl.className = `quiz-nota ${
      !temNota ? "quiz-nota-pendente" : aprovado ? "quiz-nota-aprovado" : "quiz-nota-reprovado"
    }`;
    quizNotaEl.innerHTML = `
      <span class="quiz-nota-rotulo">${temNota ? "Sua nota" : "Prova enviada"}</span>
      <strong class="quiz-nota-valor">${temNota ? formatarNota(nota) : "—"}</strong>
      <span class="quiz-nota-detalhe"></span>
      <a class="quiz-nota-sair" href="${Rotas.url("inicio")}">Sair e voltar ao início</a>
    `;
    quizNotaEl.querySelector(".quiz-nota-detalhe").textContent = detalhe;
    quizNotaEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // ---- Carregamento do arquivo .prova.js ----
  // O arquivo, ao ser executado pelo navegador, chama
  // window.registerProvaInterativa(dados) — é assim que ele "entrega" seu
  // conteúdo para este motor. Carregamos sob demanda (só quando o aluno
  // clica em "Fazer prova") e guardamos em cache pra não recarregar se
  // abrir a mesma prova de novo na mesma visita.

  const cache = new Map();

  function carregar(path) {
    if (cache.has(path)) {
      return Promise.resolve(cache.get(path));
    }
    return new Promise((resolve, reject) => {
      window.registerProvaInterativa = (data) => {
        cache.set(path, data);
        resolve(data);
      };
      const script = document.createElement("script");
      script.src = encodeURI(path);
      script.onerror = () => reject(new Error("Não foi possível carregar esta prova."));
      document.body.appendChild(script);
    });
  }

  // ---- Tipo "multipla_escolha" (ou tipo ausente/qualquer outro valor) ----
  // Corrige na hora e mostra a nota. As perguntas somem depois de
  // corrigir: sem gabarito na tela, não há como comparar respostas nem
  // refazer a prova consultando o resultado.

  function renderMultiplaEscolha(data) {
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
    submitBtn.textContent = "Finalizar prova";
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

      const nota = perguntas.length ? (acertos / perguntas.length) * 10 : 0;
      quizForm.innerHTML = "";
      quizForm.onsubmit = null;
      liberarSaida();
      mostrarNota(
        nota,
        `${acertos} de ${perguntas.length} ${perguntas.length === 1 ? "questão" : "questões"}`
      );
    };
  }

  // ---- Tipo "descritiva" (perguntas abertas, sem correção automática) ----
  // O aluno escreve as respostas, envia uma única vez (sem opção de
  // refazer, para não incentivar cola tentando de novo) e o instrutor lê e
  // digita a nota na mesma tela, olhando o que foi escrito. Não existe
  // "certo/errado" automático aqui — quem avalia é o instrutor.
  //
  // A prova enviada (respostas + nota) fica salva no localStorage do
  // navegador, então é por aparelho, não por aluno: nesse mesmo navegador,
  // reabrir a prova sempre mostra a revisão travada, nunca um formulário
  // novo. Limpar os dados do navegador ou usar outro dispositivo contorna
  // isso — é uma trava simples, do mesmo nível da senha da área de provas,
  // não um controle de identidade de verdade.

  function chaveDeEnvio(path) {
    return `portal-prova-enviada:${path}`;
  }

  function carregarEnvio(path) {
    try {
      const raw = localStorage.getItem(chaveDeEnvio(path));
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  }

  function salvarEnvio(path, submissao) {
    localStorage.setItem(chaveDeEnvio(path), JSON.stringify(submissao));
  }

  function renderDescritivaRevisao(perguntas, submissao, path) {
    quizForm.innerHTML = "";
    quizForm.onsubmit = null;
    liberarSaida();

    // Enquanto o instrutor não digitar a nota, o painel fica neutro.
    mostrarNota(lerNota(submissao.nota), "Corrigida pelo instrutor");

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
      salvarEnvio(path, submissao);
      // O painel lá em cima acompanha o que o instrutor digitou aqui.
      mostrarNota(lerNota(submissao.nota), "Corrigida pelo instrutor");
    });

    notaBloco.appendChild(notaLabel);
    notaBloco.appendChild(notaInput);
    quizForm.appendChild(notaBloco);
  }

  function renderDescritiva(data, path) {
    const perguntas = data.perguntas || [];
    const envioSalvo = carregarEnvio(path);

    if (envioSalvo) {
      renderDescritivaRevisao(perguntas, envioSalvo, path);
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
    submitBtn.textContent = "Finalizar e enviar";
    quizForm.appendChild(submitBtn);

    quizForm.onsubmit = (e) => {
      e.preventDefault();
      const submissao = {
        respostas: textareas.map((t) => t.value.trim()),
        nota: "",
      };
      salvarEnvio(path, submissao);
      renderDescritivaRevisao(perguntas, submissao, path);
    };
  }

  // ---- Ponto de entrada ----

  function render(data, path) {
    quizTitleEl.textContent = data.titulo || "Prova";
    quizForm.innerHTML = "";
    quizResultEl.classList.add("hidden");
    quizResultEl.textContent = "";
    esconderNota();

    // Prova descritiva já enviada abre direto na revisão — nesse caso não
    // há nada em andamento e a saída continua liberada.
    const jaEnviada = data.tipo === "descritiva" && carregarEnvio(path);
    if (jaEnviada) {
      liberarSaida();
    } else {
      travarSaida();
    }

    if (data.tipo === "descritiva") {
      renderDescritiva(data, path);
    } else {
      renderMultiplaEscolha(data);
    }
  }

  // Chame assim: Quiz.abrir("provas/Curso/arquivo.prova.js", "Nome de espera").
  function abrir(path, rotuloDeEspera) {
    mostrarProva();
    quizTitleEl.textContent = `Carregando "${rotuloDeEspera}"...`;
    quizForm.innerHTML = "";
    quizResultEl.classList.add("hidden");
    esconderNota();

    carregar(path)
      .then((data) => render(data, path))
      .catch((err) => {
        liberarSaida();
        quizTitleEl.textContent = rotuloDeEspera;
        quizForm.innerHTML = `<p class="quiz-load-error">${err.message}</p>`;
      });
  }

  return { abrir, voltar: voltarParaLista };
})();
