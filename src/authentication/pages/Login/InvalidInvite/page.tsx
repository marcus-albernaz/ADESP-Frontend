'use client';
import Header from "@/authentication/components/layout/Header"
import { Footer } from '@/authentication/components/layout/Footer'

export default function InvalidInvitePage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header/>

      {/* Conteúdo principal */}
      <div className="flex-grow flex flex-col items-center justify-center bg-[#2A1E48] px-4 text-center">
        <img src="error_invite.png" alt="Erro no Convite" className="max-w-sm h-auto" />
        <h2 className="text-white text-2xl font-bold">Há um problema com seu convite!</h2>
        <p className="text-white text-sm mt-2 max-w-md">
          Ei, detectamos que seu convite não é válido. Caso ele tenha vencido, solicite um novo convite para um Administrador.
        </p>
        <button className="mt-6 bg-[#D4D4D8] text-black py-2 px-12 rounded-lg hover:bg-[#969699]">
          Voltar à Página Inicial
        </button>
      </div>

      <Footer/>
      
    </div>
  );
}
