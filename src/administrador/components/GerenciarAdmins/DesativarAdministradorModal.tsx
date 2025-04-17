import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import CustomAlert from "../../components/CustomAlert"; // Certifique-se de importar o CustomAlert
import { Button } from "@heroui/button";

interface Props {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DesativarAdministradorModal({
  isOpen,
  onClose,
  onConfirm,
}: Props) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para controlar o alerta

  const handleConfirm = () => {
    onConfirm();
    setShowSuccessMessage(true); // Exibe o alerta de sucesso após confirmação
  };

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
              <div className="flex justify-center mb-4">
                <Button
                  isIconOnly
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "#f7ae89" }}
                  title="Aviso"
                  disabled
                >
                  <ExclamationCircleIcon className="w-12 h-12" style={{ color: "#ff5b0b" }} />
                </Button>
              </div>

              <Dialog.Title className="text-xl font-semibold text-gray-800 text-center">
                Deseja Inativar este Administrador?
              </Dialog.Title>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Ao inativar um administrador, ele não poderá acessar o sistema
                até que seja reativado. Tenha certeza dessa ação!
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  onClick={handleConfirm} // Corrigido para chamar a função corretamente
                  className="w-full px-4 py-2 rounded-lg text-white text-base bg-[#43b7a3] hover:bg-[#2D7A6D] transition"
                >
                  Desativar
                </Button>
                <Button
                  onClick={onClose}
                  className="w-full px-4 py-2 rounded-lg text-gray-700 text-base bg-[#d4d4d8] hover:bg-[#B9B9BD] transition"
                >
                  Cancelar
                </Button>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
      {/* Exibindo o alerta após a confirmação */}
      {showSuccessMessage && (
        <CustomAlert
          type="success"
          title="Acesso Inativado!"
          message="O Acesso foi inativado com sucesso!"
          isVisible={showSuccessMessage}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
    </AnimatePresence>
  );
}
