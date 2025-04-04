'use client'; 

import { Button } from "@heroui/button";
import { useState } from 'react';

export default function ForgotPassword({ onCancel, onAcknowledged }: { onCancel: () => void, onAcknowledged: () => void }) {
  const [isRecoverySent, setIsRecoverySent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRecover = () => {
    if (!email.trim()) {
      setError('Por favor, insira um e-mail.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    setError('');
    setIsRecoverySent(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white">
        {isRecoverySent ? (
          <div className="text-center">
            <img 
              src="/img/success_image.png"
              alt="E-mail Enviado"
              className="mx-auto mb-4 w-24 h-24"
            />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">E-mail de Recuperação Enviado!</h2>
            <p className="text-sm text-gray-600 mb-4">
              O e-mail de recuperação foi enviado. Caso não o encontre na Caixa de Entrada, confira sua Caixa de Spam.
            </p>
            <Button
              className="w-full bg-[#43B7A3] text-white p-2 rounded-lg hover:bg-[#308274]"
              onClick={onAcknowledged}
            >
              Entendido!
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-left mb-4">Recuperar Senha</h2>
            <p className="text-justify mb-6">No campo abaixo, informe o seu e-mail cadastrado no sistema.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-500 bg-white text-black placeholder-gray-700"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <div className="flex space-x-4">
                <Button 
                  type="submit"
                  className="w-full bg-[#43B7A3] text-white p-2 rounded-lg hover:bg-[#308274]"
                  onClick={handleRecover}
                >
                  Recuperar
                </Button>
                <Button
                  type="button"
                  className="w-full bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
                  onClick={onCancel}
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
