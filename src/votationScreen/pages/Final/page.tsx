
import Header2 from "@/votationScreen/components/Header2";
import img from "/img-final.png";
import Footer from "../../components/Footer";


export default function Votation() {


  return (
    <div className="flex flex-col min-h-screen relative bg-[#FA925F] font-space">
      <Header2/>

      <div className="flex-col flex-grow flex items-center justify-end text-center font-bold px-2">
               <div className="w-full max-w-md text-left space-y-4 mt-4">
          <h1 className="text-3xl font-bold text-center text-[#3F315D]">Voto registrado!</h1>
          <p className="text-xl text-center font-medium text-white">
          Agradecemos seu voto! Sua participação ajuda a deixar o festival ainda mais gostoso.
          </p>
        </div>
        <div>
          <img src={img} alt="Ilustração Tela Inicial Votação" />
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}
