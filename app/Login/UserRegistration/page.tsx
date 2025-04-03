'use client';

import { useState } from 'react';
import MaskedInput from 'react-text-mask';
import Header from '@/components/layout/hearder';
import Footer from '@/components/layout/Footer';

export default function UserRegistration() {
  const [form, setForm] = useState({
    email: '',
    nome: '',
    cpf: '',
    usuario: '',
    senha: '',
    confirmarSenha: ''
  });

  const [erroSenha, setErroSenha] = useState('');
  const [erroCPF, setErroCPF] = useState('');

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Remove caracteres não numéricos do CPF
    const cpfNumerico = form.cpf.replace(/\D/g, '');

    if (cpfNumerico.length !== 11) {
      setErroCPF('CPF inválido. Digite todos os 11 números.');
      return;
    } else {
      setErroCPF('');
    }

    if (form.senha !== form.confirmarSenha) {
      setErroSenha('As senhas não coincidem.');
      return;
    } else {
      setErroSenha('');
    }

    console.log('Dados enviados:', form);
  };

  // Máscara de CPF no formato 999.999.999-99
  const cpfMask = [
    /\d/, /\d/, /\d/, '.', 
    /\d/, /\d/, /\d/, '.', 
    /\d/, /\d/, /\d/, '-', 
    /\d/, /\d/
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />

      <div className="flex-grow flex items-center justify-center bg-[#2A1E48]">
        <div className="w-full max-w-md">
          <h2 className="text-center text-2xl font-bold mb-6">Criar Conta</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-white text-[15px]">E-mail</label>
            <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
            
            <label className="block text-sm font-medium text-white text-[15px]">Nome</label>
            <input type="text" name="nome" placeholder="Nome" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
            
            <label className="block text-sm font-medium text-white text-[15px]">CPF</label>
            <MaskedInput
              mask={cpfMask}
              name="cpf"
              placeholder="CPF"
              className="w-full p-2 border rounded-lg"
              onChange={handleChange}
              required
            />
            {erroCPF && <p className="text-red-500 text-sm mt-1">{erroCPF}</p>}
            
            <label className="block text-sm font-medium text-white text-[15px]">Nome de Usuário</label>
            <input type="text" name="usuario" placeholder="Nome de Usuário" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
            
            <label className="block text-sm font-medium text-white text-[15px]">Senha</label>
            <input type="password" name="senha" placeholder="Senha" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
            
            <label className="block text-sm font-medium text-white text-[15px]">Confirme sua senha</label>
            <input type="password" name="confirmarSenha" placeholder="Confirme sua Senha" className="w-full p-2 border rounded-lg" onChange={handleChange} required />
            {erroSenha && <p className="text-red-500 text-sm mt-1">{erroSenha}</p>}
            
            <button type="submit" className="w-full bg-[#FD0078] text-white p-2 rounded-lg hover:bg-pink-700 mt-6">Cadastrar</button>
            <button type="button" className="w-full bg-[#D4D4D8] text-black p-2 rounded-lg hover:bg-[#A8A8AB]">Cancelar</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
