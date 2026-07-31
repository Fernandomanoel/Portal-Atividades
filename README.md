# Portal de Atividades

Página única (sem dependências ou build) com duas abas:

- **Atividades** — cada curso tem um card com um formulário para adicionar itens (título, data, descrição), salvos no `localStorage` do navegador.
- **Provas** — protegida por senha, lista os arquivos reais guardados em `provas/<curso>/` (PDFs, DOCX, links, provas interativas, etc.), organizados por categoria numa barra lateral, um card por curso, no mesmo visual da aba Atividades.

## Estrutura

```
.
├── index.html                          # marcação e templates dos cards/itens/modal de prova
├── css/
│   └── style.css                       # estilos
├── js/
│   ├── script.js                       # núcleo: navegação entre views, carrossel, modo escuro
│   ├── provas.js                       # área de provas: senha, listagem, filtro, provas interativas
│   └── provas-data.js                  # gerado — lista de arquivos/categorias de provas/ (não editar à mão)
├── scripts/
│   ├── generate-provas-manifest.py     # gera js/provas-data.js a partir de provas/
│   └── exemplo.prova.js                # modelo de prova interativa pra copiar
├── images/
│   └── cursos/                         # ícones/capas dos cursos (opcional, ver README da pasta)
└── provas/
    └── <curso>/                        # arquivos reais das provas, organizados por curso
```

## Como rodar

Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Adicionando provas (arquivo comum: PDF, DOCX, link, etc.)

1. Coloque o arquivo dentro de `provas/<curso>/` (crie a pasta do curso se ainda não existir).
2. Se for um curso novo, adicione-o em `CATEGORY_MAP` no topo de `scripts/generate-provas-manifest.py` (senão ele cai em "Outros" na barra lateral).
3. Rode `python3 scripts/generate-provas-manifest.py` para atualizar `js/provas-data.js`.
4. Recarregue a página — o arquivo aparece automaticamente no card do curso na aba Provas.

## Adicionando uma prova interativa (respondida no próprio portal)

1. Copie `scripts/exemplo.prova.js` para dentro de `provas/<curso>/`, com um nome terminado em `.prova.js` (ex: `modulo-1.prova.js`).
2. Edite o título e as perguntas dentro do arquivo (o formato está comentado nele).
3. Rode `python3 scripts/generate-provas-manifest.py`.
4. Na aba Provas, o card do curso passa a mostrar um botão "Fazer prova"; ao clicar, abre um modal com as perguntas e corrige na hora, sem sair da página.

A correção é feita inteiramente no navegador do aluno — não há servidor nem banco de dados — então trate como autoavaliação, não como prova oficial à prova de cola.

## Ícones dos cursos

Cada card (Atividades e Provas) mostra um quadrado colorido com a inicial do curso. Para trocar por uma imagem de verdade, veja `images/cursos/README.md` — é só soltar o arquivo `.png` com o nome certo, sem mexer em código.

## Funcionamento

- **Atividades**: cada curso cadastrado ganha um card com um formulário para adicionar itens. Os itens são ordenados automaticamente pela data mais próxima (itens sem data ficam no final). Cursos podem ser adicionados/removidos pela barra de ferramentas no topo. Tudo é salvo no `localStorage`, na chave `portal-atividades`.
- **Provas**: a aba fica bloqueada por uma senha (definida em `js/provas.js`, constante `PROVAS_PASSWORD`) até ser digitada corretamente; depois disso fica liberada enquanto a aba do navegador estiver aberta (`sessionStorage`), e o botão "Sair" tranca de novo. A lista de cursos/arquivos só é criada no HTML depois do login (antes disso não aparece nem no código-fonte). **Atenção**: como o site é 100% estático, essa senha é só uma trava de interface — não é segurança de verdade. O arquivo `js/provas-data.js` com a lista completa ainda é baixado pelo navegador de qualquer forma, e os arquivos dentro de `provas/` continuam acessíveis a quem tiver acesso ao repositório, independente da senha.
