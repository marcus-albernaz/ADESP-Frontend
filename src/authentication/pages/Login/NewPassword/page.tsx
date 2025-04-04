'use client';

import { useState } from 'react';
import { Button } from "@heroui/button";
import Header from '@/authentication/components/layout/Header';
import Rodape from '@/authentication/components/layout/Footer';

export default function NewPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setError('');
    console.log('Senha alterada com sucesso!');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="flex-grow flex items-center justify-center bg-[#2A1E48]">
        <div className="w-full max-w-md p-8 rounded-2xl bg-white">
          <h2 className="text-2xl font-bold text-left mb-4 text-orange-500">Recuperação de Senha</h2>
          <p className="text-justify text-[14px] mb-5 text-gray-700">
            Vimos que perdeu a sua senha, mas não se preocupe. Iremos te ajudar!<br />
            Nos campos abaixo digite e confirme sua nova senha.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-[#FD0078] text-white p-2 rounded-lg hover:bg-pink-700">
                Confirmar
              </Button>
              <Button type="button" className="w-full bg-gray-300 text-black p-2 rounded-lg hover:bg-gray-400">
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Rodape/>
    </div>
  );
}
