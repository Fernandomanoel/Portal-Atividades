// Modelo de prova DESCRITIVA (perguntas abertas, sem correção automática).
//
// Diferente do exemplo.prova.js (múltipla escolha, corrige na hora), este
// formato serve para perguntas que exigem uma resposta escrita: o aluno
// digita, envia uma única vez — não dá pra refazer, nem se "passar" nem se
// "não passar" — e o instrutor lê o que foi escrito e digita a nota ali
// mesmo na tela.
//
// Como usar:
// 1. Copie este arquivo para dentro de provas/<curso>/.
// 2. Renomeie terminando em ".prova.js".
// 3. Edite o título e as perguntas abaixo (não há alternativas nem
//    resposta certa — são só o texto da pergunta).
// 4. Rode "python3 scripts/generate-provas-manifest.py" pra atualizar o site.
//
// A nota digitada pelo instrutor fica salva no localStorage do navegador
// usado no momento — é por aparelho, não por aluno. Trocar de navegador ou
// limpar os dados permite refazer a prova; é uma trava simples, do mesmo
// nível da senha da aba Provas, não um controle de identidade de verdade.

registerProvaInterativa({
  tipo: "descritiva",
  titulo: "Prova descritiva de exemplo",
  perguntas: [
    "Explique com suas palavras o que você aprendeu neste módulo.",
    "Dê um exemplo prático de como usaria esse conteúdo no dia a dia.",
  ],
});
