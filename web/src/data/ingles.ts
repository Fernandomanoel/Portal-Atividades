import type { AtividadeIngles, ProvaIngles } from "@/types/ingles";

/** Trilha de Inglês. Vazia nesta fase, mesma regra do catálogo geral. */
export const ATIVIDADES_INGLES: AtividadeIngles[] = [];

export const PROVAS_INGLES: ProvaIngles[] = [];

export function acharAtividadeIngles(
  slug: string,
): AtividadeIngles | undefined {
  return ATIVIDADES_INGLES.find((atividade) => atividade.slug === slug);
}
