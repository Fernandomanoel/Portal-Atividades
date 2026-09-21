import { EstadoVazio } from "@/components/EstadoVazio";
import { ListaProvas } from "@/components/provas/ListaProvas";
import { PROVAS_INGLES } from "@/data/ingles";

export function IngresProvasPage() {
  if (PROVAS_INGLES.length === 0) {
    return (
      <EstadoVazio
        icone="prova"
        titulo="Nenhuma prova de inglês ainda"
        texto="As provas da trilha de inglês aparecem aqui assim que forem adicionadas."
        origem="src/data/ingles.ts"
      />
    );
  }

  return <ListaProvas arquivos={PROVAS_INGLES} categoria="ingles" />;
}
