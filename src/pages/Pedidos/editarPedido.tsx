import { useState, useEffect } from "react"
import Formulario from "../../components/FormularioLayout/formularioLayout"
import PageLayout from "../../components/PageLayoutCadastro/pageLayout"
import PedidoService from "../../services/PedidoService"
import BebidaService from "../../services/BebidaService"
import PessoaService from "../../services/PessoaService"
import { z } from "zod"
import { pedidosEditarSchema } from "../../schemas/pedidosEditarSchema"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

type Campo<T> = {
    id: keyof T;
    label: string;
    type: "text" | "number" | "select";
    placeholder?: string;
    options?: { value: number; label: string }[];
};

type PedidoForm = z.infer<typeof pedidosEditarSchema>;

const EditarPedido = () => {
    const urlSegments = window.location.pathname.split("/");
    const id = urlSegments[urlSegments.length - 1];
    const [bebidas, setBebidas] = useState<{ id: number; nome: string; preco: number }[]>([]);
    const [clienteNome, setClienteNome] = useState<string | null>(null);
    const [erros, setErros] = useState<Record<string, string>>({});
    const [valoresIniciais, setValoresIniciais] = useState<PedidoForm | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const pedidoResponse = await PedidoService.getIdDados(id!);
                if (pedidoResponse?.cliente) {
                    const clienteId = pedidoResponse.cliente.id;
                    const clienteResponse = await PessoaService.getIdDados(String(clienteId));
                    setClienteNome(clienteResponse?.nome || "Cliente não encontrado");
                } else {
                    setClienteNome("Cliente não encontrado");
                }

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
                toast.error("Erro ao carregar dados.");
            }
        }

        fetchData();
    }, [id]);

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

    const handleSubmit = async (data: any) => {
        try {
            setErros({});
            const validData = pedidosEditarSchema.parse(data);
            const bebidaSelecionada = bebidas.find((bebida) => bebida.id === Number(data.bebida_id));
            const unitario = bebidaSelecionada?.preco || 0;
            const total = unitario * data.quantidade;

            const payload = {
                ...validData,
                unitario,
                total,
            };

            const response = await PedidoService.putEditarDados(id!, payload);
            if (response) {
                toast.success("Pedido atualizado com sucesso!");
            } else {
                toast.error("Erro ao atualizar pedido.");
                
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errosMap = error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {} as Record<string, string>);
                setErros(errosMap);
            } else {
                toast.error("Ocorreu um erro ao salvar os dados.");
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
    </PageLayout>
  );
};

export default EditarPedido;