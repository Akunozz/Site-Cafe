import { useForm, SubmitHandler, Path } from "react-hook-form";
import Botao from "../Botao";

interface Campo {
  id: string; // Identificador único do campo
  label: string; // Texto do label
  type: "text" | "email" | "password" | "file" | "number" | "checkbox" | "date" | "textarea" | "select";
  options?: { value: string | number; label: string }[]; // Para campos do tipo select
  placeholder?: string; // Placeholder para o campo
  defaultValue?: string | number | readonly string[]; // Valor inicial
  validation?: object; // Regras de validação
}

import { FieldValues } from "react-hook-form";

interface FormularioProps<T extends FieldValues> {
  campos: Campo[]; // Lista de campos do formulário
  onSubmit: SubmitHandler<T>; // Função de envio do formulário
}

const Formulario = <T extends FieldValues>({ campos, onSubmit }: FormularioProps<T>) => {
  const { register, handleSubmit, formState: { errors } } = useForm<T>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {campos.map((campo) => (
        <div key={campo.id}>
          <label className="formulario-label" htmlFor={campo.id}>
            {campo.label}:
          </label>

          {campo.type === "select" ? (
            <select
              id={campo.id}
              {...register(campo.id as Path<T>, campo.validation)}
              className="formulario-campo"
            >
              <option value="">Selecione</option>
              {campo.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : campo.type === "textarea" ? (
            <textarea
              id={campo.id}
              {...register(campo.id as Path<T>, campo.validation)}
              placeholder={campo.placeholder}
              className="formulario-campo"
            />
          ) : (
            <input
              id={campo.id}
              type={campo.type}
              {...register(campo.id as Path<T>, campo.validation)}
              defaultValue={campo.defaultValue}
              placeholder={campo.placeholder}
              className="formulario-campo"
            />
          )}

          {errors[campo.id as keyof T] && (
            <p className="text-red-500 text-sm">
              {(errors[campo.id as keyof T] as any).message}
            </p>
          )}
        </div>
      ))}

      <Botao text="Enviar" />
    </form>
  );
};

export default Formulario;
