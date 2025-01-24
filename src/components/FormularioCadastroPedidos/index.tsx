import Formulario from "../../components/FormularioLayout";
import { z } from "zod";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "number" | "date" | "text" | "password" | "select" | "email" | "file" | "checkbox" | "textarea";
  placeholder?: string;
  defaultValue?: string | number | readonly string[];
  options?: { value: string; label: string }[];
  validation?: { valueAsNumber: boolean };
};

// Schema de validação usando Zod
const pedidoSchema = z.object({
  clienteId: z.string().min(1, "Selecione um cliente"),
  bebidaId: z.string().min(1, "Selecione uma bebida"),
  quantidade: z.number().min(1, "A quantidade deve ser pelo menos 1"),
  total: z.number().min(0.01, "O valor total deve ser maior que zero"),
});

type PedidoForm = z.infer<typeof pedidoSchema>;

const CadastroPedido = () => {
  const campos: Campo<PedidoForm>[] = [
    {
      id: "clienteId",
      label: "Cliente",
      type: "select",
      options: [
        // Substitua por dados reais do backend
        { value: "1", label: "Cliente 1" },
        { value: "2", label: "Cliente 2" },
      ],
      placeholder: "Selecione um cliente",
    },
    {
      id: "bebidaId",
      label: "Bebida",
      type: "select",
      options: [
        // Substitua por dados reais do backend
        { value: "1", label: "Bebida 1" },
        { value: "2", label: "Bebida 2" },
      ],
      placeholder: "Selecione uma bebida",
    },
    {
      id: "quantidade",
      label: "Quantidade",
      type: "number",
      placeholder: "Digite a quantidade",
      defaultValue: 1,
      validation: {
        valueAsNumber: true, // Transforma o valor para número
      },
    },
    {
      id: "total",
      label: "Valor Total",
      type: "number",
      placeholder: "Digite o valor total",
      defaultValue: 0.0,
      validation: {
        valueAsNumber: true, // Transforma o valor para número
      },
    },
  ];

  const handleSubmit = async (data: PedidoForm) => {
    console.log("Dados do Pedido:", data);

    // Enviar os dados para o backend
    try {
      // Substitua pelo serviço do backend
      console.log("Pedido cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar o pedido:", error);
    }
  };

  return <Formulario campos={campos} onSubmit={handleSubmit} />;
};

export default CadastroPedido;