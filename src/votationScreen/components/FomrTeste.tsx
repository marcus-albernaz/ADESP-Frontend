import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Chip } from '@heroui/chip';

interface VotacaoFormProps {
  criterios: string[];
}

interface FormValues {
  [key: string]: number;
}

const VotacaoForm: React.FC<VotacaoFormProps> = ({ criterios }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      {criterios.map((criterio, index) => (
        <div key={index} className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {criterio}
          </label>
          <Controller
            name={`criterio-${index}`}
            control={control}
            rules={{ required: 'Por favor, avalie este critério.' }}
            render={({ field: { onChange, value } }) => (
              <div>
                <div className="flex">
                  {[5, 6, 7, 8, 9, 10].map((valor) => (
                    <Chip
                      key={valor}
                      className={`rounded-full text-sm font-semibold cursor-pointer ${
                        value === valor ? 'bg-gray-200' : 'bg-white'
                      }`}
                      onClick={() => onChange(valor)}
                    >
                      {valor < 10 ? `0${valor}` : valor}
                    </Chip>
                  ))}
                </div>
                {errors[`criterio-${index}`]?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`criterio-${index}`]?.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Enviar Votação
      </button>
    </form>
  );
};

export default VotacaoForm;