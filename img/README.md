# Imagens do site

## A capa de um curso

O site procura a capa de cada curso **nesta ordem**:

1. `img/<slug>.jpg` — a foto do curso;
2. `img/capas/<slug>.svg` — capa colorida gerada automaticamente, usada
   enquanto a foto não existe.

Ou seja: **para trocar a capa de um curso, é só soltar o arquivo aqui com
o nome do slug dele** (`img/windows-11.jpg`, `img/python.jpg`, …). Não
precisa editar código nenhum. O slug é o mesmo que aparece no endereço da
página: `atividade.html?curso=windows-11`.

Fotos já colocadas: `windows-11`, `excel`, `excel-avancado`, `power-bi`,
`word`, `powerpoint`, `informatica-kids`, `html-css`, `python`,
`logica-programacao`, `javascript`, `inteligencia-artificial`,
`banco-dados-sql`.

Ainda usando a capa gerada (é só mandar a foto): `redes`,
`seguranca-era-digital`, `godot`.

Formato ideal: imagem deitada, por volta de 800×450 (a proporção 16:9 é a
que melhor encaixa no card).

## Capas geradas (`capas/`)

```bash
python3 scripts/generate-capas.py
```

Cria `img/capas/<slug>.svg` para cada curso do catálogo, usando a **cor** e
a **sigla** que já estão em `js/data/atividades.js`, mais o `siteicon.svg`
(ícone da aba do navegador). Rode depois de cadastrar um curso novo — assim
ele já nasce com capa, mesmo antes de existir foto.

> Não confundir com `images/cursos/`, que guarda os ícones dos cursos da
> área de Provas (nomeados pelo slug do curso — ver o README de lá).
