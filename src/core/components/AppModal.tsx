import ModalPropTypes from "@/core/types/ModalPropTypes";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@heroui/modal";
import { BadgeCheckIcon } from "lucide-react";

function SuccessComponent() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-[#85D4C5] w-24 h-24 rounded-2xl flex justify-center items-center">
        <BadgeCheckIcon size="4rem" color="#019B80" />
      </div>
    </div>
  );
}

export default function AppModal({
  isFormSubmitLoading,
  variant,
  isOpen,
  onOpenChange,
  title,
  body,
  onClose,
  buttonText,
  message,
  modalAction
}: ModalPropTypes) {
  if (variant === "form") {
    return (
      <>
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
          <ModalContent>
            {
              <>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>{body}</ModalBody>
                <ModalFooter>
                  <div className="w-full flex justify-center items-center gap-4">
                    <Button
                      className="w-full bg-[#43B7A3] text-white"
                      size="md"
                      radius="sm"
                      variant="solid"
                      type="submit"
                      form="modal-form"
                      isLoading={isFormSubmitLoading}
                    >
                      Salvar
                    </Button>
                    <Button
                      className="w-full"
                      size="md"
                      radius="sm"
                      variant="solid"
                      onPress={onClose}
                    >
                      Cancelar
                    </Button>
                  </div>
                </ModalFooter>
              </>
            }
          </ModalContent>
        </Modal>
      </>
    );
  }

  if (variant === "success") {
    return (
      <>
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
          <ModalContent>
            {
              <>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody className="flex justify-center items-center gap-4">
                  <SuccessComponent />
                  <p>{message}</p>
                </ModalBody>
                <ModalFooter>
                  <div className="w-full flex justify-center items-center gap-4">
                    <Button
                      className="w-full bg-[#43B7A3] text-white"
                      size="md"
                      radius="sm"
                      variant="solid"
                      type="submit"
                      form="modal-form"
                      onPress={modalAction}
                    >
                      {buttonText}
                    </Button>
                  </div>
                </ModalFooter>
              </>
            }
          </ModalContent>
        </Modal>
      </>
    );
  }
}
