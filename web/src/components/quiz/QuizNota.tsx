import { NOTA_APROVACAO } from "@/types/quiz";
import estilos from "./Quiz.module.css";

interface Props {
  /** null enquanto o instrutor não lançou a nota da prova descritiva. */
  nota: number | null;
  detalhe: string;
}

export function QuizNota({ nota, detalhe }: Props) {
  const classe =
    nota === null
      ? estilos.pendente
      : nota >= NOTA_APROVACAO
        ? estilos.aprovado
        : estilos.reprovado;

  return (
    <div className={`${estilos.nota} ${classe}`} role="status">
      <strong className={estilos.notaValor}>
        {nota === null ? "—" : nota.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
      </strong>
      <p className={estilos.notaTexto}>{detalhe}</p>
    </div>
  );
}
