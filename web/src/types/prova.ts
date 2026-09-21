/** `quiz` roda dentro do portal; `quiz_html` e `file` abrem fora dele. */
export type TipoArquivoProva = "quiz" | "quiz_html" | "file";

export interface ArquivoProva {
  tipo: TipoArquivoProva;
  rotulo: string;
  caminho: string;
  tamanho: string;
}

/** Curso (slug) → arquivos de prova daquele curso. */
export type ManifestoProvas = Record<string, ArquivoProva[]>;

export interface CategoriaProva {
  nome: string;
  cursos: string[];
}
