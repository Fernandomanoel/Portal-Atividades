#!/usr/bin/env python3
"""Gera js/provas-data.js a partir do conteúdo de provas/.

Roda sem argumentos, a partir da raiz do repositório:
    python3 scripts/generate-provas-manifest.py

Sempre que adicionar/remover arquivos em provas/<curso>/, rode este
script de novo e comite o js/provas-data.js atualizado.
"""
import json
import os

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROVAS_DIR = os.path.join(REPO_ROOT, "provas")
OUTPUT_FILE = os.path.join(REPO_ROOT, "js", "provas-data.js")


def human_size(num_bytes):
    size = float(num_bytes)
    for unit in ["B", "KB", "MB", "GB"]:
        if size < 1024 or unit == "GB":
            return f"{size:.0f} {unit}" if unit == "B" else f"{size:.1f} {unit}"
        size /= 1024
    return f"{size:.1f} GB"


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
                files.append({
                    "label": rel_to_course.replace(os.sep, " / "),
                    "path": rel_to_repo.replace(os.sep, "/"),
                    "size": human_size(os.path.getsize(full_path)),
                })
        files.sort(key=lambda f: f["label"].casefold())
        manifest[course] = files
    return manifest


def main():
    manifest = build_manifest()
    total_files = sum(len(v) for v in manifest.values())
    js = (
        "// Gerado automaticamente por scripts/generate-provas-manifest.py\n"
        "// Não edite à mão — rode o script de novo depois de adicionar arquivos em provas/.\n"
        f"const PROVAS_MANIFEST = {json.dumps(manifest, ensure_ascii=False, indent=2)};\n"
    )
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"{len(manifest)} cursos, {total_files} arquivos -> {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
