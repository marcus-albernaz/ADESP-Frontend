import Header from "@/votationScreen/components/Header";
import { Descrition } from "@/votationScreen/components/Descrition";
import FormTest from "@/votationScreen/components/FomrTeste";

export default function Votation() {
  const lugar = "Restaurante Araguaia"; //MUDAR DE ACORDO COM OS DADOS RECEBIDOS
  const prato = "Lasanha"; //MUDAR DE ACORDO COM OS DADOS RECEBIDOS
  const questionsPrato = ["1-Sabor", "2-Temperatuda","1-Sabor","3-Harmonia","4- Teste"];
  const questionsMusic = ["1- Melodia", "2-Ritmo", "3-Cantor"];
  const categoric: number = 2; //MUDAR DE ACORDO COM A CATEGORIA
  return (
    <div className="flex flex-col min-h-screen relative mb-5">
      <Header />
      <div className="flex-col flex-grow flex items-center justify-center text-center mt-10 px-6 bg-white">
        <div>
          <h3 className="">Você está votando em:</h3>
          <Descrition owner={lugar} desc={prato} className="text-white" />
        </div>
        <div>
        {categoric === 1 ? (
            <FormTest criterios={questionsPrato} />
          ) : (
            <FormTest criterios={questionsMusic} />
          )}
         

        </div>

        
      </div>
    </div>
  );
}
