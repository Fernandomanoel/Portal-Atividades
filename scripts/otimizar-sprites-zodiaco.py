#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Reduz o peso dos sprites do jogo do Zodíaco sem estragar o visual.

No jogo os personagens aparecem com cerca de 300px de altura, mas os PNGs saem
do PixelLab com ~485px e paleta cheia. Este script:

  1. calcula UM fator de escala por personagem, a partir da pose mais alta;
  2. aplica esse mesmo fator às quatro poses;
  3. quantiza a paleta para CORES tons, preservando a transparência.

O fator único é essencial: as quatro poses vêm da mesma folha, na mesma escala.
Se cada pose fosse reduzida para a mesma altura, o personagem mudaria de tamanho
ao trocar de pose — o sprite caído, que é baixo e largo, ficaria gigante ao lado
do sprite em pé.

Uso:
    python3 scripts/otimizar-sprites-zodiaco.py            # todos
    python3 scripts/otimizar-sprites-zodiaco.py aries      # só um personagem
    python3 scripts/otimizar-sprites-zodiaco.py --simular  # só mostra o ganho

Rodar de novo sobre um personagem já otimizado não degrada mais: quando a pose
mais alta já está no tamanho alvo, o fator vira 1 e nada é redimensionado.
"""
import os
import re
import sys
import glob
import io
from collections import defaultdict
from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PASTA = os.path.join(RAIZ, "atividades", "paginas", "assets", "zodiaco")

ALTURA_ALVO = 360     # folga sobre os ~300px que o jogo usa
CORES = 64            # 64 tons ficam indistinguíveis do original no tamanho do jogo

SUFIXOS = re.compile(r"-(ataque|dano|caido)$")


def nome_base(caminho):
    """seiya-ataque.png -> seiya"""
    return SUFIXOS.sub("", os.path.splitext(os.path.basename(caminho))[0])


def processar(caminho, fator, simular):
    original = os.path.getsize(caminho)
    img = Image.open(caminho).convert("RGBA")

    if fator < 0.999:
        novo = (max(1, round(img.width * fator)), max(1, round(img.height * fator)))
        img = img.resize(novo, Image.LANCZOS)

    # a quantização do Pillow ignora o alfa, então ele é guardado e reposto
    alfa = img.getchannel("A")
    final = img.convert("RGB").quantize(colors=CORES, method=Image.MEDIANCUT).convert("RGBA")
    final.putalpha(alfa)

    if simular:
        buf = io.BytesIO()
        final.save(buf, "PNG", optimize=True)
        return original, buf.tell(), img.size

    final.save(caminho, "PNG", optimize=True)
    return original, os.path.getsize(caminho), img.size


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    simular = "--simular" in sys.argv

    padrao = f"{args[0]}*.png" if args else "*.png"
    arquivos = sorted(glob.glob(os.path.join(PASTA, padrao)))
    if not arquivos:
        print(f"nenhum PNG encontrado em {PASTA} com o padrão {padrao}")
        return 1

    grupos = defaultdict(list)
    for caminho in arquivos:
        grupos[nome_base(caminho)].append(caminho)

    antes = depois = 0
    print(f"{'arquivo':<26} {'antes':>9} {'depois':>9} {'ganho':>7}  tamanho")
    print("-" * 68)

    for base in sorted(grupos):
        caminhos = sorted(grupos[base])
        alturas = [Image.open(c).height for c in caminhos]
        fator = min(1.0, ALTURA_ALVO / max(alturas))
        print(f"[{base}]  fator de escala {fator:.3f} "
              f"(pose mais alta: {max(alturas)}px)")

        for caminho in caminhos:
            a, d, tam = processar(caminho, fator, simular)
            antes += a
            depois += d
            print(f"  {os.path.basename(caminho):<24} {a/1024:>8.1f}K {d/1024:>8.1f}K "
                  f"{100*(1-d/a):>6.0f}%  {tam[0]}x{tam[1]}")

    print("-" * 68)
    print(f"{'TOTAL':<26} {antes/1024:>8.1f}K {depois/1024:>8.1f}K "
          f"{100*(1-depois/antes):>6.0f}%")
    if simular:
        print("\n(simulação — nenhum arquivo foi alterado)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
