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


def esmaecer_bordas_cortadas(pedaco, limiar=0.10, fracao=0.13):
    """Quando um efeito é cortado pela divisa da folha, faz ele sumir aos poucos.

    Alguns golpes (os raios do Aiolia, por exemplo) passam da divisa do
    quadrante e são decepados em linha reta. Sozinho, isso vira uma borda dura
    bem visível no jogo. Aqui, cada borda que tiver muito conteúdo encostado
    ganha uma rampa de transparência, de modo que o efeito se dissolve em vez de
    terminar de faca. Bordas com pouco conteúdo (a ponta do pé, o cabelo) ficam
    intactas.

    Devolve a lista de bordas tratadas, para o relatório.
    """
    largura_img, altura = pedaco.size
    alfa = pedaco.getchannel("A")
    px = alfa.load()

    cheias = {
        "esquerda": sum(1 for y in range(altura) if px[0, y] > 40) / altura,
        "direita":  sum(1 for y in range(altura) if px[largura_img - 1, y] > 40) / altura,
        "topo":     sum(1 for x in range(largura_img) if px[x, 0] > 40) / largura_img,
        "base":     sum(1 for x in range(largura_img) if px[x, altura - 1] > 40) / largura_img,
    }
    tratadas = [lado for lado, taxa in cheias.items() if taxa >= limiar]
    if not tratadas:
        return []

    # a rampa acompanha o tamanho do sprite: uma fatia fixa some em imagem
    # grande e come o desenho em imagem pequena
    largura = max(10, int(min(largura_img, altura) * fracao))

    novo = alfa.load()
    for lado in tratadas:
        for passo in range(largura):
            fator = (passo + 1) / (largura + 1)          # 0 na borda, 1 para dentro
            if lado == "esquerda":
                for y in range(altura):
                    novo[passo, y] = int(novo[passo, y] * fator)
            elif lado == "direita":
                for y in range(altura):
                    x = largura_img - 1 - passo
                    novo[x, y] = int(novo[x, y] * fator)
            elif lado == "topo":
                for x in range(largura_img):
                    novo[x, passo] = int(novo[x, passo] * fator)
            else:
                for x in range(largura_img):
                    y = altura - 1 - passo
                    novo[x, y] = int(novo[x, y] * fator)

    pedaco.putalpha(alfa)
    return tratadas


def apagar_faixa(pedaco, lado, fracao):
    """Limpa uma fatia da pose, medida em fração do tamanho (0 a 1).

    Usado quando o nome do golpe está encostado no efeito e não dá para separar
    por espaço vazio — aí só resta dizer onde cortar.
    """
    largura, altura = pedaco.size
    if lado in ("direita", "esquerda"):
        corte = int(largura * fracao)
        faixa_x = range(corte, largura) if lado == "direita" else range(0, corte)
        for x in faixa_x:
            for y in range(altura):
                pedaco.putpixel((x, y), (0, 0, 0, 0))
        return f"{lado} a partir de {corte}px de {largura}"
    corte = int(altura * fracao)
    faixa_y = range(corte, altura) if lado == "base" else range(0, corte)
    for y in faixa_y:
        for x in range(largura):
            pedaco.putpixel((x, y), (0, 0, 0, 0))
    return f"{lado} a partir de {corte}px de {altura}"


def apagar_bloco_solto(pedaco, lado, vao_minimo=12):
    """Apaga um desenho solto encostado em um dos lados da pose.

    Serve para o nome do golpe que o PixelLab às vezes escreve ao lado do
    personagem ("GREAT HORN" e afins). O texto fica separado do desenho por uma
    faixa vazia, então basta procurar o último bloco de conteúdo daquele lado e
    limpá-lo — desde que ele esteja realmente destacado, senão a função não
    mexe em nada e avisa.

    Devolve a faixa apagada, ou None se não encontrou bloco separado.
    """
    largura, altura = pedaco.size
    px = pedaco.getchannel("A").load()

    horizontal = lado in ("direita", "esquerda")
    tamanho = largura if horizontal else altura
    outro = altura if horizontal else largura

    def tem_conteudo(i):
        if horizontal:
            return any(px[i, j] > 40 for j in range(outro))
        return any(px[j, i] > 40 for j in range(outro))

    # blocos de conteúdo ao longo do eixo
    blocos, inicio = [], None
    for i in range(tamanho):
        cheio = tem_conteudo(i)
        if cheio and inicio is None:
            inicio = i
        elif not cheio and inicio is not None:
            blocos.append((inicio, i - 1))
            inicio = None
    if inicio is not None:
        blocos.append((inicio, tamanho - 1))

    if len(blocos) < 2:
        return None

    if lado in ("direita", "base"):
        alvo, vizinho = blocos[-1], blocos[-2]
        vao = alvo[0] - vizinho[1] - 1
    else:
        alvo, vizinho = blocos[0], blocos[1]
        vao = vizinho[0] - alvo[1] - 1

    if vao < vao_minimo:
        return None

    faixa = range(alvo[0], alvo[1] + 1)
    for i in faixa:
        for j in range(outro):
            if horizontal:
                pedaco.putpixel((i, j), (0, 0, 0, 0))
            else:
                pedaco.putpixel((j, i), (0, 0, 0, 0))

    return (alvo[0], alvo[1], vao)


