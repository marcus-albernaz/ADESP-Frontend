'use client';

import { useState } from 'react';
import { Button } from "@headlessui/react";
import { useRouter } from 'next/navigation';

export default function NewPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleCancel = () => {
    router.push('/page'); // Redireciona para a página de login
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-[#FB844A] py-12 relative">
        <div className="flex justify-center">
          <img
            src="img/Logo_Festival1.png"
            alt="Logo da Empresa"
            className="absolute top-[45px] w-[250px] h-auto"
          />
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center" style={{ backgroundColor: '#2A1E48' }}>
        <div className="w-full max-w-md p-8 rounded-2xl bg-white">
          <h2 className="text-2xl font-bold text-left mb-4 text-orange-500">Recuperação de Senha</h2>
          <p className="text-justify text-[14px] mb-5 text-gray-700">
            Vimos que perdeu a sua senha, mas não se preocupe. Iremos te ajudar!<br />
            Nos campos abaixo digite e confirme sua nova senha.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 text-[15px]">Nova Senha</label>
              <input
                type="password"
                className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-500 bg-white text-black placeholder-gray-700 text-[13px]"
                placeholder="Digite sua nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-[15px]">Confirmação de Senha</label>
              <input
                type="password"
                className="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-indigo-500 bg-white text-black placeholder-gray-700 text-[13px]"
                placeholder="Confirme sua nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <Button className="w-full bg-[#FD0078] text-white p-2 rounded-lg hover:bg-pink-700">
                Confirmar
              </Button>
              <Button
                type="button"
                className="w-full bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>

      <footer className="bg-[#FFEED3] py-4">
        <div className="flex justify-center">
          <img
            src="/img/Patrocinadores.png"
            alt="Patrocinadores"
            className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-auto object-contain"
          />
        </div>
      </footer>
    </div>
  );
}