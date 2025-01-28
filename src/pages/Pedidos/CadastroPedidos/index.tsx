import { useState, useEffect } from "react";
import Formulario from "../../../components/FormularioLayout";
import PageLayout from "../../../components/PageLayout";
import PessoaService from "../../../services/PessoaService";
import BebidaService from "../../../services/BebidaService";
import PedidoService from "../../../services/PedidoService";
import { z } from "zod";
import { pedidosSchema } from "../../../schemas/pedidosSchema";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file" | "number";
  placeholder?: string;
  options?: { value: number; label: string }[];
};

type PedidoForm = z.infer<typeof pedidosSchema>;

const CadastroPedido = () => {
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<boolean | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});
  const [clientes, setClientes] = useState<{ id: number, nome: string }[]>([]);
  const [bebidas, setBebidas] = useState<{ id: number, nome: string, preco: number }[]>([]);

  // Carregar dados ao montar o componente
  useEffect(() => {
    async function fetchData() {
      try {
        //busca os cliente
        const clienteResponse = await PessoaService.getListarDados();
        setClientes(
          clienteResponse.map((cliente) => ({
            ...cliente,
            id: Number(cliente.id),
        }))
        );

                // Buscar dados das bebidas
                const bebidasResponse = await BebidaService.getListarDados();
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

    // Função de envio do formulário
  const handleSubmit = async (data: any) => {
    try {
      console.log("Dados enviados:", data);
      //limpa os erros do zod e a mensagem
      setMensagem(null);
      setMensagemSucesso(null);
      setErros({});
      // Validação com zod
      const validData = pedidosSchema.parse(data);
      const bebidaSelecionada = bebidas.find((bebida) => bebida.id === Number(data.bebida_id));
      const unitario = bebidaSelecionada?.preco || 0;
      // Calcule o total
      const total = unitario * data.quantidade;
      const payload = {
        ...validData,
        unitario,
        total,
      };

      const response = await PedidoService.postAdicionarDados(payload);
      if (response) {
        setMensagem("Pedido cadastrado com sucesso!");
        setMensagemSucesso(true);
      } else {
        setMensagem("Erro ao cadastrar pedido.");
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
        console.error("Erro ao cadastar bebida:", error);
        setMensagem("Ocorreu um erro ao salvar os dados.");
        setMensagemSucesso(false);
      }
    }
  };

  return (
    <PageLayout titulo="Cadastro de Pedidos" rota="/listagem-pedidos" >
      <Formulario campos={campos} onSubmit={(data) => handleSubmit(data)} erros={erros} />
      {mensagem && (
        <div
          className={`mt-4 p-4 rounded-lg ${mensagemSucesso ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
          {mensagem}
        </div>
      )}
    </PageLayout >
  );
};

export default CadastroPedido;