def _faixas(tem_conteudo, tamanho, vao_minimo):
    """Agrupa índices com conteúdo em faixas, unindo vãos pequenos."""
    faixas, inicio, vazio = [], None, 0
    for i in range(tamanho):
        if tem_conteudo(i):
            if inicio is None:
                inicio = i - vazio if vazio and faixas else i
            vazio = 0
        elif inicio is not None:
            vazio += 1
            if vazio > vao_minimo:
                faixas.append((inicio, i - vazio))
                inicio, vazio = None, 0
    if inicio is not None:
        faixas.append((inicio, tamanho - 1))
    return faixas


def detectar_poses(limpa):
    """Encontra as quatro poses onde elas realmente estão na folha.

    O corte fixo em quatro quadrantes só funciona quando cada pose está bem
    dentro do seu quadrado. Nas folhas mais largas o PixelLab espalha os
    desenhos, e uma pose pode ficar montada em cima da linha do meio — aí o
    corte fixo a parte ao meio. Aqui procuramos primeiro as duas fileiras e,
    dentro de cada uma, os desenhos separados por espaço vazio.

    Devolve (fileiras, avisos), com cada fileira sendo uma lista de caixas
    (x0, y0, x1, y1) da esquerda para a direita, ou (None, aviso) se a folha
    não tiver o formato esperado.
    """
    largura, altura = limpa.size
    px = limpa.getchannel("A").load()

    # O vão entre as fileiras costuma ser apertado: nas folhas de 1024px ele fica
    # em torno de 19px. Exigir muito espaço faz as duas fileiras virarem uma só.
    # Um limite pequeno é seguro porque uma figura em pé tem desenho em todas as
    # linhas dela — não há como parti-la ao meio por aqui.
    linha_cheia = lambda y: any(px[x, y] > 40 for x in range(0, largura, 2))
    fileiras = _faixas(linha_cheia, altura, max(6, altura // 90))

    # Faixa fina demais não é personagem: é o título escrito no alto da folha
    # ("CANCER DEATHMASK SPRITESHEET" e afins). Sai da conta.
    altura_minima = altura * 0.12
    titulos = [f for f in fileiras if (f[1] - f[0] + 1) < altura_minima]
    fileiras = [f for f in fileiras if (f[1] - f[0] + 1) >= altura_minima]

    if len(fileiras) != 2:
        return None, (f"esperava 2 fileiras de poses, encontrei {len(fileiras)}"
                      + (f" (fora {len(titulos)} faixa(s) de título)" if titulos else ""))

    aviso_titulo = [f"descartei {len(titulos)} faixa(s) de título escritas na folha"] if titulos else []

    resultado, avisos = [], list(aviso_titulo)
    for (y0, y1) in fileiras:
        col_cheia = lambda x, y0=y0, y1=y1: any(px[x, y] > 40 for y in range(y0, y1 + 1))
        colunas = _faixas(col_cheia, largura, max(6, largura // 90))

        caixas = []
        for (x0, x1) in colunas:
            ys = [y for y in range(y0, y1 + 1)
                  if any(px[x, y] > 40 for x in range(x0, x1 + 1, 2))]
            if not ys:
                continue
            peso = sum(1 for x in range(x0, x1 + 1, 2)
                       for y in range(ys[0], ys[-1] + 1, 2) if px[x, y] > 40)
            caixas.append({"caixa": (x0, ys[0], x1 + 1, ys[-1] + 1), "peso": peso})

        # Duas poses encostadas viram um bloco só (o efeito de uma alcança a
        # outra). Nesse caso, cortamos no ponto mais estreito do meio: a cintura
        # entre as duas figuras é sempre a coluna com menos desenho.
        if len(caixas) == 1 and (colunas[0][1] - colunas[0][0]) > largura * 0.55:
            x0, x1 = colunas[0]
            faixa = range(x0 + int((x1 - x0) * 0.30), x0 + int((x1 - x0) * 0.70))
            alturas = {x: sum(1 for y in range(y0, y1 + 1, 2) if px[x, y] > 40)
                       for x in faixa}
            corte = min(alturas, key=alturas.get)
            avisos.append(f"duas poses encostadas nesta fileira; separei em x={corte}")
            colunas = [(x0, corte - 1), (corte, x1)]
            caixas = []
            for (cx0, cx1) in colunas:
                ys = [y for y in range(y0, y1 + 1)
                      if any(px[x, y] > 40 for x in range(cx0, cx1 + 1, 2))]
                if not ys:
                    continue
                peso = sum(1 for x in range(cx0, cx1 + 1, 2)
                           for y in range(ys[0], ys[-1] + 1, 2) if px[x, y] > 40)
                caixas.append({"caixa": (cx0, ys[0], cx1 + 1, ys[-1] + 1), "peso": peso})

        if len(caixas) > 2:
            # sobra costuma ser o nome do golpe escrito ao lado: fica o que tem
            # mais desenho, some o resto
            caixas.sort(key=lambda c: c["peso"], reverse=True)
            descartados = caixas[2:]
            caixas = sorted(caixas[:2], key=lambda c: c["caixa"][0])
            avisos.append(f"descartei {len(descartados)} bloco(s) menores nesta "
                          f"fileira (provável nome de golpe escrito ao lado)")
        elif len(caixas) < 2:
            return None, f"uma fileira tem {len(caixas)} pose(s) em vez de 2"

        resultado.append([c["caixa"] for c in caixas])

    return resultado, avisos


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
    argumentos = [a for a in sys.argv[1:] if not a.startswith("--")]
    apagar = {}
    for op in sys.argv[1:]:
        if op.startswith("--apagar="):
            for parte in op.split("=", 1)[1].split(","):
                if ":" in parte:
                    pose, lado = parte.split(":", 1)
                    apagar[pose.strip()] = lado.strip()

    cortar_topo = 0
    for op in sys.argv[1:]:
        if op.startswith("--cortar-topo="):
            cortar_topo = int(op.split("=", 1)[1])

    if len(argumentos) != 2:
        print(__doc__)
        return 1

    origem, base = argumentos
    if not os.path.exists(origem):
        print(f"erro: não encontrei o arquivo {origem}")
        return 1

    os.makedirs(DESTINO, exist_ok=True)
    folha = Image.open(origem).convert("RGBA")

    # Algumas folhas trazem o título escrito no alto ("CANCER DEATHMASK
    # SPRITESHEET"). Quando o texto encosta no personagem não sobra vão para
    # separá-lo sozinho, então a altura a descartar vem no comando.
    if cortar_topo:
        folha = folha.crop((0, cortar_topo, folha.width, folha.height))
        print(f"  descartados os {cortar_topo}px do topo (título da folha)")

    largura, altura = folha.size
    meio_x, meio_y = largura // 2, altura // 2

    print(f"folha: {origem}  ({largura}x{altura})")
    limpa = limpar(folha)
    conferir_linhas_de_corte(limpa)
    print()

    fileiras, aviso_deteccao = detectar_poses(limpa)
    if fileiras:
        quadrantes = fileiras[0] + fileiras[1]
        print("  poses localizadas uma a uma (não pelo corte em quatro partes).")
        for texto in aviso_deteccao:
            print(f"  {texto}")
    else:
        quadrantes = [
            (0, 0, meio_x, meio_y),
            (meio_x, 0, largura, meio_y),
            (0, meio_y, meio_x, altura),
            (meio_x, meio_y, largura, altura),
        ]
        print(f"  não consegui separar as poses ({aviso_deteccao}); "
              f"usando o corte em quatro partes iguais.")
    print()

    nomes_pose = ["neutro", "ataque", "dano", "caido"]

    for caixa, sufixo, descricao, pose in zip(quadrantes, SUFIXOS, DESCRICOES, nomes_pose):
        pedaco = limpa.crop(caixa)

        # tira o nome do golpe, quando pedido (ex.: --apagar=ataque:direita)
        if pose in apagar:
            spec = apagar[pose]
            if ":" in spec:                       # ex.: direita:0.66
                lado, fracao = spec.split(":", 1)
                onde = apagar_faixa(pedaco, lado.strip(), float(fracao))
                print(f"  {pose}: apagada a faixa {onde}")
                resultado = None
                spec = None
            else:
                resultado = apagar_bloco_solto(pedaco, spec)
            if resultado:
                ini, fim, vao = resultado
                print(f"  {pose}: apagado o bloco solto à {apagar[pose]} "
                      f"({ini}–{fim}, separado por {vao}px de vão)")
            elif spec:
                print(f"  {pose}: nenhum bloco destacado à {spec} — nada foi "
                      f"apagado. Use --apagar={pose}:{spec}:0.66 para cortar "
                      f"por fração da largura.")

        # recorta o excesso transparente em volta da pose
        bbox = pedaco.getchannel("A").point(lambda v: 255 if v > 40 else 0).getbbox()
        if bbox:
            pedaco = pedaco.crop(bbox)
        esmaecidas = esmaecer_bordas_cortadas(pedaco)

        nome = f"{base}{sufixo}.png"
        caminho = os.path.join(DESTINO, nome)
        pedaco.save(caminho, optimize=True)
        kb = os.path.getsize(caminho) / 1024
        aviso = f"  ← efeito cortado; borda esmaecida ({', '.join(esmaecidas)})" if esmaecidas else ""
        print(f"  {nome:<24} {descricao:<16} "
              f"{pedaco.size[0]:>3}x{pedaco.size[1]:<3}  {kb:6.1f} KB{aviso}")

    print(f"\nsalvos em {DESTINO}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
