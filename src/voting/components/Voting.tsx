import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Descrition } from "../components/Descrition";
import "../styles/range.css";
import returnImg from "../assets/return.png";
import { VoteScreenPropTypes } from "../types/ScreensPropTypes";
import { Button } from "@heroui/button";
import { ChevronLeft } from "lucide-react";

const VALOR_INICIAL = 5.0;

function RatingInput({
  label,
  initialValue,
  onChange,
}: {
  label: string;
  initialValue: number;
  onChange: (value: number) => void;
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

export default function Voting({ onNavigate, formRegister, submitHandler }: VoteScreenPropTypes) {
  const navigate = useNavigate();

  const lugar = "Restaurante Araguaia";
  const prato = "Lasanha";
  const categoria = 1;

  const perguntasPorCategoria: Record<number, string[]> = {
    1: ["Sabor", "Temperatura", "Apresentação", "Harmonia"],
    2: ["Melodia", "Ritmo", "Cantor", "Originalidade"],
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
    console.log("Notas enviadas:", notas);
    navigate("/vote/final");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#2B1E49] font-sans">
      <Header />

      <main className="flex flex-col items-center gap-4 px-4 py-10 sm:py-12 md:py-16 lg:py-20 bg-[#2B1E49] flex-grow w-full">
        {/* Cabeçalho com botão de voltar */}
        <div className="w-full max-w-2xl flex items-center justify-between">
          <div className="flex items-center gap-3 mt-3 w-full justify-start max-w-2xl mb-4">
            <Button
              className="bg-[#FB844A]"
              size="md"
              radius="sm"
              isIconOnly
            >
              <ChevronLeft color="white"/>
            </Button>
            <h1 className="text-3xl sm:text-4xl font-title font-bold text-[#FEE9C9]">
              Voto
            </h1>
          </div>
        </div>

        {/* Informações do voto */}
        <div className="flex flex-col justify-center items-center w-full max-w-2xl">
          <h3 className="sm:text-lg font-body font-normal text-sm w-fit text-white">
            Você está votando em:
          </h3>
          <div className="bg-[#7828C8] pl-4 pr-4 w-fit rounded-xl">
            <p className="text-white font-body font-light">Lasanha • Restaurante Araguaia</p>
          </div>
        </div>

        {/* Formulário de notas */}
        <section className="w-full max-w-2xl bg-[#3A2D5D] p-6 rounded-2xl shadow-xl space-y-8">
          {criterios.map((criterio, index) => (
            <RatingInput
              key={index}
              label={criterio}
              initialValue={VALOR_INICIAL}
              onChange={(value) => handleNotaChange(index, value)}
            />
          ))}

          <button
            onClick={handleSubmit}
            disabled={!todosForamAlterados}
            className={`w-full py-3 text-lg font-semibold text-white rounded-xl transition-all duration-300 ${todosForamAlterados
                ? "bg-[#FB844A] hover:bg-[#D16E3E] animate-pulse"
                : "bg-[#2B1E49] opacity-50 cursor-not-allowed"
              }`}
          >
            Enviar Voto
          </button>

        </section>
      </main>
    </div>
  );
}