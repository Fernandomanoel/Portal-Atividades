# MicroAtividades

Site estático (sem build, sem dependências, sem servidor) com três páginas:

- **`index.html` — Início**: banner, carrossel de atividades e cards "Mais Atividades".
- **`atividade.html` — uma atividade**: página genérica que serve **todos** os cursos, escolhido pelo endereço (`atividade.html?curso=word`). Lista os PDFs, planilhas e links daquele curso.
- **`provas.html` — Provas**: protegida por senha, lista os arquivos guardados em `provas/<curso>/`, organizados por categoria. As provas interativas abrem na própria página, com botão para voltar.

Tudo que é conteúdo mora em arquivos de dados, não no HTML: as atividades em `js/data/atividades.js` (editado à mão) e as provas em `js/data/provas-data.js` (gerado por script).

## Estrutura

```
.
├── index.html                          # página inicial (só a moldura; a lista vem do catálogo)
├── atividade.html                      # UMA página serve todos os cursos: ?curso=<slug>
├── provas.html                         # área de provas + prova interativa
├── COMO-CRIAR-PROVAS.md                # formato das provas interativas (.prova.js), autossuficiente
├── css/
│   ├── main.css                        # única folha que as páginas carregam; junta as de baixo
│   ├── base.css                        # cores, modo escuro, reset e utilitários
│   ├── layout.css                      # menu, banner, container, rodapé
│   ├── components.css                  # cards, carrossel, lista de materiais, busca
│   ├── provas.css                      # só a área de provas
│   └── quiz.css                        # só a prova interativa (independente do resto)
├── js/
│   ├── core/
│   │   ├── router.js                   # tabela de rotas: nomes → arquivos, e leitura de ?parâmetros
│   │   └── tema.js                     # modo claro/escuro (vale para o site inteiro)
│   ├── components/
│   │   ├── layout.js                   # <app-navbar>, <app-banner>, <app-footer>
│   │   └── cards.js                    # cards de curso, cards coloridos e linha de material
│   ├── data/
│   │   ├── atividades.js               # CATÁLOGO das atividades — é aqui que se edita conteúdo
│   │   └── provas-data.js              # gerado — índice de provas/ (não editar à mão)
│   └── pages/
│       ├── home.js                     # monta a página inicial
│       ├── atividade.js                # monta a página de um curso a partir da URL
│       ├── provas.js                   # senha, listagem e filtro por categoria
│       └── quiz.js                     # motor da prova interativa (independente do resto)
├── scripts/
│   ├── generate-provas-manifest.py     # gera js/data/provas-data.js a partir de provas/
│   ├── exemplo.prova.js                # modelo de prova de múltipla escolha (corrige na hora)
│   ├── exemplo-descritiva.prova.js     # modelo de prova descritiva (instrutor avalia depois)
│   └── exemplo-standalone.prova.html   # modelo de prova em página HTML autossuficiente
├── images/cursos/                      # ícones/capas dos cursos da área de Provas
├── img/                                # imagens do carrossel e dos cards da página inicial
├── atividades/                         # SÓ ARQUIVOS (PDFs, planilhas) — ver README de lá
│   ├── pdfs/<curso>/
│   └── base dados/
└── provas/<curso>/                     # arquivos reais das provas, organizados por curso
```

## Como isso funciona (componentes e rotas)

**Componentes.** O menu, o banner e o rodapé não são copiados em cada página: são tags próprias, criadas em `js/components/layout.js`. Uma página escreve só:

```html
<app-navbar></app-navbar>
<app-banner titulo="Provas" texto="Área dos instrutores"></app-banner>
<app-footer></app-footer>
```

Mudar o menu = mexer num arquivo só. Os cards seguem a mesma ideia em `js/components/cards.js`.

**Rotas.** Nenhum arquivo `.html` aparece escrito no meio do código. Tudo passa por `js/core/router.js`:

```js
Rotas.url("atividade", { curso: "word" })  // "atividade.html?curso=word"
Rotas.parametro("curso")                   // lê ?curso= do endereço atual
```

**Uma página por tipo de tela, não por curso.** Antes existiam ~20 arquivos HTML dentro de `atividades/`, um por curso, cada um com o próprio CSS copiado e colado. Agora existe `atividade.html`, que lê o curso do endereço e monta a tela a partir do catálogo. Adicionar um curso não cria arquivo nenhum.

