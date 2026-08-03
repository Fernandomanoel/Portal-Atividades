// ==========================================================================
// core/router.js — ROTAS DO SITE
//
// O site tem 3 páginas de verdade (index.html, atividade.html, provas.html).
// Em vez de espalhar o nome dos arquivos por todo o HTML e JS, tudo passa
// por aqui: se um dia um arquivo mudar de nome, muda só nesta tabela.
//
// Uso:
//   Rotas.url("atividade", { curso: "word" })  →  "atividade.html?curso=word"
//   Rotas.ir("inicio")                         →  navega para a home
//   Rotas.parametro("curso")                   →  lê ?curso= da URL atual
//   Rotas.atual()                              →  "inicio" | "atividade" | "provas"
// ==========================================================================

const Rotas = (() => {
  const TABELA = {
    inicio: "index.html",
    atividade: "atividade.html",
    provas: "provas.html",
  };

  // Monta o endereço de uma rota, já com os parâmetros na query string.
  function url(nome, parametros) {
    const pagina = TABELA[nome];
    if (!pagina) {
      console.error(`[router] Rota desconhecida: "${nome}"`);
      return "#";
    }
    const query = new URLSearchParams(parametros || {}).toString();
    return query ? `${pagina}?${query}` : pagina;
  }

  function ir(nome, parametros) {
    window.location.href = url(nome, parametros);
  }

  function parametro(nome) {
    return new URLSearchParams(window.location.search).get(nome);
  }

  // Descobre em qual rota a página atual está (usado para marcar o link
  // ativo no menu). Uma URL terminada em "/" é a home.
  function atual() {
    const arquivo = window.location.pathname.split("/").pop() || "index.html";
    const encontrada = Object.keys(TABELA).find((nome) => TABELA[nome] === arquivo);
    return encontrada || "inicio";
  }

  return { url, ir, parametro, atual };
})();
