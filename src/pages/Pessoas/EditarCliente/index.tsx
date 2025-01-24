import { useState } from "react";
import imageCompression from "browser-image-compression";
import Formulario from "../../../components/FormularioLayout";
import PageLayout from "../../../components/PageLayout";
import { z } from "zod";
import pessoaService from "../../../services/PessoaService";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

// Schema de validação com Zod
const pessoaEditarSchema = z.object({
  nome: z.string(),
  imagem: z.string().optional(),
  usuario: z.string(),
  senha: z.string(),
  permissao: z.string()
});

type PessoaForm = z.infer<typeof pessoaEditarSchema>;

const EditarCliente = () => {
  const urlSegments = window.location.pathname.split("/");
  const id = urlSegments[urlSegments.length - 1]; // Última parte da URL é o ID
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Configuração dos campos do formulário
  const campos: Campo<PessoaForm>[] = [
    {
      id: "nome",
      label: "Nome",
      type: "text",
      placeholder: "Digite o nome da pessoa",
    },
    {
      id: "imagem",
      label: "Imagem",
      type: "file",
    },
    {
      id: "usuario",
      label: "Usuário",
      type: "text",
      placeholder: "Digite o nome de usuário",
    },
    {
      id: "senha",
      label: "Senha",
      type: "password",
      placeholder: "Digite a senha",
    },
    {
      id: "permissao",
      label: "Permissão",
      type: "select",
    },
  ];

  const fileToBase64 = async (file: File): Promise<string> => {
    // Configurações de compactação
    const options = {
      maxSizeMB: 1, // Tamanho máximo do arquivo em MB
      maxWidthOrHeight: 1024, // Largura ou altura máxima
      useWebWorker: true, // Usa Web Workers para melhorar o desempenho
    };
    try {
      // Compacta a imagem
      const compressedFile = await imageCompression(file, options);
      // Converte para Base64
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.readAsDataURL(compressedFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    } catch (error) {
      console.error("Erro ao compactar imagem:", error);
      throw error;
    }
  };

  // Função de envio do formulário
  const handleSubmit = async (data: PessoaForm) => {
    let base64Image = "";
    // Converte a imagem para Base64 se o arquivo for selecionado
    if (data.imagem) {
      const fileInput = (document.getElementById("imagem") as HTMLInputElement)
        .files?.[0];
      if (fileInput) {
        if (fileInput.size > 1 * 1024 * 1024) { // 1 MB
          alert("A imagem deve ter no máximo 1MB.");
          return;
        }
        base64Image = await fileToBase64(fileInput);
      }
    }

    const payload = {
      ...data,
      imagem: base64Image || undefined, // Substitui a imagem pelo Base64 ou a mantém como undefined
    };

    try {
      const response = await pessoaService.putEditarDados(id!, payload);
      if (response) {
        setMensagem("Cliente atualizado com sucesso!");
      } else {
        setMensagem("Erro ao atualizar cliente.");
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      setMensagem("Ocorreu um erro ao salvar os dados.");
    }
  };

  return (
    <PageLayout titulo="Editar Cliente">
      <Formulario campos={campos} onSubmit={handleSubmit} />
      {mensagem && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {mensagem}
        </div>
      )}
    </PageLayout>
  );
};

export default EditarCliente;
