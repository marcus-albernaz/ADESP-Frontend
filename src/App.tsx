import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./authentication/pages/Login/page";
import AuthProvider, { useAuth } from "./authentication/contexts/AuthContext";
import Votation from "./votationScreen/pages/Votation/page";
import Access from "./votationScreen/pages/Access/page";
import Final from "./votationScreen/pages/Final/page";

const ProtectedRoute = () => {
  const credentials = useAuth();

  if (credentials?.accessToken) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}

const PrivateRoute = () => {
  const authenticated = useAuth();

  if (!authenticated) return <Navigate to="/login" replace />

  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Rota protegida para autenticação */}
        <Route path="auth" element={<ProtectedRoute />}>
          <Route path="signin" element={<LoginPage />} />
        </Route>

        {/* Rotas privadas para páginas autenticadas */}
        <Route path="votation" element={<PrivateRoute />}>
          <Route path="access" element={<Access />} />
          <Route path="votation" element={<Votation />} />
          <Route path="final" element={<Final />} />
        </Route>

        {/* Redirecionamento padrão */}
        {/*<Route path="/" element={<Navigate to="/auth/signin" />} />*/}
        <Route path="/" element={<Navigate to="/votation/access" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
