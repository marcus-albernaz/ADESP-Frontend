import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";

interface PermissaoNegadaProps {
  onVoltar: () => void; // Função para voltar à página anterior
}

const PermissaoNegada: React.FC<PermissaoNegadaProps> = ({ onVoltar }) => {
  return (
    <div className="min-h-screen bg-[#2b1e49] flex justify-center items-center p-6">
      <div className="bg-[#24262b] rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <div className="mb-4">
          <ExclamationTriangleIcon className="w-12 h-12 text-white mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Desculpe, você não tem permissão de acessar essa tela
        </h2>
        <Button
          onClick={onVoltar}
          className="bg-[#FB844A] text-white w-full py-2 mt-4 rounded-md text-base"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default PermissaoNegada;
