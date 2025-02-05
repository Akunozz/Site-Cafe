import { useState, useEffect } from "react"
import Formulario from "../../components/FormularioLayout/formularioLayout"
import PageLayout from "../../components/PageLayoutCadastro/pageLayout"
import PessoaService from "../../services/PessoaService"
import BebidaService from "../../services/BebidaService"
import PedidoService from "../../services/PedidoService"
import { z } from "zod"
import { pedidosSchema } from "../../schemas/pedidosSchema"
import { toast } from "sonner"

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file" | "number";
  placeholder?: string;
  options?: { value: number; label: string }[];
};

type PedidoForm = z.infer<typeof pedidosSchema>;

const CadastroPedido = () => {
  const [erros, setErros] = useState<Record<string, string>>({});
  const [clientes, setClientes] = useState<{ id: number, nome: string }[]>([]);
  const [bebidas, setBebidas] = useState<{ id: number, nome: string, preco: number }[]>([]);
  const dataAtual = new Date().toISOString().split("T")[0];

  // busca os dados
  useEffect(() => {
    async function fetchData() {
      try {

        const clienteResponse = await PessoaService.getListarDados();
        setClientes(
          clienteResponse.map((cliente) => ({
            ...cliente,
            id: Number(cliente.id),
          }))
        );

        const bebidasResponse = await BebidaService.getListarDados();
        setBebidas(
          bebidasResponse.map((bebida) => ({
            ...bebida,
            id: Number(bebida.id),
          }))
        );

      } catch (error) {
        toast.error("Erro ao carregar dados.");
      }
    }
    fetchData();
  }, []);

  const campos: Campo<PedidoForm>[] = [
    {
      id: "cliente_id", label: "Cliente", type: "select", placeholder: "Selecione um cliente",
      options: clientes.map((cliente) => ({
        value: cliente.id,
        label: cliente.nome,
      }))
    },
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
      const validData = pedidosSchema.parse(data);

      const bebidaSelecionada = bebidas.find((bebida) => bebida.id === Number(data.bebida_id));
      const unitario = bebidaSelecionada?.preco || 0;
      const total = unitario * data.quantidade;
      const payload = {
        ...validData,
        bebida_id: Number(validData.bebida_id),
        cliente_id: Number(validData.cliente_id),
        unitario,
        total,
        data_compra: dataAtual,
      };

      const response = await PedidoService.postAdicionarDados(payload);
      if (response) {
        toast.success("Pedido cadastrado com sucesso!");
      } else {
        toast.error("Erro ao cadastrar pedido.");
       
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
        toast.error("Ocorreu um erro ao salvar os dados.");
      }
    }
  };

  return (
    <PageLayout titulo="Cadastro de Pedidos" rota="/listagem-pedidos" >
      <Formulario campos={campos} onSubmit={(data) => handleSubmit(data)} erros={erros} />
    </PageLayout >
  );
};

export default CadastroPedido
