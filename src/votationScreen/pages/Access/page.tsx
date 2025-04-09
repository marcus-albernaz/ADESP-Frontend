import { useState } from "react";
import Header from '@/votationScreen/components/Header';
import img from "/Img-votation.png";
import { Button } from '@heroui/button';
import { Input } from "@heroui/input";
import Footer from "../../components/Footer";

function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11); // Limita a 11 números
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskPhone(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
}

export default function Votation() {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  return (
    <div className="flex flex-col min-h-screen relative bg-[#FA925F] font-space">
      <Header />

      <div className="flex-col flex-grow flex items-center justify-center text-center font-bold px-2">
        <div>
          <img src={img} alt="Ilustração Tela Inicial Votação" />
        </div>

        <div className="w-full max-w-md text-left space-y-4 mt-4">
          <h1 className="text-3xl text-center">Estávamos esperando por você!</h1>
          <p className="text-xl text-center font-normal">
            Que bom que você veio votar! Preencha os campos abaixo e confirme para seguir com a votação.
          </p>

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
            onChange={(e) => setCpf(maskCPF(e.target.value))}
          />

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
            onChange={(e) => setNome(e.target.value)}
          />

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
            onChange={(e) => setTelefone(maskPhone(e.target.value))}
          />

          <Button
            type="submit"
            className="w-full bg-[#2B1E49] text-white hover:bg-[#201636]"
          >
            Confirmar
          </Button>
        </div>
        
      </div>
      <Footer/>
    </div>
    
  );
}
