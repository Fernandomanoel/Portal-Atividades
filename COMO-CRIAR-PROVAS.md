# Como criar uma prova interativa

Este guia é autossuficiente: dá pra colar ele inteiro numa conversa com
qualquer IA (ou seguir na mão) para criar uma prova nova, sem precisar
entender o resto do site.

## O que é uma prova interativa

Um arquivo JavaScript (`.prova.js`) que fica dentro de `provas/<curso>/`,
ao lado dos outros materiais daquele curso. Quando alguém clica em
"Fazer prova" no site, esse arquivo é carregado e ele "se registra"
chamando uma função global, uma única vez:

```javascript
registerProvaInterativa({
  tipo: "multipla_escolha",   // ou "descritiva" — ver os dois formatos abaixo
  titulo: "Nome da prova",
  perguntas: [ /* ... */ ],
});
```

É só isso. O arquivo não precisa (e não deve) manipular HTML, CSS ou
qualquer outra coisa da página — só descrever a prova e chamar essa
função. Quem desenha a tela é o `js/quiz.js` do site.

## Formato 1: múltipla escolha (corrige na hora)

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

## Formato 2: descritiva (perguntas abertas, instrutor avalia)

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

## Passo a passo para adicionar uma prova nova

1. Escolha o curso (uma pasta dentro de `provas/`, ex: `provas/Excel/`). Se o curso ainda não existe, crie a pasta.
2. Crie um arquivo texto dentro dela terminado em `.prova.js` — o nome antes disso é livre, mas evite espaços/acentos se for compartilhar fora do site (ex: `avaliacao-modulo-1.prova.js`). **Só o sufixo `.prova.js` importa**: é o que faz o site tratar o arquivo como prova interativa em vez de material comum para baixar.
3. Cole um dos dois modelos acima e edite o `titulo` e as `perguntas`.
4. Na raiz do projeto, rode:
   ```bash
   python3 scripts/generate-provas-manifest.py
   ```
   Isso atualiza `js/provas-data.js`, o índice que o site lê para saber quais arquivos existem. **Sem rodar esse comando, a prova não aparece no site**, mesmo estando na pasta certa.
5. Se for um curso novo (pasta que você acabou de criar), adicione o nome dele em `CATEGORY_MAP`, no topo de `scripts/generate-provas-manifest.py`, apontando para uma das categorias existentes — senão ele cai em "Outros" na navegação.
6. Abra o site: o botão "Fazer prova" aparece automaticamente no card do curso.

## Os arquivos que fazem essa engrenagem funcionar

- `js/quiz.js` — sabe carregar um `.prova.js` e desenhar a prova na tela (os dois formatos). Não sabe nada sobre cursos ou categorias.
- `css/quiz.css` — o visual da prova. Também é independente do resto do site (só depende de algumas variáveis de cor de `css/style.css`, documentadas no topo do arquivo).
- `js/provas.js` — lista os cursos/arquivos e chama `openQuiz(caminho, nome)` (de `quiz.js`) quando alguém clica em "Fazer prova".
- `scripts/generate-provas-manifest.py` — varre a pasta `provas/` e gera `js/provas-data.js`.
- `scripts/exemplo.prova.js` e `scripts/exemplo-descritiva.prova.js` — cópias prontas dos dois modelos deste guia, para copiar direto em vez de digitar.
