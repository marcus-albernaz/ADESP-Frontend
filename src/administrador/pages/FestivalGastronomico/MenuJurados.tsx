import { useState } from "react";
import Header from "../../components/Header";
import { motion } from "framer-motion";
import { fadeUpTitle } from "../../../core/animations/cardVariants";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { PowerIcon, UserPlusIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import ConvidarJuradoModal from "../../components/GerenciarJurados/ConvidarJuradoModal"; // Modal para convidar jurado
import DesativarJuradoModal from "../../components/GerenciarJurados/DesativarJuradoModal"; // Modal para desativar jurado
import { Button } from "@heroui/button";
import { useUser } from "../../context/UserContext";
import PermissaoNegada from "../../components/PermissaoNegada"

const juradosIniciais = [
  {
    id: "1",
    nome: "Mariana Souza",
    especialidade: "Culinária Brasileira",
    status: "Inativo",
  },
  {
    id: "2",
    nome: "Carlos Lima",
    especialidade: "Culinária Mexicana",
    status: "Inativo",
  },
  {
    id: "3",
    nome: "Felipe Oliveira",
    especialidade: "Culinária Italiana",
    status: "Ativo",
  },
  {
    id: "4",
    nome: "Patrícia Costa",
    especialidade: "Culinária Vegetariana",
    status: "Ativo",
  },
];

export default function MenuJurados() {
  const [jurados, setJurados] = useState(juradosIniciais);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesativarModalOpen, setIsDesativarModalOpen] = useState(false); // Estado para controlar a modal de desativação
  const [juradoParaDesativar, setJuradoParaDesativar] = useState<string | null>(null); // ID do jurado a ser desativado
  const { userRole } = useUser();

  const isJurado = userRole === "jurado";

  const alternarStatus = (id: string) => {
    const jurado = jurados.find((j) => j.id === id);
    if (jurado?.status === "Ativo") {
      setJuradoParaDesativar(id); // Quando o status for "Ativo", abre a modal de desativação
      setIsDesativarModalOpen(true);
    } else {
      const atualizados = jurados.map((j) =>
        j.id === id
          ? { ...j, status: j.status === "Ativo" ? "Inativo" : "Ativo" }
          : j
      );
      setJurados(atualizados);
    }
  };

  const handleConfirmarDesativacao = () => {
    if (juradoParaDesativar) {
      const atualizados = jurados.map((j) =>
        j.id === juradoParaDesativar
          ? { ...j, status: "Inativo" }
          : j
      );

      console.log("Jurado desativado:", juradoParaDesativar);
      console.log("Novo estado:", atualizados);

      setJurados(atualizados);
      setIsDesativarModalOpen(false);
      setJuradoParaDesativar(null);
    }
  };

  if (isJurado) {
    return <PermissaoNegada onVoltar={() => window.history.back()} />;
  }


  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col items-center py-6 px-5">
        <div className="w-full max-w-4xl">
          {/* Título e botão de voltar */}
          <motion.div className="flex items-center gap-3 mb-4" {...fadeUpTitle}>
          <Button
              onClick={() => window.history.back()}
              className="bg-[#FB844A] rounded-md px-1.5 py-0.5 text-white text-sm flex items-center w-10 min-w-0"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>

            <h1 className="text-3xl font-bold text-[#fee9c9] font-title">
              Jurados - Gastronômico
            </h1>
          </motion.div>

          <div className="flex justify-start mb-4">
          <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-base font-semibold bg-[#fb844a]"
            >
              <UserPlusIcon className="w-6 h-6" />
              Convidar Jurado
            </Button>
            <ConvidarJuradoModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}  // Passa diretamente a função para fechar o modal
              onSend={(email) => {
                // Lógica para enviar o e-mail, se necessário
                setIsModalOpen(false); // Fechar o modal após o envio
              }}
            />
          </div>

          {/* Tabela */}
          <div className="bg-white rounded-xl">
          <Table aria-label="Tabela de Jurados" className="text-sm md:text-base min-w-full">
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>

              <TableBody emptyContent="Nenhum jurado cadastrado ainda.">
                {jurados.map((jurado) => (
                  <TableRow key={jurado.id} className="hover:bg-gray-100 transition">
                    <TableCell className="py-4">{jurado.nome}</TableCell>
                    <TableCell className="py-4">
                      <span className={`font-bold ${jurado.status === "Ativo" ? "text-green-500" : "text-red-500"}`}>
                        {jurado.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      <Button
                        onClick={() => alternarStatus(jurado.id)}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300 ${jurado.status === "Ativo"
                          ? "bg-[#12a489]"
                          : "bg-[#fa0132]"
                        }`}
                        title={`${jurado.status === "Ativo" ? "Desativar" : "Ativar"} jurado`}
                      >
                        <PowerIcon className="h-6 w-6 text-black" />
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal de desativação de jurado */}
      <DesativarJuradoModal
        isOpen={isDesativarModalOpen}
        onOpenChange={() => setIsDesativarModalOpen}
        onClose={() => setIsDesativarModalOpen(false)}
        onConfirm={handleConfirmarDesativacao}
      />
    </div>
  );
}
