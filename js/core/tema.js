// ==========================================================================
// core/tema.js — MODO CLARO / ESCURO
//
// A preferência fica no localStorage, então vale para todas as páginas do
// site. O tema é aplicado assim que este arquivo carrega (antes de montar
// a tela) para a página não "piscar" branca antes de escurecer.
//
// Quem desenha o botão é o componente <app-navbar> (components/layout.js);
// ele só chama Tema.alternar() e Tema.ativo().
// ==========================================================================

const Tema = (() => {
  const CHAVE = "portal-dark-mode";
  // Guarda quem quer ser avisado quando o tema muda (hoje: o ícone do botão).
  const ouvintes = [];

  function ativo() {
    return document.documentElement.classList.contains("dark-mode");
  }

  function aplicar(escuro) {
    // A classe vai no <html> (e não no <body>) porque este arquivo roda no
    // <head>, antes do <body> existir.
    document.documentElement.classList.toggle("dark-mode", escuro);
    ouvintes.forEach((fn) => fn(escuro));
  }

  function alternar() {
    const escuro = !ativo();
    localStorage.setItem(CHAVE, escuro ? "1" : "0");
    aplicar(escuro);
  }

  function aoMudar(fn) {
    ouvintes.push(fn);
    fn(ativo());
  }

  aplicar(localStorage.getItem(CHAVE) === "1");

  return { ativo, alternar, aoMudar };
})();
