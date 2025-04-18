import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Descrition } from "../components/Descrition";
import { VoteScreenPropTypes } from "../types";
import { Button, Slider } from '@heroui/react'; // Importando o Slider do HeroUI
import { UseFormRegisterReturn } from "react-hook-form";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion"; // Importando motion do framer-motion

const VALOR_INICIAL = 0;

function RatingInput({
  label,
  initialValue,
  onChange,
  formRegister,
}: {
  label: string;
  initialValue: number;
  onChange: (value: number) => void;
  formRegister: UseFormRegisterReturn<string>;
}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full mb-6">
      {/* Nome do critério e caixinha de valor */}
      <div className="flex items-center justify-between mb-2">
        <label className="block text-black font-semibold">{label}</label>
        {/* Caixinha de valor */}
        <div className="p-2 bg-[#FB844A] text-white rounded-md w-16 text-center">
          {value.toFixed(2)}
        </div>
      </div>

      {/* Slider */}
      <Slider
        value={value}
        minValue={0}
        maxValue={10}
        step={0.01}
        onChange={handleChange}
        className="w-full"
        aria-label={label} // ✅ Aqui está a solução!
      />
    </div>
  );
}

export default function Voting({ onNavigate, formRegister, submitHandler }: VoteScreenPropTypes) {
  const navigate = useNavigate();

  const lugar = "Restaurante Araguaia";
  const prato = "Lasanha";
  const categoria = 1;

  const perguntasPorCategoria: Record<number, string[]> = {
    1: ["Sabor", "Criatividade", "Apresentação do prato", "Originalidade", "Atendimento"],
    2: ["Composição", "Melodia", "Interpretação", "Conjunto da Obra"]
  };

  const criterios = perguntasPorCategoria[categoria] || [];

  const [notas, setNotas] = useState<number[]>(Array(criterios.length).fill(VALOR_INICIAL));
  const [alterados, setAlterados] = useState<boolean[]>(Array(criterios.length).fill(false));

  const handleNotaChange = (index: number, value: number) => {
    const novasNotas = [...notas];
    novasNotas[index] = value;
    setNotas(novasNotas);

    const novosAlterados = [...alterados];
    novosAlterados[index] = true;
    setAlterados(novosAlterados);
  };

  const todosForamAlterados = alterados.every(Boolean);

  const handleSubmit = () => {
    const resultados = criterios.map((criterio, index) => ({
      criterio,
      nota: notas[index].toFixed(2),
    }));
  
    console.table(resultados);
  
    {/*submitHandler();*/}
    navigate("/voting/final");
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-[#2b1e49] font-sans">
      <main className="flex flex-col items-center px-4 py-7 sm:py-12 md:py-16 lg:py-20 flex-grow w-full">
        <div className="w-full max-w-2xl flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 mt-3 w-full justify-start max-w-2xl mb-3">
            <Button
              onClick={() => window.history.back()}
              className="bg-[#FB844A] rounded-md px-1.5 py-0.5 text-white text-sm flex items-center w-10 min-w-0"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>
            <h1 className="text-4xl font-bold text-[#fee9c9] font-title">Votação</h1>
          </div>
          <div className="w-1/5"></div>
        </div>

        <section className="w-full text-center mb-3">
          <motion.h3
            className="text-[#ffffff] text-xl font-light mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Você está votando em:
          </motion.h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Descrition
              owner={lugar}
              desc={prato}
              className="w-full max-w-2xl py-0.5 rounded-md text-white text-lg font-semibold bg-[#7728c7] mx-auto"
            />
          </motion.div>
        </section>

        <section className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-xl space-y-8">
          {criterios.map((criterio, index) => (
            <motion.div
              key={criterio}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <RatingInput
                label={criterio}
                initialValue={VALOR_INICIAL}
                onChange={(value) => handleNotaChange(index, value)}
                formRegister={formRegister(criterio.toLowerCase() as any)}
              />
            </motion.div>
          ))}
        </section>

        {todosForamAlterados && (
          <motion.p
            className="text-sm text-white text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Atenção! Esse voto não poderá ser editado após envio.
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={!todosForamAlterados}
            className={`w-full py-7 text-lg font-semibold text-black rounded-xl mt-5 ${!todosForamAlterados
              ? "bg-[#DEDEDE] cursor-not-allowed opacity-60"
              : "bg-[#fb844a] animate-pulse"
              }`}
          >
            {!todosForamAlterados ? "Preencha todos os quesitos" : "Enviar Voto"}
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
