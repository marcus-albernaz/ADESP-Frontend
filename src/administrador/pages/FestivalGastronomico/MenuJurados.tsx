import { useState } from "react";
import Header from "../../components/Header";
import returnIcon from "../../assets/return.png";
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
import ConvidarIcone from "../../assets/convidarIco.png";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ConvidarJuradoModal from "../../components/GerenciarJurados/ConvidarJuradoModal"; // Modal para convidar jurado
import DesativarJuradoModal from "../../components/GerenciarJurados/DesativarJuradoModal"; // Modal para desativar jurado

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
      setJurados(atualizados);
      setIsDesativarModalOpen(false);
      setJuradoParaDesativar(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col items-center py-6 px-5">
        <div className="w-full max-w-4xl">
          {/* Título e botão de voltar */}
          <motion.div className="flex items-center gap-3 mb-2" {...fadeUpTitle}>
            <img
              src={returnIcon}
              alt="Voltar"
              className="w-8 h-8 cursor-pointer"
              onClick={() => window.history.back()}
            />
            <h1 className="text-3xl font-bold text-[#fee9c9] font-title">
              Gerenciamento de Jurados
            </h1>
          </motion.div>

          <div className="flex justify-start mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-[#fb844a]"
            >
              <img src={ConvidarIcone} alt="ico" />
              Convidar Jurado
            </button>
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
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <Table aria-label="Tabela de Jurados">
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Especialidade</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>

              <TableBody emptyContent="Nenhum jurado cadastrado ainda.">
                {jurados.map((jurado) => (
                  <TableRow key={jurado.id}>
                    <TableCell>{jurado.nome}</TableCell>
                    <TableCell>{jurado.especialidade}</TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${jurado.status === "Ativo" ? "text-green-500" : "text-red-500"
                          }`}
                      >
                        {jurado.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => alternarStatus(jurado.id)}
                        className={`p-2 rounded-full transition-colors duration-300 ${jurado.status === "Ativo"
                          ? "text-red-500 hover:bg-red-100"
                          : "text-green-500 hover:bg-green-100"
                          }`}
                        title={`${jurado.status === "Ativo" ? "Desativar" : "Ativar"} jurado`}
                      >
                        {jurado.status === "Ativo" ? (
                          <XMarkIcon className="h-7 w-7" />
                        ) : (
                          <CheckIcon className="h-7 w-7" />
                        )}
                      </button>
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
