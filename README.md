# MicroAtividades

Página única (sem dependências ou build), com um navbar no topo alternando entre duas views:

- **Início (Atividades)** — banner, carrossel de atividades e cards "Mais Atividades", com modo escuro.
- **Provas** — protegida por senha, lista os arquivos reais guardados em `provas/<curso>/` (PDFs, DOCX, links, provas interativas, etc.), organizados por categoria numa navbar própria, um card por curso.

Provas interativas (`.prova.js`) abrem numa terceira view de página inteira, com um botão para voltar ao Início — ver `COMO-CRIAR-PROVAS.md` para o formato.

## Estrutura

```
.
├── index.html                          # marcação e templates dos cards/perguntas
├── COMO-CRIAR-PROVAS.md                # formato das provas interativas (.prova.js), autossuficiente
├── css/
│   ├── style.css                       # estilos gerais do site (navbar, banner, carrossel, provas)
│   └── quiz.css                        # estilos só da prova interativa (independente do resto)
├── js/
│   ├── script.js                       # núcleo: navegação entre views, carrossel, modo escuro
│   ├── quiz.js                         # motor da prova interativa (independente do resto)
│   ├── provas.js                       # área de provas: senha, listagem de arquivos, filtro por categoria
│   └── provas-data.js                  # gerado — lista de arquivos/categorias de provas/ (não editar à mão)
├── scripts/
│   ├── generate-provas-manifest.py     # gera js/provas-data.js a partir de provas/
│   ├── exemplo.prova.js                # modelo de prova de múltipla escolha (corrige na hora)
│   └── exemplo-descritiva.prova.js     # modelo de prova descritiva (instrutor avalia depois)
├── images/
│   └── cursos/                         # ícones/capas dos cursos (opcional, ver README da pasta)
└── provas/
    └── <curso>/                        # arquivos reais das provas, organizados por curso
```

`js/quiz.js` + `css/quiz.css` só sabem rodar uma prova (carregar o `.prova.js`, desenhar as perguntas, receber o envio); não sabem nada sobre cursos, categorias ou senha. Dá pra copiar os dois pra outro projeto sozinhos, desde que o HTML tenha os elementos e templates que `quiz.js` espera (documentado no topo do próprio arquivo) e uma função `showView(nome)` para abrir/fechar a página da prova.

## Como rodar

Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Adicionando provas (arquivo comum: PDF, DOCX, link, etc.)

1. Coloque o arquivo dentro de `provas/<curso>/` (crie a pasta do curso se ainda não existir).
2. Se for um curso novo, adicione-o em `CATEGORY_MAP` no topo de `scripts/generate-provas-manifest.py` (senão ele cai em "Outros" na navegação).
3. Rode `python3 scripts/generate-provas-manifest.py` para atualizar `js/provas-data.js`.
4. Recarregue a página — o arquivo aparece automaticamente no card do curso na aba Provas.

## Adicionando uma prova interativa (respondida no próprio portal)

Guia completo e autossuficiente em **`COMO-CRIAR-PROVAS.md`** — pensado para ser copiado inteiro numa conversa com qualquer IA e gerar uma prova nova sem precisar de mais contexto. Resumo:

- **Múltipla escolha** (`scripts/exemplo.prova.js`) — corrige na hora, mostra "X de Y corretas". Correção 100% no navegador do aluno (sem servidor), então é autoavaliação, não à prova de cola.
- **Descritiva** (`scripts/exemplo-descritiva.prova.js`) — perguntas abertas. O aluno escreve, envia uma única vez (sem opção de refazer) e a tela de revisão mostra as respostas com um campo "Nota" para o instrutor preencher ali mesmo. Sem indicação automática de certo/errado. A trava contra reenvio é por navegador (`localStorage`), não por aluno — o site não tem login de aluno.

Depois de copiar o modelo pra `provas/<curso>/` e editar, rode `python3 scripts/generate-provas-manifest.py` — o botão "Fazer prova" aparece sozinho no card do curso.

## Ícones dos cursos

Cada card (Atividades e Provas) mostra um quadrado colorido com a inicial do curso. Para trocar por uma imagem de verdade, veja `images/cursos/README.md` — é só soltar o arquivo `.png` com o nome certo, sem mexer em código.

## Funcionamento

- **Início/Atividades**: carrossel e cards estáticos, definidos direto no `index.html` (não vêm de `provas/`).
- **Provas**: a view fica bloqueada por uma senha (definida em `js/provas.js`, constante `PROVAS_PASSWORD`) até ser digitada corretamente; depois disso fica liberada enquanto a aba do navegador estiver aberta (`sessionStorage`), e o botão "Sair" tranca de novo. A lista de cursos/arquivos só é criada no HTML depois do login (antes disso não aparece nem no código-fonte). **Atenção**: como o site é 100% estático, essa senha é só uma trava de interface — não é segurança de verdade. O arquivo `js/provas-data.js` com a lista completa ainda é baixado pelo navegador de qualquer forma, e os arquivos dentro de `provas/` continuam acessíveis a quem tiver acesso ao repositório, independente da senha.
