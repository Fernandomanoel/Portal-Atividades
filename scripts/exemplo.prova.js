// Modelo de prova interativa.
//
// Como usar:
// 1. Copie este arquivo para dentro de provas/<curso>/.
// 2. Renomeie terminando em ".prova.js" (ex: "prova-modulo-1.prova.js").
//    Só arquivos com esse sufixo viram prova interativa — qualquer outro
//    nome (.js sem o ".prova" antes) é tratado como arquivo comum.
// 3. Edite o título e as perguntas abaixo.
// 4. Rode "python3 scripts/generate-provas-manifest.py" pra atualizar o site.
//
// Cada pergunta tem 4 alternativas ("opcoes") e o índice (0, 1, 2 ou 3) da
// alternativa correta em "correta". A correção é feita no navegador do
// aluno (não há servidor), então trate isso como autoavaliação — não é
// à prova de cola de quem souber ler o código-fonte da página.

registerProvaInterativa({
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
