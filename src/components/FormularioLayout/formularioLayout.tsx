import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Path, DefaultValues } from "react-hook-form";
import Botao from "../BotaoFormulario/botaoFormulario";
import { FieldValues } from "react-hook-form";

interface Campo {
  id: string; // Identificador do campo
  label: string; // Texto do label
  type: "text" | "email" | "password" | "file" | "number" | "checkbox" | "date" | "textarea" | "select"; // Tipos de campo
  options?: { value: string | number; label: string }[]; // Para campos do tipo select
  placeholder?: string; // Placeholder para o campo
  validation?: object; // Regras de validação
}

interface FormularioProps<T extends FieldValues> {
  campos: Campo[]; // Lista de campos do formulário
  onSubmit: SubmitHandler<T>; // Função de envio do formulário
  erros?: Record<string, string>; // Mensagens de erros
  valoresIniciais?: DefaultValues<T>; // Valores iniciais para edição
}

const Formulario = <T extends FieldValues>({
  campos,
  onSubmit,
  erros = {},
  valoresIniciais,
}: FormularioProps<T>) => {
  const { register, handleSubmit, setValue } = useForm<T>({
    defaultValues: valoresIniciais as DefaultValues<T>, // Define os valores iniciais
  });

  const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para alternar a visibilidade da senha

  // Atualiza os valores dos campos quando `valoresIniciais` forem carregados
  useEffect(() => {
    if (valoresIniciais) {
      Object.keys(valoresIniciais).forEach((key) => {
        setValue(key as Path<T>, valoresIniciais[key]);
      });
    }
  }, [valoresIniciais, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {campos.map((campo) => (
        <div key={campo.id}>
          {/* Campo do Identificador */}
          <label className="formulario-label" htmlFor={campo.id}>
            {campo.label}:
          </label>

          {/* Campo de Select */}
          {campo.type === "select" ? (
            <select
              id={campo.id}
              {...register(campo.id as Path<T>, campo.validation)}
              defaultValue={valoresIniciais ? valoresIniciais[campo.id] : ""}
              className="formulario-campo"
            >
              {/* Adiciona o placeholder como a primeira opção */}
              {campo.placeholder && (
                <option value="" disabled>
                  {campo.placeholder}
                </option>
              )}
              {/* Opções do select */}
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
              defaultValue={valoresIniciais ? valoresIniciais[campo.id] : ""}
            />
          ) : (
            <input
              id={campo.id}
              type={campo.type === "password" && mostrarSenha ? "text" : campo.type} // Alterna entre texto e senha
              {...register(campo.id as Path<T>, campo.validation)}
              placeholder={campo.placeholder}
              className="formulario-campo"
              defaultValue={valoresIniciais ? valoresIniciais[campo.id] : ""}
            />
          )}

          {/* Checkbox para mostrar/ocultar senha (exibido somente para campo do tipo senha) */}
          {campo.type === "password" && (
            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="mostrarSenha"
                checked={mostrarSenha}
                onChange={() => setMostrarSenha((prev) => !prev)}
                className="form-checkbox"
              />
              <label htmlFor="mostrarSenha" className="text-sm">
                Mostrar senha
              </label>
            </div>
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