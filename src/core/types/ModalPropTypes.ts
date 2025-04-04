import React from "react";

type ModalPropTypes = {
    variant: 'form' | 'warning' | 'error' | 'success',
    title: string,
    body?: React.ReactNode,
    footer?: React.ReactNode,
    isOpen: boolean,
    onOpenChange: () => void,
    onOpen?: boolean
}

export default ModalPropTypes;