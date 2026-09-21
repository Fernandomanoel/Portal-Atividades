import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import { Icone } from "./Icone";
import estilos from "./CabecalhoPagina.module.css";

interface Props {
  titulo: string;
  texto?: string;
  voltarPara?: string;
  acoes?: ReactNode;
}

export function CabecalhoPagina({ titulo, texto, voltarPara, acoes }: Props) {
  const navegar = useNavigate();

  return (
    <header className={estilos.cabecalho}>
      {voltarPara && (
        <button
          type="button"
          className={estilos.voltar}
          onClick={() => navegar(voltarPara)}
        >
          <Icone nome="seta-esquerda" tamanho={16} />
          Voltar
        </button>
      )}
      <h1 className={estilos.titulo}>{titulo}</h1>
      {texto && <p className={estilos.texto}>{texto}</p>}
      {acoes}
    </header>
  );
}
