import { Link } from "react-router-dom";

import estilos from "./CursoCard.module.css";

interface Props {
  para: string;
  titulo: string;
  descricao: string;
  cor: string;
  sigla?: string;
  imagem?: string;
  quantidadeMateriais: number;
}

export function CursoCard({
  para,
  titulo,
  descricao,
  cor,
  sigla,
  imagem,
  quantidadeMateriais,
}: Props) {
  return (
    <article className={estilos.card}>
      <div className={estilos.capa} style={{ background: imagem ? undefined : cor }}>
        {imagem ? (
          <img src={imagem} alt="" loading="lazy" />
        ) : (
          (sigla ?? titulo.slice(0, 1)).toUpperCase()
        )}
      </div>

      <div className={estilos.corpo}>
        <h3 className={estilos.titulo}>
          <Link to={para}>{titulo}</Link>
        </h3>
        <p className={estilos.descricao}>{descricao}</p>
        <p className={`${estilos.rodape} tabular`}>
          {quantidadeMateriais === 1
            ? "1 material"
            : `${quantidadeMateriais} materiais`}
        </p>
      </div>
    </article>
  );
}
