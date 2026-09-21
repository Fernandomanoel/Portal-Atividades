import { useCallback, useEffect, useState } from "react";

export type Tema = "claro" | "escuro";

const CHAVE = "portal-tema";

function lerPreferencia(): Tema | null {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo === "claro" || salvo === "escuro" ? salvo : null;
  } catch {
    return null;
  }
}

function temaDoSistema(): Tema {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "escuro"
    : "claro";
}

export function useTema() {
  const [tema, definirTema] = useState<Tema>(
    () => lerPreferencia() ?? temaDoSistema(),
  );

  useEffect(() => {
    document.documentElement.dataset.theme =
      tema === "escuro" ? "dark" : "light";
    try {
      localStorage.setItem(CHAVE, tema);
    } catch {
      /* navegador sem storage: o tema vale só para esta sessão */
    }
  }, [tema]);

  const alternar = useCallback(() => {
    definirTema((atual) => (atual === "escuro" ? "claro" : "escuro"));
  }, []);

  return { tema, alternar };
}
