import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import img from "../assets/votation1.png";
import { Button } from '@heroui/button';
import { Input } from "@heroui/input";
import Footer from "../components/Footer";

// Função para aplicar máscara ao CPF
function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// Função para aplicar máscara ao telefone
function maskPhone(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

export default function Access() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const [cpfError, setCpfError] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [telefoneError, setTelefoneError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    let valid = true;

    const isCpfValid = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
    const isNomeValid = nome.trim().length >= 3;
    const isTelefoneValid = /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);

    if (!isCpfValid) {
      setCpfError("CPF inválido");
      valid = false;
    } else {
      setCpfError("");
    }

    if (!isNomeValid) {
      setNomeError("Nome deve ter no mínimo 3 letras");
      valid = false;
    } else {
      setNomeError("");
    }

    if (!isTelefoneValid) {
      setTelefoneError("Telefone inválido");
      valid = false;
    } else {
      setTelefoneError("");
    }

    if (valid) {
      navigate("/votation/votation");
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-[#FA925F]">
      <Header />

      <div className="flex-col flex-grow flex items-center justify-center text-center font-bold font-space px-2">
        <div>
          <img src={img} alt="Ilustração Tela Inicial Votação" />
        </div>

        <div className="w-full max-w-md text-left space-y-4 mt-4">
          <h1 className="text-3xl text-center font-title">Estávamos esperando por você!</h1>
          <p className="text-md text-center font-body font-normal">
            Que bom que você veio votar! Preencha os campos abaixo e confirme para seguir com a votação.
          </p>

          <div>
            <Input
              label="CPF"
              placeholder="Digite aqui..."
              type="text"
              variant="flat"
              size="sm"
              radius="none"
              color="default"
              isRequired
              value={cpf}
              onChange={(e: { target: { value: string; }; }) => setCpf(maskCPF(e.target.value))}
            />
            {cpfError && <p className="text-red-500 text-sm mt-1">{cpfError}</p>}
          </div>

          <div>
            <Input
              label="Nome Completo"
              placeholder="Digite aqui..."
              type="text"
              variant="flat"
              size="sm"
              radius="none"
              color="default"
              isRequired
              value={nome}
              maxLength={45}
              onChange={(e) => {
                const onlyLetters = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
                setNome(onlyLetters);
              }}
            />

            {nomeError && <p className="text-red-500 text-sm mt-1">{nomeError}</p>}
          </div>

          <div>
            <Input
              label="Telefone"
              placeholder="Digite aqui..."
              type="text"
              variant="flat"
              size="sm"
              radius="none"
              color="default"
              isRequired
              value={telefone}
              onChange={(e: { target: { value: string; }; }) => setTelefone(maskPhone(e.target.value))}
            />
            {telefoneError && <p className="text-red-500 text-sm mt-1">{telefoneError}</p>}
          </div>

          <Button
            type="button"
            onPress={handleSubmit}
            className="w-full bg-[#2B1E49] text-white hover:bg-[#201636]"
            radius="none"
          >
            Confirmar!
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
