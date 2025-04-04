import ForgotPassword from "@/authentication/components/layout/ForgotPassword";
import InactiveUserMessage from "@/authentication/components/layout/invalidUser";
import {
  SuccessMessage,
  ErrorMessage,
} from "@/authentication/components/layout/showMessages";
import Header from "@/authentication/components/layout/Header";
import { useState } from "react";
import Footer from "@/authentication/components/layout/Footer";
import banner from "/Banner_Principal.png";
import { Input } from "@heroui/input";
import { Eye, EyeClosed, EyeOffIcon } from "lucide-react";
import { Button } from "@heroui/button";
import AppModal from "@/shared/components/AppModal";
import { useDisclosure } from "@heroui/modal";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showInactiveMessage, setShowInactiveMessage] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const handleForgotPassword = () => setShowForgotPassword(!showPassword);
  const handleCancelForgotPassword = () => setShowForgotPassword(false);
  const handleAcknowledged = () => setShowForgotPassword(false);
  //const router = useRouter();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
    <div className="flex flex-col min-h-screen relative bg-[#2B1E49]">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-[#2A1E48]">
        <div className="w-full max-w-md p-8 rounded-2xl">
          <div className="flex justify-center mb-6">
            <img
              src={banner}
              alt="Banner do Evento"
              className="w-full h-auto object-contain sm:w-3/4 md:w-full"
            />
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <Input
                  label="E-mail ou Nome de Usuário"
                  placeholder="Digite aqui..."
                  type="text"
                  variant="flat"
                  size="sm"
                  radius="none"
                  color="default"
                  isRequired
                />
                <Input
                  label="Senha"
                  placeholder="Digite aqui..."
                  type="password"
                  variant="flat"
                  size="sm"
                  radius="none"
                  color="default"
                  isRequired
                  endContent={
                    <button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Eye /> : <EyeOffIcon />}
                    </button>
                  }
                />
              </div>
              <div className="flex justify-end text-sm text-[#FFEED3]">
                <button
                  type="button"
                  className="hover:underline"
                  onClick={onOpen}
                >
                  Esqueci minha senha!
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FD0078] text-white p-2 rounded-lg hover:bg-pink-700"
            >
              Entrar
            </button>
          </form>
        </div>
        <AppModal
          variant='form'
          title="Recuperação de Senha"
          body={
            <>
              <p>No campo abaixo, determine o e-mail para o qual será enviado o link de recuperação.</p>
              <Input
                label="E-mail"
                placeholder="Digite aqui..."
                type="text"
                variant="flat"
                size="sm"
                radius="none"
                color="default"
                isRequired
              />
            </>
          }
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          
        </AppModal>
      </div>

      <Footer />
      {showSuccessMessage && (
        <SuccessMessage
          message="Login realizado com sucesso!"
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
      {showErrorMessage && (
        <ErrorMessage
          message="Erro ao realizar login. Tente novamente."
          onClose={() => setShowErrorMessage(false)}
        />
      )}
      {showInactiveMessage && (
        <InactiveUserMessage onClose={() => setShowInactiveMessage(false)} />
      )}
    </div>
  );
}
