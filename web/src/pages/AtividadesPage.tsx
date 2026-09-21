import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone, type NomeIcone } from "@/components/Icone";
import { CursoCard } from "@/components/cards/CursoCard";
import { ATIVIDADES } from "@/data/atividades";
import { normalizar } from "@/lib/busca";
import { rotas } from "@/lib/rotas";
import { CATEGORIAS, type CategoriaAtividade } from "@/types/curso";
import estilos from "./AtividadesPage.module.css";

const ICONE_CATEGORIA: Record<CategoriaAtividade, NomeIcone> = {
  informatica: "informatica",
  administrativa: "administrativa",
  programacao: "programacao",
  design: "design",
};

function ehCategoria(valor: string | null): valor is CategoriaAtividade {
  return CATEGORIAS.some((categoria) => categoria.id === valor);
}

export function AtividadesPage() {
  const [parametros, definirParametros] = useSearchParams();

  const bruta = parametros.get("categoria");
  const categoria = ehCategoria(bruta) ? bruta : null;
  const busca = parametros.get("busca") ?? "";

  const cursos = useMemo(() => {
    const termo = normalizar(busca);
    return ATIVIDADES.filter((curso) => {
      if (categoria && curso.categoria !== categoria) return false;
      if (!termo) return true;
      return (
        normalizar(curso.titulo).includes(termo) ||
        normalizar(curso.descricao).includes(termo)
      );
    });
  }, [categoria, busca]);

  function filtrar(id: CategoriaAtividade | null) {
    const proximos = new URLSearchParams(parametros);
    if (id) proximos.set("categoria", id);
    else proximos.delete("categoria");
    definirParametros(proximos, { replace: true });
  }

  const atual = CATEGORIAS.find((c) => c.id === categoria);

  return (
    <>
      <CabecalhoPagina
        titulo={atual ? atual.nome : "Atividades"}
        texto={atual ? atual.descricao : "Escolha a trilha do seu curso."}
        voltarPara={atual ? rotas.atividades() : undefined}
      />

      <div className={estilos.filtros} role="group" aria-label="Filtrar por trilha">
        <button
          type="button"
          onClick={() => filtrar(null)}
          className={
            categoria === null ? `${estilos.filtro} ${estilos.filtroAtivo}` : estilos.filtro
          }
          aria-pressed={categoria === null}
        >
          Todas
        </button>
        {CATEGORIAS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => filtrar(item.id)}
            className={
              categoria === item.id
                ? `${estilos.filtro} ${estilos.filtroAtivo}`
                : estilos.filtro
            }
            aria-pressed={categoria === item.id}
          >
            <Icone nome={ICONE_CATEGORIA[item.id]} tamanho={16} />
            {item.nome}
          </button>
        ))}
      </div>

      {cursos.length > 0 ? (
        <div className={estilos.grade}>
          {cursos.map((curso) => (
            <CursoCard
              key={curso.slug}
              para={rotas.curso(curso.slug)}
              titulo={curso.titulo}
              descricao={curso.descricao}
              cor={curso.cor}
              sigla={curso.sigla}
              imagem={curso.imagem}
              quantidadeMateriais={curso.materiais.length}
            />
          ))}
        </div>
      ) : busca ? (
        <EstadoVazio
          icone="busca"
          titulo="Nenhum curso com esse nome"
          texto={`Nada encontrado para "${busca}". Tente outro termo ou veja todas as trilhas.`}
        />
      ) : (
        <EstadoVazio
          icone={atual ? ICONE_CATEGORIA[atual.id] : "informatica"}
          titulo={atual ? `${atual.nome} ainda não tem cursos` : "Nenhum curso cadastrado"}
          texto="Os cursos aparecem aqui assim que forem adicionados ao catálogo. Nenhuma tela precisa ser criada para isso."
          origem="src/data/atividades.ts"
        />
      )}
    </>
  );
}
