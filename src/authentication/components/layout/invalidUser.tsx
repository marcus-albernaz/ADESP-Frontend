export default function InactiveUserMessage({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-full max-w-md p-8 rounded-2xl bg-white text-center">
                <img 
                    src="cancel.png" 
                    alt="Usuário Inativo" 
                    className="mx-auto mb-4 w-24 h-24"
                />
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Seu usuário está inativo!</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Como seu usuário está inativo, você não pode efetuar a entrada no sistema. Contate o suporte ou um outro Administrador.
                </p>
                <button
                    className="w-full bg-[#D4D4D8] text-black p-2 rounded-lg hover:bg-[#A3A3A6]"
                    onClick={onClose}
                >
                    Entendido!
                </button>
            </div>
        </div>
    );
}
