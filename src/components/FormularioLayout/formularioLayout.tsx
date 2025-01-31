import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Path, DefaultValues } from "react-hook-form";
import Botao from "../BotaoFormulario/botaoFormulario";
import { FieldValues } from "react-hook-form";
import { fileToBase64 } from "@/utils/imageUtils";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Campo {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "file" | "number" | "checkbox" | "date" | "textarea" | "select" | "float";
  options?: { value: string | number; label: string }[];
  placeholder?: string;
  validation?: object;
}

interface FormularioProps<T extends FieldValues> {
  campos: Campo[];
  onSubmit: SubmitHandler<T>;
  erros?: Record<string, string>;
  valoresIniciais?: DefaultValues<T>;
}

const Formulario = <T extends FieldValues>({
  campos,
  onSubmit,
  erros = {},
  valoresIniciais,
}: FormularioProps<T>) => {
  const { register, handleSubmit, setValue } = useForm<T>({
    defaultValues: valoresIniciais as DefaultValues<T>,
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [precoFixo, setPrecoFixo] = useState(false);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  // Atualiza os valores dos campos ao carregar
  useEffect(() => {
    if (valoresIniciais) {
      Object.keys(valoresIniciais).forEach((key) => {
        setValue(key as Path<T>, valoresIniciais[key]);
      });

      // Exibir imagem inicial, se houver
      if ((valoresIniciais as any).imagem) {
        setImagemPreview((valoresIniciais as any).imagem);
      }
    }
  }, [valoresIniciais, setValue]);

  // Define preço fixo ao marcar checkbox
  useEffect(() => {
    if (precoFixo) {
      setValue("preco" as Path<T>, 2.30 as any);
    }
  }, [precoFixo, setValue]);

  // Atualiza a pré-visualização da imagem ao selecionar um arquivo
  const handleImagemSelecionada = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setImagemPreview(base64);
    }
  };

  // Remove a imagem selecionada
  const handleRemoverImagem = () => {
    setImagemPreview(null);
    setValue("imagem" as Path<T>, "" as any);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {campos.map((campo) => (
        <div key={campo.id}>
          {/* Label do campo */}
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
              defaultValue={valoresIniciais ? valoresIniciais[campo.id] : ""}
            />
          ) : campo.type === "float" ? (
            <>
              {/* Campo de Preço */}
              <input
                id={campo.id}
                type="number"
                step="0.01"
                {...register(campo.id as Path<T>, campo.validation)}
                placeholder={campo.placeholder}
                className="formulario-campo"
                disabled={precoFixo}
              />
              {/* Checkbox para fixar o preço */}
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
              {/* Input de arquivo */}
              <input
                id={campo.id}
                type="file"
                accept="image/*"
                {...register(campo.id as Path<T>)}
                onChange={handleImagemSelecionada}
                className="formulario-campo"
              />

              {/* Pré-visualização da imagem */}
              {imagemPreview && (
                <div className="mt-2 flex flex-col items-center gap-2">
                  <span className="text-gray-500 text-sm">Pré-visualização da imagem</span>
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
            <input
              id={campo.id}
              type={campo.type === "password" && mostrarSenha ? "text" : campo.type}
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