import { useState, useEffect } from "react";
import { fileToBase64 } from "../../../utils/imageUtils";
import Formulario from "../../../components/FormularioLayout/formularioLayout";
import PageLayout from "../../../components/PageLayout/pageLayout";
import { z } from "zod";
import pessoaService from "../../../services/PessoaService";
import SetorService from "../../../services/SetorService";
import { pessoaSchema } from "../../../schemas/pessoaSchema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

// Verificação com Zod
type PessoaForm = z.infer<typeof pessoaSchema>;

const EditarCliente = () => {
  const urlSegments = window.location.pathname.split("/");
  const id = urlSegments[urlSegments.length - 1];

  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<boolean | null>(null);
  const [setores, setSetores] = useState<{ id: string; nome: string }[]>([]);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [valoresIniciais, setValoresIniciais] = useState<PessoaForm | null>(null);

  // Carregar setores ao montar o componente
  useEffect(() => {
    async function fetchSetores() {
      try {
        const response = await SetorService.getListarDados();
        setSetores(response);
      } catch (error) {
        alert("Não foi possível carregar os setores.");
      }
    }
    fetchSetores();
  }, []);

  // Buscar os dados do cliente pelo ID
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await pessoaService.getIdDados(id!);
        if (response) {
          setValoresIniciais({
            nome: response.nome,
            setor_id: response.setor.id,
            imagem: "",
            usuario: response.usuario,
            senha: "",
            permissao: response.permissao,
            status: response.status
          });

          if (response.imagem) {
            setImagemPreview(response.imagem);
          }
        } else {
          alert("Não foi possível carregar os dados do cliente.");
        }
      } catch (error) {
        alert("Não foi possível carregar os dados do cliente.");
      }
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  // Função para excluir a imagem
  const handleExcluirImagem = () => {
    setImagemPreview(null); // Remove a pré-visualização
    setValoresIniciais((prev) => prev ? { ...prev, imagem: "" } : prev); // Atualiza o estado removendo a imagem
  };

  // Configuração dos campos do formulário
  const campos: Campo<PessoaForm>[] = [
    { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome da pessoa" },
    {
      id: "setor_id",
      label: "Setor",
      type: "select",
      placeholder: "Selecione um setor",
      options: setores.map((setor) => ({
        value: setor.id,
        label: setor.nome,
      })),
    },
    { id: "imagem", label: "Imagem", type: "file" },
    { id: "usuario", label: "Usuário", type: "text", placeholder: "Digite o nome de usuário" },
    { id: "senha", label: "Senha", type: "password", placeholder: "Digite a senha" },
    {
      id: "permissao",
      label: "Permissão",
      type: "select",
      placeholder: "Selecione uma permissão",
      options: [
        { value: "ADMIN", label: "Administrador" },
        { value: "USER", label: "Usuário" },
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
    }
  ];

  // Função de envio do formulário
  const handleSubmit = async (data: any) => {
    try {
      setMensagem(null);
      setMensagemSucesso(null);
      setErros({});

      // Valida os dados usando o Zod
      const validData = pessoaSchema.parse(data);

      let base64Image = imagemPreview || "";
      if (validData.imagem) {
        const fileInput = (document.getElementById("imagem") as HTMLInputElement)?.files?.[0];
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

      const response = await pessoaService.putEditarDados(id!, payload);
      if (response) {
        setMensagem("Cliente atualizado com sucesso!");
        setMensagemSucesso(true);
      } else {
        setMensagem("Erro ao atualizar cliente.");
        setMensagemSucesso(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errosMap = error.errors.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {} as Record<string, string>);
        setErros(errosMap);
      } else {
        console.error("Erro ao cadastrar cliente:", error);
        setMensagem("Ocorreu um erro ao salvar os dados.");
        setMensagemSucesso(false);
      }
    }
  };

  return (
    <PageLayout titulo="Editar Cliente" rota="/listagem-clientes">
      {/* Visualização da imagem atual */}
      {imagemPreview && (
        <div className="mt-4 flex flex-col justify-center items-center gap-2">
          <img
            src={imagemPreview}
            alt="Imagem do cliente"
            className="w-36 h-36 rounded-md shadow-md"
          />
          <span className="text-gray-500 text-sm">Imagem atual</span>
          <Button
            variant="destructive"
            size="sm"
            className="mt-2 flex items-center gap-2"
            onClick={handleExcluirImagem}
            type="button"
          >
            <Trash2 size={16} /> Remover Imagem
          </Button>
        </div>
      )}

      {valoresIniciais ? (
        <Formulario
          campos={campos}
          onSubmit={(data) => handleSubmit(data)}
          erros={erros}
          valoresIniciais={valoresIniciais}
        />
      ) : (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      )}

      {mensagem && (
        <div className={`mt-4 p-4 rounded-lg ${mensagemSucesso ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {mensagem}
        </div>
      )}
    </PageLayout>
  );
};

export default EditarCliente;
