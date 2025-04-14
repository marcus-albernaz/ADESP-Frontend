import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { VoteRequest } from "./VoteRequest"

export type ScreensPropTypes = {
    onNavigate: (screen: string) => void,
    formRegister: UseFormRegister<VoteRequest>,
    onSubmit?: (data: VoteRequest) => void,
    submitHandler?: () => void
}

export type VoteScreenPropTypes = {
    onNavigate: (screen: string) => void,
    formRegister: UseFormRegister<VoteRequest>,
    submitHandler: () => void
}