import imgVotation2 from "../../img/votation2.png";
import Footer from "../../components/Footer";
import logo from "/Logo_Festival1.png";

export default function Final() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#FA925F] font-space">
      <div className="flex flex-col flex-grow items-center justify-end text-center px-2">

        {/* Logo acima do título */}
        <div className="mt-10">
          <img src={logo} alt="Logo do Festival" className="w-60 mx-auto" />
        </div>

        {/* Texto de agradecimento */}
        <div className="w-full max-w-md text-left space-y-4 mt-6">
          <h1 className="text-5xl font-bold text-center text-[#3F315D]">
            Voto registrado!
          </h1>
          <p className="text-xl text-center font-medium text-black">
            Agradecemos seu voto! Sua participação ajuda a deixar o festival ainda mais gostoso.
          </p>
          <p className="text-lg text-center font-medium text-[#3F315D] mt-4">
            Você pode fechar essa página agora.
          </p>
        </div>

        {/* Imagem ilustrativa */}
        <div className="mt-6">
          <img src={imgVotation2} alt="Ilustração Votação Finalizada" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
