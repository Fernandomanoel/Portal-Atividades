import estilos from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={estilos.rodape}>
      <div className={estilos.interna}>
        <span className={estilos.marca}>Portal de Atividades</span>
        <span>Materiais de aula e provas dos cursos.</span>
      </div>
    </footer>
  );
}
