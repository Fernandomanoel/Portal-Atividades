# Carinhas de reação (HUD)

As imagens que aparecem na caixinha de reação do jogo seguem um
**padrão por sequência** — não são mais sorteadas. Quanto mais o aluno
acerta (ou erra) em seguida, mais "sobe" a imagem.

## Acertos seguidos (combo)

O combo conta acertos de tecla em sequência (zera a cada erro):

```
combo  1        →  correto-1.jpg
combo  2        →  correto-2.jpg
combo  3        →  correto-3.jpg
combo  4 a 14   →  correto-4.jpg
combo 15+       →  acerto-bateman.gif   (recompensa: Patrick Bateman)
combo 30+       →  acerto-sabrina.gif   (recompensa MÁXIMA: Sabrina)
```

Os dois limites (`15` e `30`) ficam em `COMBO_BATEMAN` e `COMBO_SABRINA`
no topo de `ingles-letras-digitacao.html` — é só mudar o número se quiser
que os gifs apareçam mais cedo ou mais tarde.

## Erros seguidos

O contador de erro sobe a cada erro em seguida (zera a cada acerto):

```
1 erro seguido   →  erro-1.jpg
2 erros seguidos →  erro-2.jpg
...
7+ erros         →  erro-7.jpg
```

## Arquivos que faltam colocar aqui

As carinhas `correto-1..4.jpg` e `erro-1..7.jpg` já estão instaladas.
Faltam **os dois gifs de recompensa** — solte-os nesta pasta com estes
nomes exatos:

```
acerto-bateman.gif   ← gif do Patrick Bateman (combo alto)
acerto-sabrina.gif   ← gif da Sabrina        (recompensa máxima)
```

Enquanto os gifs não chegam, o jogo mostra o `correto-4.jpg` no lugar
(sem quebrar nada) e a frase de recompensa continua aparecendo.
