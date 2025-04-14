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
import Menu from "./administrador/pages/menuPrincipal";
import MenuGastronomico from "./administrador/pages/menuGastronomico";
import MenuMusical from "./administrador/pages/menuMusical";
import MenuJurados from "./administrador/pages/menuJurados";
import Vote from "./voting/pages/Vote";

function App() {
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
          <Route path="vote" element={<Outlet />}>
            <Route path="access" element={<Vote/>} />
            <Route path="final" element={<Final />} />
          </Route>

          {/* 🛠️ Painel administrativo */}
          <Route path="admin" element={<Outlet />}>
            <Route path="menuPrincipal" element={<Menu />} />
            <Route path="menuGastronomico" element={<MenuGastronomico />} />
            <Route path="menuMusical" element={<MenuMusical />} />
            <Route path="menuJurados" element={<MenuJurados />} />
          </Route>
        </Route>

        {/* 🔁 Rota fallback (caso nenhuma rota seja encontrada) */}
        <Route path="*" element={<Navigate to="/auth/signin" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
