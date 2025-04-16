import { useEffect, useState } from "react"
import Access from "../components/Access";
import Voting from "../components/Voting";
import Final from "../components/Final";
import { useForm } from "react-hook-form";
import { VoteRequest } from "../types";
import { useSearchParams } from "react-router-dom";
import festivalApi from "@/core/api/api";
import { AxiosResponse } from "axios";

export default function Vote(){
    const [ screen, setScreen ] = useState("initial")
    const [ restaurant, setRestaurant ] = useState("");
    const [ dish, setDish ] = useState("");
    const [ voteSumbmitResponse, setVoteSubmitResponse ] = useState<AxiosResponse<any, any>>();
    const { register, handleSubmit } = useForm<VoteRequest>();
    const [searchParams] = useSearchParams()

    useEffect(() => {
        festivalApi.get(`/v1/vote/voting-token/status?votingToken=${searchParams.get("votingToken")}`)
            .then(response => {
                if(response.status === 200){
                    setRestaurant(response.data.restaurantName);
                    setDish(response.data.dishName);
                }
            });
    }, [])

    const handleVoteSubmit = (data: VoteRequest) => {
        data.votingToken = searchParams.get("votingToken")
        console.log(data);
        festivalApi.post("/v1/voting/vote", data)
            .then(response => {
                console.log(response.status)
                setVoteSubmitResponse(response);
            });
    }

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
            <Voting votingResponse={voteSumbmitResponse} restaurantName={restaurant} dishName={dish} onNavigate={handleShowScreen} formRegister={register} submitHandler={handleSubmit(handleVoteSubmit)}/>
        )
    }

    return (
        <Final/>
    )
}