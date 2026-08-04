#!/usr/bin/env python3
"""Gera as capas e os ícones dos cards a partir de js/data/atividades.js.

Cada curso do catálogo vira dois arquivos SVG:

    img/capas/<slug>.svg    capa do card do carrossel (fundo colorido + sigla)
    img/icones/<slug>.svg   monograma branco, usado nos cards coloridos

São SVGs gerados com a `cor` e a `sigla` que já estão no catálogo, então
o visual acompanha sozinho quando um curso muda de cor ou quando um curso
novo é cadastrado — é só rodar:

    python3 scripts/generate-capas.py

QUER USAR UMA FOTO DE VERDADE NO LUGAR?
Coloque o arquivo em img/ (ex: img/windows11.jpg) e troque o campo
`imagem` daquele curso em js/data/atividades.js. O SVG gerado aqui é só
o padrão, para nenhum card ficar com quadrado cinza de imagem quebrada.
"""

import os
import re

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOGO = os.path.join(REPO_ROOT, "js", "data", "atividades.js")
PASTA_CAPAS = os.path.join(REPO_ROOT, "img", "capas")
PASTA_ICONES = os.path.join(REPO_ROOT, "img", "icones")


def escurecer(cor_hex, fator=0.62):
    """#4f7cff -> versão mais escura, para o gradiente da capa."""
    cor_hex = cor_hex.lstrip("#")
    r, g, b = (int(cor_hex[i : i + 2], 16) for i in (0, 2, 4))
    return "#%02x%02x%02x" % (int(r * fator), int(g * fator), int(b * fator))


def ler_cursos():
    """Lê slug, sigla e cor de cada curso direto do catálogo."""
    fonte = open(CATALOGO, encoding="utf-8").read()
    blocos = re.findall(r'slug:\s*"([^"]+)"(.*?)(?=\n  \{|\n\];)', fonte, re.S)
    cursos = []
    for slug, bloco in blocos:
        sigla = re.search(r'sigla:\s*"([^"]*)"', bloco)
        cor = re.search(r'cor:\s*"(#[0-9a-fA-F]{6})"', bloco)
        if not sigla or not cor:
            print(f"  ! {slug}: falta sigla ou cor no catálogo, pulando")
            continue
        cursos.append((slug, sigla.group(1), cor.group(1)))
    return cursos


def capa(sigla, cor):
    # Fonte menor quando a sigla tem 2-3 letras, para nunca vazar da capa.
    tamanho = {1: 110, 2: 92, 3: 70}.get(len(sigla), 60)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="400" height="240" role="img">
  <defs>
    <linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{cor}"/>
      <stop offset="1" stop-color="{escurecer(cor)}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="240" fill="url(#fundo)"/>
  <circle cx="352" cy="-24" r="118" fill="#ffffff" opacity="0.12"/>
  <circle cx="40" cy="252" r="96" fill="#000000" opacity="0.10"/>
  <text x="200" y="120" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-size="{tamanho}" font-weight="bold"
        fill="#ffffff" opacity="0.95">{sigla}</text>
</svg>
"""


def icone(sigla):
    tamanho = {1: 54, 2: 44, 3: 34}.get(len(sigla), 28)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" role="img">
  <circle cx="60" cy="60" r="56" fill="#ffffff" opacity="0.20"/>
  <circle cx="60" cy="60" r="56" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.55"/>
  <text x="60" y="60" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-size="{tamanho}" font-weight="bold"
        fill="#ffffff">{sigla}</text>
</svg>
"""


def favicon():
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img">
  <defs>
    <linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4f7cff"/>
      <stop offset="1" stop-color="#2b579a"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#fundo)"/>
  <text x="32" y="34" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="bold"
        fill="#ffffff">M</text>
</svg>
"""


def main():
    os.makedirs(PASTA_CAPAS, exist_ok=True)
    os.makedirs(PASTA_ICONES, exist_ok=True)

    cursos = ler_cursos()
    for slug, sigla, cor in cursos:
        with open(os.path.join(PASTA_CAPAS, f"{slug}.svg"), "w", encoding="utf-8") as f:
            f.write(capa(sigla, cor))
        with open(os.path.join(PASTA_ICONES, f"{slug}.svg"), "w", encoding="utf-8") as f:
            f.write(icone(sigla))

    with open(os.path.join(REPO_ROOT, "img", "siteicon.svg"), "w", encoding="utf-8") as f:
        f.write(favicon())

    print(f"{len(cursos)} capas e ícones gerados, mais o favicon.")


if __name__ == "__main__":
    main()
