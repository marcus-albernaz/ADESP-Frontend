import { useEffect } from "react";

export function SuccessMessage({ message, onClose }: { message: string; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-3/4 max-w-2xl bg-[#C7F0E8] text-[#32B09A] p-4 rounded-lg shadow-lg flex items-center">
            <img src="tick-circle.png" alt="Confirmado" className="w-6 h-6 mr-3" />
            <div className="flex-1">
                <h3 className="font-bold">Sucesso!</h3>
                <p className="text-sm">{message}</p>
            </div>
            <button className="text-[#32B09A] hover:text-[#218c7a] text-lg" onClick={onClose}>
                &times;
            </button>
        </div>
    );
}

export function ErrorMessage({ message, onClose }: { message: string; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-3/4 max-w-2xl bg-[#FEE7EF] text-[#F31260] p-4 rounded-lg shadow-lg flex items-center">
            <img src="warning-2.png" alt="Erro" className="w-6 h-6 mr-3" />
            <div className="flex-1">
                <h3 className="font-bold">Erro!</h3>
                <p className="text-sm">{message}</p>
            </div>
            <button className="text-[#F31260] hover:text-[#C20E4D] text-lg" onClick={onClose}>
                &times;
            </button>
        </div>
    );
}
