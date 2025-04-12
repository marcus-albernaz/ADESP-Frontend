import Header from "../components/Header";
import returnIcon from "../assets/return.png";
import { motion } from "framer-motion";
import { fadeUpTitle } from "../../core/animations/cardVariants";
import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";

export default function MenuAdmin() {
  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col items-center py-6 px-5">
        <div className="w-full max-w-4xl">
          <motion.div className="flex items-center gap-3 mb-6" {...fadeUpTitle}>
            <img
              src={returnIcon}
              alt="Voltar"
              className="w-8 h-8 cursor-pointer"
              onClick={() => window.history.back()}
            />
            <h1 className="text-3xl font-bold text-[#fee9c9] font-title">
              Administradores do Sistema
            </h1>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableColumn className="text-left text-sm text-gray-700 font-semibold">
                    Nome
                  </TableColumn>
                  <TableColumn className="text-left text-sm text-gray-700 font-semibold">
                    Status
                  </TableColumn>
                  <TableColumn className="text-left text-sm text-gray-700 font-semibold">
                    Ações
                  </TableColumn>
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* Exemplo futuro de administrador */}
                {/* <TableRow>
                  <TableCell>João Pedro</TableCell>
                  <TableCell>
                    <span className="text-green-600 font-semibold">Ativo</span>
                  </TableCell>
                  <TableCell>
                    <button className="text-blue-600 hover:underline">Editar</button>
                  </TableCell>
                </TableRow> */}
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-gray-500 py-6">
                    Nenhum administrador cadastrado ainda.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
