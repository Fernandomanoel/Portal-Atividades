import { createContext, useContext, type ReactNode } from "react";

import { useTema, type Tema } from "./useTema";

interface ValorTema {
  tema: Tema;
  alternar: () => void;
}

const Contexto = createContext<ValorTema | null>(null);

export function ProvedorTema({ children }: { children: ReactNode }) {
  const valor = useTema();
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useTemaContexto(): ValorTema {
  const valor = useContext(Contexto);
  if (!valor) {
    throw new Error("useTemaContexto precisa estar dentro de <ProvedorTema>");
  }
  return valor;
}
