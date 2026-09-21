import type { ProvaInterativa } from "@/types/quiz";

/**
 * Cada prova interativa é um módulo `.ts` que exporta a prova como default.
 * O glob é lazy: o arquivo só é baixado quando o aluno abre aquela prova.
 *
 * Substitui o esquema antigo (`<script src>` + `registerProvaInterativa`
 * global), que não tinha tipagem nenhuma.
 */
const MODULOS = import.meta.glob<{ default: ProvaInterativa }>("./**/*.prova.ts");

export async function carregarProva(
  caminho: string,
): Promise<ProvaInterativa | null> {
  const chave = `./${caminho.replace(/^\.?\//, "")}`;
  const carregar = MODULOS[chave] ?? MODULOS[`${chave}.prova.ts`];
  if (!carregar) return null;

  const modulo = await carregar();
  return modulo.default;
}

export function listarProvas(): string[] {
  return Object.keys(MODULOS).map((chave) => chave.replace(/^\.\//, ""));
}
