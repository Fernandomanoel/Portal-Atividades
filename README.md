# Portal de Atividades

Página única (sem dependências ou build) com duas abas:

- **Atividades** — cada curso tem um card com um formulário para adicionar itens (título, data, descrição), salvos no `localStorage` do navegador.
- **Provas** — protegida por senha, lista os arquivos reais guardados em `provas/<curso>/` (PDFs, DOCX, links, etc.), um card por curso, no mesmo visual da aba Atividades.

## Estrutura

```
.
├── index.html                          # marcação e templates dos cards/itens
├── css/
│   └── style.css                       # estilos
├── js/
│   ├── script.js                       # estado, renderização, senha da aba Provas
│   └── provas-data.js                  # gerado — lista de arquivos de provas/ (não editar à mão)
├── scripts/
│   └── generate-provas-manifest.py     # gera js/provas-data.js a partir de provas/
└── provas/
    └── <curso>/                        # arquivos reais das provas, organizados por curso
```

## Como rodar

Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Adicionando provas

1. Coloque o arquivo dentro de `provas/<curso>/` (crie a pasta do curso se ainda não existir).
2. Rode `python3 scripts/generate-provas-manifest.py` para atualizar `js/provas-data.js`.
3. Recarregue a página — o arquivo aparece automaticamente no card do curso na aba Provas.

## Funcionamento

- **Atividades**: cada curso cadastrado ganha um card com um formulário para adicionar itens. Os itens são ordenados automaticamente pela data mais próxima (itens sem data ficam no final). Cursos podem ser adicionados/removidos pela barra de ferramentas no topo. Tudo é salvo no `localStorage`, na chave `portal-atividades`.
- **Provas**: a aba fica bloqueada por uma senha (definida em `js/script.js`, constante `PROVAS_PASSWORD`) até ser digitada corretamente; depois disso fica liberada enquanto a aba do navegador estiver aberta (`sessionStorage`). **Atenção**: como o site é 100% estático, essa senha é só uma trava de interface — não é segurança de verdade. O código-fonte e os arquivos dentro de `provas/` continuam acessíveis a quem tiver acesso ao repositório, independente da senha.
