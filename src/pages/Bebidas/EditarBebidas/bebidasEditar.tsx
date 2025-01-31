import { useState, useEffect } from "react";
import { fileToBase64 } from "../../../utils/imageUtils";
import Formulario from "../../../components/FormularioLayout/formularioLayout";
import PageLayout from "../../../components/PageLayout/pageLayout";
import { z } from "zod";
import BebidaService from "../../../services/BebidaService";
import { bebidaSchema } from "../../../schemas/bebidaSchema";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file" | "number" | "textarea" | "float";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

// Verificação dos campos
type BebidaForm = z.infer<typeof bebidaSchema>;

const EditarBebida = () => {
  const urlSegments = window.location.pathname.split("/");
  const id = urlSegments[urlSegments.length - 1];

  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<boolean | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [valoresIniciais, setValoresIniciais] = useState<BebidaForm | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);

  // Buscar os dados da bebida pelo ID
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await BebidaService.getIdDados(id!);
        if (response) {
          setValoresIniciais({
            nome: response.nome,
            preco: response.preco,
            descricao: response.descricao,
            imagem: "",
            status: response.status,
          });

          // Se a bebida já tiver uma imagem, exibir a pré-visualização
          if (response.imagem) {
            setImagemPreview(response.imagem);
          }
        } else {
          alert("Não foi possível carregar os dados da bebida.");
        }
      } catch (error) {
        alert("Erro ao carregar os dados da bebida.");
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
  const campos: Campo<BebidaForm>[] = [
    { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome da bebida" },
    { id: "preco", label: "Preço", type: "float", placeholder: "Digite o preço da bebida" },
    { id: "descricao", label: "Descrição", type: "textarea", placeholder: "Digite uma descrição" },
    { id: "imagem", label: "Imagem", type: "file" },
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
    console.log("Dados enviados pelo formulário:", data);
    try {
      setMensagem(null);
      setMensagemSucesso(null);
      setErros({});

      // Validação com Zod
      const validData = bebidaSchema.parse({ ...data });

      let base64Image = imagemPreview || "";
      if (validData.imagem) {
        const fileInput = (document.getElementById("imagem") as HTMLInputElement).files?.[0];
        if (fileInput) {
          base64Image = await fileToBase64(fileInput);
        }
      }

      const payload = {
        ...validData,
        imagem: base64Image as `data:image/${string};base64,${string}` || "",
        status: validData.status as "Ativo" | "Inativo",
      };

      const response = await BebidaService.putEditarDados(id!, payload);
      console.log("Dados enviados para API:", response);

      if (response) {
        setMensagem("Bebida atualizada com sucesso!");
        setMensagemSucesso(true);
      } else {
        setMensagem("Erro ao atualizar bebida.");
        setMensagemSucesso(false);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErros(fieldErrors);
      } else {
        console.error("Erro ao atualizar bebida:", error);
        setMensagem("Ocorreu um erro ao salvar os dados.");
        setMensagemSucesso(false);
      }
    }
  };

  return (
    <PageLayout titulo="Editar Bebida" rota="/listagem-bebidas">
      {/* Pré-visualização da imagem selecionada */}
      {imagemPreview && (
        <div className="mt-4 flex flex-col justify-center items-center gap-2">
          <img
            src={imagemPreview}
            alt="Pré-visualização da bebida"
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

export default EditarBebida;
