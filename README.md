# Portal de Atividades

Página única (sem dependências ou build) com duas abas — **Atividades** e **Provas** — onde cada curso tem um espaço próprio para guardar seus itens.

## Estrutura

```
.
├── index.html      # marcação e templates dos cards/itens
├── css/
│   └── style.css   # estilos
└── js/
    └── script.js   # estado, renderização e persistência
```

## Como rodar

Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

## Funcionamento

- Cada curso cadastrado ganha um card fixo em **cada aba** (Atividades e Provas), com um formulário para adicionar itens (título, data e descrição opcional).
- Os itens de cada card são ordenados automaticamente pela data mais próxima; itens sem data ficam no final.
- Cursos podem ser adicionados ou removidos pela barra de ferramentas no topo — a remoção de um curso apaga os itens dele nas duas abas.
- Todos os dados (cursos, atividades e provas) são salvos no `localStorage` do navegador, na chave `portal-atividades`, então persistem entre sessões sem precisar de backend.
