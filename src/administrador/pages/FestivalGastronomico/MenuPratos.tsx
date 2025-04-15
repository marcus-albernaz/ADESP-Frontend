import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import edit from "../../assets/edit.png"
import plus from "../../assets/plus.png"
import view from "../../assets/view.png";
import { useUser } from "../../context/UserContext";

const pratosIniciais = [
  {
    id: "1",
    nome: "Feijoada",
    status: "Ativo",
  },
  {
    id: "2",
    nome: "Pizza Margherita",
    status: "Inativo",
  },
  {
    id: "3",
    nome: "Sushi de Salmão",
    status: "Ativo",
  },
  {
    id: "4",
    nome: "Café com Bolo",
    status: "Inativo",
  },
];

export default function MenuPratos() {
  const navigate = useNavigate(); // Hook para navegação
  const [pratos, setPratos] = useState(pratosIniciais);
  const [isDesativarModalOpen, setIsDesativarModalOpen] = useState(false);
  const [pratoParaDesativar, setPratoParaDesativar] = useState<string | null>(null);
  const { userRole } = useUser();

  const alternarStatus = (id: string) => {
    const prato = pratos.find((p) => p.id === id);
    if (prato?.status === "Ativo") {
      setPratoParaDesativar(id);
      setIsDesativarModalOpen(true);
    } else {
      const atualizados = pratos.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Ativo" ? "Inativo" : "Ativo" }
          : p
      );
      setPratos(atualizados);
    }
  };

  const handleConfirmarDesativacao = () => {
    if (pratoParaDesativar) {
      const atualizados = pratos.map((p) =>
        p.id === pratoParaDesativar
          ? { ...p, status: "Inativo" }
          : p
      );
      setPratos(atualizados);
      setIsDesativarModalOpen(false);
      setPratoParaDesativar(null);
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
              Pratos
            </h1>
          </motion.div>

          {userRole !== "jurado" && (
            <div className="flex justify-start mb-6">
              <button
                onClick={() => navigate("/admin/menuAdicionarPrato")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-[#fb844a]"
              >
                <img src={plus} alt="ico" />
                Adicionar Prato
              </button>
            </div>
          )}


          {/* Tabela */}
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <Table aria-label="Tabela de Pratos">
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>

              <TableBody emptyContent="Nenhum prato cadastrado ainda.">
                {pratos.map((prato) => (
                  <TableRow key={prato.id}>
                    <TableCell>{prato.nome}</TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${prato.status === "Ativo" ? "text-green-500" : "text-red-500"
                          }`}
                      >
                        {prato.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <img
                        src={userRole === "jurado" ? view : edit}
                        alt={userRole === "jurado" ? "Visualizar" : "Editar"}
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => navigate("/admin/menuAdicionarPrato")}
                        title={`${userRole === "jurado" ? "Visualizar" : "Editar"} prato ${prato.nome}`}
                      />
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
