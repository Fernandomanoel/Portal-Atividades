import { QuizNota } from "./QuizNota";
import type { useQuiz } from "@/hooks/useQuiz";
import type { ProvaDescritiva } from "@/types/quiz";
import estilos from "./Quiz.module.css";

interface Props {
  prova: ProvaDescritiva;
  quiz: ReturnType<typeof useQuiz>;
}

function notaComoNumero(nota: string): number | null {
  const limpa = nota.replace(",", ".").trim();
  if (!limpa) return null;
  const valor = Number(limpa);
  return Number.isFinite(valor) ? valor : null;
}

export function QuizDescritiva({ prova, quiz }: Props) {
  const { estado, textos, escrever, finalizar, completa, lancarNota } = quiz;

  if (estado.fase === "aguardando-correcao") {
    const { submissao } = estado;
    const nota = notaComoNumero(submissao.nota);

    return (
      <>
        <QuizNota
          nota={nota}
          detalhe={
            nota === null
              ? "Prova enviada. A nota é lançada pelo instrutor nesta tela."
              : "Nota lançada pelo instrutor."
          }
        />

        {prova.perguntas.map((enunciado, indice) => (
          <section key={indice} className={estilos.revisao}>
            <p className={estilos.enunciado}>
              <span className={estilos.numero}>{indice + 1}.</span>
              <span>{enunciado}</span>
            </p>
            <p className={estilos.revisaoTexto}>{submissao.respostas[indice]}</p>
          </section>
        ))}

        <div className={estilos.campoNota}>
          <label htmlFor="nota-instrutor">Nota</label>
          <input
            id="nota-instrutor"
            type="text"
            inputMode="decimal"
            value={submissao.nota}
            placeholder="0 a 10"
            onChange={(evento) => lancarNota(evento.target.value)}
          />
          <span className={estilos.aviso}>Preenchida pelo instrutor.</span>
        </div>
      </>
    );
  }

  return (
    <>
      {prova.perguntas.map((enunciado, indice) => (
        <section key={indice} className={estilos.pergunta}>
          <label className={estilos.enunciado} htmlFor={`resposta-${indice}`}>
            <span className={estilos.numero}>{indice + 1}.</span>
            <span>{enunciado}</span>
          </label>
          <textarea
            id={`resposta-${indice}`}
            className={estilos.resposta}
            value={textos[indice] ?? ""}
            onChange={(evento) => escrever(indice, evento.target.value)}
          />
        </section>
      ))}

      <div className={estilos.acoes}>
        <button
          type="button"
          className={estilos.enviar}
          disabled={!completa}
          onClick={finalizar}
        >
          Enviar prova
        </button>
        <p className={estilos.aviso}>
          O envio é único: depois de enviar não dá para refazer.
        </p>
      </div>
    </>
  );
}
