'use client'; // Diretiva para renderizar no lado do cliente

import { useState } from 'react';
import ForgotPassword from '@/components/layout/ForgotPassword'; // Importando o novo componente de recuperação de senha
import { Button } from "@headlessui/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar a senha
  const [showForgotPassword, setShowForgotPassword] = useState(false); // Estado para exibir a tela de recuperação de senha

  const togglePassword = () => {
    setShowPassword(!showPassword); // Alterna o estado de mostrar/ocultar a senha
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true); // Exibe a tela de recuperação de senha
  };

  const handleCancelForgotPassword = () => {
    setShowForgotPassword(false); // Fecha a tela de recuperação de senha
  };

  const handleAcknowledged = () => {
    setShowForgotPassword(false); // Fecha a tela de recuperação e volta para a tela de login
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#FB844A] py-12 relative">
        <div className="flex justify-center">
          <img 
            src="img/Logo_Festival1.png" 
            alt="Logo da Empresa" 
            className="absolute top-[45px] w-[250px] h-auto" 
          />
        </div>
      </header>

      {/* Conteúdo Central */}
      <div className="flex-grow flex items-center justify-center" style={{ backgroundColor: '#2A1E48' }}>
        <div className="w-full max-w-md p-8 rounded-2xl">
          {/* Se o estado showForgotPassword for verdadeiro, mostra o componente ForgotPassword */}
          {showForgotPassword ? (
            <ForgotPassword onCancel={handleCancelForgotPassword} onAcknowledged={handleAcknowledged} />
          ) : (
            <>
              {/* Banner Principal */}
              <div className="flex justify-center mb-6">
                <img 
                  src="img/Banner_Principal.png" 
                  alt="Banner do Evento" 
                  className="w-full h-auto object-contain sm:w-3/4 md:w-full" 
                />
              </div>

              {/* Formulário de Login */}
              <form className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-50">Email</label>
                  <input
                    type="email"
                    className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-500 bg-white text-black placeholder-gray-700"
                    placeholder="Digite seu email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-50">Senha</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"} // Alterna entre 'text' e 'password'
                      className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-500 bg-white text-black placeholder-gray-700"
                      placeholder="Digite sua senha"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700"
                      onClick={togglePassword} // Função de alternar
                    >
                    </button>
                  </div>
                </div>
                <div className="flex justify-end text-sm text-indigo-400">
                  <button type="button" className="hover:underline" onClick={handleForgotPassword}>
                    Esqueci minha senha!
                  </button>
                </div>
                <Button className="w-full bg-[#FD0078] text-white p-2 rounded-lg hover:bg-pink-700">
                  Entrar
                </Button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#FFEED3] py-4">
        <div className="flex justify-center">
          <img 
            src="/img/Patrocinadores.png" 
            alt="Patrocinadores" 
            className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-auto object-contain" 
          />
        </div>
      </footer>
    </div>
  );
}
