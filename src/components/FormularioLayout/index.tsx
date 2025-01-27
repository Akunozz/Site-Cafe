import { useForm, SubmitHandler, Path } from "react-hook-form";
import Botao from "../Botao";
import { FieldValues } from "react-hook-form";

interface Campo {
  id: string; // Identificador único do campo
  label: string; // Texto do label
  type: "text" | "email" | "password" | "file" | "number" | "checkbox" | "date" | "textarea" | "select";
  options?: { value: string | number; label: string }[]; // Para campos do tipo select
  placeholder?: string; // Placeholder para o campo
  defaultValue?: string | number | readonly string[]; // Valor inicial
  validation?: object; // Regras de validação
}


interface FormularioProps<T extends FieldValues> {
  campos: Campo[]; // Lista de campos do formulário
  onSubmit: SubmitHandler<T>; // Função de envio do formulário
  erros?: Record<string, string>; //mensagens de erro
}

const Formulario = <T extends FieldValues>({ campos, onSubmit, erros = {} }: FormularioProps<T>) => {
  const { register, handleSubmit } = useForm<T>();

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
              defaultValue="" // Garante que o placeholder será exibido por padrão
              className="formulario-campo"
            >
              {/* Adiciona o placeholder como a primeira opção */}
              {campo.placeholder && (
                <option value="" disabled>
                  {campo.placeholder}
                </option>
              )}
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

          {/* Exibe a mensagem de erro abaixo do campo */}
          {erros[campo.id] && (
            <p className="text-red-500 text-sm">{erros[campo.id]}</p>
          )}
        </div>
      ))}

      <Botao text="Enviar" />
    </form>
  );
};

export default Formulario;
