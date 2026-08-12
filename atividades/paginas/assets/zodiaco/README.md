# Sprites do jogo Cavaleiros do Zodíaco — Batalha das 12 Casas

Estes arquivos são usados por
`atividades/paginas/cavaleiros-zodiaco-digitacao.html`.

## Como gerar

Cada personagem é feito no **PixelLab**, numa única folha quadrada com **fundo
verde chapado**, contendo as quatro poses nesta ordem:

```
+----------------+----------------+
|     NEUTRO     |     ATAQUE     |
+----------------+----------------+
|      DANO      |     CAÍDO      |
+----------------+----------------+
```

Depois é só rodar, a partir da raiz do projeto:

```bash
python3 scripts/recortar-sprites-zodiaco.py minha-folha.png aries
```

O script recorta os quatro quadrantes, remove o fundo verde, tira o halo
esverdeado da borda (*despill*) e salva os PNGs já com o nome certo nesta pasta.
O segundo argumento é o **nome base** da tabela abaixo.

Depois de recortar, rode o otimizador **uma vez por personagem novo**:

```bash
python3 scripts/otimizar-sprites-zodiaco.py aries
```

Ele reduz a paleta para 64 tons e a resolução para 360px de altura, o que corta
cerca de metade do peso sem diferença visível no tamanho em que o jogo mostra os
personagens. Sem isso, os 13 personagens somariam quase 8 MB — pesado demais
para abrir em máquina de laboratório.

O otimizador usa **um único fator de escala por personagem**, calculado pela
pose mais alta. Isso importa: as quatro poses saem da mesma folha, na mesma
escala. Se cada uma fosse reduzida para a mesma altura, o personagem mudaria de
tamanho ao trocar de pose — o sprite caído, que é baixo e largo, ficaria enorme
ao lado do sprite em pé.

## Arquivos esperados

| Personagem | Nome base | Situação |
|---|---|---|
| Seiya de Pégaso | `seiya` | ✅ as 4 poses estão aqui |
| Mu de Áries | `aries` | ✅ as 4 poses estão aqui |
| Aldebaran de Touro | `touro` | ✅ as 4 poses estão aqui |
| Saga de Gêmeos | `gemeos` | ✅ as 4 poses estão aqui |
| Máscara da Morte de Câncer | `cancer` | ⬜ falta |
| Aiolia de Leão | `leao` | ✅ as 4 poses estão aqui |
| Shaka de Virgem | `virgem` | ✅ as 4 poses estão aqui |
| Dohko de Libra | `libra` | ⬜ falta |
| Milo de Escorpião | `escorpiao` | ⬜ falta |
| Aiolos de Sagitário | `sagitario` | ⬜ falta |
| Shura de Capricórnio | `capricornio` | ✅ as 4 poses estão aqui |
| Camus de Aquário | `aquario` | ✅ as 4 poses estão aqui |
| Afrodite de Peixes | `peixes` | ⬜ falta |

Cada nome base gera quatro arquivos. Para `aries`, por exemplo:

| Arquivo | Quando aparece no jogo |
|---|---|
| `aries.png` | O tempo todo — é a pose parada, com a respiração em loop |
| `aries-ataque.png` | No golpe, a cada rajada de acertos |
| `aries-dano.png` | Quando o personagem leva dano |
| `aries-caido.png` | Quando a barra de vida zera |

## E se um arquivo não estiver aqui?

O jogo **continua funcionando normalmente**. A busca é em cascata:

1. Faltou a pose (`-ataque`, `-dano`, `-caido`) → usa a pose neutra com o efeito
   feito em código (avanço, tremida, rastro).
2. Faltou também a pose neutra → aparece uma silhueta escura com o símbolo e a
   constelação da casa acesos.

Ou seja: dá para ir soltando os personagens aqui **um de cada vez**, e cada um
passa a aparecer sozinho, sem precisar mexer em código nenhum.

## Padrão técnico

- PNG com transparência (RGBA)
- Folha de origem quadrada — a do Seiya veio em 1024×1024
- Sem redimensionar depois do recorte: o jogo ajusta a altura por CSS

## Músicas

As três aberturas (uma por idioma) ficam em `audio/`, nesta mesma pasta.
Veja `audio/README.md` para os nomes dos arquivos e como instalar.
