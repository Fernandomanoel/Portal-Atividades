// ==========================================================================
// data/atividades.js — CATÁLOGO DE ATIVIDADES
//
// Este é o ÚNICO arquivo que você precisa editar para mexer no conteúdo das
// atividades: adicionar um curso, adicionar um PDF, mudar um texto. Não
// existe mais uma página HTML por curso — a página `atividade.html` é
// genérica e se monta sozinha a partir daqui.
//
// ---- COMO ADICIONAR UM PDF A UM CURSO QUE JÁ EXISTE ----
// Ache o curso na lista abaixo e acrescente um item em `materiais`:
//   { titulo: "Nome que aparece", descricao: "Uma linha explicando",
//     tipo: "pdf", arquivo: "atividades/pdfs/Word 2021/nome-do-arquivo.pdf" }
// Depois copie o PDF para essa mesma pasta. Só isso.
//
// ---- COMO ADICIONAR UM CURSO NOVO ----
// Copie um bloco inteiro de curso, troque os campos e pronto: ele aparece
// sozinho na página inicial e ganha sua própria página em
// atividade.html?curso=<slug>.
//
// ---- CAMPOS DE UM CURSO ----
//   slug      → identificador na URL (sem espaço/acento). Ex: "windows-11"
//   titulo    → nome exibido
//   descricao → uma frase curta (aparece no card da home)
//   grupo     → em qual seção da home o curso entra: "cursos"
//               (Atividades disponíveis) ou "extras" (Mais Atividades).
//               "nav" tira o curso das duas grades da home — ele só é
//               alcançado por um link próprio no menu (ver components/layout.js)
//   sigla     → 1-2 letras usadas na capa gerada do curso
//   cor       → cor tema do curso (banner da página, véu do card)
//   materiais → lista de materiais (ver abaixo)
//   imagem    → OPCIONAL. Só use se a capa não seguir o padrão. A capa
//               é procurada sozinha em img/<slug>.jpg e, se não houver
//               foto, na capa colorida gerada em img/capas/<slug>.svg.
//
// ---- CAMPOS DE UM MATERIAL ----
//   titulo, descricao
//   tipo    → "pdf" | "doc" | "planilha" | "slides" | "link"
//   arquivo → caminho do arquivo (para "pdf" e "planilha")
//   url     → endereço externo (para "link")
// ==========================================================================

