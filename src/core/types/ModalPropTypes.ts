import React from "react";

type ModalPropTypes = {
    variant: 'form' | 'warning' | 'error' | 'success',
    title: string,
    message?: string,
    body?: React.ReactNode,
    footer?: React.ReactNode,
    isFormSubmitLoading: boolean,
    onClose?: () => void,
    isOpen: boolean,
    onOpenChange: () => void,
    modalAction?: () => any,
    buttonText?: string
}

export default ModalPropTypes;