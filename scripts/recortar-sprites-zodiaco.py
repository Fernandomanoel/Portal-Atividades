#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Recorta uma folha de sprites 2x2 com fundo verde (chroma key) em quatro PNGs
transparentes, prontos para o jogo dos Cavaleiros do Zodíaco.

A folha deve ter as quatro poses nesta ordem:

    +----------------+----------------+
    |     NEUTRO     |    ATAQUE      |
    +----------------+----------------+
    |      DANO      |     CAÍDO      |
    +----------------+----------------+

Uso:
    python3 scripts/recortar-sprites-zodiaco.py FOLHA.png seiya
    python3 scripts/recortar-sprites-zodiaco.py folha-mu.png aries

O segundo argumento é o nome base: gera `<nome>.png`, `<nome>-ataque.png`,
`<nome>-dano.png` e `<nome>-caido.png` em atividades/paginas/assets/zodiaco/.

O script avisa se algum desenho cruzar as linhas de corte, o que indicaria que
a folha não está com as poses bem separadas nos quatro quadrantes.
"""
import os
import sys
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESTINO = os.path.join(RAIZ, "atividades", "paginas", "assets", "zodiaco")

SUFIXOS = ["", "-ataque", "-dano", "-caido"]
DESCRICOES = ["em pé (neutro)", "golpeando", "levando dano", "derrotado"]


def eh_fundo(r, g, b):
    """Verde do chroma: o canal verde domina os outros dois com folga."""
    return g > 110 and g > r * 1.45 and g > b * 1.45


def limpar(img):
    """Remove o fundo verde e tira o esverdeado que sobra na borda (despill).

    Sem o despill fica um halo verde em volta do contorno, que só aparece
    quando a imagem é colocada sobre um fundo escuro — exatamente o caso do
    jogo, que tem cenário noturno.
    """
    img = img.convert("RGBA")
    saida = []
    for (r, g, b, _a) in img.getdata():
        if eh_fundo(r, g, b):
            saida.append((0, 0, 0, 0))
            continue
        teto = max(r, b)
        if g > teto + 12:
            fator = min(1.0, (g - teto) / 90)
            g = int(g - (g - teto) * fator)
            alfa = max(0, min(255, int(255 - 90 * fator)))
            saida.append((r, g, b, alfa))
        else:
            saida.append((r, g, b, 255))
    nova = Image.new("RGBA", img.size)
    nova.putdata(saida)
    return nova


def conferir_linhas_de_corte(limpa):
    """Avisa se algum desenho atravessa o meio da folha."""
    largura, altura = limpa.size
    meio_x, meio_y = largura // 2, altura // 2
    px = limpa.getchannel("A").load()
    faixa = range(-4, 5)

    cruz_v = sum(1 for y in range(altura)
                 if any(px[meio_x + d, y] > 40 for d in faixa if 0 <= meio_x + d < largura))
    cruz_h = sum(1 for x in range(largura)
                 if any(px[x, meio_y + d] > 40 for d in faixa if 0 <= meio_y + d < altura))

    if cruz_v or cruz_h:
        print(f"  aviso: {cruz_v} linha(s) tocam o corte vertical e "
              f"{cruz_h} tocam o horizontal.")
        print("         Confira os PNGs gerados: pode ser só a pose encostando "
              "na divisa (tudo bem) ou um efeito partido ao meio (refazer).")
    else:
        print("  as quatro poses estão bem separadas nos quadrantes.")


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        return 1

    origem, base = sys.argv[1], sys.argv[2]
    if not os.path.exists(origem):
        print(f"erro: não encontrei o arquivo {origem}")
        return 1

    os.makedirs(DESTINO, exist_ok=True)
    folha = Image.open(origem).convert("RGBA")
    largura, altura = folha.size
    meio_x, meio_y = largura // 2, altura // 2

    print(f"folha: {origem}  ({largura}x{altura})")
    limpa = limpar(folha)
    conferir_linhas_de_corte(limpa)
    print()

    quadrantes = [
        (0, 0, meio_x, meio_y),
        (meio_x, 0, largura, meio_y),
        (0, meio_y, meio_x, altura),
        (meio_x, meio_y, largura, altura),
    ]

    for caixa, sufixo, descricao in zip(quadrantes, SUFIXOS, DESCRICOES):
        pedaco = limpa.crop(caixa)
        # recorta o excesso transparente em volta da pose
        bbox = pedaco.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()
        if bbox:
            pedaco = pedaco.crop(bbox)
        nome = f"{base}{sufixo}.png"
        caminho = os.path.join(DESTINO, nome)
        pedaco.save(caminho, optimize=True)
        kb = os.path.getsize(caminho) / 1024
        print(f"  {nome:<24} {descricao:<16} "
              f"{pedaco.size[0]:>3}x{pedaco.size[1]:<3}  {kb:6.1f} KB")

    print(f"\nsalvos em {DESTINO}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
