import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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

export default function App() {
  return (
    <ProvedorTema>
      <ProvedorProvaEmAndamento>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />

              <Route path="atividades" element={<AtividadesPage />} />
              <Route path="atividades/:curso" element={<AtividadePage />} />

              <Route path="ingles" element={<IngresHubPage />}>
                <Route index element={<IngresAtividadesPage />} />
                <Route path="atividades" element={<IngresAtividadesPage />} />
                <Route path="provas" element={<IngresProvasPage />} />
              </Route>
              <Route path="ingles/atividades/:slug" element={<IngresAtividadePage />} />

              <Route path="provas" element={<ProvasPage />} />
              <Route path="provas/quiz/:categoria/:prova" element={<QuizPage />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProvedorProvaEmAndamento>
    </ProvedorTema>
  );
}
