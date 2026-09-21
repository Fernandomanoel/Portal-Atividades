import { EstadoVazio } from "./EstadoVazio";
import { Icone, type NomeIcone } from "./Icone";
import type { Material, TipoMaterial } from "@/types/curso";
import estilos from "./ListaMateriais.module.css";

const ICONE: Record<TipoMaterial, NomeIcone> = {
  pdf: "pdf",
  doc: "doc",
  planilha: "planilha",
  slides: "slides",
  link: "link",
};

const ROTULO: Record<TipoMaterial, string> = {
  pdf: "PDF",
  doc: "Documento",
  planilha: "Planilha",
  slides: "Slides",
  link: "Link",
};

export function ListaMateriais({ materiais }: { materiais: Material[] }) {
  if (materiais.length === 0) {
    return (
      <EstadoVazio
        icone="pdf"
        titulo="Nenhum material neste curso ainda"
        texto="Os arquivos e exercícios aparecem aqui assim que forem adicionados ao catálogo."
        origem="src/data/atividades.ts"
      />
    );
  }

  return (
    <ul className={estilos.lista}>
      {materiais.map((material) => {
        const destino = material.tipo === "link" ? material.url : material.arquivo;
        const externo = material.tipo === "link";

        return (
          <li key={`${material.titulo}-${destino}`} className={estilos.item}>
            <span className={estilos.selo}>
              <Icone nome={ICONE[material.tipo]} />
            </span>

            <div className={estilos.texto}>
              <h3 className={estilos.titulo}>
                <a
                  href={destino}
                  target={externo ? "_blank" : undefined}
                  rel={externo ? "noreferrer" : undefined}
                >
                  {material.titulo}
                </a>
              </h3>
              {material.descricao && (
                <p className={estilos.descricao}>{material.descricao}</p>
              )}
            </div>

            <span className={estilos.tipo}>{ROTULO[material.tipo]}</span>
          </li>
        );
      })}
    </ul>
  );
}
