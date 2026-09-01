# Músicas do jogo

A música que toca durante a digitação **não é mais fixa por ensaio**:
o jogo sorteia uma faixa da trilha sonora inteira a cada ensaio
iniciado, e o aluno também pode escolher manualmente qual música
ouvir no seletor ao lado do botão de som.

Para adicionar ou trocar uma faixa, basta colocar o MP3 aqui,
exatamente com o nome esperado:

```
ensaio-1.mp3   (tema: Rock — Chop Suey!, System Of A Down)
ensaio-2.mp3   (tema: Pearl Jam — Black)
ensaio-3.mp3   (tema: Vampiro — Your Biggest Fan, The Vampire Lestat)
ensaio-4.mp3   (tema: Pop — One Time, Justin Bieber)
ensaio-5.mp3   (tema: John Lennon — Beautiful Boy)
ensaio-6.mp3   (tema: Paramore — Decode)
ensaio-7.mp3   (tema: As Branquelas — A Thousand Miles, Vanessa Carlton)
ensaio-8.mp3   (tema: Agente 007 — Skyfall, Adele)
extra-1.mp3    (All I Wanted, Paramore)
extra-2.mp3    (Brutal Love, The Vampire Lestat)
extra-3.mp3    (I'm Still Standing, Elton John)
```

Os nomes `ensaio-1` a `ensaio-8` vieram da época em que cada ensaio
tinha sua própria música fixa — hoje são só nomes de arquivo, todas as
11 faixas (incluindo as 3 `extra-N`) entram juntas no mesmo sorteio e
aparecem juntas no seletor. Para adicionar uma 12ª faixa (ou mais),
basta colocar o MP3 nesta pasta com outro nome e acrescentar uma linha
em `TRILHA_SONORA` dentro de
`atividades/paginas/ingles-letras-digitacao.html`.

Não precisa editar nada no código nem avisar ninguém para os arquivos
que já estão previstos: o jogo testa sozinho, ao abrir a página, quais
desses MP3s existem. As faixas que já chegaram entram no sorteio e
ficam disponíveis no seletor; as que ainda não chegaram ficam
desativadas no seletor sem travar o jogo — o aluno digita a letra
normalmente, só sem música se nenhum arquivo tiver chegado ainda.
