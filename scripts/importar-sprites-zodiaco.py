#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Importa de uma vez um arquivo .zip com várias folhas de sprites do Zodíaco.

Para cada imagem dentro do .zip, o script tenta descobrir de qual personagem ela
é (pelo nome do arquivo), recorta as quatro poses e otimiza — chamando os dois
scripts que já existem, sem duplicar a lógica deles:

    scripts/recortar-sprites-zodiaco.py
    scripts/otimizar-sprites-zodiaco.py

Uso:
    python3 scripts/importar-sprites-zodiaco.py cavaleiros.zip
    python3 scripts/importar-sprites-zodiaco.py cavaleiros.zip --simular

O reconhecimento aceita variações comuns de nome, com ou sem acento, maiúscula,
espaço, hífen ou número na frente:

    Mu_Aries.png · 01 - aries.png · MáscaraDaMorte.png · folha-camus.png

Quando não der para decidir, o script diz qual arquivo ficou de fora e qual é o
nome que ele esperava — nada é importado no escurinho.
"""
import os
import re
import sys
import shutil
import zipfile
import tempfile
import unicodedata
import subprocess

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS = os.path.join(RAIZ, "scripts")
DESTINO = os.path.join(RAIZ, "atividades", "paginas", "assets", "zodiaco")

EXTENSOES = {".png", ".webp", ".jpg", ".jpeg"}

# nome base -> palavras que identificam o personagem no nome do arquivo
PERSONAGENS = {
    "seiya":       ["seiya", "pegaso", "pegasus"],
    "aries":       ["aries", "mu"],
    "touro":       ["touro", "taurus", "aldebaran"],
    "gemeos":      ["gemeos", "gemini", "saga"],
    "cancer":      ["cancer", "mascaradamorte", "deathmask"],
    "leao":        ["leao", "leo", "aiolia", "aioria"],
    "virgem":      ["virgem", "virgo", "shaka"],
    "libra":       ["libra", "dohko"],
    "escorpiao":   ["escorpiao", "scorpio", "milo"],
    "sagitario":   ["sagitario", "sagittarius", "aiolos", "aioros"],
    "capricornio": ["capricornio", "capricorn", "shura"],
    "aquario":     ["aquario", "aquarius", "camus"],
    "peixes":      ["peixes", "pisces", "afrodite", "aphrodite"],
}


def sem_acentos(texto):
    normalizado = unicodedata.normalize("NFKD", texto)
    return "".join(c for c in normalizado if not unicodedata.combining(c))


def simplificar(texto):
    """"Máscara da Morte 01.png" -> "mascaradamorte01" """
    return re.sub(r"[^a-z0-9]", "", sem_acentos(texto).lower())


def palavras(texto):
    """"Mu_Aries01.png" -> ['mu', 'aries'] (separa também no camelCase)."""
    base = sem_acentos(os.path.splitext(os.path.basename(texto))[0])
    base = re.sub(r"(?<=[a-z])(?=[A-Z])", " ", base)      # MáscaraDaMorte -> Mascara Da Morte
    partes = re.split(r"[^A-Za-z0-9]+", base.lower())
    return [p for p in partes if p and not p.isdigit()]


def identificar(nome_arquivo):
    """Descobre o nome base a partir do nome do arquivo. None se ficar ambíguo.

    Apelidos curtos (até 3 letras, como "mu") só valem como palavra inteira:
    procurados como pedaço solto, "mu" casaria dentro de "ca-mu-s" e faria o
    arquivo do Camus bater em dois personagens ao mesmo tempo.
    """
    inteiro = simplificar(os.path.splitext(os.path.basename(nome_arquivo))[0])
    tokens = set(palavras(nome_arquivo))

    achados = set()
    for base, apelidos in PERSONAGENS.items():
        for apelido in apelidos:
            casou = (apelido in tokens) if len(apelido) <= 3 else (apelido in inteiro)
            if casou:
                achados.add(base)
                break
    return achados.pop() if len(achados) == 1 else None


def rodar(script, *args):
    return subprocess.run(
        [sys.executable, os.path.join(SCRIPTS, script), *args],
        capture_output=True, text=True, cwd=RAIZ,
    )


def listar_imagens(pasta):
    encontradas = []
    for raiz, _dirs, arquivos in os.walk(pasta):
        for arquivo in arquivos:
            if arquivo.startswith("."):          # lixo de compactador (__MACOSX)
                continue
            if os.path.splitext(arquivo)[1].lower() in EXTENSOES:
                encontradas.append(os.path.join(raiz, arquivo))
    return sorted(encontradas)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    simular = "--simular" in sys.argv

    if len(args) != 1:
        print(__doc__)
        return 1

    pacote = args[0]
    if not os.path.exists(pacote):
        print(f"erro: não encontrei {pacote}")
        return 1

    temporaria = tempfile.mkdtemp(prefix="zodiaco-")
    try:
        if zipfile.is_zipfile(pacote):
            with zipfile.ZipFile(pacote) as z:
                z.extractall(temporaria)
            imagens = listar_imagens(temporaria)
        else:
            print("aviso: não é um .zip — tratando como imagem solta.\n")
            imagens = [pacote]

        if not imagens:
            print("o pacote não tem nenhuma imagem (.png, .webp, .jpg).")
            return 1

        print(f"{len(imagens)} imagem(ns) no pacote.\n")

        importados, sem_dono = [], []
        for caminho in imagens:
            base = identificar(caminho)
            nome = os.path.basename(caminho)
            if not base:
                sem_dono.append(nome)
                continue

            print(f"── {nome}  →  {base}")
            if simular:
                importados.append(base)
                continue

            corte = rodar("recortar-sprites-zodiaco.py", caminho, base)
            if corte.returncode != 0:
                print(f"   falhou ao recortar:\n{corte.stderr.strip()}")
                continue
            for linha in corte.stdout.splitlines():
                if linha.strip() and not linha.startswith("folha:"):
                    print(f"   {linha.strip()}")

            otim = rodar("otimizar-sprites-zodiaco.py", base)
            if otim.returncode == 0:
                final = [l for l in otim.stdout.splitlines() if l.startswith("TOTAL")]
                if final:
                    print(f"   otimizado → {final[0].split()[2]}")
            importados.append(base)
            print()

        print("=" * 62)
        faltando = [b for b in PERSONAGENS if b not in importados
                    and not os.path.exists(os.path.join(DESTINO, f"{b}.png"))]

        print(f"importados agora : {', '.join(sorted(importados)) or 'nenhum'}")
        if sem_dono:
            print(f"não reconhecidos : {', '.join(sem_dono)}")
            print("                   renomeie usando um dos nomes conhecidos, por "
                  "exemplo 'camus.png' ou 'aquario.png'")
        print(f"ainda faltam     : {', '.join(sorted(faltando)) or 'nenhum — está completo!'}")
        if simular:
            print("\n(simulação — nenhum arquivo foi gravado)")
        return 0
    finally:
        shutil.rmtree(temporaria, ignore_errors=True)


if __name__ == "__main__":
    sys.exit(main())
