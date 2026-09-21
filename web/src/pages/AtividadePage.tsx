import { useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { ListaMateriais } from "@/components/ListaMateriais";
import { acharCurso } from "@/data/atividades";
import { rotas } from "@/lib/rotas";

export function AtividadePage() {
  const { curso: slug } = useParams();
  const curso = slug ? acharCurso(slug) : undefined;

  if (!curso) {
    return (
      <>
        <CabecalhoPagina titulo="Curso não encontrado" voltarPara={rotas.atividades()} />
        <EstadoVazio
          icone="busca"
          titulo="Esse curso não existe no catálogo"
          texto="O endereço pode estar desatualizado, ou o curso ainda não foi adicionado."
          origem="src/data/atividades.ts"
        />
      </>
    );
  }

  return (
    <>
      <CabecalhoPagina
        titulo={curso.titulo}
        texto={curso.descricao}
        voltarPara={rotas.atividades(curso.categoria)}
      />
      <ListaMateriais materiais={curso.materiais} />
    </>
  );
}
