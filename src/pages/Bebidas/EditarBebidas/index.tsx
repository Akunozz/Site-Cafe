import { useState } from "react";
import { fileToBase64 } from "../../../utils/imageUtils";
import Formulario from "../../../components/FormularioLayout";
import PageLayout from "../../../components/PageLayout";
import { z } from "zod";
import BebidaService from "../../../services/BebidaService";
import { bebidaEditarSchema } from "../../../schemas/bebidaEditarSchema";

type Campo<T> = {
    id: keyof T;
    label: string;
    type: "text" | "password" | "select" | "file" | "number";
    placeholder?: string;
    options?: { value: string; label: string }[];
};

//verificação com zod
type BebidaForm = z.infer<typeof bebidaEditarSchema>;

const EditarBebida = () => {
    const urlSegments = window.location.pathname.split("/");
    const id = urlSegments[urlSegments.length - 1];
    const [mensagem, setMensagem] = useState<string | null>(null);

    // Configuração dos campos do formulário
    const campos: Campo<BebidaForm>[] = [
        {
            id: "nome", label: "Nome", type: "text", placeholder: "Digite o nome da bebida",
        },
        {
            id: "preco", label: "Preço", type: "number", placeholder: "Digite o preço da bebida",
        },
        {
            id: "imagem", label: "Imagem", type: "file",
        },
        {
            id: "status", label: "Status", type: "select", placeholder: "Selecione um status",
            options: [
                { value: "Ativo", label: "Ativo" },
                { value: "Inativo", label: "Inativo" },
            ],
        }
    ];

    // Função de envio do formulário
    const handleSubmit = async (data: BebidaForm) => {
        let base64Image = "";
        if (data.imagem) {
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
            ...data,
            imagem: base64Image || undefined,
            status: data.status as "Ativo" | "Inativo",
        };

        try {
            const response = await BebidaService.putEditarDados(id!, payload);
            if (response) {
                setMensagem("Bebida atualizada com sucesso!");
            } else {
                setMensagem("Erro ao atualizar bebida.");
            }
        } catch (error) {
            console.error("Erro ao atualizar bebida:", error);
            setMensagem("Ocorreu um erro ao salvar os dados.");
        }
    };

    return (
        <PageLayout titulo="Editar Bebida" rota="/listagem-bebidas">
            <Formulario campos={campos} onSubmit={handleSubmit} />
            {mensagem && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                    {mensagem}
                </div>
            )}
        </PageLayout>
    );
};

export default EditarBebida;