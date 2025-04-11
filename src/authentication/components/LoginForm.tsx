import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Eye, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { LoginFormPropTypes, LoginRequest } from "../types";

export default function LoginForm({ openAction, onOpen }: LoginFormPropTypes) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] = useState(false);
  const [error, setError] = useState({ title: "", message: "" });
  const [isSubmitButtonLoading, setSubmitButtonLoading] = useState(false);

  const { register, handleSubmit } = useForm<LoginRequest>();
  const authentication = useAuth();

  const handleErrorMessages = (message: string) => {
    setError({ title: "Algo deu errado!", message: message });
    setInvalidCredentialsMessage(true);
  };

  const onLoginSubmit = (data: LoginRequest) => {
    setSubmitButtonLoading(true);
    authentication?.login(data, handleErrorMessages);
    setSubmitButtonLoading(false);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
    passwordFieldType === "password"
      ? setPasswordFieldType("text")
      : setPasswordFieldType("password");
  };

  return (
    <form
      id="loginform"
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onLoginSubmit)}
    >
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
            {...register("login")}
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
            {...register("password")}
            endContent={
              <button onClick={togglePassword} type="button">
                {showPassword ? <Eye /> : <EyeOffIcon />}
              </button>
            }
          />
        </div>
        <div className="flex justify-end text-sm text-[#FFEED3] font-body">
          <button type="button" className="hover:underline" onClick={() => openAction(onOpen)}>
            Esqueci minha senha!
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-pink-900 text-white font-body"
        radius="none"
        size="md"
        form="loginform"
        isLoading={isSubmitButtonLoading}
      >
        Entrar
      </Button>
      <Alert
        hideIconWrapper
        color="danger"
        description={error.message}
        title={error.title}
        variant="faded"
        isVisible={invalidCredentialsMessage}
        isClosable
        onClose={() => setInvalidCredentialsMessage(false)}
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 shadow-lg w-full max-w-sm rounded-md"
      />


    </form>
  );
}
