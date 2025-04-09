import AppModal from "@/core/components/AppModal";
import { Alert } from "@heroui/alert";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RecoveryFormPropTypes, RecoveryRequest } from "../types";
import festivalApi from "@/core/api/api";
import axios from "axios";

export default function RecoveryForm({
  isOpen,
  onOpenChange,
  onClose,
}: RecoveryFormPropTypes) {
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSuccessAlertOpen, setSuccessAlertOpen] = useState(false);
  const [isRecoveryAlertOpen, setRecoveryAlertOpen] = useState(false);
  const { register, handleSubmit } = useForm<RecoveryRequest>();

  useEffect(() => {
    setTimeout(() => {
      setRecoveryAlertOpen(false);
      setSuccessAlertOpen(false);
    }, 5000);
  }, [isRecoveryAlertOpen, isSuccessAlertOpen]);

  const onRecoverySubmit = async (data: RecoveryRequest) => {
    try {
      setSubmitButtonLoading(true);
      const response = await festivalApi.post(
        "/v1/auth/request-recovery",
        data
      );
      setSubmitButtonLoading(false);
      onClose();
      setSuccessMessage(response.data.message);
      setSuccessAlertOpen(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        onClose();
        setSubmitButtonLoading(false);
        setErrorMessage(err.response?.data.errors[0]);
        setRecoveryAlertOpen(true);
      }
    }
  };

  return (
    <>
      <AppModal
        variant="form"
        title="Recuperação de Senha"
        body={
          <>
            <form
              id="modal-form"
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onRecoverySubmit)}
            >
              <p>
                No campo abaixo, determine o e-mail para o qual será enviado o
                link de recuperação.
              </p>
              <Input
                label="E-mail"
                placeholder="Digite aqui..."
                type="text"
                variant="flat"
                size="sm"
                radius="none"
                color="default"
                isRequired
                {...register("email")}
              />
            </form>
          </>
        }
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isFormSubmitLoading={submitButtonLoading}
        onClose={onClose}
      />
      <Alert
        className="mt-4"
        hideIconWrapper
        color="danger"
        description={errorMessage}
        title="Algo deu errado!"
        variant="faded"
        isVisible={isRecoveryAlertOpen}
        isClosable
      />
      <Alert
        className="mt-4"
        hideIconWrapper
        color="success"
        description={successMessage}
        title="E-mail de Recuperação Enviado!"
        variant="faded"
        isVisible={isSuccessAlertOpen}
        isClosable
      />
    </>
  );
}
