import { useState, type FormEvent } from "react";

import { Icone } from "@/components/Icone";
import estilos from "./ProvasLock.module.css";

/**
 * Trava de interface, não de segurança: o portal é estático e qualquer pessoa
 * com acesso ao repositório alcança os arquivos de qualquer forma. É uma
 * convenção de sala de aula, e é explicitamente provisória — a direção é
 * substituí-la por login de instrutor com JWT quando o backend existir.
 */
const SENHA = "microlins";

export function ProvasLock({ aoEntrar }: { aoEntrar: () => void }) {
  const [senha, definirSenha] = useState("");
  const [erro, definirErro] = useState(false);

  function enviar(evento: FormEvent) {
    evento.preventDefault();
    if (senha === SENHA) {
      aoEntrar();
      return;
    }
    definirErro(true);
    definirSenha("");
  }

  return (
    <form className={estilos.caixa} onSubmit={enviar}>
      <span className={estilos.selo}>
        <Icone nome="cadeado" tamanho={22} />
      </span>

      <h1 className={estilos.titulo}>Área de provas</h1>
      <p className={estilos.texto}>
        Esta área é usada pelo instrutor. A senha é pedida toda vez que a página
        carrega.
      </p>

      <div className={estilos.campo}>
        <label htmlFor="senha-provas">Senha</label>
        <input
          id="senha-provas"
          type="password"
          value={senha}
          autoComplete="current-password"
          onChange={(evento) => {
            definirSenha(evento.target.value);
            definirErro(false);
          }}
        />
      </div>

      {erro && (
        <p className={estilos.erro} role="alert">
          <Icone nome="x" tamanho={16} />
          Senha incorreta. Tente de novo.
        </p>
      )}

      <button type="submit" className={estilos.entrar}>
        Entrar
      </button>
    </form>
  );
}
