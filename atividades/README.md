# Materiais das atividades

Aqui ficam só os **arquivos** (PDFs, planilhas, imagens) das atividades.
Não existe mais uma página HTML por curso: a página `atividade.html`, na
raiz, monta tudo sozinha a partir de `js/data/atividades.js`.

## Onde colocar cada coisa

```
atividades/
├── pdfs/                    # PDFs, organizados por curso
│   ├── Windows 11/
│   ├── Excel 2021/
│   ├── Word 2021/
│   ├── Power Bi/
│   ├── Kids/
│   ├── Python/
│   ├── Javascript/
│   ├── Logica/
│   ├── Html e CSS/
│   ├── IA/
│   ├── Banco de Dados/
│   └── PowerPoint/
├── slides/                  # apresentações das aulas (.pptx), por curso
│   ├── Html e CSS/
│   └── Javascript/
└── base dados/              # planilhas usadas nas atividades de Power BI
```

## Como adicionar um material novo

1. Copie o arquivo para a pasta certa acima.
2. Abra `js/data/atividades.js`, ache o curso e acrescente:

```js
{
  titulo: "Nome que aparece no site",
  descricao: "Uma linha explicando a atividade.",
  tipo: "pdf",                       // "pdf" | "doc" | "planilha" | "slides" | "link"
  arquivo: "atividades/pdfs/Word 2021/nome-do-arquivo.pdf",
}
```

O caminho é sempre a partir da **raiz do projeto** (começa com
`atividades/`), porque as páginas ficam na raiz.
