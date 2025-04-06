import ModalPropTypes from "@/core/types/ModalPropTypes";
import { Button, PressEvent } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";

export default function AppModal({
  isFormSubmitLoading,
  variant,
  isOpen,
  onOpenChange,
  title,
  body,
  onClose,
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
}
