import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type FaseDigitacao = "parado" | "digitando" | "concluido";

export interface Metricas {
  /** Palavras por minuto, na convenção de 5 caracteres por palavra. */
  ppm: number;
  /** Porcentagem de acerto sobre o que foi digitado. */
  precisao: number;
  segundos: number;
  acertos: number;
  erros: number;
}

const CARACTERES_POR_PALAVRA = 5;

export function useDigitacao(texto: string) {
  const [digitado, definirDigitado] = useState("");
  const [fase, definirFase] = useState<FaseDigitacao>("parado");
  const [inicio, definirInicio] = useState<number | null>(null);
  const [agora, definirAgora] = useState<number>(() => Date.now());

  /** Erros contados no momento da digitação: apagar não perdoa o engano. */
  const errosRef = useRef(0);
  const [erros, definirErros] = useState(0);

  useEffect(() => {
    if (fase !== "digitando" || inicio === null) return;
    const id = window.setInterval(() => definirAgora(Date.now()), 200);
    return () => window.clearInterval(id);
  }, [fase, inicio]);

  const acertos = useMemo(() => {
    let total = 0;
    for (let i = 0; i < digitado.length; i += 1) {
      if (digitado[i] === texto[i]) total += 1;
    }
    return total;
  }, [digitado, texto]);

  const metricas = useMemo<Metricas>(() => {
    const decorrido = inicio === null ? 0 : Math.max(0, agora - inicio) / 1000;
    const minutos = decorrido / 60;
    const ppm = minutos > 0 ? acertos / CARACTERES_POR_PALAVRA / minutos : 0;
    const totalDigitado = acertos + erros;

    return {
      ppm: Math.round(ppm),
      precisao: totalDigitado > 0 ? Math.round((acertos / totalDigitado) * 100) : 100,
      segundos: Math.round(decorrido),
      acertos,
      erros,
    };
  }, [inicio, agora, acertos, erros]);

  const escrever = useCallback(
    (valor: string) => {
      if (fase === "concluido") return;

      if (fase === "parado" && valor.length > 0) {
        const t = Date.now();
        definirInicio(t);
        definirAgora(t);
        definirFase("digitando");
      }

      // Conta o erro só quando um caractere novo entra errado. Correção
      // posterior arruma o texto, não o histórico.
      if (valor.length > digitado.length) {
        const indice = valor.length - 1;
        if (valor[indice] !== texto[indice]) {
          errosRef.current += 1;
          definirErros(errosRef.current);
        }
      }

      const limitado = valor.slice(0, texto.length);
      definirDigitado(limitado);

      if (limitado.length === texto.length) {
        definirAgora(Date.now());
        definirFase("concluido");
      }
    },
    [fase, digitado.length, texto],
  );

  const recomecar = useCallback(() => {
    definirDigitado("");
    definirFase("parado");
    definirInicio(null);
    definirAgora(Date.now());
    errosRef.current = 0;
    definirErros(0);
  }, []);

  return { digitado, fase, metricas, escrever, recomecar };
}
