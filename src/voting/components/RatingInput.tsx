import { UseFormRegisterReturn } from "react-hook-form";
import { useState } from "react";

// Tipagem das chaves do formulário
type FormFields = "presentation" | "treatment" | "creativity" | "originality" | "flavor";

interface RatingInputProps {
  label: string;
  initialValue: number;
  onChange: (value: number) => void;
  formRegister: UseFormRegisterReturn<FormFields>;
}

const RatingInput: React.FC<RatingInputProps> = ({ label, initialValue, onChange, formRegister }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valStr = e.target.value.replace(".", ",");

    if (valStr === "") {
      setValue(0);
      onChange(0);
      return;
    }

    const parsed = parseFloat(valStr.replace(",", "."));

    if (!isNaN(parsed)) {
      const boundedVal = Math.min(Math.max(parsed, 0), 10);
      setValue(boundedVal);
      onChange(boundedVal);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-white font-semibold mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="10"
          step="0.01"
          {...formRegister}
          value={value}
          onChange={handleChange}
          className="w-full h-2 appearance-none bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-lg"
        />
        <input
          type="number"
          step="0.01"
          min="0"
          max="10"
          value={value}
          onChange={handleChange}
          className="w-20 p-2 rounded-xl bg-white text-black text-center font-bold shadow-md"
        />
      </div>
    </div>
  );
};

export default RatingInput;
