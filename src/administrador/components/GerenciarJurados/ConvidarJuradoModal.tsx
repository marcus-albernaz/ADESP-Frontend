import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@heroui/input";
import { useState } from "react";
import CustomAlert from "../CustomAlert";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSend: (email: string) => void;
}

export default function ConvidarJuradoModal({
  isOpen,
  onClose,
  onSend,
}: Props) {
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid =
      e.target instanceof HTMLFormElement && e.target.checkValidity();
    if (isValid) {
      onSend(email);
      setEmail("");
      setShowSuccessMessage(true);  // Mostrar alerta de sucesso
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            as="div"
            className="relative z-50"
            open={isOpen}
            onClose={onClose}
          >
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl max-w-md w-full p-6 shadow-2xl"
              >
                <Dialog.Title className="text-xl font-semibold text-gray-800 text-left">
                  Convidar Jurado
                </Dialog.Title>
                <Dialog.Description className="text-gray-600 mt-2 text-left">
                  No campo abaixo, determine o e-mail do Jurado que participará da avaliação do festival gastronômico.
                </Dialog.Description>

                <form onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <Input
                      type="email"
                      label="E-mail"
                      placeholder="email@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#43b7a3]"
                      required
                    />
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 rounded-lg text-white bg-[#43b7a3] hover:bg-[#2D7A6D] transition"
                    >
                      Enviar Convite
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail(""); // Limpar o campo de e-mail
                        onClose();    // Fechar o modal
                      }}
                      className="w-full px-4 py-2 rounded-lg text-gray-700 bg-[#d4d4d8] hover:bg-[#B9B9BD] transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Exibindo o alerta de sucesso após o envio */}
      {showSuccessMessage && (
        <CustomAlert
          type="success"
          title="Convite Enviado!"
          message="O Convite foi enviado para o Jurado!"
          isVisible={showSuccessMessage}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
    </>
  );
}
