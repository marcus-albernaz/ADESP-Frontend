import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./authentication/pages/Login";
import AuthProvider, { useAuth } from "./authentication/contexts/AuthContext";
import SignUpPage from "./authentication/pages/SignUp";
import Access from "./voting/components/Access";
import Voting from "./voting/components/Voting";
import Final from "./voting/components/Final";
import Menu from "./Admin/page";

const ProtectedRoute = () => {
  const credentials = useAuth();

  if (credentials?.accessToken) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

const PrivateRoute = () => {
  const authenticated = useAuth();

  if (!authenticated?.accessToken) return <Navigate to="/auth/signin" replace />;

  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* Rotas públicas */}
        <Route path="auth" element={<ProtectedRoute />}>
          <Route path="signin" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>

        {/* Rotas privadas (usuário autenticado) */}
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Navigate to="/vote/access" />} />
          <Route path="vote">
            <Route path="access" element={<Access />} />
            <Route path="voting" element={<Voting />} />
            <Route path="final" element={<Final />} />
          </Route>

          {/* Rotas de administrador */}
          <Route path="admin">
            <Route path="menu" element={<Menu />} />
            {/* Aqui você pode adicionar outras telas de admin */}
          </Route>
        </Route>

        {/* Rota fallback */}
        <Route path="*" element={<Navigate to="/auth/signin" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
