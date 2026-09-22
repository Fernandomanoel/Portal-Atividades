export interface Exercicio {
  id: string;
  titulo: string;
  /** Texto que o aluno digita. Sem quebra de linha: o campo é uma corrida só. */
  texto: string;
}

/**
 * Exercícios de digitação. Vazio nesta fase: os arquivos de digitação entram
 * depois, como o resto do conteúdo do portal.
 *
 * Acrescentar um exercício aqui já o faz aparecer na tela — nada além deste
 * arquivo precisa mudar.
 */
export const EXERCICIOS: Exercicio[] = [];
