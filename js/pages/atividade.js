// ==========================================================================
// pages/atividade.js — PÁGINA DE UMA ATIVIDADE
//
// Esta única página substitui as ~20 páginas HTML que existiam dentro de
// atividades/ (uma por curso, cada uma com o próprio CSS copiado). Ela lê o
// curso pela URL — atividade.html?curso=word — e monta tudo a partir do
// catálogo em js/data/atividades.js.
//
// Se o curso da URL não existir, mostra um aviso com link de volta em vez
// de uma página em branco.
// ==========================================================================

const cursoAtual = acharAtividade(Rotas.parametro("curso"));

const banner = document.getElementById("atividade-banner");
const lista = document.getElementById("lista-materiais");
const busca = document.getElementById("busca-material");
const contador = document.getElementById("contador-materiais");

if (!cursoAtual) {
  document.title = "Atividade não encontrada — MicroAtividades";
  banner.setAttribute("titulo", "Atividade não encontrada");
  banner.setAttribute("texto", "O endereço acessado não corresponde a nenhuma atividade.");
  document.getElementById("atividade-barra").classList.add("hidden");
  lista.innerHTML = `
    <div class="aviso">
      <strong>Essa atividade não existe (ou foi renomeada).</strong>
      <p>Volte para a página inicial e escolha uma das atividades disponíveis.</p>
      <a class="material-btn" href="${Rotas.url("inicio")}">← Voltar para o início</a>
    </div>
  `;
} else {
  const materiais = cursoAtual.materiais || [];

  document.title = `${cursoAtual.titulo} — MicroAtividades`;
  banner.setAttribute("titulo", cursoAtual.titulo);
  banner.setAttribute("texto", cursoAtual.descricao);
  banner.setAttribute("cor", `linear-gradient(135deg, ${cursoAtual.cor}, ${cursoAtual.cor}b3)`);

  // Capa opcional: só cursos com o campo `imagem` ganham a foto de topo.
  // Enquanto o arquivo não chega (ou se falhar), o bloco fica escondido.
  if (cursoAtual.imagem) {
    const capaWrap = document.getElementById("atividade-capa");
    const capaImg = document.getElementById("atividade-capa-img");
    capaImg.alt = `Capa — ${cursoAtual.titulo}`;
    capaImg.addEventListener("load", () => capaWrap.classList.remove("hidden"));
    capaImg.addEventListener("error", () => capaWrap.classList.add("hidden"));
    capaImg.src = cursoAtual.imagem;
  }

  contador.textContent =
    materiais.length === 1 ? "1 material disponível" : `${materiais.length} materiais disponíveis`;

  // Desenha a lista (opcionalmente filtrada pelo campo de busca).
  function desenhar(filtro) {
    const termo = (filtro || "").trim().toLowerCase();
    const visiveis = termo
      ? materiais.filter((m) =>
          `${m.titulo} ${m.descricao || ""}`.toLowerCase().includes(termo)
        )
      : materiais;

    lista.innerHTML = "";
    if (!visiveis.length) {
      lista.innerHTML = `<div class="aviso"><strong>Nenhum material encontrado para essa busca.</strong></div>`;
      return;
    }
    visiveis.forEach((material) => lista.appendChild(cardMaterial(material)));
  }

  if (!materiais.length) {
    // Curso já cadastrado, mas cujos arquivos ainda não foram enviados.
    document.getElementById("atividade-barra").classList.add("hidden");
    lista.innerHTML = `
      <div class="aviso">
        <strong>Nenhum material publicado ainda.</strong>
        <p>Os arquivos deste curso ainda não foram adicionados ao portal.</p>
        <a class="material-btn" href="${Rotas.url("inicio")}">← Voltar para o início</a>
      </div>
    `;
  } else {
    desenhar();
    busca.addEventListener("input", (e) => desenhar(e.target.value));

    // Com poucos materiais o campo de busca só ocupa espaço.
    if (materiais.length < 5) busca.classList.add("hidden");
  }
}
