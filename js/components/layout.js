// ==========================================================================
// components/layout.js — COMPONENTES DE MOLDURA DA PÁGINA
//
// São Web Components (tags HTML criadas por nós). Em vez de repetir o mesmo
// menu e o mesmo rodapé em cada arquivo .html, cada página escreve só:
//
//   <app-navbar></app-navbar>
//   <app-banner titulo="Provas" texto="Área dos instrutores"></app-banner>
//   <app-footer></app-footer>
//
// e o HTML de verdade é gerado aqui — um lugar só para mexer.
//
// Os componentes escrevem no DOM normal (sem Shadow DOM) de propósito:
// assim o CSS do site continua valendo dentro deles, sem truque nenhum.
// ==========================================================================

// Escapa texto vindo de atributos/dados antes de jogar no innerHTML.
function textoSeguro(valor) {
  const div = document.createElement("div");
  div.textContent = valor == null ? "" : String(valor);
  return div.innerHTML;
}

// ---- <app-navbar> ----------------------------------------------------
// Menu do topo. Marca sozinho o link da página atual (via Rotas.atual())
// e cuida do botão de modo escuro.

class AppNavbar extends HTMLElement {
  connectedCallback() {
    const rotaAtual = Rotas.atual();
    // A página de uma atividade faz parte da área "Início" — exceto o
    // Inglês, que tem link próprio no menu e não pode ficar marcado como
    // se fosse só mais um curso dentro de "Início".
    const cursoDaUrl = rotaAtual === "atividade" ? Rotas.parametro("curso") : null;
    const ativo = cursoDaUrl === "ingles" ? "ingles" : rotaAtual === "atividade" ? "inicio" : rotaAtual;

    this.className = "navbar";
    this.innerHTML = `
      <a href="${Rotas.url("inicio")}" class="navbar-brand">MicroAtividades</a>

      <ul class="navbar-links">
        <li><a href="${Rotas.url("inicio")}" class="nav-link ${ativo === "inicio" ? "active" : ""}">Início</a></li>
        <li><a href="${Rotas.url("atividade", { curso: "ingles" })}" class="nav-link ${ativo === "ingles" ? "active" : ""}">Inglês</a></li>
        <li><a href="${Rotas.url("provas")}" class="nav-link ${ativo === "provas" ? "active" : ""}">Provas</a></li>
      </ul>

      <button type="button" class="dark-mode-btn" aria-label="Alternar modo escuro">🌙</button>
    `;

    const botao = this.querySelector(".dark-mode-btn");
    botao.addEventListener("click", () => Tema.alternar());
    Tema.aoMudar((escuro) => {
      botao.textContent = escuro ? "☀️" : "🌙";
    });
  }
}

// ---- <app-banner> ----------------------------------------------------
// Faixa colorida no topo do conteúdo.
//   titulo / texto → conteúdo
//   cor            → (opcional) fundo próprio, usado nas páginas de curso
//   titulo-id      → (opcional) id colocado no <h1>, para outro script
//                    conseguir trocar o título depois (ex.: o quiz)
// Qualquer conteúdo escrito dentro da tag (ex.: o botão "Sair" das provas)
// é mantido, encostado à direita.
//
// Trocar um atributo depois de a página carregar redesenha só os textos —
// é assim que a página de atividade preenche o banner com o curso da URL.

class AppBanner extends HTMLElement {
  static get observedAttributes() {
    return ["titulo", "texto", "cor"];
  }

  connectedCallback() {
    const extra = this.innerHTML;
    const tituloId = this.getAttribute("titulo-id");

    this.className = "banner";
    this.innerHTML = `
      <div class="banner-text">
        <h1${tituloId ? ` id="${textoSeguro(tituloId)}"` : ""}></h1>
        <p></p>
      </div>
      ${extra}
    `;

    this.tituloEl = this.querySelector("h1");
    this.textoEl = this.querySelector(".banner-text p");
    this.atualizar();
  }

  attributeChangedCallback() {
    if (this.tituloEl) this.atualizar();
  }

  atualizar() {
    const texto = this.getAttribute("texto") || "";
    this.tituloEl.textContent = this.getAttribute("titulo") || "";
    this.textoEl.textContent = texto;
    this.textoEl.classList.toggle("hidden", !texto);
    const cor = this.getAttribute("cor");
    if (cor) this.style.background = cor;
  }
}

// ---- <app-voltar> ----------------------------------------------------
// Botão "Voltar" das páginas internas. Se o usuário chegou navegando
// pelo site, volta uma página no histórico (leva de volta exatamente de
// onde veio); se abriu o link direto, vai para o início.
//
//   <app-voltar para="inicio" texto="Voltar para o início"></app-voltar>

class AppVoltar extends HTMLElement {
  connectedCallback() {
    const destino = Rotas.url(this.getAttribute("para") || "inicio");
    const texto = this.getAttribute("texto") || "Voltar";

    this.innerHTML = `<a class="voltar-btn" href="${destino}">← ${textoSeguro(texto)}</a>`;

    this.querySelector("a").addEventListener("click", (e) => {
      // history.length > 1 = veio de outra página nesta mesma aba.
      if (window.history.length > 1 && document.referrer.includes(window.location.host)) {
        e.preventDefault();
        window.history.back();
      }
    });
  }
}

// ---- <app-footer> ----------------------------------------------------

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.className = "footer";
    this.innerHTML = `
      <div class="footer-content">
        <div class="footer-left">
          <h3>MicroAtividades</h3>
          <p>Atividades para reforços</p>
        </div>

        <div class="footer-links">
          <h4>Navegação</h4>
          <a href="${Rotas.url("inicio")}">Início</a>
          <a href="${Rotas.url("atividade", { curso: "ingles" })}">Inglês</a>
          <a href="${Rotas.url("provas")}">Provas</a>
        </div>

        <div class="footer-info">
          <h4>Informações</h4>
          <p>Microlins São José | Feito por instrutores</p>
          <p>© 2026 Todos os direitos reservados</p>
        </div>
      </div>
    `;
  }
}

customElements.define("app-navbar", AppNavbar);
customElements.define("app-banner", AppBanner);
customElements.define("app-voltar", AppVoltar);
customElements.define("app-footer", AppFooter);
