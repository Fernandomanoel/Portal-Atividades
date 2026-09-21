import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { QuizContainer } from "@/components/quiz/QuizContainer";
import { carregarProva } from "@/data/provasInterativas";
import { rotas } from "@/lib/rotas";
import type { ProvaInterativa } from "@/types/quiz";

type Estado =
  | { fase: "carregando" }
  | { fase: "pronta"; prova: ProvaInterativa }
  | { fase: "ausente" };

export function QuizPage() {
  const { categoria, prova: caminho } = useParams();
  const [estado, definirEstado] = useState<Estado>({ fase: "carregando" });

  useEffect(() => {
    let ativo = true;
    if (!caminho) {
      definirEstado({ fase: "ausente" });
      return;
    }

    carregarProva(caminho)
      .then((prova) => {
        if (!ativo) return;
        definirEstado(prova ? { fase: "pronta", prova } : { fase: "ausente" });
      })
      .catch(() => ativo && definirEstado({ fase: "ausente" }));

    return () => {
      ativo = false;
    };
  }, [caminho]);

  if (estado.fase === "carregando") {
    return <p aria-live="polite">Carregando a prova…</p>;
  }

  if (estado.fase === "ausente") {
    return (
      <>
        <CabecalhoPagina titulo="Prova não encontrada" voltarPara={rotas.provas()} />
        <EstadoVazio
          icone="prova"
          titulo="Essa prova não existe"
          texto="O endereço pode estar desatualizado, ou a prova ainda não foi adicionada ao portal."
          origem="src/data/provasInterativas/"
        />
      </>
    );
  }

  return (
    <QuizContainer
      prova={estado.prova}
      chave={`${categoria}/${caminho}`}
      voltarPara={rotas.provas()}
    />
  );
}
