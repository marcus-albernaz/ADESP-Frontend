import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeftIcon} from "@heroicons/react/24/outline";
import Header from "../Header";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Button } from "@heroui/button";
import { fadeUpTitle } from "../../../core/animations/cardVariants";
import { useUser } from "../../context/UserContext";
import PermissaoNegada from "../../components/PermissaoNegada"

export default function AdicionarPrato() {
  const [nome, setNome] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [tipoPrato, setTipoPrato] = useState("");
  const [inativo, setInativo] = useState(false);
  const [erro, setErro] = useState("");

  const navigate = useNavigate();
  const { userRole } = useUser();

  const isJurado = userRole === "jurado";
  const isAdmin = userRole === "administrador"; // caso use esse termo no contexto

  if (isJurado) {
    return <PermissaoNegada onVoltar={() => window.history.back()} />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !restaurante || !tipoPrato) {
      setErro("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    setErro("");

    console.log({
      nome,
      restaurante,
      tipoPrato,
      status: inativo ? "Inativo" : "Ativo",
    });

    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col px-5 py-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <Button
            onClick={() => window.history.back()}
            className="bg-[#FB844A] rounded-md px-1.5 py-0.5 text-white text-sm flex items-center w-10 min-w-0"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>

          <motion.h1
            className="text-3xl font-bold text-[#fee9c9] font-title"
            {...fadeUpTitle}
          >
            Novo Prato
          </motion.h1>
        </div>

        {/* Formulário disponível para administradores */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo Nome */}
          <Input
            label={
              <span className="text-black text-base font-medium">
                Nome do Prato
              </span>
            }
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do prato"
            required
            disabled={isJurado}
          />

          {/* Campo Estabelecimento */}
          <div>
            <label className="block text-white text-lg font-medium mb-1">
              Estabelecimento
            </label>
            <select
              value={restaurante}
              onChange={(e) => setRestaurante(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-black"
              disabled={isJurado}
            >
              <option value="">Selecione o Estabelecimento</option>
              <option value="Restaurante A">Restaurante A</option>
              <option value="Restaurante B">Restaurante B</option>
              <option value="Restaurante C">Restaurante C</option>
            </select>
          </div>

          {/* Campo Tipo de Prato */}
          <div className="w-full">
            <label className="block text-white text-lg font-medium mb-1">
              Tipo de Prato
            </label>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="flex gap-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="restaurante"
                    name="tipo_prato"
                    value="restaurante"
                    checked={tipoPrato === "restaurante"}
                    onChange={() => setTipoPrato("restaurante")}
                    className="mr-2"
                    disabled={isJurado}
                  />
                  <label htmlFor="restaurante" className="text-black text-base font-medium">
                    Restaurante
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id="similar"
                    name="tipo_prato"
                    value="similar"
                    checked={tipoPrato === "similar"}
                    onChange={() => setTipoPrato("similar")}
                    className="mr-2"
                    disabled={isJurado}
                  />
                  <label htmlFor="similar" className="text-black text-base font-medium">
                    Similar
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Opção de marcar como inativo - Apenas para administradores */}
          {isAdmin && (
            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                checked={inativo}
                onChange={(e) => setInativo(e.target.checked)}
                id="inativo"
              />
              <label htmlFor="inativo" className="text-sm font-medium text-white">
                Inativo
              </label>
            </div>
          )}

          {/* Erro de validação */}
          {erro && (
            <div className="text-[#fe0034] text-sm mt-2 font-semibold">
              <p>{erro}</p>
            </div>
          )}

          {/* Botões de ação */}
          <div className="pt-6 flex flex-col gap-3">
            {/* Apenas administradores podem cadastrar */}
            {isAdmin && (
              <Button
                type="submit"
                className="bg-[#fb844a] text-white w-full text-base py-6"
              >
                Cadastrar
              </Button>
            )}

            {/* Jurados e administradores podem cancelar */}
            <Button
              onClick={() => navigate(-1)}
              className="text-black w-full text-base bg-[#d4d4d8] py-6"
            >
              {isJurado ? "Voltar" : "Cancelar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
