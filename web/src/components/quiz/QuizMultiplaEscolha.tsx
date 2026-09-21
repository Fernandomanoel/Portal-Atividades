import { QuizNota } from "./QuizNota";
import type { useQuiz } from "@/hooks/useQuiz";
import type { ProvaMultiplaEscolha } from "@/types/quiz";
import estilos from "./Quiz.module.css";

interface Props {
  prova: ProvaMultiplaEscolha;
  quiz: ReturnType<typeof useQuiz>;
}

export function QuizMultiplaEscolha({ prova, quiz }: Props) {
  const { estado, escolhas, responder, finalizar, completa } = quiz;

  if (estado.fase === "corrigida") {
    const nota = (estado.acertos / estado.total) * 10;
    return (
      <QuizNota
        nota={nota}
        detalhe={`Você acertou ${estado.acertos} de ${estado.total} questões.`}
      />
    );
  }

  return (
    <>
      {prova.perguntas.map((pergunta, indice) => (
        <fieldset key={indice} className={estilos.pergunta}>
          <legend className={estilos.enunciado}>
            <span className={estilos.numero}>{indice + 1}.</span>
            <span>{pergunta.pergunta}</span>
          </legend>

          <div className={estilos.opcoes}>
            {pergunta.opcoes.map((opcao, opcaoIndice) => {
              const marcada = escolhas[indice] === opcaoIndice;
              return (
                <label
                  key={opcaoIndice}
                  className={
                    marcada ? `${estilos.opcao} ${estilos.opcaoMarcada}` : estilos.opcao
                  }
                >
                  <input
                    type="radio"
                    name={`pergunta-${indice}`}
                    checked={marcada}
                    onChange={() => responder(indice, opcaoIndice)}
                  />
                  <span>{opcao}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className={estilos.acoes}>
        <button
          type="button"
          className={estilos.enviar}
          disabled={!completa}
          onClick={finalizar}
        >
          Finalizar prova
        </button>
        {!completa && (
          <p className={estilos.aviso}>Responda todas as questões para finalizar.</p>
        )}
      </div>
    </>
  );
}
