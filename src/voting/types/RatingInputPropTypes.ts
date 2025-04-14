import { UseFormRegister } from "react-hook-form";
import { VoteRequest } from "./VoteRequest";

export type RatingInputPropTypes = {
    label: string,
    initialValue: number,
    formRegister: UseFormRegister<VoteRequest>,
}