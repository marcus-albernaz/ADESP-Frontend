'use client'; // Diretiva para renderizar no lado do cliente

import { Button } from "@headlessui/react";
import { useState } from 'react';

// Componente de Recuperação de Senha
export default function ForgotPassword({ onCancel, onAcknowledged }: { onCancel: () => void, onAcknowledged: () => void }) {
  const [isRecoverySent, setIsRecoverySent] = useState(false); // Estado para controlar quando o e-mail de recuperação é enviado

  const handleRecover = () => {
    // Lógica para enviar o e-mail de recuperação (aqui pode ser feita a chamada de API, por exemplo)
    setIsRecoverySent(true); // Quando o e-mail for enviado, altere o estado para true
  };

  const handleAcknowledged = () => {
    onAcknowledged(); // Chama a função para fechar o modal e voltar à tela de login
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white">
        {isRecoverySent ? (
          // Exibe a tela de confirmação de envio de e-mail
          <div className="text-center">
            <img 
              src="/img/success_image.png" // Imagem de sucesso, substitua com a sua imagem
              alt="E-mail Enviado"
              className="mx-auto mb-4 w-24 h-24" // Ajuste o tamanho da imagem conforme necessário
            />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">E-mail de Recuperação Enviado!</h2>
            <p className="text-sm text-gray-600 mb-4">
              O E-mail de recuperação foi enviado. Caso não o encontre na Caixa de Entrada, confira sua Caixa de Spam.
            </p>
            <Button
              className="w-full bg-[#43B7A3] text-white p-2 rounded-lg hover:bg-[#308274]"
              onClick={handleAcknowledged} // Função para o botão "Entendido"
            >
              Entendido!
            </Button>
          </div>
        ) : (
          // Exibe o formulário de recuperação de senha
          <>
            <h2 className="text-2xl font-bold text-left mb-4">Recuperar Senha</h2>
            <p className="text-justifi mb-6">No campo abaixo, determine o seu e-mail que está cadastrado no sistema.</p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-500 bg-white text-black placeholder-gray-700"
                  placeholder="Digite seu email"
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  className="w-full bg-[#43B7A3] text-white p-2 rounded-lg hover:bg-[#308274]"
                  onClick={handleRecover} // Função para o botão "Recuperar"
                >
                  Recuperar
                </Button>
                <Button
                  type="button"
                  className="w-full bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
                  onClick={onCancel} // Chamando a função onCancel ao clicar no botão
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
