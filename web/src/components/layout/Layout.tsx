import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useProvaEmAndamento } from "@/hooks/ProvaEmAndamento";
import estilos from "./Layout.module.css";

export function Layout() {
  const { travada } = useProvaEmAndamento();

  return (
    <div className={estilos.pagina}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      {!travada && <Navbar />}

      <main id="conteudo" className={estilos.conteudo}>
        <Outlet />
      </main>

      {!travada && <Footer />}
    </div>
  );
}
