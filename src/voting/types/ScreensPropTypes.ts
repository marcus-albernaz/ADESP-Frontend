import { UseFormRegister } from "react-hook-form"
import { VoteRequest } from "./VoteRequest"

export type ScreensPropTypes = {
    onNavigate: (screen: string) => void
    formRegister: UseFormRegister<VoteRequest>
}