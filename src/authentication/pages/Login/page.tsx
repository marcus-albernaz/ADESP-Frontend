import Header from "@/authentication/components/layout/Header";
import { useState } from "react";
import Footer from "@/authentication/components/layout/Footer";
import banner from "/Banner_Principal.png";
import { Input } from "@heroui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { Button } from "@heroui/button";
import AppModal from "@/core/components/AppModal";
import { useDisclosure } from "@heroui/modal";
import {Alert} from "@heroui/alert";
import { useForm } from "react-hook-form"
import { LoginRequest } from "@/authentication/types";
import { useAuth } from "@/authentication/contexts/AuthContext";



export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState('password');
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] = useState(false);
  const [ error, setError ] = useState({title: "", message: ""});

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const { register, handleSubmit } = useForm<LoginRequest>();
  const authentication = useAuth();

  const handleErrorMessages = (message: string) => {
    setError({title: "Algo deu errado!", message: message})
    setInvalidCredentialsMessage(true);
  }

  const onLoginSubmit = (data: LoginRequest) => {
    authentication?.login(data, handleErrorMessages);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
    passwordFieldType === 'password' ? setPasswordFieldType('text') : setPasswordFieldType('password')
  }

  return (
    <div className="flex flex-col min-h-screen relative bg-[#2B1E49]">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-2xl">
          <div className="flex justify-center mb-6">
            <img
              src={banner}
              alt="Banner do Evento"
              className="w-full h-auto object-contain sm:w-3/4 md:w-full"
            />
          </div>
          <form id="loginform" className="flex flex-col gap-4" onSubmit={handleSubmit(onLoginSubmit)}>
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
                  maxLength={64}
                  {...register('login')}
                />
                <Input
                  label="Senha"
                  placeholder="Digite aqui..."
                  type={passwordFieldType}
                  variant="flat"
                  size="sm"
                  radius="none"
                  color="default"
                  isRequired
                  {...register('password')}
                  endContent={
                    <button onClick={togglePassword} type="button">
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

            <Button
              type="submit"
              className="w-full bg-[#FD0078] text-white"
              radius='none'
              size='md'
              form="loginform"
            >
              Entrar
            </Button>
            <Alert
              hideIconWrapper
              color='danger'
              description={error.message}
              title='Algo deu errado!'
              variant='faded'
              isVisible={invalidCredentialsMessage}
            />
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
        />

      </div>
      
      

   



            


           
      <Footer />
    </div>
  );
}
