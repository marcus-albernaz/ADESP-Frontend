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
import ConvidarAdministradorModal from "../../components/GerenciarAdmins/ConvidarAdministradorModal";
import DesativarAdministradorModal from "../../components/GerenciarAdmins/DesativarAdministradorModal";
import { Button } from "@heroui/button";
import { useUser } from "../../context/UserContext";
import PermissaoNegada from "../../components/PermissaoNegada"

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
  const { userRole } = useUser();
  const isJurado = userRole === "jurado";

  if (isJurado) {
    return <PermissaoNegada onVoltar={() => window.history.back()} />;
  }

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
      
      console.log("Administrador desativado:", administradorParaDesativar);
      console.log("Novo estado:", atualizados);
  
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
          <motion.div className="flex items-center gap-3 mb-4" {...fadeUpTitle}>
            <Button
              onClick={() => window.history.back()}
              className="bg-[#FB844A] rounded-md px-1.5 py-0.5 text-white text-sm flex items-center w-10 min-w-0"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </Button>


            <h1 className="text-3xl font-bold text-[#fee9c9] font-title">
              Administradores
            </h1>
          </motion.div>

          <div className="flex justify-start mb-4">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-white text-base font-semibold bg-[#fb844a]"
            >
              <UserPlusIcon className="w-6 h-6" />
              Convidar Administrador
            </Button>
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
          <div className="bg-white rounded-xl">
            <Table aria-label="Tabela de Administradores" className="text-sm md:text-base min-w-full">
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>

              <TableBody emptyContent="Nenhum administrador cadastrado ainda.">
                {administradores.map((administrador) => (
                  <TableRow key={administrador.id} className="hover:bg-gray-100 transition">
                    <TableCell className="py-4">{administrador.nome}</TableCell>
                    <TableCell className="py-4">
                      <span className={`font-bold ${administrador.status === "Ativo" ? "text-green-500" : "text-red-500"}`}>
                        {administrador.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      <Button
                        onClick={() => alternarStatus(administrador.id)}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-300 ${administrador.status === "Ativo"
                            ? "bg-[#12a489]"
                            : "bg-[#fa0132]"
                          }`}
                        title={`${administrador.status === "Ativo" ? "Desativar" : "Ativar"} administrador`}
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
