# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Alunos de cursos profissionalizantes de informática, acessando principalmente nos
computadores do laboratório da escola durante a aula, para abrir a atividade do dia
(PDF, slide, planilha, link ou página de exercício) e para responder provas.

Instrutores são o segundo público: usam a área de Provas para distribuir provas e, nas
provas descritivas, para ler as respostas do aluno e lançar a nota na própria tela de
revisão.

## Product Purpose

Centralizar o material de aula em um endereço único, para que o aluno chegue na
atividade certa sem depender de pendrive, e-mail ou do instrutor passar arquivo a
arquivo. O portal também hospeda as provas — desde arquivos para download até provas
interativas respondidas dentro do próprio site.

Sucesso é o aluno abrir o portal e chegar ao material do dia em poucos cliques, sem
precisar de explicação.

## Positioning

Conteúdo mora em arquivos de dados, nunca no HTML: adicionar um curso ou um PDF é
editar um catálogo, não criar páginas. Uma tela genérica serve todos os cursos
(antes havia ~20 HTMLs duplicados, um por curso). Isso mantém o custo de adicionar
conteúdo próximo de zero para quem não é programador.

## Operating Context

- Laboratório da escola é o cenário principal, mas o portal precisa funcionar bem
  também em celular e tablet — não apenas "não quebrar".
- O instrutor conduz a aula e aponta o aluno para a atividade; o aluno navega sozinho
  a partir dali.
- Provas descritivas são corrigidas presencialmente: o aluno envia uma única vez e o
  instrutor lança a nota na mesma tela, na hora.
- Provas de múltipla escolha corrigem no navegador do aluno, sem servidor — é
  autoavaliação, não avaliação à prova de cola.

## Capabilities and Constraints

- Catálogo de atividades por curso, com materiais tipados: `pdf`, `doc`, `planilha`,
  `slides`, `link`.
- Área de Provas com listagem por categoria, busca por curso ou nome de arquivo, e
  três formatos de prova: arquivo comum (download), prova interativa dentro do portal
  (múltipla escolha ou descritiva) e página HTML autossuficiente.
- Durante uma prova em andamento a interface trava: menu, rodapé e botão de voltar
  desaparecem e o navegador avisa antes de fechar ou recarregar. A saída só volta
  depois do envio.
- Trava contra reenvio de prova descritiva é por navegador (`localStorage`), não por
  aluno — hoje não existe login de aluno.
- A senha única da área de Provas é uma trava de interface, não segurança real: é
  explicitamente provisória. A direção confirmada é substituí-la por **login real de
  instrutor com JWT** quando o backend existir; o front deve ser desenhado prevendo
  essa troca.
- Modo claro e escuro são parte do produto, não um extra.
- **Nesta fase de reconstrução nenhum conteúdo de atividade ou prova é criado**: as
  telas nascem com catálogo vazio, então os estados vazios são o estado padrão e
  precisam ser tratados como tela de primeira classe.

## Brand Commitments

- Nome interno do projeto: MicroAtividades / Portal de Atividades.
- Paleta existente é vinculante como base (azul `#4f7cff`, azul escuro `#1e40af`,
  neutros claros e o par de feedback verde/vermelho das provas). O redesign pode
  ampliar o uso do azul escuro, mas não trocar as cores base.
- **Preferência permanente de direção visual: a convenção da categoria.** Diante de
  três direções (sinalização de escola técnica, apostila com abas indexadas, e o
  dashboard de curso online), o usuário escolheu deliberadamente o padrão da
  categoria. Isso é um compromisso, não uma falta de direção: o portal usa o
  vocabulário que todo portal de curso usa — navegação lateral ou superior
  persistente, grade de cards de curso, ícone por categoria, estados de progresso —
  executado com acabamento de primeira linha, sem ironia e sem excentricidade
  contrabandeada.
- **Régua de acabamento confirmada:** Google Classroom (densidade de informação
  limpa, tipografia de sistema bem resolvida, ornamento mínimo), Linear/Vercel
  (espaçamento preciso, estados bem desenhados, modo escuro de primeira classe) e
  Coursera/Udemy (vocabulário de card de curso com capa, metadados e progresso). O
  portal precisa poder sentar ao lado desses três sem parecer inferior.

## Evidence on Hand

- Catálogo atual em `js/data/atividades.js` e manifesto de provas gerado em
  `js/data/provas-data.js` (fonte para migração futura; **não** migrados nesta fase).
- Arquivos reais de conteúdo em `atividades/pdfs/`, `atividades/slides/` e
  `provas/<curso>/`, além de capas em `img/` e ícones em `images/cursos/`.
- Formato das provas interativas documentado em `COMO-CRIAR-PROVAS.md`.
- Não existe backend, banco de dados, login ou API neste momento — nada disso deve ser
  descrito como existente.

## Product Principles

1. Adicionar conteúdo é editar dados, nunca criar tela. Qualquer decisão de design que
   exija um arquivo novo por curso está errada.
2. O aluno chega pelo caminho mais curto até o material do dia; navegação é meio, não
   destino.
3. Prova em andamento é um estado protegido: nada na interface convida a sair dela.
4. Honestidade sobre o que o portal garante — a senha de provas e a correção no
   navegador são convenções de sala de aula, não mecanismos de segurança.
5. O laboratório é o cenário principal, mas nenhuma tela pode ser hostil no celular.

## Accessibility & Inclusion

Uso em laboratório com hardware e telas variadas; suporte a modo claro e escuro é
requisito de produto. Alvo de contraste WCAG AA nos dois temas.
