import { Link } from "react-router-dom";

import { Icone } from "@/components/Icone";
import { rotas } from "@/lib/rotas";
import type { ArquivoProva } from "@/types/prova";
import estilos from "./ListaProvas.module.css";

interface Props {
  arquivos: ArquivoProva[];
  categoria: string;
}

export function ListaProvas({ arquivos, categoria }: Props) {
  return (
    <ul className={estilos.lista}>
      {arquivos.map((arquivo) => (
        <li key={arquivo.caminho} className={estilos.item}>
          <span className={estilos.selo}>
            <Icone nome={arquivo.tipo === "quiz" ? "prova" : "pdf"} />
          </span>

          <div className={estilos.texto}>
            <p className={estilos.rotulo}>{arquivo.rotulo}</p>
            <p className={`${estilos.meta} tabular`}>{arquivo.tamanho}</p>
          </div>

          {arquivo.tipo === "quiz" ? (
            <Link
              to={rotas.quiz(categoria, arquivo.caminho)}
              className={`${estilos.acao} ${estilos.acaoPrimaria}`}
            >
              Fazer prova
              <Icone nome="seta-direita" tamanho={16} />
            </Link>
          ) : (
            <a
              href={arquivo.caminho}
              target="_blank"
              rel="noreferrer"
              className={estilos.acao}
            >
              Abrir
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
