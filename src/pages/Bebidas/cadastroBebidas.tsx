import { useState } from "react";
import { fileToBase64 } from "../../utils/imageUtils";
import Formulario from "../../components/FormularioLayout/formularioLayout";
import PageLayout from "../../components/PageLayout/pageLayout";
import { z } from "zod";
import bebidaService from "../../services/BebidaService";
import { bebidaSchema } from "../../schemas/bebidaSchema";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "number" | "text" | "file" | "checkbox" | "textarea" | "select" | "float";
  placeholder?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  options?: { value: string; label: string }[];
  validation?: { valueAsNumber?: boolean };
};

//verificação dos campos
type BebidaForm = z.infer<typeof bebidaSchema>;

const CadastroBebidas = () => {
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<boolean | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  
  const campos: Campo<BebidaForm>[] = [
    { id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome da bebida" },
    { id: "imagem", label: "Imagem", type: "file" },
    { id: "descricao", label: "Descrição", type: "textarea", placeholder: "Descrição da bebida" },
    { id: "preco", label: "Preço", type: "float", placeholder: "Digite o preço" },
    { id: "status", label: "Status", type: "select", placeholder: "Selecione um status",
      options: [
        { value: "Ativo", label: "Ativo" },
        { value: "Inativo", label: "Inativo" },
      ]}
  ];

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

      const response = await bebidaService.postAdicionarDados(payload);
      if (response) {
        setMensagem("Bebida cadastrada com sucesso!");
        setMensagemSucesso(true);
      } else {
        setMensagem("Erro ao cadastrar bebida.");
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
        setErros(fieldErrors);
      } else {
        console.error("Erro ao cadastar bebida:", error);
        setMensagem("Ocorreu um erro ao salvar os dados.");
        setMensagemSucesso(false);
      }
    }
  };

  return (
    <PageLayout titulo="Cadastro de Bebida" rota="/listagem-bebidas">
      <Formulario campos={campos} onSubmit={(data) => handleSubmit(data)} erros={erros} />
      {mensagem && (
        <div
          className={`mt-4 p-4 rounded-lg ${mensagemSucesso ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {mensagem}
        </div>
      )}
    </PageLayout>
  );
}

export default CadastroBebidas;