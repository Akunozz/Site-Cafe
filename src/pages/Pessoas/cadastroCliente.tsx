import { useState, useEffect } from "react";
import { fileToBase64 } from "../../utils/imageUtils";
import Formulario from "../../components/FormularioLayout/formularioLayout";
import PageLayout from "../../components/PageLayoutCadastro/pageLayout";
import { z } from "zod";
import pessoaService from "../../services/PessoaService";
import SetorService from "../../services/SetorService";
import { pessoaSchema } from "../../schemas/pessoaSchema";
import ISetores from "@/interfaces/ISetores";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file";
  placeholder?: string;
  options?: { value: string; label: string }[];
  children?: React.ReactNode;
};

// Validação com Zod
type PessoaForm = z.infer<typeof pessoaSchema>;

const cadastroCliente = () => {
  const [setores, setSetores] = useState<ISetores[]>([]); // Lista de setores
  const [erros, setErros] = useState<Record<string, string>>({});
  const [novoSetor, setNovoSetor] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Carregar setores ao montar o componente
  useEffect(() => {
    async function fetchSetores() {
      try {
        const response = await SetorService.getListarDados();
        setSetores(response);
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
        alert("Não foi possível carregar os setores.");
      }
    }
    fetchSetores();
  }, []);

  // Função para cadastrar novo setor no popover
  const handleCadastrarSetor = async () => {
    if (!novoSetor.trim()) return;

    const setorCriado = await SetorService.postAdicionarDados({
      nome: novoSetor,
    });
    if (setorCriado) {
      // Atualiza a lista de setores
      setSetores((prev) => [...prev, setorCriado]);
      setNovoSetor("");
      setIsPopoverOpen(false);
      toast.success("Setor cadastrado com sucesso!");
    }
};

const popoverNovoSetor = (
  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
    <PopoverTrigger asChild>
      <Button size="sm" className="p-4 bg-azuljava hover:bg-laranjajava">
        Cadastrar novo setor
      </Button>
    </PopoverTrigger>
    <PopoverContent className="p-4 space-y-2">
      <label className="block text-sm font-medium text-laranjajava">Nome do setor</label>
      <input
        type="text"
        value={novoSetor}
        onChange={(e) => setNovoSetor(e.target.value)}
        className="formulario-campo"
      />
      <Button className="bg-azuljava hover:bg-laranjajava" onClick={handleCadastrarSetor}>Salvar</Button>
    </PopoverContent>
  </Popover>
);

// Campos do Formulário
const campos: Campo<PessoaForm>[] = [
  { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome" },
  {
    id: "setor_id",
    label: "Setor",
    type: "select",
    placeholder: "Selecione um setor",
    options: setores.map((setor) => ({
      value: setor.id,
      label: setor.nome,
    })),
    children: popoverNovoSetor,
  },
  {
    id: "imagem",
    label: "Imagem",
    type: "file",
  },
  { id: "usuario", label: "Usuário", type: "text", placeholder: "Digite o usuário" },
  { id: "senha", label: "Senha", type: "password", placeholder: "Digite a senha" },
  {
    id: "permissao",
    label: "Permissão",
    type: "select",
    placeholder: "Selecione uma permissão",
    options: [
      { value: "ADMIN", label: "Administrador" },
      { value: "USER", label: "Usuário Comum" },
      { value: "AUX", label: "Auxiliar" },
    ],
  },
  {
    id: "status",
    label: "Status",
    type: "select",
    placeholder: "Selecione um status",
    options: [
      { value: "Ativo", label: "Ativo" },
      { value: "Inativo", label: "Inativo" },
    ],
  },
];

// Função de envio do formulário
const handleSubmit = async (data: any) => {
  try {
    // Limpa os erros anteriores
    setErros({});
    // Valida os dados usando o Zod
    const validData = pessoaSchema.parse(data);

    let base64Image = "";
    if (validData.imagem) {
      const fileInput = document.getElementById("imagem") as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        base64Image = await fileToBase64(file);
      }
    }

    const payload = {
      ...validData,
      permissao: validData.permissao as "ADMIN" | "USER" | "AUX",
      status: validData.status as "Ativo" | "Inativo",
      imagem: (base64Image as `data:image/${string};base64,${string}`) || "",
    };

    const response = await pessoaService.postAdicionarDados(payload);
    if (response) {
      toast.success("Cliente cadastrado com sucesso!");
    } else {
     toast.error("Erro ao cadastrar cliente.")
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errosMap = error.errors.reduce((acc, err) => {
        acc[String(err.path[0])] = err.message;
        return acc;
      }, {} as Record<string, string>);
      setErros(errosMap);
    } else {
      toast.error("Ocorreu um erro ao salvar os dados.");
      
    }
  }
};

return (
  <PageLayout titulo="Cadastro de Cliente" rota="/listagem-clientes">
    <Formulario campos={campos} onSubmit={handleSubmit} erros={erros} />
  </PageLayout>
);
};

export default cadastroCliente;