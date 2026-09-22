import type { CategoriaAtividade } from "@/types/curso";

export const rotas = {
  inicio: () => "/",
  atividades: (categoria?: CategoriaAtividade) =>
    categoria ? `/atividades?categoria=${categoria}` : "/atividades",
  curso: (slug: string) => `/atividades/${slug}`,
  ingles: () => "/ingles",
  inglesAtividades: () => "/ingles/atividades",
  inglesAtividade: (slug: string) => `/ingles/atividades/${slug}`,
  inglesProvas: () => "/ingles/provas",
  digitacao: () => "/digitacao",
  provas: () => "/provas",
  quiz: (categoria: string, prova: string) =>
    `/provas/quiz/${encodeURIComponent(categoria)}/${encodeURIComponent(prova)}`,
} as const;
