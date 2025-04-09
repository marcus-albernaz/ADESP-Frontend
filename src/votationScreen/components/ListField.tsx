import { Chip } from "@heroui/chip";
import React, { useState } from "react";

interface ListField {
  criterio: string;
  className?: string;
}

export const ListField: React.FC<ListField> = ({ criterio, className }) => {
  const valores = [5, 6, 7, 8, 9, 10];
  const [seleceted, setSeleceted] = useState<number | null>(null);
  const handleChipClick = (valor: number) => {
    setSeleceted(valor);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-start">{criterio}:</h1>
      <div className="flex  gap-2">
        {valores.map((valor) => (
          <Chip
          key={valor}
          className={`${
            seleceted === valor
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          } rounded-full text-sm font-semibold cursor-pointer ${className}`}
          onClick={() => handleChipClick(valor)}
        >{valor < 10 ? `0${valor}` : valor}</Chip>
        ))}
      </div>
    </div>
  );
};

export default ListField;
