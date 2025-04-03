import ForgotPassword from "@/components/layout/ForgotPassword";
import InactiveUserMessage from "@/components/layout/invalidUser";
import { SuccessMessage, ErrorMessage } from "@/components/layout/showMessages";
import Header from "@/components/layout/Header";
import { useState } from "react";
import Footer from "@/components/layout/Footer";
import banner from "../../../public/Banner_Principal.png"
import { Input } from '@heroui/input';
import { Eye, EyeClosed, EyeOffIcon } from 'lucide-react';
import { Button } from "@heroui/button";


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
  //const router = useRouter();

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
                <img src={banner} alt="Banner do Evento" className="w-full h-auto object-contain sm:w-3/4 md:w-full" />
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-4">
                    <Input
                      label='E-mail ou Nome de Usuário'
                      placeholder="Digite aqui..."
                      type="text"
                      variant='flat'
                      size='sm' radius='none'
                      color='default'
                      isRequired
                      />
                    <Input
                      label='Senha'
                      placeholder="Digite aqui..."
                      type="password"
                      variant='flat'
                      size='sm'
                      radius='none'
                      color='default'
                      isRequired
                      endContent={
                        <button
                          onClick={() => setShowPassword(!showPassword)}>
                            {
                              showPassword ? (<Eye/>) : (<EyeOffIcon/>)
                            }
                          
                        </button>
                      }/>
                  </div>
                  <div className="flex justify-end text-sm text-[#FFEED3]">
                    <button type="button" className="hover:underline" onClick={handleForgotPassword}>
                      Esqueci minha senha!
                    </button>
                </div>
                </div>
                
                
                <button type="submit" className="w-full bg-[#FD0078] text-white p-2 rounded-lg hover:bg-pink-700">
                  Entrar
                </button>

                {/* Botão para testar InactiveUserMessage */}
                <button type="button" className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 mt-2" onClick={() => setShowInactiveMessage(true)}>
                  Teste tela de Usuário Inativo
                </button>

                 {/* Botão para navegar para NewPasswordPage */}
            <button
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

      <Footer/>

      {showSuccessMessage && <SuccessMessage message="Login realizado com sucesso!" onClose={() => setShowSuccessMessage(false)} />}
      {showErrorMessage && <ErrorMessage message="Erro ao realizar login. Tente novamente." onClose={() => setShowErrorMessage(false)} />}
      {showInactiveMessage && <InactiveUserMessage onClose={() => setShowInactiveMessage(false)} />}
    </div>
  );
}
