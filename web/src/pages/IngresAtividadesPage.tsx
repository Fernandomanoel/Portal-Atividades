import { EstadoVazio } from "@/components/EstadoVazio";
import { CursoCard } from "@/components/cards/CursoCard";
import { ATIVIDADES_INGLES } from "@/data/ingles";
import { rotas } from "@/lib/rotas";
import estilos from "./AtividadesPage.module.css";

export function IngresAtividadesPage() {
  if (ATIVIDADES_INGLES.length === 0) {
    return (
      <EstadoVazio
        icone="ingles"
        titulo="Nenhuma atividade de inglês ainda"
        texto="As atividades da trilha de inglês aparecem aqui assim que forem adicionadas."
        origem="src/data/ingles.ts"
      />
    );
  }

  return (
    <div className={estilos.grade}>
      {ATIVIDADES_INGLES.map((atividade) => (
        <CursoCard
          key={atividade.slug}
          para={rotas.inglesAtividade(atividade.slug)}
          titulo={atividade.titulo}
          descricao={atividade.descricao}
          cor={atividade.cor}
          imagem={atividade.imagem}
          quantidadeMateriais={atividade.materiais.length}
        />
      ))}
    </div>
  );
}
