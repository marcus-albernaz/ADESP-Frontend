import { useState } from "react";
import Header from "@/votationScreen/components/Header";
import { Descrition } from "@/votationScreen/components/Descrition";

export default function Votation() {
  const lugar = "Restaurante Araguaia";
  const prato = "Lasanha";
  const categoric = 2;

  const questionsByCategory: Record<number, string[]> = {
    1: ["Sabor", "Temperatura", "Apresentação", "Harmonia"],
    2: ["Melodia", "Ritmo", "Cantor", "Originalidade"]
  };

  const criterios = questionsByCategory[categoric] || [];

  // Armazena notas por critério
  const [notas, setNotas] = useState<Record<string, number>>({});

  const handleSelecionarNota = (criterio: string, nota: number) => {
    setNotas((prev) => ({ ...prev, [criterio]: nota }));
  };

  const renderBotoesNota = (criterio: string) => {
    const botoes = [];
    for (let i = 5; i <= 10; i += 0.5) {
      const valor = parseFloat(i.toFixed(1));
      const selecionado = notas[criterio] === valor;
      botoes.push(
        <button
          key={valor}
          onClick={() => handleSelecionarNota(criterio, valor)}
          className={`rounded-full px-4 py-2 m-1 text-sm font-semibold transition ${
            selecionado
              ? "bg-yellow-400 text-black shadow-md"
              : "bg-white text-gray-700 hover:bg-yellow-100"
          }`}
        >
          {valor}
        </button>
      );
    }
    return botoes;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#2B1E49] font-sans">
      <Header />

      <main className="flex flex-col items-center px-4 py-8 sm:py-10 md:py-12 bg-[#2B1E49] flex-grow w-full">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 text-center">
          Voto
        </h1>

        <section className="w-full max-w-2xl text-white text-center mb-8">
          <h3 className="text-base sm:text-lg font-light mb-2">
            Você está votando em:
          </h3>
          <Descrition owner={lugar} desc={prato} className="text-white" />
        </section>

        <section className="w-full max-w-2xl space-y-6">
          {criterios.map((criterio) => (
            <div key={criterio} className="text-white">
              <h2 className="text-lg font-semibold mb-2">{criterio}</h2>
              <div className="flex flex-wrap justify-center">
                {renderBotoesNota(criterio)}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
