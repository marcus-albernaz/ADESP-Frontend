import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./authentication/pages/Login";
import AuthProvider from "./authentication/contexts/AuthContext";
import SignUpPage from "./authentication/pages/SignUp";
import Access from "./voting/pages/Access";
import Voting from "./voting/pages/Voting";
import Final from "./voting/pages/Final";
import Menu from "./administrador/pages/menuPrincipal";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rotas públicas sem proteção */}
        <Route path="auth" element={<Outlet />}>
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>

        {/* Todas as rotas agora acessíveis sem autenticação */}
        <Route path="/" element={<Outlet />}>
          <Route index element={<Navigate to="/vote/access" />} />
          <Route path="vote">
            <Route path="access" element={<Access />} />
            <Route path="voting" element={<Voting />} />
            <Route path="final" element={<Final />} />
          </Route>

          <Route path="admin">
            <Route path="menu" element={<Menu />} />
          </Route>
        </Route>

        {/* Rota fallback */}
        <Route path="*" element={<Navigate to="/auth/signin" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