## Como rodar

Abra `index.html` no navegador, ou sirva a pasta:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Adicionando/editando uma ATIVIDADE

Tudo em **`js/data/atividades.js`** (o arquivo tem as instruções no topo).

**Um PDF novo num curso que já existe:**

1. Copie o arquivo para `atividades/pdfs/<Curso>/`.
2. Acrescente um item na lista `materiais` do curso:

```js
{
  titulo: "Nome que aparece no site",
  descricao: "Uma linha explicando a atividade.",
  tipo: "pdf",                                    // "pdf" | "planilha" | "link"
  arquivo: "atividades/pdfs/Word 2021/arquivo.pdf",
}
```

**Um curso novo:** copie um bloco de curso inteiro, troque `slug`, `titulo`, `descricao`, `imagem`, `cor` e os materiais. Ele aparece sozinho na página inicial e já ganha o endereço `atividade.html?curso=<slug>`. Use `grupo: "cursos"` para o carrossel de cima ou `grupo: "extras"` para os cards coloridos.

## Adicionando provas (arquivo comum: PDF, DOCX, link, etc.)

1. Coloque o arquivo dentro de `provas/<curso>/` (crie a pasta do curso se ainda não existir).
2. Se for um curso novo, adicione-o em `CATEGORY_MAP` no topo de `scripts/generate-provas-manifest.py` (senão ele cai em "Outros" na navegação).
3. Rode `python3 scripts/generate-provas-manifest.py` para atualizar `js/data/provas-data.js`.
4. Recarregue a página — o arquivo aparece automaticamente no card do curso.

## Adicionando uma prova interativa (respondida no próprio portal)

Guia completo e autossuficiente em **`COMO-CRIAR-PROVAS.md`** — pensado para ser copiado inteiro numa conversa com qualquer IA e gerar uma prova nova sem precisar de mais contexto. Resumo:

- **Múltipla escolha** (`scripts/exemplo.prova.js`) — corrige na hora, mostra "X de Y corretas". Correção 100% no navegador do aluno (sem servidor), então é autoavaliação, não à prova de cola.
- **Descritiva** (`scripts/exemplo-descritiva.prova.js`) — perguntas abertas. O aluno escreve, envia uma única vez (sem opção de refazer) e a tela de revisão mostra as respostas com um campo "Nota" para o instrutor preencher ali mesmo. Sem indicação automática de certo/errado. A trava contra reenvio é por navegador (`localStorage`), não por aluno — o site não tem login de aluno.
- **Página HTML autossuficiente** (`scripts/exemplo-standalone.prova.html`) — uma página comum, sem depender de nada do site; o card só faz um link que abre ela numa aba nova. É o formato mais fácil de pedir pra qualquer IA gerar do zero, mas fica por conta da própria página cuidar de correção, estilo e link de volta.

Depois de copiar o modelo pra `provas/<curso>/` e editar, rode `python3 scripts/generate-provas-manifest.py` — o botão "Fazer prova" aparece sozinho no card do curso.

`js/pages/quiz.js` + `css/quiz.css` só sabem rodar uma prova (carregar o `.prova.js`, desenhar as perguntas, receber o envio); não sabem nada sobre cursos, categorias ou senha. Dá pra copiar os dois pra outro projeto sozinhos, desde que o HTML tenha os elementos e templates que `quiz.js` espera (documentado no topo do próprio arquivo).

## Ícones e imagens

- `img/` — capas do carrossel e dos cards da página inicial (nomes esperados no README da pasta).
- `images/cursos/` — ícones dos cursos da área de Provas: é só soltar um `.png` com o nome do curso, sem mexer em código.

## Senha da área de provas

A área fica bloqueada por uma senha (definida em `js/pages/provas.js`, constante `PROVAS_PASSWORD`) até ser digitada corretamente; depois fica liberada enquanto a aba do navegador estiver aberta (`sessionStorage`), e o botão "Sair" tranca de novo. A lista de cursos/arquivos só é criada no HTML depois do login (antes disso não aparece nem no código-fonte).

**Atenção**: como o site é 100% estático, essa senha é só uma trava de interface — não é segurança de verdade. O arquivo `js/data/provas-data.js` com a lista completa ainda é baixado pelo navegador de qualquer forma, e os arquivos dentro de `provas/` continuam acessíveis a quem tiver acesso ao repositório, independente da senha.
