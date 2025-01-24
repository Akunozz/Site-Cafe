import Formulario from "../FormularioLayout";
import { z } from "zod";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "number" | "date" | "text" | "password" | "select" | "file" | "checkbox" | "textarea";
  placeholder?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  options?: { value: string; label: string }[];
  validation?: { valueAsNumber?: boolean };
};

// Schema de validação usando Zod
const bebidaSchema = z.object({
  bebidaId: z.string().min(1, "Selecione uma bebida"),
  foto: z.string().optional(),
  nome: z.string().min(1, "Digite o nome da bebida"),
  descricao: z.string().optional(),
  preco: z.number().optional(),
  status: z.boolean().optional(),
});

type BebidaForm = z.infer<typeof bebidaSchema>;

const CadastroBebidas = () => {
  const campos: Campo<BebidaForm>[] = [
    { id: "foto", label: "Foto", type: "file" },
    { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome da bebida" },
    { id: "descricao", label: "Descrição", type: "textarea", placeholder: "Descrição da bebida" },
    { id: "preco", label: "Preço", type: "number", placeholder: "Digite o preço" },
    { id: "status", label: "Ativo", type: "checkbox"},
  ];

  const handleSubmit = (data: BebidaForm) => {
    console.log("Dados enviados:", data);
  };

  return <Formulario campos={campos} onSubmit={handleSubmit} />;
};

export default CadastroBebidas;