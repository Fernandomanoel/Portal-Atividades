export interface PerguntaMultiplaEscolha {
  pergunta: string;
  opcoes: string[];
  /** Índice da opção correta. Nunca chega ao aluno antes da correção. */
  correta: number;
}

export interface ProvaMultiplaEscolha {
  tipo?: "multipla_escolha";
  titulo: string;
  perguntas: PerguntaMultiplaEscolha[];
}

export interface ProvaDescritiva {
  tipo: "descritiva";
  titulo: string;
  /** Cada item é o enunciado de uma pergunta aberta. */
  perguntas: string[];
}

export type ProvaInterativa = ProvaMultiplaEscolha | ProvaDescritiva;

export interface SubmissaoDescritiva {
  respostas: string[];
  /** String porque o instrutor digita "8,5". */
  nota: string;
  enviadaEm: string;
}

export const NOTA_APROVACAO = 7;

export function ehDescritiva(prova: ProvaInterativa): prova is ProvaDescritiva {
  return prova.tipo === "descritiva";
}
