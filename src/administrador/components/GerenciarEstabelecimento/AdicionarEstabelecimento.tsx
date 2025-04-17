import { useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUpTitle } from "../../../core/animations/cardVariants";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Button } from "@heroui/button";
import { useUser } from "../../context/UserContext";
import PermissaoNegada from "../../components/PermissaoNegada"


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
  const [cepError, setCepError] = useState("");
  const navigate = useNavigate();

  const isJurado = userRole === "jurado";
  const isAdmin = userRole === "administrador"; // caso use esse termo no contexto

  if (isJurado) {
    return <PermissaoNegada onVoltar={() => window.history.back()} />;
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isReadOnly) return;

    const cepNumeros = cep.replace(/\D/g, ""); // remove o hífen

    if (cepNumeros.length !== 8) {
      setCepError("O CEP deve conter exatamente 8 dígitos.");
      return;
    }

    setCepError(""); // limpa erro

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



  const formatarCep = (valor: string) => {
    return valor
      .replace(/\D/g, "")        // Remove tudo que não for dígito
      .replace(/^(\d{5})(\d)/, "$1-$2") // Coloca o hífen depois do 5º dígito
      .slice(0, 9);              // Limita a 9 caracteres (00000-000)
  };

  const apenasNumeros = (valor: string) => {
    return valor.replace(/\D/g, ""); // Remove tudo que não for número
  };


  return (
    <div className="min-h-screen bg-[#2b1e49]">
      <Header />

      <div className="flex flex-col px-5 py-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <Button
            onClick={() => navigate(-1)}
            className="bg-[#FB844A] rounded-md px-1.5 py-0.5 text-white text-sm flex items-center w-10 min-w-0"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>

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
            onChange={(e) => setCep(formatarCep(e.target.value))}
            placeholder="Digite o CEP"
            readOnly={isReadOnly}
            required
          />
          {cepError && (
            <span className="text-sm text-[#fc0032]">{cepError}</span>
          )}

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
            onChange={(e) => setNumero(apenasNumeros(e.target.value))}
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
              className="text-black w-full text-base bg-[#d4d4d8] py-6"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
