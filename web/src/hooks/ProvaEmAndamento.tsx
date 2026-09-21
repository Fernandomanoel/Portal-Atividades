import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface Valor {
  travada: boolean;
  travar: () => void;
  liberar: () => void;
}

const Contexto = createContext<Valor | null>(null);

/**
 * Prova começada não se abandona: enquanto travada, o menu e o rodapé somem e o
 * navegador avisa antes de fechar ou recarregar. A trava de navegação interna
 * (clicar num link do próprio portal) fica no componente da prova, que é quem
 * tem acesso ao bloqueador do roteador.
 */
export function ProvedorProvaEmAndamento({ children }: { children: ReactNode }) {
  const [travada, definirTravada] = useState(false);

  useEffect(() => {
    if (!travada) return;

    function avisar(evento: BeforeUnloadEvent) {
      evento.preventDefault();
    }

    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [travada]);

  const travar = useCallback(() => definirTravada(true), []);
  const liberar = useCallback(() => definirTravada(false), []);

  return (
    <Contexto.Provider value={{ travada, travar, liberar }}>
      {children}
    </Contexto.Provider>
  );
}

export function useProvaEmAndamento(): Valor {
  const valor = useContext(Contexto);
  if (!valor) {
    throw new Error(
      "useProvaEmAndamento precisa estar dentro de <ProvedorProvaEmAndamento>",
    );
  }
  return valor;
}
