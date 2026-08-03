# Como criar uma prova interativa

Este guia é autossuficiente: dá pra colar ele inteiro numa conversa com
qualquer IA (ou seguir na mão) para criar uma prova nova, sem precisar
entender o resto do site.

Existem **três formatos**. Os dois primeiros passam pelo motor do site
(`js/pages/quiz.js`) e seguem o mesmo visual das outras páginas; o terceiro é
uma página HTML comum, sem depender de nada daqui — o mais fácil de pedir
pra qualquer IA gerar do zero.

| Formato | Arquivo | Corrige na hora? | Quem avalia |
|---|---|---|---|
| [1. Múltipla escolha](#formato-1-múltipla-escolha-corrige-na-hora) | `.prova.js` | Sim | Ninguém, é automático |
| [2. Descritiva](#formato-2-descritiva-perguntas-abertas-instrutor-avalia) | `.prova.js` | Não | Instrutor, na mesma tela |
| [3. Página autossuficiente](#formato-3-página-html-autossuficiente) | `.prova.html` | Depende do que a página fizer | Depende do que a página fizer |

Nos três casos, o arquivo fica dentro de `provas/<curso>/`, ao lado dos
outros materiais daquele curso.

## Formato 1: múltipla escolha (corrige na hora)

Arquivo termina em **`.prova.js`**. Ao ser carregado, ele "se registra"
chamando uma função global, uma única vez — não manipula HTML nem CSS,
só descreve a prova:

```javascript
registerProvaInterativa({
  tipo: "multipla_escolha",   // pode omitir este campo — é o padrão
  titulo: "Prova de exemplo",
  perguntas: [
    {
      pergunta: "Qual é a capital do Brasil?",
      opcoes: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
      correta: 2,
    },
    {
      pergunta: "Quanto é 7 x 8?",
      opcoes: ["54", "56", "64", "48"],
      correta: 1,
    },
  ],
});
```

Regras:
- `perguntas` é uma lista de objetos `{ pergunta, opcoes, correta }`.
- `opcoes` é uma lista de textos (pode ter qualquer quantidade de alternativas, não precisa ser sempre 4).
- `correta` é o **índice** (começando em 0) da alternativa certa dentro de `opcoes`. Na lista acima, `correta: 2` aponta para `"Brasília"` (posição 0=Rio, 1=São Paulo, 2=Brasília, 3=Salvador).
- Ao enviar, o aluno vê na hora "Você acertou X de Y perguntas." Não existe tela de revisão nem nota de instrutor nesse formato — é autocorreção simples.
- **Atenção**: a correção roda no navegador do aluno. Qualquer um que souber abrir o código-fonte da página vê o gabarito (o campo `correta`). Não é à prova de cola — use para exercícios de fixação, não para provas de peso.

Modelo pronto para copiar: `scripts/exemplo.prova.js`.

## Formato 2: descritiva (perguntas abertas, instrutor avalia)

Também termina em **`.prova.js`**, mesma função de registro, `tipo` diferente:

```javascript
registerProvaInterativa({
  tipo: "descritiva",
  titulo: "Prova descritiva de exemplo",
  perguntas: [
    "Explique com suas palavras o que você aprendeu neste módulo.",
    "Dê um exemplo prático de como usaria esse conteúdo no dia a dia.",
  ],
});
```

Regras:
- `perguntas` aqui é uma lista simples de **strings** (só o texto da pergunta, sem alternativas nem resposta certa).
- O aluno digita as respostas em campos de texto livre e clica em "Enviar respostas" **uma única vez** — depois disso a prova fica travada nesse navegador, mostrando uma tela de revisão com o que foi escrito e um campo "Nota" para o instrutor preencher ali mesmo, lendo as respostas.
- Não existe correção automática nem indicação de certo/errado — não faz sentido para pergunta aberta, e é proposital: quem avalia é o instrutor.
- A trava contra reenvio (e a nota digitada) ficam salvas no `localStorage` do navegador usado — é uma trava **por aparelho**, não por aluno. O site não tem login nem cadastro de aluno, então trocar de navegador ou limpar os dados do navegador permite refazer. Isso é uma limitação conhecida, não um bug.

Modelo pronto para copiar: `scripts/exemplo-descritiva.prova.js`.

## Formato 3: página HTML autossuficiente

Arquivo termina em **`.prova.html`**. É uma página comum, completa
(`<html>`, `<head>`, `<body>`, tudo) — **não** chama `registerProvaInterativa`
nem depende de nenhum arquivo do site. O site só faz um link pra ela; ao
clicar em "Fazer prova", ela abre numa aba nova, e cuida sozinha de tudo:
perguntas, correção (se tiver), estilo, resultado.

É o formato mais fácil de pedir pra qualquer IA gerar — basta descrever a
prova ("crie uma página HTML com um formulário de 10 perguntas de múltipla
escolha sobre X, que corrija e mostre a pontuação ao enviar") sem
mencionar nada deste projeto. Só duas coisas precisam ser ajustadas depois
de gerada:

1. **O link de volta.** Se a página tiver um link "Voltar para o início"
   ou parecido apontando pra `index.html`, ele precisa virar `../../index.html`
   — a prova fica duas pastas abaixo da raiz (`provas/<curso>/arquivo.prova.html`).
2. **O nome do arquivo** precisa terminar em `.prova.html` (ex:
   `prova-vendas.prova.html`). Sem esse sufixo, o site trata o arquivo
   como material comum para baixar, não como prova.

Modelo pronto para copiar: `scripts/exemplo-standalone.prova.html`.

Como esse formato não depende do resto do projeto, o autor é livre pra
usar bibliotecas externas (o exemplo real que originou este formato usava
Tailwind CSS via CDN). Únicos cuidados:
- Se depender de internet (CDN externo), a prova só funciona com o
  computador do aluno conectado.
- O site não sabe nada sobre o que acontece dentro dessa página — não tem
  nota salva, não tem trava contra reenvio, não tem integração com nada.
  Se precisar de algum desses recursos, use o Formato 1 ou 2 em vez deste.

## Passo a passo para adicionar uma prova nova

1. Escolha o curso (uma pasta dentro de `provas/`, ex: `provas/Excel/`). Se o curso ainda não existe, crie a pasta.
2. Crie o arquivo dentro dela com o sufixo certo para o formato escolhido: `.prova.js` (formatos 1 e 2) ou `.prova.html` (formato 3). O nome antes do sufixo é livre, mas evite espaços/acentos (ex: `avaliacao-modulo-1.prova.js`).
3. Cole um dos modelos acima e edite o `titulo`/perguntas (ou peça pra uma IA gerar direto no formato 3).
4. Na raiz do projeto, rode:
   ```bash
   python3 scripts/generate-provas-manifest.py
   ```
   Isso atualiza `js/data/provas-data.js`, o índice que o site lê para saber quais arquivos existem. **Sem rodar esse comando, a prova não aparece no site**, mesmo estando na pasta certa.
5. Se for um curso novo (pasta que você acabou de criar), adicione o nome dele em `CATEGORY_MAP`, no topo de `scripts/generate-provas-manifest.py`, apontando para uma das categorias existentes — senão ele cai em "Outros" na navegação.
6. Abra o site: o botão "Fazer prova" aparece automaticamente no card do curso.

## Os arquivos que fazem essa engrenagem funcionar

- `js/pages/quiz.js` — sabe carregar um `.prova.js` (formatos 1 e 2) e desenhar a prova na tela. Não sabe nada sobre cursos, categorias ou arquivos `.prova.html`.
- `css/quiz.css` — o visual da prova (formatos 1 e 2). Também é independente do resto do site (só depende de algumas variáveis de cor de `css/base.css`, documentadas no topo do arquivo).
- `js/pages/provas.js` — lista os cursos/arquivos; para `.prova.js` chama `Quiz.abrir(caminho, nome)` (de `quiz.js`), para `.prova.html` só monta um link normal que abre em nova aba.
- `scripts/generate-provas-manifest.py` — varre a pasta `provas/` e gera `js/data/provas-data.js`; é quem decide, pelo nome do arquivo, se algo é `.prova.js`, `.prova.html` ou material comum.
- `scripts/exemplo.prova.js`, `scripts/exemplo-descritiva.prova.js` e `scripts/exemplo-standalone.prova.html` — cópias prontas dos três modelos deste guia, para copiar direto em vez de digitar.
