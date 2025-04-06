import React from "react";

type ModalPropTypes = {
    variant: 'form' | 'warning' | 'error' | 'success',
    title: string,
    body: React.ReactNode,
    footer?: React.ReactNode,
    isOpen: boolean,
    isFormSubmitLoading: boolean,
    onClose?: () => void,
    onOpenChange: () => void,
    formAction?: () => any
}

export default ModalPropTypes;