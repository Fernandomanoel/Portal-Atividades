import { Link } from "react-router-dom";

import { Icone, type NomeIcone } from "@/components/Icone";
import { ATIVIDADES } from "@/data/atividades";
import { EXERCICIOS } from "@/data/digitacao";
import { ATIVIDADES_INGLES, PROVAS_INGLES } from "@/data/ingles";
import { rotas } from "@/lib/rotas";
import { CATEGORIAS, type CategoriaAtividade } from "@/types/curso";
import estilos from "./HomePage.module.css";

const ICONE: Record<CategoriaAtividade, NomeIcone> = {
  informatica: "informatica",
  administrativa: "administrativa",
  programacao: "programacao",
  design: "design",
};

function contar(n: number, singular: string, plural: string) {
  return `${n} ${n === 1 ? singular : plural}`;
}

export function HomePage() {
  const totalIngles = ATIVIDADES_INGLES.length + PROVAS_INGLES.length;

  return (
    <>
      <header className={estilos.abertura}>
        <h1 className={estilos.titulo}>O material da sua aula fica aqui.</h1>
        <p className={estilos.texto}>
          Escolha a trilha do seu curso para abrir os arquivos, exercícios e
          slides da aula.
        </p>
      </header>

      <section aria-labelledby="titulo-trilhas">
        <h2 id="titulo-trilhas" className="sr-only">
          Trilhas de atividades
        </h2>

        <ul className={estilos.trilhas}>
          {CATEGORIAS.map((categoria, indice) => {
            const cursos = ATIVIDADES.filter(
              (curso) => curso.categoria === categoria.id,
            ).length;
            const temConteudo = cursos > 0;

            return (
              <li
                key={categoria.id}
                className={
                  temConteudo
                    ? `${estilos.trilha} ${estilos.trilhaViva}`
                    : estilos.trilha
                }
                style={{ "--atraso": `${indice * 60}ms` } as React.CSSProperties}
              >
                <span className={estilos.selo}>
                  <Icone nome={ICONE[categoria.id]} tamanho={22} />
                </span>

                <div className={estilos.corpo}>
                  <h3 className={estilos.nome}>
                    <Link to={rotas.atividades(categoria.id)}>
                      {categoria.nome}
                    </Link>
                  </h3>
                  <p className={estilos.descricao}>{categoria.descricao}</p>
                </div>

                <span
                  className={temConteudo ? estilos.contagem : estilos.aguardando}
                >
                  {temConteudo ? contar(cursos, "curso", "cursos") : "em breve"}
                </span>

                <Icone nome="seta-direita" tamanho={18} className={estilos.seta} />
              </li>
            );
          })}
        </ul>
      </section>

      <section className={estilos.secundarios} aria-label="Outras seções">
        <article className={estilos.ingles}>
          <div className={estilos.inglesTopo}>
            <span
              className={
                totalIngles > 0
                  ? `${estilos.selo} ${estilos.seloVivo}`
                  : estilos.selo
              }
            >
              <Icone nome="ingles" tamanho={22} />
            </span>
            <h2 className={estilos.nome}>
              <Link to={rotas.ingles()}>Inglês</Link>
            </h2>
          </div>
          <p className={estilos.descricao}>
            Trilha à parte, com atividades e provas próprias.
          </p>
          <span className={totalIngles > 0 ? estilos.contagem : estilos.aguardando}>
            {totalIngles > 0
              ? contar(totalIngles, "item", "itens")
              : "em breve"}
          </span>
        </article>

        <article className={estilos.digitacao}>
          <div className={estilos.inglesTopo}>
            <span
              className={
                EXERCICIOS.length > 0
                  ? `${estilos.selo} ${estilos.seloVivo}`
                  : estilos.selo
              }
            >
              <Icone nome="digitacao" tamanho={22} />
            </span>
            <h2 className={estilos.nome}>
              <Link to={rotas.digitacao()}>Digitação</Link>
            </h2>
          </div>
          <p className={estilos.descricao}>
            Treino de teclado, medido em velocidade e precisão.
          </p>
          <span
            className={EXERCICIOS.length > 0 ? estilos.contagem : estilos.aguardando}
          >
            {EXERCICIOS.length > 0
              ? contar(EXERCICIOS.length, "exercício", "exercícios")
              : "em breve"}
          </span>
        </article>

        <article className={estilos.provas}>
          <div className={estilos.inglesTopo}>
            <span className={`${estilos.selo} ${estilos.seloProvas}`}>
              <Icone nome="cadeado" tamanho={20} />
            </span>
            <h2 className={estilos.nomeQuieto}>
              <Link to={rotas.provas()}>Provas</Link>
            </h2>
          </div>
          <p className={estilos.descricao}>
            Área do instrutor. Pede senha ao entrar.
          </p>
        </article>
      </section>
    </>
  );
}