const ATIVIDADES = [
  // ======================= CARROSSEL PRINCIPAL =======================
  {
    slug: "windows-11",
    titulo: "Windows 11",
    descricao: "Modificar do básico ao avançado.",
    grupo: "cursos",
    sigla: "W",
    cor: "#2b579a",
    materiais: [
      {
        titulo: "Organização de Pastas e Arquivos",
        descricao:
          "Atividade prática para aprender a criar e organizar pastas, editar arquivos e salvar imagens (print) no formato .bmp no Windows.",
        tipo: "link",
        url: "atividades/paginas/windows11-organizacao-pastas-arquivos.html",
      },
      {
        titulo: "Personalizando a Área de Trabalho",
        descricao:
          "Revisão (Dia 1) com 5 atividades: personalizar a área de trabalho, organizar arquivos no Explorador, usar a barra de tarefas e o menu Iniciar, ajustar configurações do sistema e gerenciar aplicativos instalados.",
        tipo: "link",
        url: "atividades/paginas/windows11-personalizando-area-trabalho.html",
      },
      {
        titulo: "Copiar, Recortar e Colar Arquivos",
        descricao:
          "Exercício prático trabalhando a criação, cópia, recorte e colagem de arquivos e pastas, utilizando o Explorador de Arquivos e atalhos do teclado.",
        tipo: "link",
        url: "atividades/paginas/windows11-copiar-recortar-colar.html",
      },
      {
        titulo: "Personalização Avançada",
        descricao:
          "6 atividades além do papel de parede: cursor do mouse, cores de destaque, plano de fundo em apresentação de slides, tema salvo, sons do sistema e comportamento da barra de tarefas.",
        tipo: "link",
        url: "atividades/paginas/windows11-personalizacao-avancada.html",
      },
      {
        titulo: "Arquivos, Compactação e Segurança de Pastas",
        descricao:
          "6 atividades: estrutura de pastas de projeto, renomeação em lote, compactação em ZIP, compactação NTFS, ocultar pastas e verificar permissões de segurança.",
        tipo: "link",
        url: "atividades/paginas/windows11-arquivos-compactacao-seguranca.html",
      },
      {
        titulo: "Particionamento de Disco e Memória",
        descricao:
          "6 atividades com o Gerenciamento de Disco: criar e formatar uma partição de até 1 GB, usá-la, desfazê-la com segurança, e entender RAM vs. memória virtual.",
        tipo: "link",
        url: "atividades/paginas/windows11-particionamento-memoria.html",
      },
      {
        titulo: "Atalhos de Teclado e Acessibilidade",
        descricao:
          "6 atividades: atalhos essenciais, organizar janelas sem mouse, um desafio 'sem mouse', teclas de aderência/filtragem, Acesso por Voz, Narrador, alto contraste e Lupa.",
        tipo: "link",
        url: "atividades/paginas/windows11-atalhos-acessibilidade.html",
      },
    ],
  },

  {
    slug: "canva",
    titulo: "Canva",
    descricao: "Criação e edição de posts para redes sociais.",
    grupo: "cursos",
    sigla: "C",
    cor: "#6a2c91",
    materiais: [
      {
        titulo: "Avaliação Prática: Post Carrossel com IA",
        descricao:
          "Apresentação interativa guiando o aluno a criar um carrossel para Instagram: edição de imagem, geração de vídeo com IA, edição de vídeo e montagem final.",
        tipo: "link",
        url: "atividades/paginas/canva-avaliacao-carrossel.html",
      },
    ],
  },

  {
    slug: "excel",
    titulo: "Excel Básico",
    descricao: "Planilhas e fórmulas simples.",
    grupo: "cursos",
    sigla: "X",
    cor: "#1d6f42",
    materiais: [
      {
        titulo: "Tabela INSS",
        descricao:
          "Atividade prática para aprender a criar tabelas no Excel e calcular o desconto do INSS utilizando fórmulas simples e porcentagem.",
        tipo: "link",
        url: "atividades/paginas/excel-tabela-inss.html",
      },
      {
        titulo: "Cálculo de Empréstimo",
        descricao: "Exercício voltado ao cálculo de juros simples usando Excel.",
        tipo: "link",
        url: "atividades/paginas/excel-calculo-emprestimo.html",
      },
      {
        titulo: "Formatação Básica",
        descricao:
          "Primeiros passos no Excel: formatar células, ajustar colunas e deixar a planilha organizada.",
        tipo: "link",
        url: "atividades/paginas/excel-formatacao-basica.html",
      },
      {
        titulo: "Tabela de Receitas de Bolo",
        descricao:
          "Atividade prática montando uma tabela de receitas, trabalhando organização de dados e cálculo de quantidades.",
        tipo: "link",
        url: "atividades/paginas/excel-tabela-receitas-bolo.html",
      },
      {
        titulo: "Tabela de Impostos",
        descricao: "Atividade para criar uma tabela de impostos utilizando fórmulas básicas.",
        tipo: "link",
        url: "atividades/paginas/excel-tabela-impostos.html",
      },
      {
        titulo: "Planilha Empresarial (EOBRA S/A)",
        descricao:
          "Atividade prática que simula um relatório de vendas de uma empresa, trabalhando organização de dados e cálculos como total, média, maior e menor valor.",
        tipo: "link",
        url: "atividades/paginas/excel-relatorio-vendas-mensais.html",
      },
      {
        titulo: "Fórmulas e Funções",
        descricao:
          "Atividade introdutória para compreender o uso de fórmulas e funções no Excel aplicadas em situações do dia a dia.",
        tipo: "link",
        url: "atividades/paginas/excel-formulas-e-funcoes.html",
      },
      {
        titulo: "Contas a Pagar usando o Excel",
        descricao:
          "Atividade prática para criar uma planilha de contas a pagar utilizando Excel no dia a dia.",
        tipo: "link",
        url: "atividades/paginas/excel-contas-a-pagar.html",
      },
      {
        titulo: "Convertendo em Dólar e usando o SE",
        descricao: "Exercício para aprender a função SE no Excel convertendo valores em dólar.",
        tipo: "link",
        url: "atividades/paginas/excel-conversao-dolar-se.html",
      },
      {
        titulo: "Planilha com Máximo, Mínimo e Soma",
        descricao:
          "Exercício para aprender a fazer uma planilha com as funções Máximo, Mínimo e Soma.",
        tipo: "link",
        url: "atividades/paginas/excel-maximo-minimo-soma.html",
      },
      {
        titulo: "Departamento de Vendas e Filtro de Dados",
        descricao:
          "Atividade prática de organização de dados, filtro de dados e gráfico dinâmico.",
        tipo: "link",
        url: "atividades/paginas/excel-filtro-de-dados.html",
      },
      {
        titulo: "Aprendendo e Fazendo na Prática — Básico",
        descricao: "Atividade prática de organização de dados, filtro de dados e gráfico dinâmico.",
        tipo: "link",
        url: "atividades/paginas/excel-aprendendo-fazendo-basico.html",
      },
      {
        titulo: "Lista de Atividades Excel",
        descricao: "Uma lista de atividades práticas para o Excel.",
        tipo: "link",
        url: "atividades/paginas/excel-lista-de-atividades.html",
      },
      {
        titulo: "Função SE — Bônus por Faltas",
        descricao:
          "Exercício para aprender a função SE no Excel calculando bônus de funcionários conforme faltas.",
        tipo: "link",
        url: "atividades/paginas/excel-funcao-se-bonus-faltas.html",
      },
      {
        titulo: "Função SE — Multa por Atraso",
        descricao:
          "Atividade para aplicar a função SE no cálculo automático de multa de 2% em pagamentos atrasados.",
        tipo: "link",
        url: "atividades/paginas/excel-funcao-se-multa-atraso.html",
      },
      {
        titulo: "Planilha da Atividade de Estoque",
        descricao: "Planilha base para a atividade de controle de estoque.",
        tipo: "planilha",
        arquivo: "atividades/pdfs/Excel 2021/Planilha da Atividade de Estoque.xlsx",
      },
    ],
  },

  {
    slug: "excel-avancado",
    titulo: "Excel Avançado",
    descricao: "PROCV, macros e automações de planilha.",
    grupo: "cursos",
    sigla: "X+",
    cor: "#0f5132",
    materiais: [
      {
        titulo: "Iniciando com o PROCV",
        descricao:
          "Primeira atividade do Excel Avançado: buscar informações em outra tabela com a função PROCV.",
        tipo: "link",
        url: "atividades/paginas/excel-procv.html",
      },
      {
        titulo: "Controle de Vendas e Comissões (Cálculo Avançado)",
        descricao:
          "Planilha extensa com 40 vendas para praticar fórmulas SE aninhadas, SOMASE, CONT.SE, MÁXIMO e ÍNDICE/CORRESP no cálculo de descontos, comissões e resumo por vendedor.",
        tipo: "planilha",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL AVANÇADO - Controle de Vendas e Comissões.xlsx",
      },
      {
        titulo: "Catálogo de Produtos: Busca e Gráficos",
        descricao:
          "Planilha extensa com catálogo de 35 produtos e 70 vendas para praticar PROCV, ÍNDICE+CORRESP em um painel de busca, e montar gráficos de barras, pizza e linha num dashboard.",
        tipo: "planilha",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL AVANÇADO - Catálogo de Produtos com Busca e Gráficos.xlsx",
      },
      {
        titulo: "Notas da Turma e Otimização com Solver",
        descricao:
          "Planilha extensa com as notas de 25 alunos (médias ponderadas e situação) e um problema de otimização pronto para resolver com a ferramenta Solver: distribuir horas de estudo para maximizar a média final.",
        tipo: "planilha",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL AVANÇADO - Notas da Turma e Otimização com Solver.xlsx",
      },
    ],
  },

  {
    slug: "power-bi",
    titulo: "Power BI",
    descricao: "Dashboards e análise de dados.",
    grupo: "cursos",
    sigla: "BI",
    cor: "#c9a227",
    materiais: [
      {
        titulo: "Criando o seu primeiro Dashboard",
        descricao: "Conectar o Excel ao Power BI e tratar os dados.",
        tipo: "link",
        url: "atividades/paginas/powerbi-primeiro-dashboard.html",
      },
      {
        titulo: "Fazendo Análise de Funcionários de RH",
        descricao: "Criar gráficos a partir de uma base de RH.",
        tipo: "link",
        url: "atividades/paginas/powerbi-analise-rh.html",
      },
      {
        titulo: "Análise de Vendas",
        descricao: "Criar o primeiro dashboard de vendas com os recursos básicos.",
        tipo: "link",
        url: "atividades/paginas/powerbi-analise-de-vendas.html",
      },
      {
        titulo: "Dashboard de Vendas do Atacadão",
        descricao: "Criar um dashboard de vendas completo.",
        tipo: "link",
        url: "atividades/paginas/powerbi-dashboard-atacadao.html",
      },
    ],
  },

  {
    slug: "word",
    titulo: "Word",
    descricao: "Documentos, Normas ABNT e Automações.",
    grupo: "cursos",
    sigla: "W",
    cor: "#2b579a",
    materiais: [
      {
        titulo: "A Importância do Celular na Vida Escolar",
        descricao:
          "Atividade prática para aprender a criar e formatar um documento no Word, utilizando título, fonte adequada e texto reflexivo sobre o uso do celular nos estudos.",
        tipo: "link",
        url: "atividades/paginas/word-importancia-celular-vida-escolar.html",
      },
      {
        titulo: "Coisas da Vida",
        descricao:
          "Atividade introdutória para praticar digitação, organização de texto e uso básico do Word 2021.",
        tipo: "link",
        url: "atividades/paginas/word-coisas-da-vida.html",
      },
      {
        titulo: "Criando e Formatando um Documento",
        descricao:
          "Atividade prática para aprender a criar, formatar e organizar documentos no Word 2021, utilizando fontes, alinhamento e estilos.",
        tipo: "link",
        url: "atividades/paginas/word-criando-formatando-documento.html",
      },
      {
        titulo: "Lista de Atividades",
        descricao: "Lista de atividades para o Word 2021.",
        tipo: "link",
        url: "atividades/paginas/word-lista-de-atividades.html",
      },
      {
        titulo: "Mala Direta",
        descricao:
          "Atividade voltada à criação de documentos com Mala Direta no Word 2021, automatizando o preenchimento de informações a partir de uma lista de dados.",
        tipo: "link",
        url: "atividades/paginas/word-mala-direta.html",
      },
      {
        titulo: "Normas ABNT",
        descricao:
          "Atividade prática de formatação de trabalho acadêmico no Word seguindo as normas ABNT.",
        tipo: "link",
        url: "atividades/paginas/word-normas-abnt.html",
      },
      {
        titulo: "Atividade interativa (Genially)",
        descricao: "Atividade extra interativa, aberta direto no navegador.",
        tipo: "link",
        url: "https://view.genially.com/6939df52cb698f4dbb4d8e35",
      },
    ],
  },

  {
    slug: "powerpoint",
    titulo: "PowerPoint",
    descricao: "Apresentações Visuais e Profissionais.",
    grupo: "cursos",
    sigla: "P",
    cor: "#d24726",
    materiais: [
      {
        titulo: "Lista de Atividades",
        descricao: "Criação de slides básicos com título, texto e organização.",
        tipo: "link",
        url: "atividades/paginas/powerpoint-lista-atividades-basico.html",
      },
      {
        titulo: "Avaliação Prática: Criação e Design de Apresentação",
        descricao:
          "Atividade guiada (tema livre) para criar uma apresentação com no mínimo 6 slides, aplicando boas práticas de design: estrutura, regra 60/30/10 de cores e consistência visual.",
        tipo: "link",
        url: "atividades/paginas/powerpoint-criacao-e-design.html",
      },
      {
        titulo: "Avaliação Prática: Tabelas e Gráficos",
        descricao:
          "Atividade guiada (tema livre) para criar uma apresentação com no mínimo 5 slides, incluindo pelo menos uma tabela e um gráfico com dados formatados.",
        tipo: "link",
        url: "atividades/paginas/powerpoint-tabelas-e-graficos.html",
      },
      {
        titulo: "Avaliação Prática: Vídeo, Edição e Transições",
        descricao:
          "Atividade guiada para inserir um vídeo em um slide, aplicar recursos de edição de vídeo (cortar, fade) e efeitos de transição entre slides. Inclui vídeo de prática para download.",
        tipo: "link",
        url: "atividades/paginas/powerpoint-video-e-transicoes.html",
      },
    ],
  },

  {
    slug: "informatica-kids",
    titulo: "Informática Kids",
    descricao: "Atividades para o Kids.",
    grupo: "cursos",
    sigla: "K",
    cor: "#7c4dff",
    materiais: [
      {
        titulo: "Digitação com Personagens de Desenhos",
        descricao:
          "Atividade divertida para crianças aprenderem digitação no Word usando textos com personagens de desenhos animados, treinando atenção, parágrafos e uso correto do teclado.",
        tipo: "link",
        url: "atividades/paginas/kids-digitacao-desenhos-animados.html",
      },
      {
        titulo: "Treinando Digitação de Textos Longos",
        descricao:
          "Atividade prática para desenvolver a digitação no Word, com textos mais longos e simples.",
        tipo: "link",
        url: "atividades/paginas/kids-digitacao-textos-longos.html",
      },
      {
        titulo: "Digitação com a Turma da Mônica",
        descricao:
          "Atividade prática para crianças aprenderem digitação no Word com textos da Turma da Mônica, trabalhando parágrafos, inserção de imagens e uso de lista com marcadores.",
        tipo: "link",
        url: "atividades/paginas/kids-digitacao-turma-da-monica.html",
      },
      {
        titulo: "Digitação com O Incrível Mundo de Gumball",
        descricao:
          "Atividade educativa para crianças treinarem digitação no Word com textos inspirados em O Incrível Mundo de Gumball, incluindo inserção de imagens e criação de lista não ordenada.",
        tipo: "link",
        url: "atividades/paginas/kids-digitacao-gumball.html",
      },
      {
        titulo: "Digitando com a Patrulha Canina",
        descricao:
          "Atividade básica e interativa para crianças aprenderem digitação no Word, inserir imagens e criar listas não ordenadas.",
        tipo: "link",
        url: "atividades/paginas/kids-digitacao-patrulha-canina.html",
      },
      {
        titulo: "Digitando com o Bluey",
        descricao:
          "Atividade educativa para crianças treinarem digitação no Word com textos grandes, listas com bolinhas e inserção de imagens, usando a personagem Bluey.",
        tipo: "link",
        url: "atividades/paginas/kids-digitacao-bluey.html",
      },
      {
        titulo: "Digitação com PJ Masks",
        descricao:
          "Material prático para crianças aprenderem digitação no Word, organizar textos, criar listas não ordenadas e inserir imagens com os personagens PJ Masks.",
        tipo: "link",
        url: "atividades/paginas/kids-digitacao-pj-masks.html",
      },
      {
        titulo: "Missão: Computador Arrumado",
        descricao:
          "Atividade guiada para crianças aprenderem a desinstalar programas (Adobe, WinRAR, McAfee) pelas Configurações do Windows e a ativar os atalhos padrão da área de trabalho, com checklist interativo.",
        tipo: "link",
        url: "atividades/paginas/kids-desinstalar-programas-atalhos.html",
      },
      {
        titulo: "Missão: Arquivos Organizados",
        descricao:
          "Atividade guiada para crianças aprenderem a criar pastas, mover, recortar/colar (Ctrl+X/Ctrl+V) e compactar arquivos em ZIP, com checklist interativo de prática.",
        tipo: "link",
        url: "atividades/paginas/kids-organizando-arquivos.html",
      },
      {
        titulo: "Missão: Meu Primeiro Relatório",
        descricao:
          "Atividade guiada para crianças escreverem um mini relatório no Word (título, formatação e parágrafos) e aprenderem a salvar o arquivo em PDF, com checklist interativo.",
        tipo: "link",
        url: "atividades/paginas/kids-word-mini-relatorio-pdf.html",
      },
      {
        titulo: "Missão: Minha Primeira Apresentação",
        descricao:
          "Atividade guiada para crianças criarem uma apresentação no PowerPoint: escolher design, montar slide de capa, adicionar slides com imagens e apresentar com F5, com checklist interativo.",
        tipo: "link",
        url: "atividades/paginas/kids-powerpoint-minha-apresentacao.html",
      },
      {
        titulo: "Missão Arquivos e Pastas",
        descricao:
          "Continuação da Aventura no Windows 11, no mesmo formato: criar e renomear pastas, tipos de arquivo, separar arquivos nas pastas certas, compactar em ZIP e extrair. Tudo por clique, com botão de ouvir a instrução.",
        tipo: "link",
        url: "atividades/paginas/kids-missao-arquivos.html",
      },
      {
        titulo: "Minha Grande Aventura no Windows 11",
        descricao:
          "Versão interativa do livro de atividades: 4 missões (excluir app, trocar idioma, plano de fundo e pastas) com pintura, ordenar passos, caça-palavras, verdadeiro ou falso e diploma final. Feito para criança que ainda lê pouco — tudo por clique, com botão de ouvir a instrução.",
        tipo: "link",
        url: "atividades/paginas/kids-aventura-windows11.html",
      },
    ],
  },

  {
    slug: "digitacao",
    titulo: "Jogos de Digitação",
    descricao: "Treino de velocidade e precisão no teclado, em forma de jogo.",
    grupo: "cursos",
    sigla: "DG",
    cor: "#3d5afe",
    materiais: [
      {
        titulo: "Sonic Digital Pro — Treino de Digitação",
        descricao:
          "Jogo de digitação com 16 fases (da posição das mãos até frases longas): a cada acerto o Sonic ganha anéis e corre mais rápido. Mostra precisão, palavras por minuto e placar final.",
        tipo: "link",
        url: "atividades/paginas/kids-sonic-digitacao.html",
      },
      {
        titulo: "Super Mario do Teclado — Atalhos e Pontuação",
        descricao:
          "Jogo com 9 mundos e 62 desafios em que o aluno pressiona as teclas de verdade: teclas especiais, atalhos do Ctrl, atalhos do Windows, pontuação, símbolos com Shift, acentos e uso da vírgula.",
        tipo: "link",
        url: "atividades/paginas/kids-mario-teclado.html",
      },
      {
        titulo: "Batalha das 12 Casas — Digitação",
        descricao:
          "Jogo de digitação com as 12 casas do zodíaco: cada letra certa golpeia o Cavaleiro de Ouro e cada erro tira a vida do Seiya. Digitar rápido e sem errar queima o cosmo e multiplica o dano. As casas mudam de idioma — português, inglês e japonês em romaji — e cada uma tem seu próprio cenário com a constelação do signo.",
        tipo: "link",
        url: "atividades/paginas/cavaleiros-zodiaco-digitacao.html",
      },
    ],
  },

  {
    slug: "redes",
    titulo: "Redes de Computadores",
    descricao: "Cisco Packet Tracer, DHCP, VLANs e Wi-Fi.",
    grupo: "cursos",
    sigla: "RD",
    cor: "#0f766e",
    materiais: [
      {
        titulo: "Fazendo uma conexão usando comandos no Cisco",
        descricao:
          "Primeiros comandos no Cisco Packet Tracer para colocar dois equipamentos para se comunicar.",
        tipo: "link",
        url: "atividades/paginas/redes-conexao-cisco.html",
      },
      {
        titulo: "Implementação de uma Topologia de Redes",
        descricao:
          "Montagem de uma topologia completa no Cisco Packet Tracer, ligando switches, roteadores e computadores.",
        tipo: "link",
        url: "atividades/paginas/redes-topologia-de-redes.html",
      },
      {
        titulo: "Configuração de Serviço DHCP",
        descricao: "Atividade prática para configurar a distribuição automática de endereços IP.",
        tipo: "link",
        url: "atividades/paginas/redes-configuracao-dhcp.html",
      },
      {
        titulo: "Criando um Servidor Web com Cisco Packet Tracer",
        descricao: "Subir um servidor web dentro da rede simulada e acessá-lo pelos clientes.",
        tipo: "link",
        url: "atividades/paginas/redes-servidor-web-cisco.html",
      },
      {
        titulo: "Laboratório de VLANs",
        descricao:
          "Separação da rede em VLANs no Cisco Packet Tracer, trabalhando segmentação e organização do tráfego.",
        tipo: "link",
        url: "atividades/paginas/redes-laboratorio-vlans.html",
      },
      {
        titulo: "Configuração de Rede com DHCP, DNS, Web Server e Wi-Fi",
        descricao:
          "Atividade completa juntando todos os serviços da rede: endereçamento, nomes, servidor web e rede sem fio.",
        tipo: "link",
        url: "atividades/paginas/redes-dhcp-dns-web-wifi.html",
      },
      {
        titulo: "Redes Wireless — Prova",
        descricao: "Avaliação teórica da parte de redes sem fio.",
        tipo: "link",
        url: "atividades/paginas/redes-wireless-prova.html",
      },
      {
        titulo: "Redes Wireless — Prova Prática",
        descricao: "Avaliação prática de redes sem fio, em documento do Word.",
        tipo: "doc",
        arquivo: "atividades/pdfs/Redes/Redes Wireless - Prova - Prática.doc",
      },
    ],
  },

  {
    slug: "seguranca-era-digital",
    titulo: "Segurança na Era Digital",
    descricao: "Golpes, e-mails suspeitos e proteção de dados.",
    grupo: "cursos",
    sigla: "SD",
    cor: "#b91c1c",
    materiais: [
      {
        titulo: "Atividade de Segurança",
        descricao:
          "Atividade prática sobre os cuidados básicos de segurança no uso do computador e da internet.",
        tipo: "link",
        url: "atividades/paginas/seguranca-atividade-basica.html",
      },
      {
        titulo: "Identificando E-mails Suspeitos",
        descricao:
          "Exercício para reconhecer tentativas de golpe e phishing antes de clicar em qualquer link.",
        tipo: "link",
        url: "atividades/paginas/seguranca-emails-suspeitos.html",
      },
    ],
  },

  {
    // Página e caminho já criados a pedido do professor; os materiais entram
    // depois. Com `materiais` vazio, atividade.html mostra sozinho o aviso
    // "Nenhum material publicado ainda." — não precisa de nenhum código a mais.
    slug: "ingles",
    titulo: "Inglês",
    descricao: "Atividades de inglês para os cursos de informática.",
    grupo: "nav",
    sigla: "EN",
    cor: "#0ea5e9",
    materiais: [
      {
        titulo: "Inglês em Letras de Música — Treino de Digitação",
        descricao:
          "Jogo de digitação com 8 letras de música em inglês: cada acerto e cada erro tem uma reação própria no HUD, com estatísticas de precisão, velocidade e combo. Música toca durante a digitação assim que os arquivos forem adicionados.",
        tipo: "link",
        url: "atividades/paginas/ingles-letras-digitacao.html",
      },
    ],
  },

  {
    // Atividades de projeto, sem prazo de entrega fixo — o aluno entrega
    // mantendo o próprio repositório no Git atualizado (ver o primeiro
    // material). Mais 4 atividades entram aqui depois.
    slug: "criar-seu-site",
    titulo: "Criando seu Site",
    descricao: "Projetos reais de HTML, CSS e JavaScript, do primeiro repositório no Git a sites completos.",
    grupo: "cursos",
    sigla: "GIT",
    cor: "#f05033",
    imagem: "img/criar-seu-site.jpg",
    materiais: [
      {
        titulo: "Git e GitHub — Criando seu Repositório",
        descricao:
          "Guia completo, passo a passo: instalar o Git, criar sua conta e seu repositório no GitHub, e aprender os comandos que você vai usar em toda atividade (init, add, commit, push e mais). Comece por aqui.",
        tipo: "link",
        url: "atividades/paginas/site-git-repositorio.html",
      },
      {
        titulo: "Atividade 1 — Site SaaS",
        descricao:
          "Construa a landing page de um produto SaaS fictício: cabeçalho, seção de destaque, recursos, planos e contato. Tema livre, imagens que você mesmo busca, sem prazo de entrega — salve o progresso no seu repositório.",
        tipo: "link",
        url: "atividades/paginas/site-atividade1-saas.html",
      },
      {
        titulo: "Atividade 2 — Site Pessoal com Python",
        descricao:
          "Monte o seu portfólio (um site sobre você) com um back-end em Python usando Flask: servir páginas, gerar a lista de projetos com Jinja, receber o formulário de contato e contar visitas. Introdução ao Python aplicada a um site real.",
        tipo: "link",
        url: "atividades/paginas/site-atividade2-portfolio-python.html",
      },
    ],
  },

  {
    slug: "photoshop",
    titulo: "Adobe Photoshop",
    descricao: "Do primeiro clique a composições avançadas — curso completo em 8 graus.",
    grupo: "cursos",
    sigla: "PS",
    cor: "#001e36",
    materiais: [
      {
        titulo: "Grau 1 — Conhecendo a Ferramenta",
        descricao:
          "Guia explicativo para quem nunca abriu o Photoshop: reconhecer a tela, inserir uma imagem, recortar e remover fundo. Cerca de 1h.",
        tipo: "link",
        url: "atividades/paginas/photoshop-grau1-estilo-guia.html",
      },
      {
        titulo: "Grau 2 — Seleções e Camadas Avançadas",
        descricao:
          "Seleção por cor, Laço Poligonal/Magnético, máscaras de camada e modos de mesclagem, com prática de montagem por máscara.",
        tipo: "link",
        url: "atividades/paginas/photoshop-grau2-selecoes-e-camadas.html",
      },
      {
        titulo: "Grau 3 — Ajustes de Cor e Retoque",
        descricao:
          "Níveis, Curvas, Balanço de Cor e as ferramentas de retoque (Carimbo, Pincel de Recuperação, Correção Pontual) em camadas de ajuste não destrutivas.",
        tipo: "link",
        url: "atividades/paginas/photoshop-grau3-cor-e-retoque.html",
      },
      {
        titulo: "Grau 4 — Texto, Formas e Composição",
        descricao:
          "Ferramenta Texto, estilos de camada, formas vetoriais, Regra dos Terços e a montagem de um post pronto para redes sociais.",
        tipo: "link",
        url: "atividades/paginas/photoshop-grau4-texto-formas-e-composicao.html",
      },
      {
        titulo: "Grau 5 — Efeitos e Filtros Criativos",
        descricao:
          "Objetos Inteligentes, Filtros Inteligentes e a montagem de um efeito de dupla exposição.",
        tipo: "link",
        url: "atividades/paginas/photoshop-grau5-efeitos-e-filtros.html",
      },
      {
        titulo: "Grau 6 — Composição Avançada",
        descricao:
          "Perspectiva, refinamento de seleção, harmonização de cor e luz entre elementos de fontes diferentes — a técnica por trás de qualquer montagem que engana o olho.",
        tipo: "link",
        url: "atividades/paginas/photoshop-grau6-composicao-avancada.html",
      },
      {
        titulo: "Grau 7 — Projeto Final Integrador",
        descricao:
          "Um briefing de verdade, do planejamento à entrega organizada: peça principal, adaptação para Stories e exportação para diferentes usos.",
        tipo: "link",
        url: "atividades/paginas/photoshop-grau7-projeto-final.html",
      },
      {
        titulo: "Grau 8 — Auras e Efeitos de Invocação (Bônus)",
        descricao:
          "Luz de contorno, auras coloridas e texto de efeito — o estilo por trás dos memes de personagem com elemento fantástico atrás dele.",
        tipo: "link",
        url: "atividades/paginas/photoshop-grau8-auras-e-invocacao.html",
      },
    ],
  },

  // ======================= MAIS ATIVIDADES (cards) =======================
  {
    slug: "html-css",
    titulo: "Programação HTML & CSS",
    descricao: "Atividades de HTML & CSS",
    grupo: "extras",
    sigla: "HC",
    cor: "#ff4da6",
    materiais: [
      {
        titulo: "Estilizando uma Página do Zero",
        descricao:
          "Atividade prática de CSS: você recebe uma página HTML pronta e sem nenhum estilo, e vai transformá-la visualmente em 7 passos (header, box model, cards em grade, hover, responsivo), sem tocar no HTML.",
        tipo: "link",
        url: "atividades/paginas/html-css-estilizando-uma-pagina.html",
      },
      {
        titulo: "Usando o CSS e colocando imagens em HTML",
        descricao: "Adição do CSS em uma página do HTML e inserção de imagens nessa página.",
        tipo: "link",
        url: "atividades/paginas/html-css-usando-css.html",
      },
      {
        titulo: "Slides — HTML, Parte 1",
        descricao: "Apresentação da aula: estrutura de uma página e as primeiras tags.",
        tipo: "slides",
        arquivo: "atividades/slides/Html e CSS/HTML - Parte 1.pptx",
      },
      {
        titulo: "Slides — HTML, Parte 2",
        descricao: "Continuação da aula de HTML: listas, links, imagens e tabelas.",
        tipo: "slides",
        arquivo: "atividades/slides/Html e CSS/HTML - Parte 2.pptx",
      },
      {
        titulo: "Slides — CSS, Parte 1",
        descricao: "Apresentação da aula: como o CSS entra na página, seletores e cores.",
        tipo: "slides",
        arquivo: "atividades/slides/Html e CSS/CSS - Parte 1.pptx",
      },
      {
        titulo: "Slides — CSS, Parte 2",
        descricao: "Continuação da aula de CSS: espaçamento, bordas e organização do layout.",
        tipo: "slides",
        arquivo: "atividades/slides/Html e CSS/CSS - Parte 2.pptx",
      },
    ],
  },

  {
    slug: "python",
    titulo: "Python",
    descricao: "Atividades de Python",
    grupo: "extras",
    sigla: "PY",
    cor: "#ff9f43",
    materiais: [
      {
        titulo: "Fazendo o Primeiro Código",
        descricao:
          "Primeiro contato com Python: print(), comentários e tipos de dados básicos (texto, inteiro, decimal), com exercícios progressivos.",
        tipo: "link",
        url: "atividades/paginas/python-primeiro-codigo.html",
      },
      {
        titulo: "Lógica de Programação em Python",
        descricao:
          "Variáveis, input() e conversão de tipos (int/float), f-strings, e um mini formulário com várias perguntas.",
        tipo: "link",
        url: "atividades/paginas/python-logica-e-variaveis.html",
      },
      {
        titulo: "Entrada de Dados em Python",
        descricao:
          "Atividade introdutória para aprender os primeiros comandos e conceitos básicos da linguagem Python.",
        tipo: "link",
        url: "atividades/paginas/python-entrada-de-dados.html",
      },
      {
        titulo: "Usando e aprendendo Operadores Matemáticos",
        descricao:
          "Os 5 operadores aritméticos, a diferença entre / e //, operadores de comparação (==, >, <...) e uma calculadora completa.",
        tipo: "link",
        url: "atividades/paginas/python-operadores-matematicos.html",
      },
      {
        titulo: "Lista de Atividades",
        descricao: "Lista de atividades com o foco de reforçar as aulas de Python.",
        tipo: "link",
        url: "atividades/paginas/python-atividade-complementar.html",
      },
    ],
  },

  {
    slug: "logica-programacao",
    titulo: "Lógica de Programação",
    descricao: "Exercícios práticos",
    grupo: "extras",
    sigla: "LP",
    cor: "#4a69bd",
    materiais: [
      {
        titulo: "Desvendando a Lógica de Programação!",
        descricao:
          "O que é um algoritmo, variáveis e tipos, estrutura SE/SENÃO, com exercícios em Portugol (Olá Mundo, soma, maioridade, par/ímpar, média de notas).",
        tipo: "link",
        url: "atividades/paginas/logica-programacao-fundamentos.html",
      },
      {
        titulo: "Além do Básico — Lógica Avançada",
        descricao:
          "Vetores e matrizes, funções com retorno, laço enquanto x para, com 5 desafios em Portugol (média, busca, matriz 3x3, função e validação).",
        tipo: "link",
        url: "atividades/paginas/logica-programacao-avancada.html",
      },
    ],
  },

  {
    slug: "javascript",
    titulo: "Javascript",
    descricao: "Atividades de Javascript",
    grupo: "extras",
    sigla: "JS",
    cor: "#9b59b6",
    materiais: [
      {
        titulo: "Sistema de Análise de Números",
        descricao:
          "O aluno cria um programa em JavaScript que solicita um número inicial e um número final, exibe os valores do intervalo e identifica números pares e ímpares.",
        tipo: "link",
        url: "atividades/paginas/javascript-analise-numeros.html",
      },
      {
        titulo: "Simulador de Tabuada Inteligente",
        descricao:
          "O aluno cria um programa em JavaScript que gera a tabuada de um número informado pelo usuário.",
        tipo: "link",
        url: "atividades/paginas/javascript-tabuada-inteligente.html",
      },
      {
        titulo: "Guia: Criando sua Primeira API REST",
        descricao:
          "Guia completo com índice navegável para criar uma API REST do zero com Node.js e Express, do básico até deploy em produção.",
        tipo: "link",
        url: "atividades/paginas/javascript-guia-api-rest.html",
      },
      {
        titulo: "Simulador de Caixa Eletrônico",
        descricao:
          "O aluno desenvolve um simulador de caixa eletrônico com saldo inicial, menu de opções (ver saldo, depositar, sacar e sair), validação de saldo e execução contínua até encerrar.",
        tipo: "link",
        url: "atividades/paginas/javascript-caixa-eletronico.html",
      },
      {
        titulo: "Jogo de Adivinhação com Tentativas Limitadas",
        descricao:
          "O aluno cria um jogo em JavaScript que gera um número aleatório entre 1 e 50 e permite até 5 tentativas para adivinhar.",
        tipo: "link",
        url: "atividades/paginas/javascript-jogo-adivinhacao.html",
      },
      {
        titulo: "Slides — Javascript, Parte 1",
        descricao: "Apresentação da aula: o que é JavaScript, variáveis e primeiros comandos.",
        tipo: "slides",
        arquivo: "atividades/slides/Javascript/Javascript - Parte 1.pptx",
      },
      {
        titulo: "Slides — Javascript, Parte 2",
        descricao: "Continuação da aula: condições, repetição e interação com o usuário.",
        tipo: "slides",
        arquivo: "atividades/slides/Javascript/Javascript - Parte 2.pptx",
      },
    ],
  },

  {
    slug: "inteligencia-artificial",
    titulo: "Inteligência Artificial",
    descricao: "Atividades de Inteligência Artificial",
    grupo: "extras",
    sigla: "IA",
    cor: "#ff4d4d",
    materiais: [
      {
        titulo: "Introdução à IA e Engenharia de Prompt",
        descricao:
          "O que é IA/IA generativa/LLM na prática, como escrever bons prompts (com exemplos ruim x bom), atividade guiada numa IA de conversação gratuita, e uso responsável.",
        tipo: "link",
        url: "atividades/paginas/ia-introducao-e-prompts.html",
      },
    ],
  },

  {
    slug: "godot",
    titulo: "Desenvolvimento de Games",
    descricao: "Criação de jogos 3D com a Godot",
    grupo: "extras",
    sigla: "GD",
    cor: "#478cbf",
    materiais: [
      {
        titulo: "Conhecendo o Godot",
        descricao:
          "Primeiro contato com a Godot: interface, árvore de nós, Sprite2D, Inspector (Position/Scale/Rotation) e como o projeto é organizado.",
        tipo: "link",
        url: "atividades/paginas/godot-conhecendo-o-editor.html",
      },
      {
        titulo: "Criando o Primeiro Jogo 3D",
        descricao:
          "Monte o jogo \"Pegue a Moeda\" do zero: jogador, colisão, script de movimento em GDScript explicado linha por linha, e detecção de vitória.",
        tipo: "link",
        url: "atividades/paginas/godot-primeiro-jogo.html",
      },
    ],
  },

  {
    slug: "banco-dados-sql",
    titulo: "Banco de Dados | SQL",
    descricao: "Atividades de Banco de Dados",
    grupo: "extras",
    sigla: "SQL",
    cor: "#00758f",
    materiais: [
      {
        titulo: "Apostila — Banco de Dados SQL",
        descricao: "Introdução ao banco de dados.",
        tipo: "link",
        url: "atividades/paginas/sql-apostila.html",
      },
      {
        titulo: "Meu Primeiro Banco de Dados",
        descricao: "Exercícios de atividade básica de SQL.",
        tipo: "link",
        url: "atividades/paginas/sql-primeiro-banco-de-dados.html",
      },
      {
        titulo: "Cadastrando Dados no SQL",
        descricao:
          "Crie a tabela de produtos de uma loja, cadastre os dados e pratique SELECT, WHERE, ORDER BY, UPDATE e DELETE.",
        tipo: "link",
        url: "atividades/paginas/sql-cadastro-de-produtos.html",
      },
      {
        titulo: "Baixar MySQL Workbench",
        descricao: "Programa usado nas atividades de SQL.",
        tipo: "link",
        url: "https://dev.mysql.com/downloads/workbench/",
      },
      {
        titulo: "Baixar XAMPP",
        descricao: "Servidor local usado para rodar o banco de dados.",
        tipo: "link",
        url: "https://sourceforge.net/projects/xampp/",
      },
    ],
  },

  {
    slug: "cordova",
    titulo: "Apps Mobile com Ionic e Cordova",
    descricao: "Construa um aplicativo de celular de verdade, do primeiro componente ao emulador Android.",
    grupo: "extras",
    sigla: "ION",
    cor: "#3880ff",
    materiais: [
      {
        titulo: "Ionic e Cordova — Primeiros Passos",
        descricao:
          "Guia completo com índice navegável (16 capítulos): o que são Ionic e Cordova, criando o projeto pelo terminal, primeiro componente, cores, e o Console como ferramenta de investigação de erros.",
        tipo: "link",
        url: "atividades/paginas/cordova-primeiros-passos.html",
      },
      {
        titulo: "Ionic — Prática de Componentes",
        descricao:
          "Mão na massa com 15 capítulos: input, button, list, badge, chip, toggle, searchbar, fab, avatar, grid e mais — cada peça com código pronto para testar e um desafio para fazer sozinho.",
        tipo: "link",
        url: "atividades/paginas/cordova-componentes-visuais.html",
      },
      {
        titulo: "Ionic — Prática de JavaScript",
        descricao:
          "15 capítulos só de código: array de missões, adicionar, excluir, marcar como concluída, busca em tempo real, ordenar a lista, modo escuro — e uma caçada a três bugs de propósito.",
        tipo: "link",
        url: "atividades/paginas/cordova-javascript-e-listas.html",
      },
      {
        titulo: "Ionic — LocalStorage e Emulador",
        descricao:
          "14 capítulos: salvando as missões no localStorage, testando a persistência, e o passo a passo completo para criar o celular virtual no Android Studio e rodar o app nele.",
        tipo: "link",
        url: "atividades/paginas/cordova-localstorage-e-emulador.html",
      },
      {
        titulo: "Ionic — Projeto Final",
        descricao:
          "13 capítulos de desafios (tema de cores, editar missão, ordenar por status, animação, limpar concluídas) fechando com o código de referência completo do app inteiro.",
        tipo: "link",
        url: "atividades/paginas/cordova-projeto-final.html",
      },
      {
        titulo: "Ionic — Projeto Livre: Rede Social",
        descricao:
          "20 capítulos: em vez de código pronto, uma especificação completa. Construa do zero uma rede social (perfil, feed, curtir, comentar, excluir só os seus posts, buscar, seguir colegas) com desafios guiados por dica e um gabarito comentado no final.",
        tipo: "link",
        url: "atividades/paginas/cordova-projeto-livre-rede-social.html",
      },
    ],
  },

  {
    slug: "administracao",
    titulo: "Administração",
    descricao: "Rotinas administrativas de escritório em simulações práticas, com correção automática das respostas.",
    grupo: "cursos",
    sigla: "AD",
    cor: "#1e3a8a",
    materiais: [
      {
        titulo: "Simulação Prática de Rotinas Administrativas",
        descricao:
          "6 módulos: gestão documental (GED) e nomenclatura de arquivos, comunicação corporativa, reembolso de viagens (RDV), cotação de fornecedores, organização de eventos e criação de um POP.",
        tipo: "link",
        url: "atividades/paginas/administracao-assistente-simulacao-integrada.html",
      },
      {
        titulo: "Simulação de Operações Administrativas e Suporte de Gestão",
        descricao:
          "6 módulos: ata de reunião a partir de notas soltas, auditoria de ponto e escala, controle patrimonial, análise de minuta contratual e vencimentos de licenças, KPIs com plano 5W2H e triagem de ligações.",
        tipo: "link",
        url: "atividades/paginas/administracao-rotinas-avancadas.html",
      },
      {
        titulo: "Simulação de Rotinas de Escritório e Suporte Operacional",
        descricao:
          "6 módulos: contas a pagar e receber, itinerário de viagem corporativa, controle de estoque de almoxarifado, priorização com Matriz GUT, e-mail de pós-venda e relatório gerencial.",
        tipo: "link",
        url: "atividades/paginas/administracao-rotinas-suporte-operacional.html",
      },
      {
        titulo: "Simulação de Eficiência Operacional e Gestão de Rotinas",
        descricao:
          "6 módulos: avaliação de SLA de fornecedores, onboarding de novo colaborador, quadro Kanban, auditoria de caixa pequeno, ergonomia/segurança do escritório e etiqueta digital.",
        tipo: "link",
        url: "atividades/paginas/administracao-eficiencia-operacional.html",
      },
    ],
  },
];

// Busca um curso pelo slug da URL. Devolve undefined se não existir.
function acharAtividade(slug) {
  return ATIVIDADES.find((curso) => curso.slug === slug);
}
