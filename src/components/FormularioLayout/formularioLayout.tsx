import { useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Path,
  DefaultValues,
  FieldValues,
  Controller,
} from "react-hook-form";
import { fileToBase64 } from "@/utils/imageUtils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Select from "react-select";
import { Input } from "@/components/ui/input"

interface Campo {
  id: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "file"
    | "number"
    | "checkbox"
    | "date"
    | "textarea"
    | "select"
    | "float";
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  validation?: object;
  /**
   * Conteúdo opcional para renderizar logo abaixo do campo (ex: um popover).
   */
  children?: React.ReactNode;
}

interface FormularioProps<T extends FieldValues> {
  campos: Campo[];
  onSubmit: SubmitHandler<T>;
  erros?: Record<string, string>;
  valoresIniciais?: DefaultValues<T>;
}

function Formulario<T extends FieldValues>({
  campos,
  onSubmit,
  erros = {},
  valoresIniciais,
}: FormularioProps<T>) {
  const { register, handleSubmit, setValue, control } = useForm<T>({
    defaultValues: valoresIniciais as DefaultValues<T>,
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [precoFixo, setPrecoFixo] = useState(false);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  // Ao carregar, atualiza os valores iniciais (e a imagem se existir)
  useEffect(() => {
    if (valoresIniciais) {
      Object.keys(valoresIniciais).forEach((key) => {
        setValue(key as Path<T>, valoresIniciais[key]);
      });

      if ((valoresIniciais as any).imagem) {
        setImagemPreview((valoresIniciais as any).imagem);
      }
    }
  }, [valoresIniciais, setValue]);

  // Exemplo para fixar preço
  useEffect(() => {
    if (precoFixo) {
      setValue("preco" as Path<T>, 2.3 as any);
    }
  }, [precoFixo, setValue]);

  // Ao selecionar arquivo, converte para base64
  const handleImagemSelecionada = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setImagemPreview(base64);
    }
  };

  const handleRemoverImagem = () => {
    setImagemPreview(null);
    setValue("imagem" as Path<T>, "" as any);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {campos.map((campo) => (
        <div key={campo.id}>
          <label className="formulario-label" htmlFor={campo.id}>
            {campo.label}:
          </label>

          {/* Se for SELECT */}
          {campo.type === "select" ? (
            <>
              <Controller
                name={campo.id as Path<T>}
                control={control}
                rules={campo.validation}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={campo.options}
                    placeholder={campo.placeholder || "Selecione..."}
                    onChange={(option) => field.onChange(option?.value ?? "")}
                    value={
                      campo.options?.find(
                        (o) => o.value === field.value
                      ) || null
                    }
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        padding: 2,
                        borderColor: "#F3931B",
                        borderWidth: "1px",
                        borderRadius: "0.5rem",
                        boxShadow: state.isFocused
                          ? "0 0 0 1px #F3931B"
                          : "none",
                        "&:hover": {
                          borderColor: "#F3931B",
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "#F3931B"
                          : state.isFocused
                          ? "#fed7aa"
                          : "#FFF",
                        color: "#000",
                        cursor: "pointer",
                      }),
                    }}
                  />
                )}
              />
              {/* Se existir children (ex: popover), renderiza abaixo */}
              {campo.children && <div className="mt-2">{campo.children}</div>}
            </>
          ) : campo.type === "textarea" ? (
            <textarea
              id={campo.id}
              {...register(campo.id as Path<T>, campo.validation)}
              placeholder={campo.placeholder}
              className="formulario-campo"
              defaultValue={valoresIniciais ? valoresIniciais[campo.id] : ""}
            />
          ) : campo.type === "float" ? (
            <>
              <input
                id={campo.id}
                type="number"
                step="0.01"
                {...register(campo.id as Path<T>, campo.validation)}
                placeholder={campo.placeholder}
                className="formulario-campo"
                disabled={precoFixo}
              />
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="precoFixo"
                  checked={precoFixo}
                  onChange={() => setPrecoFixo(!precoFixo)}
                  className="form-checkbox"
                />
                <label htmlFor="precoFixo" className="text-sm">
                  Definir preço padrão (R$ 2,30)
                </label>
              </div>
            </>
          ) : campo.type === "file" ? (
            <>
              <Input
                id={campo.id}
                type="file"
                accept="image/*"
                {...register(campo.id as Path<T>)}
                onChange={handleImagemSelecionada}
                className="formulario-campo"
              />
              {imagemPreview && (
                <div className="mt-2 flex flex-col items-center gap-2">
                  <span className="text-gray-500 text-sm">
                    Pré-visualização da imagem
                  </span>
                  <img
                    src={imagemPreview}
                    alt="Pré-visualização"
                    className="w-36 h-36 rounded-md shadow-md"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-2 flex items-center gap-2"
                    onClick={handleRemoverImagem}
                    type="button"
                  >
                    <Trash2 size={16} /> Remover Imagem
                  </Button>
                </div>
              )}
            </>
          ) : (
            // Campos de texto, password, etc.
            <input
              id={campo.id}
              type={
                campo.type === "password" && mostrarSenha
                  ? "text"
                  : campo.type
              }
              {...register(campo.id as Path<T>, campo.validation)}
              placeholder={campo.placeholder}
              className="formulario-campo"
              defaultValue={valoresIniciais ? valoresIniciais[campo.id] : ""}
            />
          )}

          {/* Checkbox para mostrar/ocultar senha */}
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

          {/* Mensagem de erro abaixo do campo */}
          {erros[campo.id] && (
            <p className="text-red-500 text-sm">{erros[campo.id]}</p>
          )}
        </div>
      ))}
      <div className="flex justify-center">
        <Button
          className="w-1/2 bg-azuljava text-white py-3 font-medium rounded-lg hover:bg-laranjajava transition duration-300"
          size="lg"
          type="submit"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}

export default Formulario;