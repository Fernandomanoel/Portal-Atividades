# Imagens do jogo Sonic Digital Pro

Estes arquivos são usados por `atividades/paginas/kids-sonic-digitacao.html`.

| Arquivo | Quando aparece no jogo | Situação |
|---|---|---|
| `sonic-idle.gif` | O tempo todo — é o Sonic normal, que corre mais rápido conforme o aluno acerta | ✅ já está aqui |
| `sonic-realista.gif` | Quando o aluno erra 5 ou mais teclas seguidas | ⬜ **falta o arquivo** |
| `sonic-feio.gif` | Quando o aluno tenta pular uma fase sem terminar a anterior | ⬜ **falta o arquivo** |
| `ring.png` | O anel que sobe na tela a cada acerto e no contador | ✅ já está aqui |

## Como adicionar os dois que faltam

É só **soltar o arquivo nesta pasta com o nome exato da tabela acima**. Não precisa
mexer em código nenhum — a página já procura por esses nomes.

- `sonic-realista.gif` → o ouriço realista correndo (o de tênis vermelho)
- `sonic-feio.gif` → o Sonic do primeiro trailer do filme (live-action)

## E se o arquivo não estiver aqui?

O jogo **continua funcionando normalmente**. No lugar do GIF que falta aparece um
Sonic desenhado em CSS com um emoji, e o resto (anéis, velocidade, fases, placar)
segue igual. Assim a atividade nunca quebra por causa de uma imagem faltando.
