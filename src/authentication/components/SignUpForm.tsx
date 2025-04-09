import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { SignUpRequest } from "../types";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import festivalApi from "@/core/api/api";
import { useEffect, useState } from "react";
import InvalidInvite from "./InvalidInvite";
import { Eye, EyeOffIcon } from "lucide-react";
import AppModal from "@/core/components/AppModal";
import { useDisclosure } from "@heroui/modal";

export default function SignUpForm() {
  const { register, handleSubmit } = useForm<SignUpRequest>();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [confirmationPasswordFieldType, setConfirmationPasswordFieldType] =
    useState("password");
  const [isSubmitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [isInviteTokenValid, setInviteTokenValid] = useState(false);
  const [destinationEmail, setDestinationEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword,setConfirmationPassword] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleSignUpFormSubmit = async (data: SignUpRequest) => {
    setSubmitButtonLoading(true);
    data.inviteToken = searchParams.get("token");
    await festivalApi.post("/v1/auth/signup", data);
    setSubmitButtonLoading(false);
    onOpen();
  };

  const handleSignUpSuccessMessage = () => {
    onClose();
    navigate("/auth/signin");
  }

  const updatePassword = (value: string) => {
    setPassword(value);
  }

  const updateConfirmationPassword = (value: string) => {
    setConfirmationPassword(value);
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
    passwordFieldType === "password"
      ? setPasswordFieldType("text")
      : setPasswordFieldType("password");
  };

  const toggleConfirmationPassword = () => {
    setShowConfirmationPassword(!showConfirmationPassword);
    confirmationPasswordFieldType === "password"
      ? setConfirmationPasswordFieldType("text")
      : setConfirmationPasswordFieldType("password");
  };

  const handleCancelButtonClick = () => {
    navigate("/auth/signin");
  };

  useEffect(() => {
    if (searchParams.get("token") === null) {
      setInviteTokenValid(false);
    }

    festivalApi
      .get(
        `/v1/auth/signup/verify-invite?inviteToken=${searchParams.get("token")}`
      )
      .then((response) => {
        if (response.status === 200) {
          setInviteTokenValid(true);
        }

        setDestinationEmail(response.data.email);
      });
  }, []);

  if (isInviteTokenValid) {
    return (
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleSignUpFormSubmit)}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-[#FF5B0B] text-2xl font-bold font-title">Criar Conta</h1>
          <p className="text-white text-md font-body">
            Vimos que você possui um convite válido. <br />
            Preencha os campos abaixo e crie a sua conta.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            variant="flat"
            size="sm"
            radius="none"
            label="E-mail"
            defaultValue={destinationEmail}
            type="text"
            color="success"
            disabled
            isRequired
          />
          <Input
            variant="flat"
            size="sm"
            radius="none"
            label="Nome"
            placeholder="Digite aqui..."
            type="text"
            color="default"
            isRequired
            {...register("name")}
            validate={(value) => {
              if (value.length === 0) {
                return "O Nome é obrigatório.";
              }

              if (value.length < 3) {
                return "O nome precisa ter mais de 3 caracteres";
              }
            }}
          />
          <Input
            variant="flat"
            size="sm"
            radius="none"
            label="CPF (Apenas Números)"
            placeholder="Digite aqui..."
            type="text"
            color="default"
            isRequired
            {...register("cpf")}
            validate={(value) => {
              if (value.length === 0) {
                return "O CPF é obrigatório.";
              }

              if (value.length < 11 || value.length > 14) {
                return "O CPF digitado é invalido.";
              }

              if (!value.match(/[\d]{11}$/gm)) {
                return "O CPF deve conter apenas números.";
              }
            }}
            maxLength={14}
            minLength={11}
          />
          <Input
            variant="flat"
            size="sm"
            radius="none"
            label="Nome de Usuário"
            placeholder="Digite aqui..."
            type="text"
            color="default"
            isRequired
            {...register("username")}
            maxLength={24}
            minLength={3}
            validate={(value) => {
              if (value.length === 0) {
                return "O Nome de Usuário é obrigatório.";
              }

              if (value.length < 3) {
                return "O Nome de Usuário é Inválido";
              }

              if (!value.match(/^[a-zA-Z0-9_-]{0,24}$/gm)) {
                return "O Nome de Usuário não pode conter caracteres especiais.";
              }
            }}
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
            endContent={
              <button onClick={togglePassword} type="button">
                {showPassword ? <Eye /> : <EyeOffIcon />}
              </button>
            }
            validate={(value) => {
              if(!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/gm)){
                return "A Senha precisa conter ao menos uma letra maíuscula, uma minúscula e um número."
              }
            }}
            onValueChange={updatePassword}
          />
          <Input
            label="Confirmação da Senha"
            placeholder="Digite aqui..."
            type={confirmationPasswordFieldType}
            variant="flat"
            size="sm"
            radius="none"
            color="default"
            isRequired
            {...register("password")}
            endContent={
              <button onClick={toggleConfirmationPassword} type="button">
                {showConfirmationPassword ? <Eye /> : <EyeOffIcon />}
              </button>
            }
            validate={() => {
              if(!(password === confirmationPassword)){
                return "As Senhas não conferem!";
              }
            }}
            onValueChange={updateConfirmationPassword}
          />
        </div>
        <Button
          className="bg-[#FD0078] text-white font-body"
          variant="solid"
          size="md"
          radius="none"
          type="submit"
          isLoading={isSubmitButtonLoading}
        >
          Cadastrar-me
        </Button>
        <Button
          className="font-body"
          variant="solid"
          size="md"
          radius="none"
          onPress={handleCancelButtonClick}
        >
          Cancelar
        </Button>
        <AppModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          title="Sua conta foi cadastrada!"
          message="Agora você possui um acesso em nossa plataforma. Vá para a tela de login e acesse o sistema com suas credenciais."
          buttonText="Ir para a Página de Login!"
          isFormSubmitLoading={false}
          variant="success"
          modalAction={handleSignUpSuccessMessage}
        />
      </form>
    );
  }
  if (!isInviteTokenValid) {
    return <InvalidInvite />;
  }
}
