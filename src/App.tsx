import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LoginPage from "./authentication/pages/Login";
import AuthProvider, { useAuth } from "./authentication/contexts/AuthContext";
import SignUpPage from "./authentication/pages/SignUp";
import Access from "./voting/pages/Access";
import Voting from "./voting/pages/Voting";
import Final from "./voting/pages/Final";

const ProtectedRoute = () => {
  const credentials = useAuth();

  if (credentials?.accessToken) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
}

const PrivateRoute = () => {
  const authenticated = useAuth();
  
  if(!authenticated?.accessToken) return <Navigate to="/auth/signin" replace/>

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
          <Route path="signup" element={<SignUpPage />}></Route>
        </Route>
        <Route path='/' element={<PrivateRoute />}>
        </Route>
        <Route path="vote">
          <Route path="access" element={<Access />} />
          <Route path="voting" element={<Voting />} />
          <Route path="final" element={<Final />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
