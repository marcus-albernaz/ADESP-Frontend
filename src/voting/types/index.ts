import { AxiosResponse } from "axios"
import { UseFormRegister } from "react-hook-form"

export type VoteRequest = {
    name: string,
    cpf: string,
    contactNumber: string,
    presentation: number,
    treatment: number,
    creativity: number,
    originality: number,
    flavor: number,
    votingToken: string | null
}

export type AccessScreenPropTypes = {
    onNavigate: (screen: string) => void,
    formRegister: UseFormRegister<VoteRequest>,
}

export type VoteScreenPropTypes = {
    votingResponse: AxiosResponse<any, any> | undefined,
    onNavigate: (screen: string) => void,
    formRegister: UseFormRegister<VoteRequest>,
    submitHandler: () => void,
    restaurantName: string,
    dishName: string
}