import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Descrition } from "./Descrition";
import "../styles/range.css";
import returnImg from "../assets/return.png";
import { VoteScreenPropTypes } from "../types";
import { UseFormRegisterReturn } from "react-hook-form";

const VALOR_INICIAL = 7.50;

function RatingInput({
  label,
  initialValue,
  onChange,
  formRegister
}: {
  label: string;
  initialValue: number;
  onChange: (value: number) => void;
  formRegister: UseFormRegisterReturn<string>
}) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valStr = e.target.value.replace(".", ",");

    if (valStr === "") {
      setValue(0);
      onChange(0);
      return;
    }

    const parsed = parseFloat(valStr.replace(",", "."));

    if (!isNaN(parsed)) {
      const boundedVal = Math.min(Math.max(parsed, 0), 10);
      setValue(boundedVal);
      onChange(boundedVal);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-white font-semibold mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="10"
          step="0.01"
          {...formRegister}
          value={value}
          onChange={handleChange}
          className="w-full h-2 appearance-none bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg"
        />
        <input
          type="number"
          step="0.01"
          min="0"
          max="10"
          value={value}
          onChange={handleChange}
          className="w-20 p-2 rounded-xl bg-white text-black text-center font-bold shadow-md"
        />
      </div>
    </div>
  );
}

export default function Voting({ restaurantName, dishName, votingResponse, onNavigate, formRegister, submitHandler }: VoteScreenPropTypes) {
  const navigate = useNavigate();

  const categoria = 2;

  const perguntasPorCategoria: Record<number, string[]> = {
    1: ["Sabor", "Apresentação", "Criatividade", "Originalidade", "Harmonia", "Sabor"],
    2: ["Melodia", "Ritmo", "Cantor", "Originalidade"]
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
    submitHandler();
    console.log(votingResponse?.status)
    navigate("/voting/final");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#2B1E49] font-sans">
      <Header />

      <main className="flex flex-col items-center px-4 py-10 sm:py-12 md:py-16 lg:py-20 bg-[#2B1E49] flex-grow w-full">
        {/* Cabeçalho com botão de voltar */}
        <div className="w-full max-w-2xl flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 mt-3 w-full justify-start max-w-2xl mb-4">
            <button
              onClick={() => onNavigate("initial")}
              className="hover:opacity-80"
            >
              <img
                src={returnImg}
                alt="Voltar"
                className="h-8 w-8"
              />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#FFEAC9]">
              Voto
            </h1>
          </div>

          <div className="w-1/5"></div>
        </div>

        {/* Informações do voto */}
        <section className="w-full max-w-2xl text-white text-center mb-8">
          <h3 className="text-base sm:text-lg font-light mb-1">
            Você está votando em:
          </h3>
          <Descrition owner={restaurantName} desc={dishName} className="text-white" />
        </section>

        {/* Formulário de notas */}
        <section className="w-full max-w-2xl bg-[#3A2D5D] p-6 rounded-2xl shadow-xl space-y-8">
            <RatingInput
              label={"Atendimento"}
              initialValue={VALOR_INICIAL}
              onChange={(value) => handleNotaChange(0, value)}
              formRegister={formRegister("treatment")}
            />
            <RatingInput
              label={"Apresentação"}
              initialValue={VALOR_INICIAL}
              onChange={(value) => handleNotaChange(1, value)}
              formRegister={formRegister("presentation")}
            />
            <RatingInput
              label={"Criatividade"}
              initialValue={VALOR_INICIAL}
              onChange={(value) => handleNotaChange(2, value)}
              formRegister={formRegister("creativity")}
            />
            <RatingInput
              label={"Originalidade"}
              initialValue={VALOR_INICIAL}
              onChange={(value) => handleNotaChange(3, value)}
              formRegister={formRegister("originality")}
            />
            <RatingInput
              label={"Sabor"}
              initialValue={VALOR_INICIAL}
              onChange={(value) => handleNotaChange(4, value)}
              formRegister={formRegister("flavor")}
            />
          <button
            onClick={handleSubmit}
            disabled={!todosForamAlterados}
            className={`w-full py-3 text-lg font-semibold text-white rounded-xl transition-all duration-300 ${todosForamAlterados
              ? "bg-[#FB844A] hover:bg-[#D16E3E] animate-pulse"
              : "bg-[#2B1E49] opacity-50 cursor-not-allowed"
              }`}
          >
            {todosForamAlterados ? "Enviar Voto" : "Preencha todos os quesitos"}
          </button>

        </section>
      </main>
    </div>
  );
}
