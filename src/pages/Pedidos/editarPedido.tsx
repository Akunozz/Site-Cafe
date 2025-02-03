import { useState, useEffect } from "react";
import Formulario from "../../components/FormularioLayout/formularioLayout";
import PageLayout from "../../components/PageLayout/pageLayout";
import PedidoService from "../../services/PedidoService";
import BebidaService from "../../services/BebidaService";
import PessoaService from "../../services/PessoaService";
import { z } from "zod";
import { pedidosEditarSchema } from "../../schemas/pedidosEditarSchema";
import { Skeleton } from "@/components/ui/skeleton"

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
    const [mensagemSucesso, setMensagemSucesso] = useState<boolean | null>(null);
    const [bebidas, setBebidas] = useState<{ id: number; nome: string; preco: number }[]>([]);
    const [clienteNome, setClienteNome] = useState<string | null>(null);
    const [erros, setErros] = useState<Record<string, string>>({});
    const [valoresIniciais, setValoresIniciais] = useState<PedidoForm | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // Buscar dados do pedido
                const pedidoResponse = await PedidoService.getIdDados(id!);
                
                // Obter o cliente diretamente do pedidoResponse
                if (pedidoResponse?.cliente) {
                    const clienteId = pedidoResponse.cliente.id; // Acessa o ID do cliente

                    // Buscar dados do cliente usando o ID
                    const clienteResponse = await PessoaService.getIdDados(String(clienteId));
                    setClienteNome(clienteResponse?.nome || "Cliente não encontrado");
                } else {
                    setClienteNome("Cliente não encontrado");
                }

                // Buscar dados das bebidas
                const bebidasResponse = await BebidaService.getListarDados();
                setBebidas(
                    bebidasResponse.map((bebida) => ({
                        ...bebida,
                        id: Number(bebida.id),
                    }))
                );

                if (pedidoResponse) {
                    setValoresIniciais({
                        bebida_id: pedidoResponse.bebida?.id ?? 0,
                        quantidade: pedidoResponse.quantidade
                    });
                }
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
        { id: "quantidade", label: "Quantidade", type: "number", placeholder: "Digite a quantidade" },
    ];

    // Função de envio do formulário
    const handleSubmit = async (data: any) => {
        try {
            //limpa os erros do zod e a mensagem
            setMensagem(null);
            setMensagemSucesso(null);
            setErros({});

            const validData = pedidosEditarSchema.parse(data);
            // Encontre a bebida selecionada pelo ID
            const bebidaSelecionada = bebidas.find((bebida) => bebida.id === Number(data.bebida_id));
            const unitario = bebidaSelecionada?.preco || 0;
            // Calcule o total
            const total = unitario * data.quantidade;

            const payload = {
                ...validData,
                unitario,
                total,
            };

            const response = await PedidoService.putEditarDados(id!, payload);
            if (response) {
                setMensagem("Pedido atualizado com sucesso!");
                setMensagemSucesso(true);
            } else {
                setMensagem("Erro ao atualizar pedido.");
                setMensagemSucesso(false);
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
                console.error("Erro ao editar pedido:", error);
                setMensagem("Ocorreu um erro ao salvar os dados.");
                setMensagemSucesso(false); // Mensagem de erro
            }
        }
    };

    return (
        <PageLayout titulo="Editar Pedido" rota="/listagem-pedidos">
            {clienteNome && (
                <div className="mb-4 p-4 bg-blue-100 rounded-lg">
                    Cliente: <strong>{clienteNome}</strong>
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

export default EditarPedido;