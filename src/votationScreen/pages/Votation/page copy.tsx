import { useState } from "react";
import Header from "@/votationScreen/components/Header";
import { Descrition } from "@/votationScreen/components/Descrition";

// Componente de nota com UI aprimorada
function RatingInput({
  label,
  onChange,
}: {
  label: string;
  onChange: (value: number) => void;
}) {
  const [value, setValue] = useState(5.0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 5 && val <= 10) {
      setValue(val);
      onChange(val);
    }
  };

  return (
    <div className="w-full mb-6">
      <label className="block text-white font-semibold text-left mb-2">{label}</label>

      <div className="flex items-center gap-4">
        <input
          type="range"
          min="5"
          max="10"
          step="0.1"
          value={value}
          onChange={handleChange}
          className="w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 accent-white"
        />
        <input
          type="number"
          step="0.1"
          min="5"
          max="10"
          value={value}
          onChange={handleChange}
          className="w-20 p-2 rounded bg-white text-black text-center font-semibold shadow-md"
        />
      </div>

      <p className="text-sm mt-1 text-indigo-200">
        Nota atribuída: <span className="font-bold text-white">{value.toFixed(1)}</span>
      </p>
    </div>
  );
}

export default function Votation() {
  const lugar = "Restaurante Araguaia"; // MUDAR DE ACORDO COM OS DADOS RECEBIDOS
  const prato = "Lasanha"; // MUDAR DE ACORDO COM OS DADOS RECEBIDOS
  const categoric: number = 2; // MUDAR DE ACORDO COM A CATEGORIA

  const questionsByCategory: Record<number, string[]> = {
    1: ["1-Sabor", "2-Temperatura", "3-Apresentação", "4-Harmonia"],
    2: ["1-Melodia", "2-Ritmo", "3-Cantor", "4-Originalidade"],
  };

  const criterios = questionsByCategory[categoric] || [];
  const [notas, setNotas] = useState<number[]>(Array(criterios.length).fill(5.0));

  const handleNotaChange = (index: number, value: number) => {
    const novasNotas = [...notas];
    novasNotas[index] = value;
    setNotas(novasNotas);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#2B1E49] font-sans">
      <Header />

      <main className="flex flex-col items-center px-4 py-10 sm:py-12 md:py-16 lg:py-20 bg-[#2B1E49] flex-grow w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 text-center">
          Voto
        </h1>

        <section className="w-full max-w-2xl text-white text-center mb-8">
          <h3 className="text-base sm:text-lg font-light mb-2">
            Você está votando em:
          </h3>
          <Descrition owner={lugar} desc={prato} className="text-white" />
        </section>

        <section className="w-full max-w-2xl bg-[#3A2D5D] p-6 rounded-2xl shadow-lg space-y-4">
          {criterios.map((criterio, index) => (
            <RatingInput
              key={index}
              label={criterio}
              onChange={(value) => handleNotaChange(index, value)}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
