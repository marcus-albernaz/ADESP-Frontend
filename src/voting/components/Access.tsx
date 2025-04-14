import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import img from "../assets/votation1.png";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { fadeUpTitle } from "@/core/animations/cardVariants";
import { ScreensPropTypes } from "../types/ScreensPropTypes";

// Máscara de CPF
function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// Máscara de telefone
function maskPhone(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

export default function Access({ onNavigate, formRegister }: ScreensPropTypes) {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const [cpfError, setCpfError] = useState("");
  const [nomeError, setNomeError] = useState("");
  const [telefoneError, setTelefoneError] = useState("");

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
      setNomeError("Por favor, digite seu nome corretamente");
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
      onNavigate("voting");
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-[#FA925F] text-black">
      <Header />

      <div className="flex flex-col flex-grow items-center justify-center text-center px-4">
        <motion.img
          src={img}
          alt="Ilustração Tela Inicial Votação"
          className="max-w-xs md:max-w-md mt-6"
          {...fadeUpTitle}
        />

        <motion.div
          className="w-full max-w-md text-left space-y-4 mt-6"
          {...fadeUpTitle}
        >
          <h1 className="text-4xl text-center font-title font-bold">
            Estávamos esperando por você!
          </h1>
          <p className="text-md text-center font-title font-semibold">
            Que bom que você veio votar! Preencha os campos abaixo e confirme para seguir com a votação.
          </p>

          {/* CPF */}
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
              {...formRegister("cpf")}
              onChange={(e) => setCpf(maskCPF(e.target.value))}
            />
            {cpfError && <p className="text-sm mt-1 text-[#7B0000]">{cpfError}</p>}
          </div>

          {/* Nome */}
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
              {...formRegister("name")}
              onChange={(e) => {
                const onlyLetters = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
                setNome(onlyLetters);
              }}
            />
            {nomeError && <p className="text-sm mt-1 text-[#7B0000]">{nomeError}</p>}
          </div>

          {/* Telefone */}
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
              {...formRegister("name")}
              onChange={(e) => setTelefone(maskPhone(e.target.value))}
            />
            {telefoneError && <p className="text-sm mt-1 text-[#7B0000]">{telefoneError}</p>}
          </div>

          {/* Botão Confirmar */}
          <Button
            type="button"
            onPress={handleSubmit}
            className="w-full bg-[#2B1E49] text-white font-title hover:bg-[#201636] transition-colors duration-200"
            radius="none"
          >
            Confirmar!
          </Button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
