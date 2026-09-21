export type CategoriaAtividade =
  | "informatica"
  | "administrativa"
  | "programacao"
  | "design";

export type TipoMaterial = "pdf" | "doc" | "planilha" | "slides" | "link";

export interface Material {
  titulo: string;
  descricao?: string;
  tipo: TipoMaterial;
  /** Caminho do arquivo, para tudo que não é `link`. */
  arquivo?: string;
  /** Endereço externo, para `tipo: "link"`. */
  url?: string;
}

export interface Curso {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: CategoriaAtividade;
  /** Uma ou duas letras usadas na capa gerada. */
  sigla?: string;
  cor: string;
  materiais: Material[];
  /** Só quando a capa não segue o padrão `img/<slug>.jpg`. */
  imagem?: string;
}

export interface Categoria {
  id: CategoriaAtividade;
  nome: string;
  descricao: string;
}

export const CATEGORIAS: Categoria[] = [
  {
    id: "informatica",
    nome: "Informática",
    descricao: "Windows, pacote Office e fundamentos de computador.",
  },
  {
    id: "administrativa",
    nome: "Administrativa e Gestão",
    descricao: "Rotinas de escritório, documentos e processos.",
  },
  {
    id: "programacao",
    nome: "Programação",
    descricao: "Lógica, linguagens e desenvolvimento.",
  },
  {
    id: "design",
    nome: "Design",
    descricao: "Imagem, layout e ferramentas de criação.",
  },
];
