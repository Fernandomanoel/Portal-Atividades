# Músicas do jogo Batalha das 12 Casas

Estes arquivos são usados por
`atividades/paginas/cavaleiros-zodiaco-digitacao.html`.

A música acompanha o **idioma da casa**: toca em laço durante as quatro casas
daquele bloco e faz uma transição suave quando o idioma muda.

| Arquivo | Toca nas casas | Situação |
|---|---|---|
| `abertura-pt.mp3` | 1 a 4 — Áries, Touro, Gêmeos, Câncer | ⬜ falta |
| `abertura-en.mp3` | 5 a 8 — Leão, Virgem, Libra, Escorpião | ⬜ falta |
| `abertura-jp.mp3` | 9 a 12 — Sagitário, Capricórnio, Aquário, Peixes | ⬜ falta |

## Como instalar

Solte o arquivo nesta pasta **com o nome exato da tabela**. Não precisa mexer em
código nenhum: a página procura por esses três nomes ao abrir e liga o botão de
som sozinho quando encontra.

Pode colocar um de cada vez. Se só o português estiver aqui, a música toca nas
quatro primeiras casas e as outras seguem em silêncio, sem erro nenhum.

Formato: **MP3** (funciona em qualquer navegador). Se o arquivo for muito longo,
não tem problema — ele toca em laço e reinicia sozinho.

## E se o arquivo não estiver aqui?

O jogo **funciona normalmente, só sem som**. O botão 🔊 fica desabilitado com o
aviso "áudio ainda não instalado", e nada quebra.

## Por que começa mudo?

Duas razões práticas:

1. **Laboratório.** Quinze máquinas tocando a abertura ao mesmo tempo viram
   barulho e a aula se perde. Assim, quem quiser som liga no botão.
2. **O navegador exige.** Chrome, Edge e Firefox bloqueiam áudio que começa
   sozinho, antes de qualquer clique. O botão 🔊 é justamente esse clique — sem
   ele, o som seria bloqueado e pareceria defeito.

A escolha do aluno (ligado/desligado e o volume) fica guardada no próprio
navegador, então ele não precisa religar a cada casa.

## As letras

O áudio e o **texto que o aluno digita** são coisas separadas. Os versos ficam
no bloco `LETRAS` no começo do arquivo `cavaleiros-zodiaco-digitacao.html`,
marcado com `// COLE AQUI`, dividido em `PT`, `EN` e `JP`.

Cole os versos lá que o jogo reparte sozinho entre as quatro casas de cada
idioma — não precisa contar nem equilibrar. No japonês, escreva em **romaji**
(o som em letras normais), porque o teclado do laboratório não digita kana.
