import { useState, useEffect } from "react";
import { fileToBase64 } from "../../../utils/imageUtils";
import Formulario from "../../../components/FormularioLayout/formularioLayout";
import PageLayout from "../../../components/PageLayout/pageLayout";
import { z } from "zod";
import pessoaService from "../../../services/PessoaService";
import SetorService from "../../../services/SetorService";
import { pessoaSchema } from "../../../schemas/pessoaSchema";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

//verificação com zod
type PessoaForm = z.infer<typeof pessoaSchema>;

const EditarCliente = () => {
  const urlSegments = window.location.pathname.split("/");
  const id = urlSegments[urlSegments.length - 1];
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<boolean | null>(null);
  const [setores, setSetores] = useState<{ id: string; nome: string }[]>([]);
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

  // Configuração dos campos do formulário
  const campos: Campo<PessoaForm>[] = [
    { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome da pessoa" },
    { id: "setor_id", label: "Setor", type: "select", placeholder: "Selecione um setor",
      options: setores.map((setor) => ({
        value: setor.id,
        label: setor.nome,
      }))},
    { id: "imagem", label: "Imagem", type: "file" },
    { id: "usuario", label: "Usuário", type: "text", placeholder: "Digite o nome de usuário" },
    { id: "senha", label: "Senha", type: "password", placeholder: "Digite a senha" },
    { id: "permissao", label: "Permissão", type: "select", placeholder: "Selecione uma permissão",
      options: [
        { value: "ADMIN", label: "Administrador" },
        { value: "USER", label: "Usuário" },
        { value: "AUX", label: "Auxiliar" },
      ],
    },
  ];

  // Função de envio do formulário
  const handleSubmit = async (data: any) => {
    try {
      //limpa os erros do zod e a mensagem
      setMensagem(null);
      setMensagemSucesso(null);
      setErros({});
      // Valida os dados usando o Zod
      const validData = pessoaSchema.parse(data);

      let base64Image = "";
      if (validData.imagem) {
        const fileInput = (document.getElementById("imagem") as HTMLInputElement)
          .files?.[0];
        if (fileInput) {
          if (fileInput.size > 1 * 1024 * 1024) {
            alert("A imagem deve ter no máximo 1MB.");
            return;
          }
          base64Image = await fileToBase64(fileInput);
        }
      }

      const payload = {
        ...validData,
        permissao: validData.permissao as "ADMIN" | "USER" | "AUX",
        imagem: base64Image || undefined,
      };

      const response = await pessoaService.putEditarDados(id!, payload);
      if (response) {
        setMensagem("Cliente atualizado com sucesso!");
        setMensagemSucesso(true); // Mensagem de sucesso
      } else {
        setMensagem("Erro ao atualizar cliente.");
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
    <PageLayout titulo="Editar Cliente" rota="/listagem-clientes">
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
};

export default EditarCliente;