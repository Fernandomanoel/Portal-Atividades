#!/usr/bin/env python3
"""Gera js/provas-data.js a partir do conteúdo de provas/.

Roda sem argumentos, a partir da raiz do repositório:
    python3 scripts/generate-provas-manifest.py

Sempre que adicionar/remover arquivos em provas/<curso>/, rode este
script de novo e comite o js/provas-data.js atualizado. Se adicionar
uma pasta de curso nova, inclua-a em CATEGORY_MAP abaixo — cursos sem
categoria caem automaticamente em "Outros".
"""
import json
import os
import re

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROVAS_DIR = os.path.join(REPO_ROOT, "provas")
OUTPUT_FILE = os.path.join(REPO_ROOT, "js", "provas-data.js")

# Ordem de exibição das categorias no navbar da aba Provas.
CATEGORY_ORDER = [
    "Informática",
    "Administrativo e Gestão",
    "Design Gráfico",
    "Desenvolvimento Web e Mobile",
    "Programação e Dados",
    "Marketing",
    "Saúde",
    "Comportamental",
    "Games",
    "Outros",
]

CATEGORY_MAP = {
    "ADM": "Administrativo e Gestão",
    "Assistente ADM": "Administrativo e Gestão",
    "Assistente de Departamento Pessoal": "Administrativo e Gestão",
    "Assistente de Logística": "Administrativo e Gestão",
    "Atendimento ao Cliente": "Administrativo e Gestão",
    "Compras e Estoque": "Administrativo e Gestão",
    "Crédido e Cobrança": "Administrativo e Gestão",
    "Custos": "Administrativo e Gestão",
    "Escrita Fiscal e Contabilidade": "Administrativo e Gestão",
    "Gestão de Pessoas": "Administrativo e Gestão",
    "Operador de Caixa": "Administrativo e Gestão",
    "Operador de Telemarketing": "Administrativo e Gestão",
    "RH": "Administrativo e Gestão",
    "Secretariado": "Administrativo e Gestão",
    "Vendas": "Administrativo e Gestão",

    "Adobe Illustrator": "Design Gráfico",
    "Adobe Photoshop I": "Design Gráfico",
    "Adobe Photoshop II": "Design Gráfico",
    "Adobe Photoshop III": "Design Gráfico",
    "Adobe Premiere": "Design Gráfico",
    "CorelDraw I": "Design Gráfico",
    "CorelDraw II": "Design Gráfico",
    "Design Gráfico": "Design Gráfico",

    "CSS": "Desenvolvimento Web e Mobile",
    "Cordova": "Desenvolvimento Web e Mobile",
    "Criando Aplicativo com Angular": "Desenvolvimento Web e Mobile",
    "Criando Aplicativos Mobile Ionic": "Desenvolvimento Web e Mobile",
    "Desenvolvimento WEB - Html, CSS e JavaScript": "Desenvolvimento Web e Mobile",
    "Fundamentos Web": "Desenvolvimento Web e Mobile",
    "HTML": "Desenvolvimento Web e Mobile",
    "JavaScript": "Desenvolvimento Web e Mobile",
    "WordpPress": "Desenvolvimento Web e Mobile",

    "Banco de Dados": "Programação e Dados",
    "C#": "Programação e Dados",
    "Inteligência Artificial": "Programação e Dados",
    "Lógica de Programação": "Programação e Dados",

    "Desenvolvimento de Games": "Games",

    "Educação Financeira": "Comportamental",
    "Empreendedorismo": "Comportamental",
    "Inteligência Emocional": "Comportamental",
    "Liderança": "Comportamental",
    "Matemática Financeira": "Comportamental",
    "Segurança no Trabalho": "Comportamental",

    "Excel": "Informática",
    "Excel Avançado I": "Informática",
    "Excel Avançado II": "Informática",
    "Internet e Outlook": "Informática",
    "Internet, Redes Sociais e Aplicativos": "Informática",
    "Introdução à Informática": "Informática",
    "KIDS": "Informática",
    "Manutenção de Computadores": "Informática",
    "Power B.I": "Informática",
    "Power Point": "Informática",
    "Redes": "Informática",
    "Segurança da Era Digital": "Informática",
    "Windows 11": "Informática",
    "Word": "Informática",

    "Google Adwords": "Marketing",
    "Marketing Digital I": "Marketing",
    "Marketing Digital II": "Marketing",

    "Auxiliar Médico": "Saúde",
    "Farmácia": "Saúde",
    "Recepcionista de saúde": "Saúde",
}


def human_size(num_bytes):
    size = float(num_bytes)
    for unit in ["B", "KB", "MB", "GB"]:
        if size < 1024 or unit == "GB":
            return f"{size:.0f} {unit}" if unit == "B" else f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} GB"


def quiz_display_name(filename):
    base = filename[: -len(".prova.js")]
    base = base.replace("_", " ").replace("-", " ")
    base = re.sub(r"\s+", " ", base).strip()
    return base[:1].upper() + base[1:] if base else "Prova interativa"


def build_manifest():
    manifest = {}
    for course in sorted(os.listdir(PROVAS_DIR), key=str.casefold):
        course_path = os.path.join(PROVAS_DIR, course)
        if not os.path.isdir(course_path):
            continue
        files = []
        for dirpath, _dirnames, filenames in os.walk(course_path):
            for filename in sorted(filenames, key=str.casefold):
                if filename == ".gitkeep":
                    continue
                full_path = os.path.join(dirpath, filename)
                rel_to_course = os.path.relpath(full_path, course_path)
                rel_to_repo = os.path.relpath(full_path, REPO_ROOT)
                is_quiz = filename.lower().endswith(".prova.js")
                files.append({
                    "type": "quiz" if is_quiz else "file",
                    "label": quiz_display_name(filename) if is_quiz else rel_to_course.replace(os.sep, " / "),
                    "path": rel_to_repo.replace(os.sep, "/"),
                    "size": human_size(os.path.getsize(full_path)),
                })
        files.sort(key=lambda f: f["label"].casefold())
        manifest[course] = files
    return manifest


def build_categories(manifest):
    grouped = {name: [] for name in CATEGORY_ORDER}
    for course in manifest:
        category = CATEGORY_MAP.get(course, "Outros")
        grouped.setdefault(category, [])
        grouped[category].append(course)

    categories = []
    for name in CATEGORY_ORDER:
        courses = sorted(grouped.get(name, []), key=str.casefold)
        if courses:
            categories.append({"name": name, "courses": courses})
    return categories


def main():
    manifest = build_manifest()
    categories = build_categories(manifest)
    total_files = sum(len(v) for v in manifest.values())
    js = (
        "// Gerado automaticamente por scripts/generate-provas-manifest.py\n"
        "// Não edite à mão — rode o script de novo depois de adicionar arquivos em provas/.\n"
        f"const PROVAS_MANIFEST = {json.dumps(manifest, ensure_ascii=False, indent=2)};\n"
        f"const PROVAS_CATEGORIES = {json.dumps(categories, ensure_ascii=False, indent=2)};\n"
    )
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"{len(manifest)} cursos, {total_files} arquivos, {len(categories)} categorias -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
