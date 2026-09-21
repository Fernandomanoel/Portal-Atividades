import { useCallback, useEffect, useMemo, useState } from "react";

import { useProvaEmAndamento } from "./ProvaEmAndamento";
import {
  ehDescritiva,
  type ProvaInterativa,
  type SubmissaoDescritiva,
} from "@/types/quiz";

export type FaseQuiz =
  | { fase: "respondendo" }
  | { fase: "corrigida"; acertos: number; total: number }
  | { fase: "aguardando-correcao"; submissao: SubmissaoDescritiva };

function chaveEnvio(chave: string) {
  return `portal-prova-enviada:${chave}`;
}

function lerEnvio(chave: string): SubmissaoDescritiva | null {
  try {
    const bruto = localStorage.getItem(chaveEnvio(chave));
    return bruto ? (JSON.parse(bruto) as SubmissaoDescritiva) : null;
  } catch {
    return null;
  }
}

function gravarEnvio(chave: string, submissao: SubmissaoDescritiva) {
  try {
    localStorage.setItem(chaveEnvio(chave), JSON.stringify(submissao));
  } catch {
    /* sem storage: a prova ainda funciona, só não resiste a um recarregamento */
  }
}

export function useQuiz(prova: ProvaInterativa, chave: string) {
  const { travar, liberar } = useProvaEmAndamento();
  const descritiva = ehDescritiva(prova);
  const totalPerguntas = prova.perguntas.length;

  const [estado, definirEstado] = useState<FaseQuiz>(() => {
    if (descritiva) {
      const enviada = lerEnvio(chave);
      if (enviada) return { fase: "aguardando-correcao", submissao: enviada };
    }
    return { fase: "respondendo" };
  });

  const [escolhas, definirEscolhas] = useState<Record<number, number>>({});
  const [textos, definirTextos] = useState<string[]>(() =>
    Array.from({ length: totalPerguntas }, () => ""),
  );

  const respondendo = estado.fase === "respondendo";

  useEffect(() => {
    if (respondendo) travar();
    else liberar();
    return liberar;
  }, [respondendo, travar, liberar]);

  const responder = useCallback((pergunta: number, opcao: number) => {
    definirEscolhas((atual) => ({ ...atual, [pergunta]: opcao }));
  }, []);

  const escrever = useCallback((pergunta: number, texto: string) => {
    definirTextos((atual) => {
      const proximo = [...atual];
      proximo[pergunta] = texto;
      return proximo;
    });
  }, []);

  const completa = useMemo(() => {
    if (descritiva) return textos.every((texto) => texto.trim().length > 0);
    return Object.keys(escolhas).length === totalPerguntas;
  }, [descritiva, textos, escolhas, totalPerguntas]);

  const finalizar = useCallback(() => {
    if (ehDescritiva(prova)) {
      const submissao: SubmissaoDescritiva = {
        respostas: textos,
        nota: "",
        enviadaEm: new Date().toISOString(),
      };
      gravarEnvio(chave, submissao);
      definirEstado({ fase: "aguardando-correcao", submissao });
      return;
    }

    const acertos = prova.perguntas.reduce(
      (total, pergunta, indice) =>
        escolhas[indice] === pergunta.correta ? total + 1 : total,
      0,
    );
    definirEstado({ fase: "corrigida", acertos, total: prova.perguntas.length });
  }, [prova, textos, escolhas, chave]);

  const lancarNota = useCallback(
    (nota: string) => {
      definirEstado((atual) => {
        if (atual.fase !== "aguardando-correcao") return atual;
        const submissao = { ...atual.submissao, nota };
        gravarEnvio(chave, submissao);
        return { fase: "aguardando-correcao", submissao };
      });
    },
    [chave],
  );

  return {
    estado,
    escolhas,
    textos,
    completa,
    responder,
    escrever,
    finalizar,
    lancarNota,
  };
}
