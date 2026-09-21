import { Link } from "react-router-dom";

import { Icone } from "@/components/Icone";
import { ATIVIDADES } from "@/data/atividades";
import { ATIVIDADES_INGLES, PROVAS_INGLES } from "@/data/ingles";
import { rotas } from "@/lib/rotas";
import { CATEGORIAS } from "@/types/curso";
import estilos from "./HomePage.module.css";

function plural(n: number, singular: string, plural: string) {
  return `${n} ${n === 1 ? singular : plural}`;
}

export function HomePage() {
  const totalCursos = ATIVIDADES.length;

  return (
    <>
      <section className={estilos.abertura}>
        <h1 className={estilos.titulo}>O material da sua aula fica aqui.</h1>
        <p className={estilos.texto}>
          Escolha a trilha do seu curso para ver os arquivos, exercícios e slides.
          A área de provas é separada e usada pelo instrutor.
        </p>
      </section>

      <section aria-label="Seções do portal" className={estilos.destinos}>
        <article className={estilos.destino}>
          <div className={estilos.topo}>
            <span className={estilos.selo}>
              <Icone nome="informatica" />
            </span>
            <h2 className={estilos.nome}>
              <Link to={rotas.atividades()}>Atividades</Link>
            </h2>
          </div>
          <p className={estilos.resumo}>
            {totalCursos > 0
              ? `${plural(totalCursos, "curso", "cursos")} em quatro trilhas.`
              : "Quatro trilhas, organizadas por área."}
          </p>
          <ul className={estilos.lista}>
            {CATEGORIAS.map((categoria) => {
              const quantos = ATIVIDADES.filter(
                (curso) => curso.categoria === categoria.id,
              ).length;
              return (
                <li key={categoria.id} className={estilos.item}>
                  <span className={estilos.itemNome}>{categoria.nome}</span>
                  {quantos > 0 ? (
                    <span className={`${estilos.contagem} tabular`}>
                      {plural(quantos, "curso", "cursos")}
                    </span>
                  ) : (
                    <span className={estilos.vazio}>em breve</span>
                  )}
                </li>
              );
            })}
          </ul>
        </article>

        <article className={estilos.destino}>
          <div className={estilos.topo}>
            <span className={estilos.selo}>
              <Icone nome="ingles" />
            </span>
            <h2 className={estilos.nome}>
              <Link to={rotas.ingles()}>Inglês</Link>
            </h2>
          </div>
          <p className={estilos.resumo}>
            Trilha própria, com atividades e provas separadas.
          </p>
          <ul className={estilos.lista}>
            <li className={estilos.item}>
              <span className={estilos.itemNome}>Atividades</span>
              {ATIVIDADES_INGLES.length > 0 ? (
                <span className={`${estilos.contagem} tabular`}>
                  {plural(ATIVIDADES_INGLES.length, "curso", "cursos")}
                </span>
              ) : (
                <span className={estilos.vazio}>em breve</span>
              )}
            </li>
            <li className={estilos.item}>
              <span className={estilos.itemNome}>Provas</span>
              {PROVAS_INGLES.length > 0 ? (
                <span className={`${estilos.contagem} tabular`}>
                  {plural(PROVAS_INGLES.length, "prova", "provas")}
                </span>
              ) : (
                <span className={estilos.vazio}>em breve</span>
              )}
            </li>
          </ul>
        </article>

        <article className={estilos.destino}>
          <div className={estilos.topo}>
            <span className={`${estilos.selo} ${estilos.seloRestrito}`}>
              <Icone nome="prova" />
            </span>
            <h2 className={estilos.nome}>
              <Link to={rotas.provas()}>Provas</Link>
            </h2>
          </div>
          <p className={estilos.resumo}>
            Provas dos cursos, para download ou respondidas aqui mesmo.
          </p>
          <p className={estilos.restrito}>
            <Icone nome="cadeado" tamanho={16} />
            Acesso do instrutor
          </p>
        </article>
      </section>
    </>
  );
}
