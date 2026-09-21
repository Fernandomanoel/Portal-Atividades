---
version: 1
slug: "web-src-pages-homepage-tsx"
primary_target: "web/src/pages/HomePage.tsx"
related_targets: ["web/src/pages/AtividadesPage.tsx","web/src/pages/ProvasPage.tsx","web/src/pages/IngresHubPage.tsx"]
---

Escopo: o portal inteiro em React+TS — hub inicial, grade de Atividades por categoria,
detalhe de curso, seção Inglês (atividades e provas), área de Provas e o motor de prova.
Visitor mode: **Operate**.

Público e tarefa: aluno de curso profissionalizante, quase sempre num PC do laboratório
durante a aula, precisando chegar ao material do dia. Instrutor é o segundo público,
na área de Provas e na correção de descritivas. Precisa funcionar de verdade em celular
e tablet também.

Conteúdo: nesta fase o catálogo nasce **vazio** — estados vazios são o estado padrão e
são tela de primeira classe, não um aviso cinza.

Restrições invioláveis: a trava da prova em andamento; busca por nome em toda listagem;
modo claro e escuro; a nota 0–10 em destaque no topo da prova (verde a partir de 7,
vermelha abaixo).

## Direction contract

THESIS: O portal assume o vocabulário que todo portal de curso usa — navegação
persistente, grade de cards de curso, categoria com ícone, metadados legíveis — e ganha
pela execução, não pela invenção. A escolha do usuário entre três direções foi
deliberadamente a convenção da categoria; isso é o compromisso. O que ele recusa é a
convenção mal feita: card genérico com sombra padrão, espaçamento sem sistema, estados
vazios tratados como erro, modo escuro como inversão preguiçosa.

OWN-WORLD: Azul do portal mantido (#4f7cff ação, #1e40af e #16327a estrutura), fundo
#f4f6fb, superfícies brancas, neutros com viés azul (#eef2fb, #e6e9f2, #6b7080).
Cantos suaves consistentes, uma única escala de sombra usada por papel, não por enfeite.
Navegação persistente com as três seções; categoria identificada por cor + rótulo, nunca
só por ícone. Tipografia: uma face de interface com desenho próprio (não Inter, não
Roboto, não Arial) em escala tipográfica fechada, com números tabulares onde há contagem.
Régua de acabamento: Google Classroom, Linear/Vercel, Coursera/Udemy.

STORY: O aluno abre o portal, entende em um olhar que existem três lugares (Atividades,
Inglês, Provas), reconhece sua trilha e chega ao material em poucos cliques. O instrutor
encontra a área de Provas sem procurar e entra nela sabendo que é um lugar restrito.

FIRST VIEWPORT: Barra de navegação persistente no topo com o wordmark à esquerda, as três
seções como navegação principal, e à direita a busca e o controle de tema. Abaixo, sem
hero decorativo, as três seções apresentadas como destinos: Atividades traz suas quatro
categorias visíveis (Informática, Administrativa/Gestão, Programação, Design) com a
contagem de cursos em números tabulares; Inglês traz suas duas sub-seções; Provas traz o
rótulo de acesso restrito. A ação primária é entrar numa categoria, e ela está acima da
dobra em desktop e em celular. Estado vazio de categoria é uma tela composta, com o que
virá ali, não uma frase solta.

FORM: Canon — a saída padrão da categoria, escolhida pelo usuário diante da direção
sorteada (sinalização de escola técnica) e da minha escolha (apostila com abas
indexadas). Não pertence à lista de sete candidatos fundamentados; é a saída permanente
que o usuário tomou. Seed key 823f99dc, rodada degradada (serviço do Impeccable bloqueado
pela política de rede — sem challengers e sem quality-bar boards).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review,
the verdict, DESIGN.md, and every shipping raster carrying its provenance.
