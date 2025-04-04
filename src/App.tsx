import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./authentication/pages/Login/page";
import AuthProvider, { useAuth } from "./authentication/contexts/AuthContext";

const ProtectedRoute = () => {
  const credentials = useAuth();

  if (credentials?.accessToken) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}

const PrivateRoute = () => {
  const authenticated = useAuth();
  
  if(!authenticated) return <Navigate to="/login" replace/>

  return (
    <Outlet/>
  )
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='auth' element={<ProtectedRoute />}>
          <Route path='signin' element={<LoginPage />}></Route>
        </Route>
        <Route path='auth' element={<PrivateRoute />}>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
