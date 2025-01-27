import { useState, useEffect } from "react";
import Formulario from "../../../components/FormularioLayout";
import PageLayout from "../../../components/PageLayout";
import pedidoService from "../../../services/PedidoService";
import bebidaService from "../../../services/BebidaService";
import PessoaService from "../../../services/PessoaService";
import { z } from "zod";
import { pedidosEditarSchema } from "../../../schemas/pedidosEditarSchema";

type Campo<T> = {
    id: keyof T;
    label: string;
    type: "text" | "number" | "select";
    placeholder?: string;
    options?: { value: number; label: string }[];
};

// Verificação com Zod
type PedidoForm = z.infer<typeof pedidosEditarSchema>;

const EditarPedido = () => {
    const urlSegments = window.location.pathname.split("/");
    const id = urlSegments[urlSegments.length - 1];
    const [mensagem, setMensagem] = useState<string | null>(null);
    const [bebidas, setBebidas] = useState<{ id: number; nome: string; preco: number }[]>([]);
    const [clienteNome, setClienteNome] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Buscar dados do pedido
                const pedidoResponse = await pedidoService.getIdDados(id!);
                console.log("Pedido recebido:", pedidoResponse); // Log do pedido completo
    
                // Obter o cliente diretamente do pedidoResponse
                if (pedidoResponse?.cliente) {
                    const clienteId = pedidoResponse.cliente.id; // Acessa o ID do cliente
                    console.log("Cliente ID encontrado:", clienteId); // Log do cliente ID
    
                    // Buscar dados do cliente usando o ID
                    const clienteResponse = await PessoaService.getIdDados(String(clienteId));
                    setClienteNome(clienteResponse?.nome || "Cliente não encontrado");
                } else {
                    console.warn("Dados do cliente ausentes no pedido.");
                    setClienteNome("Cliente não encontrado");
                }
    
                // Buscar dados das bebidas
                const bebidasResponse = await bebidaService.getListarDados();
                setBebidas(
                    bebidasResponse.map((bebida) => ({
                        ...bebida,
                        id: Number(bebida.id),
                    }))
                );
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                alert("Erro ao carregar dados.");
            }
        }
    
        fetchData();
    }, [id]);
    

    // Configuração dos campos do formulário
    const campos: Campo<PedidoForm>[] = [
        {
            id: "bebida_id", label: "Bebida", type: "select", placeholder: "Selecione uma bebida",
            options: bebidas.map((bebida) => ({
                value: bebida.id,
                label: bebida.nome,
            })),
        },
        {
            id: "quantidade", label: "Quantidade", type: "number", placeholder: "Digite a quantidade",
        },
    ];

    // Função de envio do formulário
    const handleSubmit = async (data: PedidoForm) => {
        // Encontre a bebida selecionada pelo ID
        const bebidaSelecionada = bebidas.find((bebida) => bebida.id === Number(data.bebida_id));
        const unitario = bebidaSelecionada?.preco || 0;
        // Calcule o total
        const total = unitario * data.quantidade;
        const payload = {
            ...data,
            unitario,
            total,
        };
        try {
            const response = await pedidoService.putEditarDados(id!, payload);
            if (response) {
                setMensagem("Pedido atualizado com sucesso!");
            } else {
                setMensagem("Erro ao atualizar pedido.");
            }
        } catch (error) {
            console.error("Erro ao atualizar pedido:", error);
            setMensagem("Ocorreu um erro ao salvar os dados.");
        }
    };

    return (
        <PageLayout titulo="Editar Pedido" rota="/listagem-pedidos">
            {clienteNome && (
                <div className="mb-4 p-4 bg-blue-100 rounded-lg">
                    Cliente: <strong>{clienteNome}</strong>
                </div>
            )}
            <Formulario campos={campos} onSubmit={handleSubmit}/>
            {mensagem && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                    {mensagem}
                </div>
            )}
        </PageLayout>
    );
};

export default EditarPedido;