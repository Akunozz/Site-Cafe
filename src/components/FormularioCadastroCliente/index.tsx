import Formulario from "../FormularioLayout";
import { z } from "zod";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "number" | "date" | "text" | "password" | "select" | "email" | "file" | "checkbox" | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

const pessoaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  setor: z.string().min(1, "Setor é obrigatório"),
  usuario: z.string().min(1, "Usuário é obrigatório"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  permissao: z.enum(["ADMIN", "USER", "AUX"]),
});

type PessoaForm = z.infer<typeof pessoaSchema>;

const CadastroCliente = () => {
  const campos: Campo<PessoaForm>[] = [
    { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome" },
    { id: "setor", label: "Setor", type: "text", placeholder: "Digite o setor" },
    { id: "usuario", label: "Usuário", type: "text", placeholder: "Digite o usuário" },
    { id: "senha", label: "Senha", type: "password", placeholder: "Digite a senha" },
    {
      id: "permissao",
      label: "Permissão",
      type: "select",
      options: [
        { value: "ADMIN", label: "Administrador" },
        { value: "USER", label: "Usuário Comum" },
        { value: "AUX", label: "Auxiliar" },
      ],
    },
  ];

  const handleSubmit = (data: PessoaForm) => {
    console.log("Dados enviados:", data);
    // Faça o envio para o backend aqui
  };

  return <Formulario campos={campos} onSubmit={handleSubmit} />;
};

export default CadastroCliente;
