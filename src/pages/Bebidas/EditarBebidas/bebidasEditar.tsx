import { useState, useEffect } from "react";
import { fileToBase64 } from "../../../utils/imageUtils";
import Formulario from "../../../components/FormularioLayout/formularioLayout";
import PageLayout from "../../../components/PageLayout/pageLayout";
import { z } from "zod";
import BebidaService from "../../../services/BebidaService";
import { bebidaSchema } from "../../../schemas/bebidaSchema";
import { Skeleton } from "@/components/ui/skeleton"


type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file" | "number" | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

//verificação dos campos
type BebidaForm = z.infer<typeof bebidaSchema>;

const EditarBebida = () => {
  const urlSegments = window.location.pathname.split("/");
  const id = urlSegments[urlSegments.length - 1];
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<boolean | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [valoresIniciais, setValoresIniciais] = useState<BebidaForm | null>(null);

    // Buscar os dados do cliente pelo ID
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
              quantidade: response.quantidade,
              status: response.status,
            });
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

  // Configuração dos campos do formulário
  const campos: Campo<BebidaForm>[] = [
    { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome da bebida" },
    { id: "preco", label: "Preço", type: "number", placeholder: "Digite o preço da bebida" },
    { id: "descricao", label:"Descrição", type: "textarea", placeholder: "Digite uma descrição"},
    { id: "imagem", label: "Imagem", type: "file" },
    { id: "status", label: "Status", type: "select", placeholder: "Selecione um status",
      options: [
        { value: "Ativo", label: "Ativo" },
        { value: "Inativo", label: "Inativo" },
      ]}
  ];

  // Função de envio do formulário
  const handleSubmit = async (data: any) => {
    try {
      //limpa os erros do zod e a mensagem
      setMensagem(null);
      setMensagemSucesso(null);
      setErros({});
      // Validação com zod
      const validData = bebidaSchema.parse(data);
      let base64Image = "";
      if (validData.imagem) {
        const fileInput = (document.getElementById("imagem") as HTMLInputElement).files?.[0];
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
        imagem: base64Image as `data:image/${string};base64,${string}` || "",
        status: validData.status as "Ativo" | "Inativo",
      };

      const response = await BebidaService.putEditarDados(id!, payload);
      if (response) {
        setMensagem("Bebida atualizada com sucesso!");
        setMensagemSucesso(true);
      } else {
        setMensagem("Erro ao atualizar bebida.");
        setMensagemSucesso(false);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Mapear os erros do zod
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErros(fieldErrors); // Define erros para exibição no formulário
      } else {
        console.error("Erro ao atualizar bebida:", error);
        setMensagem("Ocorreu um erro ao salvar os dados.");
        setMensagemSucesso(false);
      }
    }
  };

  return (
    <PageLayout titulo="Editar Bebida" rota="/listagem-bebidas">
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
        <div
          className={`mt-4 p-4 rounded-lg ${
            mensagemSucesso ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {mensagem}
        </div>
      )}
    </PageLayout>
  );
};

export default EditarBebida;