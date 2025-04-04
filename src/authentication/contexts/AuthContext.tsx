import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthenticationContextTypes,
  AuthenticationProviderTypes,
  LoginRequest,
  LoginResponse,
} from "../types";
import festivalApi from "@/core/api/api";
import axios, { AxiosError } from "axios";

const AuthContext = createContext<AuthenticationContextTypes | null>(null);

const AuthProvider = ({ children }: AuthenticationProviderTypes) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const navigate = useNavigate();

  const login = async (credentials: LoginRequest, callback: (message: string) => void) => {
    try {
      const response = await festivalApi.post<LoginResponse>(
        "/v1/auth/signin",
        {
          login: credentials.login,
          password: credentials.password,
        }
      );

      console.log(response.status);

      if (response.data) {
        setAccessToken(response.data.accessToken);
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/");
      }
    } catch (err) {
      if(axios.isAxiosError(err))
        callback(err.response?.data.errors[0]);
    }
  };

  const logout = async () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("auth/signin");
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
