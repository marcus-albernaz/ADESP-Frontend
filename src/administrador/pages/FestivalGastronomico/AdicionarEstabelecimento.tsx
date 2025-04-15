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

export default function AdicionarEstabelecimento() {
  const [nome, setNome] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [inativo, setInativo] = useState(false);
  const [logradouro, setLogradouro] = useState("")
  const { userRole } = useUser();
  const isReadOnly = userRole === "jurado";
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    console.log({
      nome,
      responsavel,
      cep,
      bairro,
      logradouro,
      numero,
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
            Novo Estabelecimento
          </motion.h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome do Estabelecimento"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome"
            readOnly={isReadOnly}
            required
          />
          <Input
            label="Nome do Responsável"
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
            placeholder="Digite o nome do responsável"
            readOnly={isReadOnly}
            required
          />
          <Input
            label="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite o CEP"
            readOnly={isReadOnly}
            required
          />
          <Input
            label="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Digite o bairro"
            readOnly={isReadOnly}
            required
          />
          <Input
            label="Logradouro"
            value={logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
            placeholder="Digite o Logradouro"
            readOnly={isReadOnly}
            required
          />
          <Input
            label="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Digite o número"
            readOnly={isReadOnly}
            required
          />

          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              checked={inativo}
              onChange={(e) => setInativo(e.target.checked)}
              id="inativo"
              disabled={isReadOnly}
            />
            <label htmlFor="inativo" className="text-sm font-medium text-white">
              Inativo
            </label>
          </div>

          <div className="pt-6 flex flex-col gap-3">
            {userRole === "administrador" && (
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
