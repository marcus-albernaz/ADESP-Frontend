import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import Warning from "../assets/warning_2.png"

interface Props {
    isOpen: boolean;
    onOpenChange?: (open: boolean) => void;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DesativarPratoModal({
    isOpen,
    onClose,
    onConfirm,
}: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog as="div" className="relative z-50" open={isOpen} onClose={onClose}>
                    {/* Fundo com transparência e efeito blur */}
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white/90 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl"
                        >
                            {/* Espaço para imagem */}
                            <div className="flex justify-center mb-4">
                                {/* Exemplo de placeholder para imagem */}
                                <img src={Warning} 
                                alt="Aviso" 
                                className="w-20 h-20 rounded-2xl object-cover" />

                            </div>

                            <Dialog.Title className="text-xl font-semibold text-gray-800 text-center">
                            Deseja excluir esse registro?
                            </Dialog.Title>
                            <p className="text-sm text-gray-500 mt-4 text-center">
                            Ao confirmar a inativação, o registro será desativado.
                            </p>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={onConfirm}
                                    className="px-4 py-2 rounded-lg text-white bg-[#43b7a3] hover:bg-red-700 transition"
                                >
                                    Desativar
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}