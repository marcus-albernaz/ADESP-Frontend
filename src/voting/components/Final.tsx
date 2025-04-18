import { useEffect } from "react";
import confetti from "canvas-confetti";
import imgVotation2 from "../assets/votation2.png";
import Footer from "./Footer";
import logo from "/Logo_Festival1.png";
import { Button } from "@heroui/button";

export default function Final() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#2B1E49] font-space">
      <main className="flex flex-col items-center justify-center flex-grow px-4 text-center">
        {/* Logo do Festival */}
        <img src={logo} alt="Logo do Festival" className="w-60 mb-6" />

        {/* Ilustração de votação finalizada */}
        <img src={imgVotation2} alt="Ilustração Votação Finalizada" className="mb-6" />

        {/* Mensagem de agradecimento */}
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold font-title text-[#F1E9CE]">
            Voto registrado!
          </h1>
          <p className="text-xl font-title text-[#F1E9CE]">
            Obrigado por seu voto!<br />
            Agora, você pode deixar a votação, mas que tal conhecer mais do festival? Clique no botão abaixo!
          </p>

          <Button
            onClick={() => window.location.href = "https://www.instagram.com/festivalculturaldeparacatu/"}
            className="w-[90%] py-6 font-medium text-xl text-white bg-[#FD8349] rounded-md"

          >
            Quero Conhecer o Festival!
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
