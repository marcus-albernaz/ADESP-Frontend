// components/navbar.tsx
import React from 'react';

export const Navbar = () => {
  return (
    <header className="bg-[#FB844A] py-12 relative">
      <div className="flex justify-center">
        <img 
          src="img/Logo_Festival1.png" 
          alt="Logo da Empresa" 
          className="absolute top-[45px] w-[200px] h-auto sm:w-[250px] md:w-[250px]" 
        />
      </div>
    </header>
  );
};
