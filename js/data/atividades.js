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
//   grupo     → "cursos" (carrossel de cima) ou "extras" (cards coloridos)
//   imagem    → capa do card na home (arquivo dentro de img/)
//   sigla     → 1-2 letras exibidas no cabeçalho da página do curso
//   cor       → cor tema do curso (cabeçalho da página, ícones)
//   materiais → lista de materiais (ver abaixo)
//
// ---- CAMPOS DE UM MATERIAL ----
//   titulo, descricao
//   tipo    → "pdf" | "planilha" | "link"
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
    imagem: "img/windows11.jpg",
    sigla: "W",
    cor: "#2b579a",
    materiais: [
      {
        titulo: "Organização de Pastas e Arquivos",
        descricao:
          "Atividade prática para aprender a criar e organizar pastas, editar arquivos e salvar imagens (print) no formato .bmp no Windows.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Windows 11/Windows 11 - Organização de Pastas e Arquivos.pdf",
      },
      {
        titulo: "Personalizando a Área de Trabalho",
        descricao:
          "Exercício para desenvolver habilidades básicas no Windows 11, explorando a personalização da área de trabalho, temas, plano de fundo e ícones do sistema.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Windows 11/Windows 11 - Personalizando a Área de Trabalho.pdf",
      },
      {
        titulo: "Gerenciador de Tarefas",
        descricao:
          "Atividade de revisão voltada ao uso do Gerenciador de Tarefas, ajudando o aluno a compreender recursos do Windows 11.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Windows 11/Windows 11 - Gerenciador de Tarefas.pdf",
      },
      {
        titulo: "Produtividade e Acessibilidade",
        descricao:
          "Atividade voltada ao uso de ferramentas de produtividade e recursos de acessibilidade do Windows 11, ajudando na organização pessoal e no melhor aproveitamento do sistema.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Windows 11/Windows 11 -  Produtividade e Acessibilidade no Windows .pdf",
      },
      {
        titulo: "Copiar, Recortar e Colar Arquivos",
        descricao:
          "Exercício prático trabalhando a criação, cópia, recorte e colagem de arquivos e pastas, utilizando o Explorador de Arquivos e atalhos do teclado.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Windows 11/Windows 11 - Copiando e Colando.pdf",
      },
      {
        titulo: "Desinstalar o Avast no Windows 11",
        descricao:
          "Atividade prática para aprender a desinstalar o Avast Antivirus no Windows 11 usando as Configurações do sistema.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Windows 11/Windows 11 - Desistalando Programas no Windows.pdf",
      },
      {
        titulo: "Uso da Tecla SHIFT no Bloco de Notas",
        descricao:
          "Atividade prática para treinar o uso da tecla SHIFT no Windows, utilizando o Bloco de Notas para digitação de textos com letras maiúsculas e símbolos do teclado.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Windows 11/Windows 11 - Escrevendo e usando o Shift.pdf",
      },
    ],
  },

  {
    slug: "excel",
    titulo: "Excel Básico",
    descricao: "Planilhas e fórmulas simples.",
    grupo: "cursos",
    imagem: "img/excelbackground.jpg",
    sigla: "X",
    cor: "#1d6f42",
    materiais: [
      {
        titulo: "Tabela INSS",
        descricao:
          "Atividade prática para aprender a criar tabelas no Excel e calcular o desconto do INSS utilizando fórmulas simples e porcentagem.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/ATIVIDADE_TABELA_INSS.pdf",
      },
      {
        titulo: "Cálculo de Empréstimo",
        descricao: "Exercício voltado ao cálculo de juros simples usando Excel.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/ATIVIDADE_CALCULO_EMPRESTIMO_EXCEL.pdf",
      },
      {
        titulo: "Tabela de Impostos",
        descricao: "Atividade para criar uma tabela de impostos utilizando fórmulas básicas.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL 2021 - ATIVIDADE TABELA IMPOSTOS.pdf",
      },
      {
        titulo: "Planilha Empresarial (EOBRA S/A)",
        descricao:
          "Atividade prática que simula um relatório de vendas de uma empresa, trabalhando organização de dados e cálculos como total, média, maior e menor valor.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL 2021 - RELATÓRIO SIMPLES DE VENDAS MENSAIS.pdf",
      },
      {
        titulo: "Fórmulas e Funções",
        descricao:
          "Atividade introdutória para compreender o uso de fórmulas e funções no Excel aplicadas em situações do dia a dia.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL 2021 - TRABALHANDO COM FÓRMULAS E FUNÇÕES.pdf",
      },
      {
        titulo: "Contas a Pagar usando o Excel",
        descricao:
          "Atividade prática para criar uma planilha de contas a pagar utilizando Excel no dia a dia.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/Excel 2021 - Contas a Pagar fazendo no Excel.pdf",
      },
      {
        titulo: "Convertendo em Dólar e usando o SE",
        descricao: "Exercício para aprender a função SE no Excel convertendo valores em dólar.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/Excel 2021 - Convertendo em Dolar e usando o SE.pdf",
      },
      {
        titulo: "Planilha com Máximo, Mínimo e Soma",
        descricao:
          "Exercício para aprender a fazer uma planilha com as funções Máximo, Mínimo e Soma.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/Excel 2021 - Fazendo uma planilha Com Maximo - Minimo e Soma.pdf",
      },
      {
        titulo: "Departamento de Vendas e Filtro de Dados",
        descricao:
          "Atividade prática de organização de dados, filtro de dados e gráfico dinâmico.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/Excel 2021 - Distribuição e Organização de Bases.pdf",
      },
      {
        titulo: "Aprendendo e Fazendo na Prática — Básico",
        descricao: "Atividade prática de organização de dados, filtro de dados e gráfico dinâmico.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/Excel 2021 - Aprendendo e Fazendo Básico.pdf",
      },
      {
        titulo: "Lista de Atividades Excel",
        descricao: "Uma lista de atividades práticas para o Excel.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/Excel 2021 - Lista de Atividades.pdf",
      },
      {
        titulo: "Função SE — Bônus por Faltas",
        descricao:
          "Exercício para aprender a função SE no Excel calculando bônus de funcionários conforme faltas.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL 2021 - USANDO O SE PARA DEFINIR BÔNUS.pdf",
      },
      {
        titulo: "Função SE — Multa por Atraso",
        descricao:
          "Atividade para aplicar a função SE no cálculo automático de multa de 2% em pagamentos atrasados.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL 2021 - Função SE – Multa por Atraso.pdf",
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
    titulo: "Excel Avançado II",
    descricao: "Macros, VBA e automações de planilha.",
    grupo: "cursos",
    imagem: "img/excelbackground.jpg",
    sigla: "X+",
    cor: "#0f5132",
    materiais: [
      {
        titulo: "Usando o VBA com códigos",
        descricao: "Formatando e organizando planilhas com o VBA.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Formatando e Organizando com o VBA - Excel Avançado II.pdf",
      },
      {
        titulo: "Criando e Executando uma Macro Simples",
        descricao: "Criando e executando uma macro simples com VBA no Excel.",
        tipo: "pdf",
        arquivo:
          "atividades/pdfs/Criando e Executando uma Macro Simples com VBA no Excel - Excel Avançado II.pdf",
      },
      {
        titulo: "Tabela de Prejuízo",
        descricao: "Tabela de prejuízo no Excel.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Tabela de Prejuízo - Excel.pdf",
      },
    ],
  },

  {
    slug: "power-bi",
    titulo: "Power BI",
    descricao: "Dashboards e análise de dados.",
    grupo: "cursos",
    imagem: "img/powerbi.jpg",
    sigla: "BI",
    cor: "#c9a227",
    materiais: [
      {
        titulo: "Criando o seu primeiro Dashboard",
        descricao: "Conectar o Excel ao Power BI e tratar os dados.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Power Bi/Power Bi - Atividade 1.pdf",
      },
      {
        titulo: "Fazendo Análise de Funcionários de RH",
        descricao: "Criar gráficos a partir de uma base de RH.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Power Bi/Power Bi - Atividade 2.pdf",
      },
      {
        titulo: "Análise de Vendas",
        descricao: "Criar o primeiro dashboard de vendas com os recursos básicos.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Power Bi/Power Bi - Analise de Vendas com o Básico .pdf",
      },
      {
        titulo: "Dashboard de Vendas do Atacadão",
        descricao: "Criar um dashboard de vendas completo.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Power Bi/Power Bi - Dashboard de Vendas do Atacadão.pdf",
      },
      {
        titulo: "Base: Controle de Vendas",
        descricao: "Planilha de vendas mensal usada nas atividades.",
        tipo: "planilha",
        arquivo: "atividades/base dados/Dados_Power_Bi_Atv1.xlsx",
      },
      {
        titulo: "Base: Controle de Estoque",
        descricao: "Planilha de controle de estoque do Atacadão.",
        tipo: "planilha",
        arquivo: "atividades/base dados/Planilha_Atacadão.xlsx",
      },
      {
        titulo: "Logo do Atacadão",
        descricao: "Imagem usada no dashboard do Atacadão.",
        tipo: "planilha",
        arquivo: "atividades/base dados/transferir.png",
      },
    ],
  },

  {
    slug: "word",
    titulo: "Word",
    descricao: "Documentos, Normas ABNT e Automações.",
    grupo: "cursos",
    imagem: "img/wordpapeldeparede.jpg",
    sigla: "W",
    cor: "#2b579a",
    materiais: [
      {
        titulo: "A Importância do Celular na Vida Escolar",
        descricao:
          "Atividade prática para aprender a criar e formatar um documento no Word, utilizando título, fonte adequada e texto reflexivo sobre o uso do celular nos estudos.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Word 2021/Word 2021 - Atividade de Escrita Básica.pdf",
      },
      {
        titulo: "Coisas da Vida",
        descricao:
          "Atividade introdutória para praticar digitação, organização de texto e uso básico do Word 2021.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Word 2021/WORD 2021 - Coisas da Vida.pdf",
      },
      {
        titulo: "Criando e Formatando um Documento",
        descricao:
          "Atividade prática para aprender a criar, formatar e organizar documentos no Word 2021, utilizando fontes, alinhamento e estilos.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Word 2021/WORD 2021 - Criando e Formatando um Documento no Word.pdf",
      },
      {
        titulo: "Lista de Atividades",
        descricao: "Lista de atividades para o Word 2021.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Word 2021/Word 2021 - Lista Atividades.pdf",
      },
      {
        titulo: "Mala Direta",
        descricao:
          "Atividade voltada à criação de documentos com Mala Direta no Word 2021, automatizando o preenchimento de informações a partir de uma lista de dados.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Word 2021/WORD 2021 - Criando um Documento com Mala Direta no Word.pdf",
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
    imagem: "img/powerpointwallpaper.jpg",
    sigla: "P",
    cor: "#d24726",
    materiais: [
      {
        titulo: "Lista de Atividades",
        descricao: "Criação de slides básicos com título, texto e organização.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/PowerPoint/PowerPoint - Lista de Atividades 01.pdf",
      },
    ],
  },

  {
    slug: "informatica-kids",
    titulo: "Informática Kids",
    descricao: "Atividades para o Kids.",
    grupo: "cursos",
    imagem: "img/infokidsbackground.png",
    sigla: "K",
    cor: "#7c4dff",
    materiais: [
      {
        titulo: "Digitação com Personagens de Desenhos",
        descricao:
          "Atividade divertida para crianças aprenderem digitação no Word usando textos com personagens de desenhos animados, treinando atenção, parágrafos e uso correto do teclado.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Kids/Word Kids - Missão dos Desenhos Animados no Word.pdf",
      },
      {
        titulo: "Treinando Digitação de Textos Longos",
        descricao:
          "Atividade prática para desenvolver a digitação no Word, com textos mais longos e simples.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Kids/Word Kids - Digitando textos grandes.pdf",
      },
      {
        titulo: "Digitação com a Turma da Mônica",
        descricao:
          "Atividade prática para crianças aprenderem digitação no Word com textos da Turma da Mônica, trabalhando parágrafos, inserção de imagens e uso de lista com marcadores.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Kids/Word Kids - Digitação com Turma da Mônica.pdf",
      },
      {
        titulo: "Digitação com O Incrível Mundo de Gumball",
        descricao:
          "Atividade educativa para crianças treinarem digitação no Word com textos inspirados em O Incrível Mundo de Gumball, incluindo inserção de imagens e criação de lista não ordenada.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Kids/Word Kids - Digitação com O Incrível Mundo de Gumball.pdf",
      },
      {
        titulo: "Digitando com a Patrulha Canina",
        descricao:
          "Atividade básica e interativa para crianças aprenderem digitação no Word, inserir imagens e criar listas não ordenadas.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Kids/Word Kids - Digitação com a Patrulha Canina.pdf",
      },
      {
        titulo: "Digitando com o Bluey",
        descricao:
          "Atividade educativa para crianças treinarem digitação no Word com textos grandes, listas com bolinhas e inserção de imagens, usando a personagem Bluey.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Kids/Word Kids - Digitação com o Bluey.pdf",
      },
      {
        titulo: "Digitação com PJ Masks",
        descricao:
          "Material prático para crianças aprenderem digitação no Word, organizar textos, criar listas não ordenadas e inserir imagens com os personagens PJ Masks.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Kids/Word Kids - Digitação com PJ Masks.pdf",
      },
      {
        titulo: "Tabela de Prejuízo",
        descricao: "Tabela de prejuízo no Excel.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Tabela de Prejuízo - Excel.pdf",
      },
    ],
  },

  // ======================= MAIS ATIVIDADES (cards) =======================
  {
    slug: "html-css",
    titulo: "Programação HTML & CSS",
    descricao: "Atividades de HTML & CSS",
    grupo: "extras",
    imagem: "img/iconcsshtml.png",
    sigla: "HC",
    cor: "#ff4da6",
    materiais: [
      {
        titulo: "Estrutura Básica de uma Página",
        descricao:
          "Atividade para praticar a estrutura básica do HTML e a aplicação de estilos com CSS.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Html e CSS/HTML E CSS - ESTRUTURA BASICA.pdf",
      },
      {
        titulo: "Usando o CSS e colocando imagens em HTML",
        descricao: "Adição do CSS em uma página do HTML e inserção de imagens nessa página.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Html e CSS/CSS - USANDO O CSS EM SITE.pdf",
      },
      {
        titulo: "Layout com Divs",
        descricao: "Atividade focada na organização de layout usando divs e estilização com CSS.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/HTMLCSS/HTMLCSS - Layout com Divs.pdf",
      },
      {
        titulo: "Estilização com CSS",
        descricao: "Exercício prático para aplicar cores, fontes, espaçamentos e bordas com CSS.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/HTMLCSS/HTMLCSS - Estilizacao com CSS.pdf",
      },
    ],
  },

  {
    slug: "python",
    titulo: "Python",
    descricao: "Atividades de Python",
    grupo: "extras",
    imagem: "img/iconpython.png",
    sigla: "PY",
    cor: "#ff9f43",
    materiais: [
      {
        titulo: "Fazendo o Primeiro Código",
        descricao: "Aprendendo o início da programação por meio do Python.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Python/Python - Primeiro programa em Python.pdf",
      },
      {
        titulo: "Lógica de Programação em Python",
        descricao: "Prática de lógica de programação utilizando a linguagem Python.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Python/Python - Lógica de Programação em Python.pdf",
      },
      {
        titulo: "Entrada de Dados em Python",
        descricao:
          "Atividade introdutória para aprender os primeiros comandos e conceitos básicos da linguagem Python.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Python/Python - Entrada de Dados em Python.pdf",
      },
      {
        titulo: "Usando e aprendendo Operadores Matemáticos",
        descricao: "Prática dos operadores matemáticos básicos utilizando a linguagem Python.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Python/Python - Usando e aprendendo Operadores Matemáticos.pdf",
      },
      {
        titulo: "Lista de Atividades",
        descricao: "Lista de atividades com o foco de reforçar as aulas de Python.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Python/Atividade Complementar - Python.pdf",
      },
    ],
  },

  {
    slug: "logica-programacao",
    titulo: "Lógica de Programação",
    descricao: "Exercícios práticos",
    grupo: "extras",
    imagem: "img/programming.png",
    sigla: "LP",
    cor: "#4a69bd",
    materiais: [
      {
        titulo: "Desvendando a Lógica de Programação!",
        descricao: "Atividade introdutória para compreender a ordem correta das instruções.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Logica de Programaçao/Log. Prog - De inicio na Lógica de Programação.pdf",
      },
      {
        titulo: "Estruturas Condicionais",
        descricao: "Exercícios com decisões usando se / senão.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Logica/Logica - Estruturas Condicionais.pdf",
      },
      {
        titulo: "Laços de Repetição",
        descricao: "Prática de repetição utilizando estruturas de loop.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Logica/Logica - Lacos de Repeticao.pdf",
      },
      {
        titulo: "Desafios Práticos",
        descricao: "Problemas simples para aplicar todo o raciocínio lógico aprendido.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Logica/Logica - Desafios Praticos.pdf",
      },
    ],
  },

  {
    slug: "javascript",
    titulo: "Javascript",
    descricao: "Atividades de Javascript",
    grupo: "extras",
    imagem: "img/iconjs.png",
    sigla: "JS",
    cor: "#9b59b6",
    materiais: [
      {
        titulo: "Sistema de Análise de Números",
        descricao:
          "O aluno cria um programa em JavaScript que solicita um número inicial e um número final, exibe os valores do intervalo e identifica números pares e ímpares.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Javascript/Javascript - SistemadeAnálisedeNúmeros.pdf",
      },
      {
        titulo: "Simulador de Tabuada Inteligente",
        descricao:
          "O aluno cria um programa em JavaScript que gera a tabuada de um número informado pelo usuário.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Javascript/Javascript - SimuladordeTabuadaInteligente.pdf",
      },
      {
        titulo: "Simulador de Caixa Eletrônico",
        descricao:
          "O aluno desenvolve um simulador de caixa eletrônico com saldo inicial, menu de opções (ver saldo, depositar, sacar e sair), validação de saldo e execução contínua até encerrar.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Javascript/Javascript - Simulador de Caixa Eletrônico.pdf",
      },
      {
        titulo: "Jogo de Adivinhação com Tentativas Limitadas",
        descricao:
          "O aluno cria um jogo em JavaScript que gera um número aleatório entre 1 e 50 e permite até 5 tentativas para adivinhar.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Javascript/Javascript - Jogo Adivinhaçao.pdf",
      },
    ],
  },

  {
    slug: "inteligencia-artificial",
    titulo: "Inteligência Artificial",
    descricao: "Atividades de Inteligência Artificial",
    grupo: "extras",
    imagem: "img/artificial-intelligence.png",
    sigla: "IA",
    cor: "#ff4d4d",
    materiais: [
      {
        titulo: "Introdução à Inteligência Artificial",
        descricao: "Conceitos básicos sobre o que é IA e como ela está presente no dia a dia.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/IA/Introducao-IA.pdf",
      },
      {
        titulo: "Ferramentas de Inteligência Artificial",
        descricao:
          "Atividade explorando ferramentas como chatbots, geração de imagens e automação.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/IA/Ferramentas-IA.pdf",
      },
      {
        titulo: "Aplicações da Inteligência Artificial",
        descricao: "Exercícios sobre como a IA é usada em empresas, escolas e tecnologia.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/IA/Aplicacoes-IA.pdf",
      },
      {
        titulo: "Desafios com Inteligência Artificial",
        descricao: "Atividade prática para estimular o pensamento crítico usando ferramentas de IA.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/IA/Desafios-IA.pdf",
      },
    ],
  },

  {
    slug: "banco-dados-sql",
    titulo: "Banco de Dados | SQL",
    descricao: "Atividades de Banco de Dados",
    grupo: "extras",
    imagem: "img/logo sql.png",
    sigla: "SQL",
    cor: "#00758f",
    materiais: [
      {
        titulo: "Apostila — Banco de Dados SQL",
        descricao: "Introdução ao banco de dados.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Banco de Dados/Apostila - Banco de Dados - SQL.pdf",
      },
      {
        titulo: "Meu Primeiro Banco de Dados",
        descricao: "Exercícios de atividade básica de SQL.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Banco de Dados/ATIVIDADE PRÁTICA - MEU PRIMEIRO BANCO DE DADOS.pdf",
      },
      {
        titulo: "Cadastrando Dados no SQL",
        descricao: "Prática de pegar uma planilha e cadastrar usando um banco de dados.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Banco de Dados/ATIVIDADE PRÁTICA - CADASTRANDO DADOS NO SQL.pdf",
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
];

// Busca um curso pelo slug da URL. Devolve undefined se não existir.
function acharAtividade(slug) {
  return ATIVIDADES.find((curso) => curso.slug === slug);
}
