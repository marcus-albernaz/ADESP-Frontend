import Header from "../components/Header";
import { ArrowRight } from "lucide-react";

const panels = [
  {
    title: "Votação",
    subtitle: "Acessar zona de votação",
    color: "bg-orange-400",
  },
  {
    title: "Restaurantes",
    subtitle: "Gerenciar Restaurantes",
    color: "bg-emerald-400",
  },
  {
    title: "Pratos",
    subtitle: "Gerenciar Pratos",
    color: "bg-sky-400",
  },
  {
    title: "Jurados",
    subtitle: "Gerenciar Jurados",
    color: "bg-purple-400",
  },
  {
    title: "Relatórios",
    subtitle: "Visualizar Relatórios",
    color: "bg-rose-400",
  },
];

export default function Menu() {
  return (
    <div className="min-h-screen bg-[#2B1E49] px-4 py-6">
      <Header />
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-2xl font-bold text-white mb-6">Painel do Administrador</h1>

        <div className="flex flex-col gap-4">
          {panels.map((item, index) => (
            <div
              key={index}
              className={`${item.color} w-full rounded-2xl p-5 shadow-md hover:shadow-lg hover:scale-[1.02] transition cursor-pointer flex items-center justify-between`}
            >
              <div>
                <h2 className="text-xl font-bold text-white">{item.title}</h2>
                <p className="text-sm text-white/90">{item.subtitle}</p>
              </div>
              <ArrowRight className="text-white opacity-90" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
