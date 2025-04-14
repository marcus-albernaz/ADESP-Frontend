import { useState } from "react"
import Access from "../components/Access";
import Voting from "../components/Voting";
import Final from "../components/Final";
import { useForm } from "react-hook-form";
import { VoteRequest } from "../types/VoteRequest";

export default function Vote(){
    const [ screen, setScreen ] = useState("initial")
    const { register, handleSubmit } = useForm<VoteRequest>();

    const handleShowScreen = (name: string) => {
        if(name === "initial"){
            setScreen(name);
        }

        if(name === "voting"){
            setScreen(name);
        }

        if(name === "final"){
            setScreen(name);
        }
    };



    if(screen === "initial"){
        return (
            <Access onNavigate={handleShowScreen} formRegister={register}/>
        );
    }

    if(screen === "voting"){
        return(
            <Voting onNavigate={handleShowScreen} formRegister={register}/>
        )
    }

    return (
        <Final/>
    )
}