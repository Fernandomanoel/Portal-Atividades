import { useNavigate } from "react-router-dom";

import { QuizDescritiva } from "./QuizDescritiva";
import { QuizMultiplaEscolha } from "./QuizMultiplaEscolha";
import { useQuiz } from "@/hooks/useQuiz";
import { ehDescritiva, type ProvaInterativa } from "@/types/quiz";
import estilos from "./Quiz.module.css";

interface Props {
  prova: ProvaInterativa;
  chave: string;
  voltarPara: string;
}

export function QuizContainer({ prova, chave, voltarPara }: Props) {
  const quiz = useQuiz(prova, chave);
  const navegar = useNavigate();

  const respondidas = ehDescritiva(prova)
    ? quiz.textos.filter((texto) => texto.trim().length > 0).length
    : Object.keys(quiz.escolhas).length;

  return (
    <div className={estilos.prova}>
      <header className={estilos.topo}>
        <h1 className={estilos.titulo}>{prova.titulo}</h1>
        {quiz.estado.fase === "respondendo" && (
          <span className={`${estilos.andamento} tabular`}>
            {respondidas} de {prova.perguntas.length}
          </span>
        )}
      </header>

      {ehDescritiva(prova) ? (
        <QuizDescritiva prova={prova} quiz={quiz} />
      ) : (
        <QuizMultiplaEscolha prova={prova} quiz={quiz} />
      )}

      {quiz.estado.fase !== "respondendo" && (
        <div className={estilos.acoes}>
          <button
            type="button"
            className={estilos.sair}
            onClick={() => navegar(voltarPara)}
          >
            Voltar para as provas
          </button>
        </div>
      )}
    </div>
  );
}
