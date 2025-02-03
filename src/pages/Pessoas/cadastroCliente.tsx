import { useState, useEffect } from "react";
import { fileToBase64 } from "../../utils/imageUtils";
import Formulario from "../../components/FormularioLayout/formularioLayout";
import PageLayout from "../../components/PageLayoutCadastro/pageLayout";
import { z } from "zod";
import pessoaService from "../../services/PessoaService";
import SetorService from "../../services/SetorService";
import { pessoaSchema } from "../../schemas/pessoaSchema";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

//Validação com Zod
type PessoaForm = z.infer<typeof pessoaSchema>;

const TelaCadastro = () => {
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<boolean | null>(null);
  const [setores, setSetores] = useState<{ id: string; nome: string }[]>([]); // Lista de setores
  const [erros, setErros] = useState<Record<string, string>>({});

  // Carregar setores ao montar o componente
  useEffect(() => {
    async function fetchSetores() {
      try {
        const response = await SetorService.getListarDados(); // Chama a API para listar setores
        setSetores(response);
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
        alert("Não foi possível carregar os setores.");
      }
    }
    fetchSetores();
  }, []);

  //Campos do Formulário
  const campos: Campo<PessoaForm>[] = [
    { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome" },
    {
      id: "setor_id", label: "Setor", type: "select", placeholder: "Selecione um setor",
      options: setores.map((setor) => ({
        value: setor.id,
        label: setor.nome,
      })),
    },
    {
      id: "imagem", label: "Imagem", type: "file",
    },
    { id: "usuario", label: "Usuário", type: "text", placeholder: "Digite o usuário" },
    { id: "senha", label: "Senha", type: "password", placeholder: "Digite a senha" },
    {
      id: "permissao", label: "Permissão", type: "select", placeholder: "Selecione uma permissão",
      options: [
        { value: "ADMIN", label: "Administrador" },
        { value: "USER", label: "Usuário Comum" },
        { value: "AUX", label: "Auxiliar" },
      ],
    },
    { id: "status", label: "Status", type: "select", placeholder: "Selecione um status",
      options: [
        { value: "Ativo", label: "Ativo" },
        { value: "Inativo", label: "Inativo" },
      ]}
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
        const fileInput = (document.getElementById("imagem") as HTMLInputElement)
          .files?.[0];
        if (fileInput) {
          base64Image = await fileToBase64(fileInput);
        }
      }

      const payload = {
        ...validData,
        permissao: validData.permissao as "ADMIN" | "USER" | "AUX",
        status: validData.status as "Ativo" | "Inativo",
        imagem: base64Image as `data:image/${string};base64,${string}` || "",
      };

      const response = await pessoaService.postAdicionarDados(payload);
      if (response) {
        setMensagem("Cliente cadastrado com sucesso!");
        setMensagemSucesso(true); // Mensagem de sucesso
      } else {
        setMensagem("Erro ao cadastrar cliente.");
        setMensagemSucesso(false); // Mensagem de erro
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Mapeia os erros para o estado
        const errosMap = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as Record<string, string>);
        setErros(errosMap); // Atualiza os erros no estado
      } else {
        console.error("Erro ao cadastrar cliente:", error);
        setMensagem("Ocorreu um erro ao salvar os dados.");
        setMensagemSucesso(false); // Mensagem de erro
      }
    }
  };


  return (
    <PageLayout titulo="Cadastro de Cliente" rota="/listagem-clientes">
      <Formulario campos={campos} onSubmit={(data) => handleSubmit(data)} erros={erros} />
      {mensagem && (
        <div
          className={`mt-4 p-4 rounded-lg ${mensagemSucesso ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
        >
          {mensagem}
        </div>
      )}
    </PageLayout>
  );
}

export default TelaCadastro;