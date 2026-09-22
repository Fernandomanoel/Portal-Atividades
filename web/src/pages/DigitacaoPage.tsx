import { useRef, useState } from "react";

import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { EstadoVazio } from "@/components/EstadoVazio";
import { Icone } from "@/components/Icone";
import { EXERCICIOS } from "@/data/digitacao";
import { useDigitacao } from "@/hooks/useDigitacao";
import estilos from "./DigitacaoPage.module.css";

export function DigitacaoPage() {
  const [escolhido, definirEscolhido] = useState(EXERCICIOS[0]?.id ?? "");
  const exercicio = EXERCICIOS.find((item) => item.id === escolhido);

  const { digitado, fase, metricas, escrever, recomecar } = useDigitacao(
    exercicio?.texto ?? "",
  );
  const campoRef = useRef<HTMLTextAreaElement>(null);

  function trocar(id: string) {
    if (id === escolhido) return;
    definirEscolhido(id);
    recomecar();
    campoRef.current?.focus();
  }

  function reiniciar() {
    recomecar();
    campoRef.current?.focus();
  }

  if (!exercicio) {
    return (
      <>
        <CabecalhoPagina
          titulo="Digitação"
          texto="Treino de teclado, medido em velocidade e precisão."
        />
        <EstadoVazio
          icone="digitacao"
          titulo="Nenhum exercício de digitação ainda"
          texto="Os exercícios aparecem aqui assim que forem adicionados. Cada um vira um treino com cronômetro, contagem de erros e palavras por minuto."
          origem="src/data/digitacao.ts"
        />
      </>
    );
  }

  return (
    <>
      <CabecalhoPagina
        titulo="Digitação"
        texto="Treino livre. Comece a digitar e o cronômetro parte sozinho."
      />

      <div className={estilos.escolha} role="group" aria-label="Escolher exercício">
        {EXERCICIOS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => trocar(item.id)}
            aria-pressed={item.id === exercicio.id}
            className={
              item.id === exercicio.id
                ? `${estilos.opcao} ${estilos.opcaoAtiva}`
                : estilos.opcao
            }
          >
            {item.titulo}
          </button>
        ))}
      </div>

      <div className={estilos.pista} onClick={() => campoRef.current?.focus()}>
        <p className={estilos.texto} aria-hidden="true">
          {exercicio.texto.split("").map((caractere, indice) => {
            const escrito = digitado[indice];
            let classe = "";
            if (indice === digitado.length && fase !== "concluido") {
              classe = estilos.atual;
            } else if (escrito !== undefined) {
              classe = escrito === caractere ? estilos.certo : estilos.errado;
            }
            return (
              <span key={indice} className={classe}>
                {caractere}
              </span>
            );
          })}
        </p>

        <textarea
          id="campo-digitacao"
          ref={campoRef}
          className={estilos.campo}
          value={digitado}
          onChange={(evento) => escrever(evento.target.value)}
          aria-label={`Digite o texto do exercício ${exercicio.titulo}`}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />

        {fase === "parado" && (
          <p className={estilos.convite}>
            Clique aqui e comece a digitar. Errar não trava nada — só conta na
            precisão.
          </p>
        )}
      </div>

      <div className={estilos.painel}>
        <div className={estilos.medida}>
          <strong className={estilos.valor}>{metricas.ppm}</strong>
          <span className={estilos.rotulo}>palavras por minuto</span>
        </div>

        <div className={estilos.medida}>
          <strong
            className={`${estilos.valor} ${
              metricas.precisao >= 95
                ? estilos.valorBom
                : metricas.precisao < 80
                  ? estilos.valorRuim
                  : ""
            }`}
          >
            {metricas.precisao}%
          </strong>
          <span className={estilos.rotulo}>precisão</span>
        </div>

        <div className={estilos.medida}>
          <strong className={estilos.valor}>{metricas.segundos}s</strong>
          <span className={estilos.rotulo}>tempo</span>
        </div>

        <div className={estilos.medida}>
          <strong className={estilos.valor}>{metricas.erros}</strong>
          <span className={estilos.rotulo}>
            {metricas.erros === 1 ? "erro" : "erros"}
          </span>
        </div>

        <button type="button" className={estilos.recomecar} onClick={reiniciar}>
          <Icone nome="recomecar" tamanho={17} />
          Recomeçar
        </button>
      </div>

      {fase === "concluido" && (
        <p className={estilos.fim} role="status">
          <Icone nome="check" tamanho={20} />
          <span className={estilos.fimTexto}>
            Exercício concluído: {metricas.ppm} palavras por minuto com{" "}
            {metricas.precisao}% de precisão.
          </span>
        </p>
      )}
    </>
  );
}
