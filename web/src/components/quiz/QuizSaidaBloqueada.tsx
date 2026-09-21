import { useEffect, useRef } from "react";

import estilos from "./QuizSaidaBloqueada.module.css";

interface Props {
  aoFicar: () => void;
  aoSair: () => void;
}

export function QuizSaidaBloqueada({ aoFicar, aoSair }: Props) {
  const ficarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    ficarRef.current?.focus();

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") aoFicar();
    }

    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aoFicar]);

  return (
    <div className={estilos.fundo}>
      <div
        className={estilos.caixa}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="saida-titulo"
        aria-describedby="saida-texto"
      >
        <h2 id="saida-titulo" className={estilos.titulo}>
          Sair sem enviar a prova?
        </h2>
        <p id="saida-texto" className={estilos.texto}>
          Suas respostas não foram enviadas. Se sair agora, elas se perdem.
        </p>

        <div className={estilos.acoes}>
          <button
            type="button"
            ref={ficarRef}
            className={estilos.ficar}
            onClick={aoFicar}
          >
            Continuar a prova
          </button>
          <button type="button" className={estilos.sair} onClick={aoSair}>
            Sair mesmo assim
          </button>
        </div>
      </div>
    </div>
  );
}
