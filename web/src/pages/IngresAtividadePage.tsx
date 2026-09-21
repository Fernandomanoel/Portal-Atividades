import { useParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { ListaMateriais } from "@/components/ListaMateriais";
import { acharAtividadeIngles } from "@/data/ingles";
import { rotas } from "@/lib/rotas";

export function IngresAtividadePage() {
  const { slug } = useParams();
  const atividade = slug ? acharAtividadeIngles(slug) : undefined;

  if (!atividade) {
    return (
      <>
        <CabecalhoPagina
          titulo="Atividade não encontrada"
          voltarPara={rotas.inglesAtividades()}
        />
        <EstadoVazio
          icone="busca"
          titulo="Essa atividade não existe na trilha de inglês"
          texto="O endereço pode estar desatualizado, ou a atividade ainda não foi adicionada."
          origem="src/data/ingles.ts"
        />
      </>
    );
  }

  return (
    <>
      <CabecalhoPagina
        titulo={atividade.titulo}
        texto={atividade.descricao}
        voltarPara={rotas.inglesAtividades()}
      />
      <ListaMateriais materiais={atividade.materiais} />
    </>
  );
}
