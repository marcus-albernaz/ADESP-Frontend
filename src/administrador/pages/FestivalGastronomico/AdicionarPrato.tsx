import { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUpTitle } from "../../../core/animations/cardVariants";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Button } from "@heroui/button";
import ReturnIcon from "../../assets/return.png";
import { useUser } from "../../context/UserContext";

export default function AdicionarPrato() {
  const [nome, setNome] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [tipoPrato, setTipoPrato] = useState(""); // Inicialmente vazio
  const [inativo, setInativo] = useState(false);
  const [erro, setErro] = useState(""); // Estado para mensagens de erro

  const navigate = useNavigate();

  const { userRole } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verificando se todos os campos obrigatórios estão preenchidos
    if (!nome || !restaurante || !tipoPrato) {
      setErro("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    // Se tudo estiver certo, limpa a mensagem de erro
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
          <button onClick={() => navigate(-1)}>
            <img src={ReturnIcon} alt="Voltar" className="w-8 h-8 cursor-pointer" />
          </button>

          <motion.h1
            className="text-3xl font-bold text-[#fee9c9] font-title"
            {...fadeUpTitle}
          >
            Novo Prato
          </motion.h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome do Prato"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do prato"
            required
            disabled={userRole === "jurado"} // Desabilitando campo
          />

          {/* Dropdown Restaurante */}
          <div>
            <label className="block text-white text-sm font-medium mb-1">
              Restaurante
            </label>
            <select
              value={restaurante}
              onChange={(e) => setRestaurante(e.target.value)}
              className="w-full p-3 rounded-lg bg-white text-black"
              required
              disabled={userRole === "jurado"} // Desabilitando campo
            >
              <option value="">Selecione o restaurante</option>
              <option value="Restaurante A">Restaurante A</option>
              <option value="Restaurante B">Restaurante B</option>
              <option value="Restaurante C">Restaurante C</option>
            </select>
          </div>

          {/* Tipo de Prato */}
          <div className="w-full">
            <label className="block text-white text-sm font-medium mb-1">
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
                    disabled={userRole === "jurado"} // Desabilitando campo
                  />
                  <label htmlFor="restaurante" className="text-black text-sm font-medium">
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
                    disabled={userRole === "jurado"} // Desabilitando campo
                  />
                  <label htmlFor="similar" className="text-black text-sm font-medium">
                    Similar
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Checkbox Inativo */}
          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              checked={inativo}
              onChange={(e) => setInativo(e.target.checked)}
              id="inativo"
              disabled={userRole === "jurado"} // Desabilitando checkbox
            />
            <label htmlFor="inativo" className="text-sm font-medium text-white">
              Inativo
            </label>
          </div>

          {/* Mensagem de erro */}
          {erro && (
            <div className="text-[#fe0034] text-sm mt-2 font-semibold">
              <p>{erro}</p>
            </div>
          )}

          {/* Botões */}
          <div className="pt-6 flex flex-col gap-3">
            {userRole !== "jurado" && ( // Exibir botão "Cadastrar" apenas para administrador
              <Button
                type="submit"
                className="bg-[#fb844a] text-white w-full text-base py-6"
              >
                Cadastrar
              </Button>
            )}
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="text-black w-full text-base bg-[#d4d4d8]"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
