// src/context/UserContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definindo o tipo de dados do contexto
interface UserContextType {
  userRole: string;
  setUserRole: React.Dispatch<React.SetStateAction<string>>;
}

// Criando o contexto com um valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook para usar o contexto
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider para envolver a árvore de componentes e fornecer o contexto
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [userRole, setUserRole] = useState<string>("administrador"); // jurado ou "administrador"

  return (
    <UserContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
