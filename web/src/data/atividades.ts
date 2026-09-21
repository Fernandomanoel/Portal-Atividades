import type { Curso } from "@/types/curso";

/**
 * Catálogo de atividades. Vazio nesta fase por decisão do projeto: as telas são
 * construídas contra o estado vazio antes de qualquer conteúdo entrar.
 *
 * Para adicionar um curso, acrescente um objeto aqui — nenhuma tela nova é
 * necessária, a rota /atividades/<slug> passa a existir sozinha.
 */
export const ATIVIDADES: Curso[] = [];

export function acharCurso(slug: string): Curso | undefined {
  return ATIVIDADES.find((curso) => curso.slug === slug);
}
