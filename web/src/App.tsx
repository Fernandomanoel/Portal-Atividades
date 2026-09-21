import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { ProvedorProvaEmAndamento } from "@/hooks/ProvaEmAndamento";
import { ProvedorTema } from "@/hooks/TemaContexto";
import { AtividadePage } from "@/pages/AtividadePage";
import { AtividadesPage } from "@/pages/AtividadesPage";
import { HomePage } from "@/pages/HomePage";
import { IngresAtividadePage } from "@/pages/IngresAtividadePage";
import { IngresAtividadesPage } from "@/pages/IngresAtividadesPage";
import { IngresHubPage } from "@/pages/IngresHubPage";
import { IngresProvasPage } from "@/pages/IngresProvasPage";
import { ProvasPage } from "@/pages/ProvasPage";
import { QuizPage } from "@/pages/QuizPage";

/** Os provedores ficam dentro do roteador para que a prova em andamento possa
 *  usar o bloqueador de navegação, que só existe em data router. */
function Raiz() {
  return (
    <ProvedorTema>
      <ProvedorProvaEmAndamento>
        <Layout />
      </ProvedorProvaEmAndamento>
    </ProvedorTema>
  );
}

const roteador = createBrowserRouter([
  {
    element: <Raiz />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "atividades", element: <AtividadesPage /> },
      { path: "atividades/:curso", element: <AtividadePage /> },

      {
        path: "ingles",
        element: <IngresHubPage />,
        children: [
          { index: true, element: <IngresAtividadesPage /> },
          { path: "atividades", element: <IngresAtividadesPage /> },
          { path: "provas", element: <IngresProvasPage /> },
        ],
      },
      { path: "ingles/atividades/:slug", element: <IngresAtividadePage /> },

      { path: "provas", element: <ProvasPage /> },
      { path: "provas/quiz/:categoria/:prova", element: <QuizPage /> },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={roteador} />;
}
