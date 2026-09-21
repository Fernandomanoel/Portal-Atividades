import type { Material } from "./curso";
import type { ArquivoProva } from "./prova";

/** Inglês é uma trilha própria: tem atividades e provas separadas do fluxo geral. */
export interface AtividadeIngles {
  slug: string;
  titulo: string;
  descricao: string;
  nivel?: string;
  cor: string;
  materiais: Material[];
  imagem?: string;
}

export interface ProvaIngles extends ArquivoProva {
  /** Agrupa as provas por nível ou módulo dentro da seção de Inglês. */
  grupo?: string;
}
