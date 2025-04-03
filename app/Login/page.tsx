'use client';

import { useState } from 'react';
import ForgotPassword from '@/components/layout/ForgotPassword';
import { SuccessMessage, ErrorMessage } from '@/components/layout/showMessages';
import InactiveUserMessage from '@/components/layout/invalidUser';
import Rodape from '@/components/layout/Footer'
import Header from '@/components/layout/hearder'
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showInactiveMessage, setShowInactiveMessage] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const handleForgotPassword = () => setShowForgotPassword(true);
  const handleCancelForgotPassword = () => setShowForgotPassword(false);
  const handleAcknowledged = () => setShowForgotPassword(false);
  const router = useRouter();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const isValidLogin = Math.random() > 0.5;

    if (isValidLogin) {
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
      setShowSuccessMessage(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header/>
      <div className="flex-grow flex items-center justify-center bg-[#2A1E48]">
        <div className="w-full max-w-md p-8 rounded-2xl">
          {showForgotPassword ? (
            <ForgotPassword onCancel={handleCancelForgotPassword} onAcknowledged={handleAcknowledged} />
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <img src="img/Banner_Principal.png" alt="Banner do Evento" className="w-full h-auto object-contain sm:w-3/4 md:w-full" />
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium text-gray-50">Email</label>
                  <input type="email" className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-500 bg-white text-black placeholder-gray-700" placeholder="Digite seu email" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-50">Senha</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-500 bg-white text-black placeholder-gray-700" placeholder="Digite sua senha" required />
                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700" onClick={togglePassword}>
                    </button>
                  </div>
                </div>
                <div className="flex justify-end text-sm text-indigo-400">
                  <button type="button" className="hover:underline" onClick={handleForgotPassword}>
                    Esqueci minha senha!
                  </button>
                </div>
                <button type="submit" className="w-full bg-[#FD0078] text-white p-2 rounded-lg hover:bg-pink-700">
                  Entrar
                </button>

                {/* Botão para testar InactiveUserMessage */}
                <button type="button" className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 mt-2" onClick={() => setShowInactiveMessage(true)}>
                  Teste tela de Usuário Inativo
                </button>

                 {/* Botão para navegar para NewPasswordPage */}
            <button onClick={() => router.push("/NewPassword/")}
              type="button"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-2"
              
            >
              Ir para Nova Senha
            </button>
              </form>
            </>
          )}
        </div>
      </div>

      <Rodape/>

      {showSuccessMessage && <SuccessMessage message="Login realizado com sucesso!" onClose={() => setShowSuccessMessage(false)} />}
      {showErrorMessage && <ErrorMessage message="Erro ao realizar login. Tente novamente." onClose={() => setShowErrorMessage(false)} />}
      {showInactiveMessage && <InactiveUserMessage onClose={() => setShowInactiveMessage(false)} />}
    </div>
  );
}
