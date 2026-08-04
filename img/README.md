# Imagens do site

## Capas geradas automaticamente (`capas/` e `icones/`)

Você **não precisa mexer aqui** para o site funcionar. Cada curso já ganha
uma capa colorida com a sua sigla, gerada por:

```bash
python3 scripts/generate-capas.py
```

- `capas/<slug>.svg` — capa dos cards do carrossel na página inicial.
- `icones/<slug>.svg` — monograma branco dos cards coloridos ("Mais Atividades").
- `siteicon.svg` — ícone da aba do navegador.

A cor e a sigla vêm do próprio catálogo (`js/data/atividades.js`), então
cadastrar um curso novo e rodar o script já resolve a imagem dele.

## Quer usar uma foto de verdade no lugar?

1. Coloque a imagem nesta pasta (ex: `windows11.jpg`).
2. No curso correspondente em `js/data/atividades.js`, aponte o campo
   `imagem` para ela:

```js
imagem: "img/windows11.jpg",
```

O site tenta essa foto primeiro e só cai na capa gerada se o arquivo não
existir — ou seja, é só soltar o arquivo com o nome certo que ele aparece,
sem precisar tirar nada do código.

Nomes que o catálogo já procura hoje (esses arquivos ainda não foram
enviados, então os cursos estão exibindo a capa gerada):

`windows11.jpg`, `excelbackground.jpg`, `powerbi.jpg`, `wordpapeldeparede.jpg`,
`powerpointwallpaper.jpg`, `infokidsbackground.png`, `redes.jpg`,
`seguranca.jpg`, `iconcsshtml.png`, `iconpython.png`, `programming.png`,
`iconjs.png`, `artificial-intelligence.png`, `godot.png`, `logo sql.png`

> Não confundir com `images/cursos/`, que guarda os ícones dos cursos da
> área de Provas (nomeados pelo slug do curso — ver o README de lá).
