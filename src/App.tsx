import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AuthProvider from "./authentication/contexts/AuthContext";

// Auth Pages
import LoginPage from "./authentication/pages/Login";
import SignUpPage from "./authentication/pages/SignUp";

// Voting Pages
import Access from "./voting/components/Access";
import Voting from "./voting/components/Voting";
import Final from "./voting/components/Final";

// Admin Pages
import Menu from "./administrador/pages/TelasPrincipal/menuPrincipal";
import MenuGastronomico from "./administrador/pages/TelasPrincipal/menuGastronomico";
import MenuMusical from "./administrador/pages/TelasPrincipal/menuMusical";
import MenuAdmin from "./administrador/pages/GerenciarAdmins/menuAdmin";
import MenuPratos from "./administrador/pages/FestivalGastronomico/MenuPratos"
import MenuJurados from "./administrador/pages/FestivalGastronomico/MenuJurados";
import MenuEstabelecimentos from "./administrador/pages/FestivalGastronomico/MenuEstabelecimentos";
import MenuAddEstabelecimento from "./administrador/pages/FestivalGastronomico/AdicionarEstabelecimento"
import AdicionarPrato from "./administrador/pages/FestivalGastronomico/AdicionarPrato";
import GeraQRCodes from "./voting/pages/GerarQRCode"
import { useState } from "react";
import Vote from "./voting/pages/Vote";

function App() {

  const [restaurantes] = useState([
    { id: '1', nome: 'Restaurante A' },
    { id: '2', nome: 'Restaurante B' },
    { id: '3', nome: 'Restaurante C' },
  ]);
  
  const handleGerarQRCodes = (restauranteId: string, quantidade: number) => {
    console.log(`Gerando ${quantidade} QRCodes para o restaurante ${restauranteId}`);
  };

  return (
    <AuthProvider>
      <Routes>
        {/* 🔐 Rotas públicas de autenticação */}
        <Route path="auth" element={<Outlet />}>
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>

        {/* 🌐 Rotas principais do sistema */}
        <Route path="/" element={<Outlet />}>
          {/* Redirecionamento padrão para tela de acesso à votação */}
          <Route index element={<Navigate to="/vote/access" />} />

          {/* 🗳️ Fluxo de votação */}
          <Route path="voting" element={<Outlet />}>
            <Route path="vote" element={<Vote />} />
            <Route path="final" element={<Final />} />
          </Route>

          {/* 🛠️ Painel administrativo */}
          <Route path="admin" element={<Outlet />}>
            <Route path="menuPrincipal" element={<Menu />} />
            <Route path="menuGastronomico" element={<MenuGastronomico />} />
            <Route path="menuMusical" element={<MenuMusical />} />
            <Route path="menuAdmin" element={<MenuAdmin />} />
            <Route path="menuPratos" element={<MenuPratos />} />
            <Route path="menuJurados" element={<MenuJurados />} />
            <Route path="menuEstabelecimentos" element={<MenuEstabelecimentos />} />
            <Route path="menuaddEstabelecimentos" element={<MenuAddEstabelecimento />} />
            <Route path="menuAdicionarPrato" element={<AdicionarPrato />} />
            <Route path="gerar-qrcodes" element={<GeraQRCodes restaurantes={restaurantes} onGerar={handleGerarQRCodes}/>} />
          </Route>
        </Route>

        {/* 🔁 Rota fallback (caso nenhuma rota seja encontrada) */}
        <Route path="*" element={<Navigate to="/auth/signin" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
