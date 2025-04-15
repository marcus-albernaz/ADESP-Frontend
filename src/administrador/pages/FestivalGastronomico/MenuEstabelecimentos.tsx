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
import Plus from "../../assets/plus.png";
import EditIcon from "../../assets/edit.png"; // Imagem que você vai adicionar
import { useNavigate } from "react-router-dom";

const restaurantesIniciais = [
  {
    id: "1",
    nome: "Restaurante da Barra",
    status: "Inativo",
  },
  {
    id: "2",
    nome: "Pizzaria Bella Napoli",
    status: "Ativo",
  },
  {
    id: "3",
    nome: "Sushi Place",
    status: "Ativo",
  },
  {
    id: "4",
    nome: "Café do Centro",
    status: "Inativo",
  },
];

export default function MenuEstabelecimentos() {
  const [restaurantes, setRestaurantes] = useState(restaurantesIniciais);
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col items-center py-6 px-5">
        <div className="w-full max-w-4xl">
          <motion.div className="flex items-center gap-3 mb-2" {...fadeUpTitle}>
            <img
              src={returnIcon}
              alt="Voltar"
              className="w-8 h-8 cursor-pointer"
              onClick={() => window.history.back()}
            />
            <h1 className="text-3xl font-bold text-[#fee9c9] font-title">
              Estabelecimentos
            </h1>
          </motion.div>

          <div className="flex justify-start mb-6">
            <button
              onClick={() => navigate("/admin/menuaddEstabelecimentos")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-[#fb844a]"
            >
              <img src={Plus} alt="ico" />
              Adicionar Estabelecimento
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4">
            <Table aria-label="Tabela de Restaurantes">
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>

              <TableBody emptyContent="Nenhum restaurante cadastrado ainda.">
                {restaurantes.map((restaurante) => (
                  <TableRow key={restaurante.id}>
                    <TableCell>{restaurante.nome}</TableCell>
                    <TableCell>
                      <span
                        className={`font-bold ${restaurante.status === "Ativo"
                          ? "text-green-500"
                          : "text-red-500"
                          }`}
                      >
                        {restaurante.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => navigate("/admin/menuaddEstabelecimentos")}
                        className="p-2 rounded-full transition-colors duration-300 text-blue-500 hover:bg-blue-100"
                        title="Editar restaurante"
                      >
                        <img src={EditIcon} alt="Editar" className="h-7 w-7" />
                      </button>
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
