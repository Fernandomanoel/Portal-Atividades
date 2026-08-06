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
//               (Atividades disponíveis) ou "extras" (Mais Atividades)
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
      {
        titulo: "Lista de Atividades antes da Prova",
        descricao: "Revisão geral do curso, para praticar antes da avaliação.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Windows 11/Windows 11 - Lista de Atividades antes da Prova.pdf",
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
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/ATIVIDADE_TABELA_INSS.pdf",
      },
      {
        titulo: "Cálculo de Empréstimo",
        descricao: "Exercício voltado ao cálculo de juros simples usando Excel.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL 2021 - ATIVIDADE DE CALCULO DO EMPRESTIMO.pdf",
      },
      {
        titulo: "Formatação Básica",
        descricao:
          "Primeiros passos no Excel: formatar células, ajustar colunas e deixar a planilha organizada.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL 2021 - ATIVIDADES BÁSICO FORMATAÇÃO.pdf",
      },
      {
        titulo: "Tabela de Receitas de Bolo",
        descricao:
          "Atividade prática montando uma tabela de receitas, trabalhando organização de dados e cálculo de quantidades.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL 2021 - Tabela de Receitas de Bolo.pdf",
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
        tipo: "pdf",
        arquivo: "atividades/pdfs/Excel 2021/EXCEL AVANÇADO I - INICIANDO COM O PROCV.pdf",
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
        titulo: "Normas ABNT",
        descricao:
          "Atividade prática de formatação de trabalho acadêmico no Word seguindo as normas ABNT.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Word 2021/WORD 2021 - Normas ABNT.pdf",
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
        tipo: "pdf",
        arquivo: "atividades/pdfs/Redes/Redes - Fazendo uma conexão usando comandos no Cisco.pdf",
      },
      {
        titulo: "Implementação de uma Topologia de Redes",
        descricao:
          "Montagem de uma topologia completa no Cisco Packet Tracer, ligando switches, roteadores e computadores.",
        tipo: "pdf",
        arquivo:
          "atividades/pdfs/Redes/Redes - Implementação de uma Topologia de Redes com o Cisco Packet Tracer.pdf",
      },
      {
        titulo: "Configuração de Serviço DHCP",
        descricao: "Atividade prática para configurar a distribuição automática de endereços IP.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Redes/REDES - Configuração de Serviço DHCP.pdf",
      },
      {
        titulo: "Criando um Servidor Web com Cisco Packet Tracer",
        descricao: "Subir um servidor web dentro da rede simulada e acessá-lo pelos clientes.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Redes/Redes - Criando um Servidor Web com Cisco Packet Tracer.pdf",
      },
      {
        titulo: "Laboratório de VLANs",
        descricao:
          "Separação da rede em VLANs no Cisco Packet Tracer, trabalhando segmentação e organização do tráfego.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Redes/REDES - Laboratório de VLANs no Cisco Packet Tracer.pdf",
      },
      {
        titulo: "Configuração de Rede com DHCP, DNS, Web Server e Wi-Fi",
        descricao:
          "Atividade completa juntando todos os serviços da rede: endereçamento, nomes, servidor web e rede sem fio.",
        tipo: "pdf",
        arquivo:
          "atividades/pdfs/Redes/REDES - CONFIGURAÇÃO DE REDE COM DHCP, DNS, WEB SERVER E WI-FI.pdf",
      },
      {
        titulo: "Redes Wireless — Prova",
        descricao: "Avaliação teórica da parte de redes sem fio.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Redes/REDES - WIRELESS - PROVA.pdf",
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
        tipo: "pdf",
        arquivo: "atividades/pdfs/Segurança na Era Digital/AtividadeSegurança.pdf",
      },
      {
        titulo: "Identificando E-mails Suspeitos",
        descricao:
          "Exercício para reconhecer tentativas de golpe e phishing antes de clicar em qualquer link.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Segurança na Era Digital/EmailsSuspeito.pdf",
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
        titulo: "Além do Básico — Lógica Avançada",
        descricao:
          "Continuação da atividade introdutória, com problemas que exigem mais raciocínio lógico.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Logica de Programaçao/Log. Prog - Além do Básico Lógica avançada.pdf",
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
    // Os PDFs de IA ainda não foram enviados — assim que estiverem em
    // atividades/pdfs/IA/, é só acrescentar os materiais aqui.
    materiais: [],
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
          "Primeiro contato com a Godot: interface, cena, nós e como o projeto é organizado.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Godot/Desenvolvimento de Games 3d - Conhecendo o Godot.pdf",
      },
      {
        titulo: "Criando o Primeiro Jogo 3D",
        descricao: "Atividade prática montando um jogo 3D simples do começo ao fim na Godot.",
        tipo: "pdf",
        arquivo: "atividades/pdfs/Godot/Desenvolvimento de Games 3D - Criando o Primeiro Jogo.pdf",
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
