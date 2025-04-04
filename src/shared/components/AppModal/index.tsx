import ModalPropTypes from "@/shared/types/ModalPropTypes";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";

export default function AppModal({ variant, isOpen, onOpenChange, onOpen, title, body, footer }: ModalPropTypes){

    if(variant === 'form'){
        return (
            <Modal isOpen={isOpen} placement='center' onOpenChange={onOpenChange}>
                <ModalContent>
                    {
                        (onClose) => (
                            <>
                                <ModalHeader>{ title }</ModalHeader>
                                <ModalBody>
                                    <form name="modal-form">
                                        { body }
                                    </form>
                                </ModalBody>
                                <ModalFooter>
                                <div className="w-full flex justify-center items-center gap-4">
                                    <Button className="w-full bg-[#43B7A3] text-white" size='md' radius='sm' variant='solid' type='submit' form='modal-form'>Salvar</Button>
                                    <Button className="w-full" size='md' radius='sm' variant='solid' onPress={onClose}>Cancelar</Button>
                                </div>
                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        )
    }
    
}