# Músicas dos ensaios

O jogo tem 8 ensaios (um por letra de música). Para cada um tocar
durante a digitação, basta colocar o MP3 aqui, exatamente com este
nome:

```
ensaio-1.mp3   (Rock)
ensaio-2.mp3   (Pearl Jam)
ensaio-3.mp3   (Vampiro)
ensaio-4.mp3   (Pop)
ensaio-5.mp3   (John Lennon)
ensaio-6.mp3   (Paramore)
ensaio-7.mp3   (As Branquelas)
ensaio-8.mp3   (Agente 007)
```

Não precisa editar nada no código nem avisar ninguém: o jogo testa
sozinho, ao abrir a página, quais desses 8 arquivos existem. Os
ensaios que já tiverem música tocam normalmente (com botão de
liga/desliga e volume); os que ainda não chegaram ficam mudos sem
travar o jogo — o aluno digita a letra normalmente, só sem música
nesse ensaio.

A ordem (1 a 8) é a mesma ordem dos temas coladas em `ENSAIOS` dentro
de `atividades/paginas/ingles-letras-digitacao.html`. Se quiser
conferir qual letra é qual antes de nomear o arquivo, abra esse HTML e
procure por `const ENSAIOS`.
