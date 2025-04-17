import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { ChevronLeftIcon, PlusIcon, PencilSquareIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useUser } from "../../context/UserContext";
import { Button } from "@heroui/button";

const pratosIniciais = [
  {
    id: "1",
    nome: "Feijoada",
    tipo: "Restaurante",
    status: "Ativo",
  },
  {
    id: "2",
    nome: "Pizza Margherita",
    tipo: "Restaurante",
    status: "Inativo",
  },
  {
    id: "3",
    nome: "Sushi de Salmão",
    tipo: "Similar",
    status: "Ativo",
  },
  {
    id: "4",
    nome: "Café com Bolo",
    tipo: "Similar",
    status: "Inativo",
  },
];

export default function MenuPratos() {
  const navigate = useNavigate(); // Hook para navegação
  const [pratos, setPratos] = useState(pratosIniciais);
  const { userRole } = useUser();

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
              Pratos
            </h1>
          </motion.div>

          {userRole !== "jurado" && (
            <div className="flex justify-start mb-4">
              <Button
                onClick={() => navigate("/admin/menuAdicionarPrato")}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-white font-semibold text-base font-semibold bg-[#fb844a]"
              >
                <PlusIcon className="w-6 h-6" />
                Adicionar Prato
              </Button>
            </div>
          )}


          {/* Tabela */}
          <div className="bg-white rounded-xl">
            <Table aria-label="Tabela de Pratos" className="text-sm md:text-base min-w-full">
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Tipo</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>

              <TableBody emptyContent="Nenhum prato cadastrado ainda.">
                {pratos.map((prato) => (
                  <TableRow key={prato.id} className="hover:bg-gray-100 transition">
                    <TableCell className="py-4">{prato.nome}</TableCell>
                    <TableCell className="py-4">{prato.tipo}</TableCell>
                    <TableCell className="py-4">
                      <span
                        className={`font-bold ${prato.status === "Ativo" ? "text-green-500" : "text-red-500"}`}>
                        {prato.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      <Button
                        isIconOnly
                        className="w-12 h-12 flex items-center justify-center transition-colors duration-300 bg-[#12a489]"
                        onClick={() => navigate("/admin/EditarPrato")}
                        title={`${userRole === "jurado" ? "Visualizar" : "Editar"} prato ${prato.nome}`}
                      >
                        {userRole === "jurado" ? (
                          <EyeIcon className="w-6 h-6 text-black" />
                        ) : (
                          <PencilSquareIcon className="w-6 h-6 text-black" />
                        )}
                      </Button>
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
