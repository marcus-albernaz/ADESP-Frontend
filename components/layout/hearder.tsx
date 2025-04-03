// components/navbar.tsx
import React from 'react';

export const header = () => {
  return (
    <header className="bg-[#FB844A] py-12 relative">
        <div className="flex justify-center">
          <img src="img/Logo_Festival1.png" alt="Logo da Empresa" className="absolute top-[45px] w-[250px] h-auto" />
        </div>
      </header>
  );
};

export default header;