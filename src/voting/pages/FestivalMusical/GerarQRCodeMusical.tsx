import { useState, Fragment } from "react";
import Header from "../../../administrador/components/Header";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useUser } from "../../../administrador/context/UserContext";
import PermissaoNegada from "../../../administrador/components/PermissaoNegada"


interface Restaurante {
    id: string;
    nome: string;
}

interface Props {
    restaurantes: Restaurante[];
    onGerar: (restauranteId: string, quantidade: number) => void;
}

export default function GeraQRCodes({ restaurantes, onGerar }: Props) {
    const [restauranteSelecionado, setRestauranteSelecionado] = useState<Restaurante | null>(null);
    const [quantidade, setQuantidade] = useState(1);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

     const { userRole } = useUser();
    
      const isJurado = userRole === "jurado";
    
      if (isJurado) {
        return <PermissaoNegada onVoltar={() => window.history.back()} />;
      }

    const handleGerar = () => {
        if (!restauranteSelecionado || quantidade <= 0) {
            setErro("Preencha todos os campos corretamente.");
            return;
        }
        setErro("");
        onGerar(restauranteSelecionado.id, quantidade);
    };

    return (
        <div className="min-h-screen bg-[#2b1e49]">
            <Header />

            <div className="flex flex-col px-5 py-6 max-w-4xl mx-auto w-full mt-20">
                <div className="flex items-center gap-3 mb-6">
                    <Button
                        onClick={() => window.history.back()}
                        className="bg-[#FB844A] rounded-md px-1.5 py-0.5 text-white text-sm flex items-center w-10 min-w-0"
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </Button>
                    <motion.h1 className="text-3xl font-bold text-[#fee9c9] font-title">
                        Gerar QRCodes - Musical
                    </motion.h1>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

                    {/* Seleção do MUSICAL */}
                    <div>
                        <label className="block text-white text-sm font-medium mb-1">Restaurante</label>
                        <Listbox value={restauranteSelecionado} onChange={(value) => {
                            setRestauranteSelecionado(value);
                            console.log(value);
                        }}>

                            <div className="relative">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white border border-gray-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-[#43b7a3] focus:border-[#43b7a3] sm:text-sm">
                                    <span className="block truncate">
                                        {restauranteSelecionado ? restauranteSelecionado.nome : "Selecione um restaurante"}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border border-gray-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                                        {restaurantes.map((restaurante) => (
                                            <Listbox.Option key={restaurante.id} value={restaurante}>
                                                {({ selected, active }) => (
                                                    <span
                                                        className={`block cursor-pointer py-2 pl-10 pr-4 ${active ? "bg-[#029c7f]/10" : "text-gray-900"}`}
                                                    >
                                                        {restaurante.nome}
                                                    </span>
                                                )}
                                            </Listbox.Option>

                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>

                    {/* Campo de quantidade */}
                    <div className="space-y-2">
                        <label className="block text-white text-sm font-medium mb-1">Quantidade</label>
                        <Input
                            type="number"
                            min={1}
                            value={quantidade.toString()} // Convertendo para string
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    {/* Mensagem de erro */}
                    {erro && (
                        <div className="text-[#fe0034] text-sm mt-2 font-semibold">
                            <p>{erro}</p>
                        </div>
                    )}

                    {/* Botões */}
                    <div className="pt-6 flex flex-col gap-3">
                        <Button
                            onClick={handleGerar}
                            className="bg-[#019b80] text-white w-full text-base py-6"
                        >
                            Gerar QRCodes
                        </Button>
                        <Button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-black w-full text-base bg-[#d4d4d8]"
                        >
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
