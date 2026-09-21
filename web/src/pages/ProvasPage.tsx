import { useMemo, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { ListaProvas } from "@/components/provas/ListaProvas";
import { ProvasLock } from "@/components/provas/ProvasLock";
import { PROVAS_CATEGORIAS, PROVAS_MANIFEST } from "@/data/provasManifest";
import estilos from "./ProvasPage.module.css";

export function ProvasPage() {
  // Estado só em memória: recarregar a página pede a senha de novo, como antes.
  const [liberada, definirLiberada] = useState(false);

  const grupos = useMemo(
    () =>
      PROVAS_CATEGORIAS.map((categoria) => ({
        nome: categoria.nome,
        cursos: categoria.cursos
          .map((curso) => ({ curso, arquivos: PROVAS_MANIFEST[curso] ?? [] }))
          .filter((entrada) => entrada.arquivos.length > 0),
      })).filter((grupo) => grupo.cursos.length > 0),
    [],
  );

  if (!liberada) {
    return <ProvasLock aoEntrar={() => definirLiberada(true)} />;
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Provas"
        texto="Provas dos cursos, por categoria."
        acoes={
          <button
            type="button"
            className={estilos.sair}
            onClick={() => definirLiberada(false)}
          >
            Sair da área de provas
          </button>
        }
      />

      {grupos.length === 0 ? (
        <EstadoVazio
          icone="prova"
          titulo="Nenhuma prova cadastrada"
          texto="As provas aparecem aqui assim que forem adicionadas à pasta provas/ e o manifesto for gerado."
          origem="src/data/provasManifest.ts"
        />
      ) : (
        grupos.map((grupo) => (
          <section key={grupo.nome} className={estilos.grupo}>
            <h2 className={estilos.grupoNome}>{grupo.nome}</h2>
            {grupo.cursos.map((entrada) => (
              <div key={entrada.curso} className={estilos.curso}>
                <h3 className={estilos.cursoNome}>{entrada.curso}</h3>
                <ListaProvas arquivos={entrada.arquivos} categoria={grupo.nome} />
              </div>
            ))}
          </section>
        ))
      )}
    </>
  );
}
