import { Icone, type NomeIcone } from "./Icone";
import estilos from "./EstadoVazio.module.css";

interface Props {
  icone?: NomeIcone;
  titulo: string;
  texto: string;
  /** Onde o conteúdo entra. Só aparece em desenvolvimento: aluno não lê caminho de arquivo. */
  origem?: string;
}

export function EstadoVazio({ icone = "prova", titulo, texto, origem }: Props) {
  return (
    <div className={estilos.caixa}>
      <span className={estilos.selo}>
        <Icone nome={icone} tamanho={22} />
      </span>
      <h2 className={estilos.titulo}>{titulo}</h2>
      <p className={estilos.texto}>{texto}</p>
      {origem && import.meta.env.DEV && (
        <code className={estilos.dica}>{origem}</code>
      )}
    </div>
  );
}
