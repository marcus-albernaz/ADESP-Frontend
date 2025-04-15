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
import ConvidarAdministradorModal from "../../components/GerenciarAdmins/ConvidarAdministradorModal";
import DesativarAdministradorModal from "../../components/GerenciarAdmins/DesativarAdministradorModal";

const administradoresIniciais = [
  {
    id: "1",
    nome: "Lucas Tavares",
    especialidade: "Culinária Brasileira",
    status: "Inativo",
  },
  {
    id: "2",
    nome: "Augusto Henrique",
    especialidade: "Culinária Italiana",
    status: "Inativo",
  },
  {
    id: "3",
    nome: "Marcus Gabriel",
    especialidade: "Culinária Italiana",
    status: "Ativo",
  },
  {
    id: "4",
    nome: "Eduardo Borges",
    especialidade: "Culinária Italiana",
    status: "Ativo",
  },
];

export default function MenuAdministradores() {
  const [administradores, setAdministradores] = useState(administradoresIniciais);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDesativarModalOpen, setIsDesativarModalOpen] = useState(false); // Estado para controlar a modal de desativação
  const [administradorParaDesativar, setAdministradorParaDesativar] = useState<string | null>(null); // ID do administrador a ser desativado

  const alternarStatus = (id: string) => {
    const administrador = administradores.find((a) => a.id === id);
    if (administrador?.status === "Ativo") {
      setAdministradorParaDesativar(id); // Quando o status for "Ativo", abre a modal de desativação
      setIsDesativarModalOpen(true);
    } else {
      const atualizados = administradores.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Ativo" ? "Inativo" : "Ativo" }
          : a
      );
      setAdministradores(atualizados);
    }
  };

  const handleConfirmarDesativacao = () => {
    if (administradorParaDesativar) {
      const atualizados = administradores.map((a) =>
        a.id === administradorParaDesativar
          ? { ...a, status: "Inativo" }
          : a
      );
      setAdministradores(atualizados);
      setIsDesativarModalOpen(false);
      setAdministradorParaDesativar(null);
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
              Gerenciamento de Administradores
            </h1>
          </motion.div>

          <div className="flex justify-start mb-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-[#fb844a]"
            >
              <img src={ConvidarIcone} alt="ico" />
              Convidar Administrador
            </button>
            <ConvidarAdministradorModal
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
            <Table aria-label="Tabela de Administradores">
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>

              <TableBody emptyContent="Nenhum administrador cadastrado ainda.">
                {administradores.map((administrador) => (
                  <TableRow key={administrador.id}>
                    <TableCell>{administrador.nome}</TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${administrador.status === "Ativo" ? "text-green-500" : "text-red-500"
                          }`}
                      >
                        {administrador.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => alternarStatus(administrador.id)}
                        className={`p-2 rounded-full transition-colors duration-300 ${administrador.status === "Ativo"
                          ? "text-red-500 hover:bg-red-100"
                          : "text-green-500 hover:bg-green-100"
                          }`}
                        title={`${administrador.status === "Ativo" ? "Desativar" : "Ativar"} administrador`}
                      >
                        {administrador.status === "Ativo" ? (
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

      {/* Modal de desativação de administrador */}
      <DesativarAdministradorModal
        isOpen={isDesativarModalOpen}
        onOpenChange={() => setIsDesativarModalOpen}
        onClose={() => setIsDesativarModalOpen(false)}
        onConfirm={handleConfirmarDesativacao}
      />
    </div>
  );
}
