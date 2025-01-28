import { useState, useEffect } from "react";
import { fileToBase64 } from "../../../utils/imageUtils";
import Formulario from "../../../components/FormularioLayout";
import PageLayout from "../../../components/PageLayout";
import { z } from "zod";
import PessoaService from "../../../services/PessoaService";
import SetorService from "../../../services/SetorService";
import BebidaService from "../../../services/BebidaService";
import PedidoService from "../../../services/PedidoService";
import { pessoaSchema } from "../../../schemas/pessoaSchema";
import { pedidosSchema } from "../../../schemas/pedidosSchema";

type Campo<T> = {
  id: keyof T;
  label: string;
  type: "text" | "password" | "select" | "file" | "number";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

type PedidoForm = z.infer<typeof pedidosSchema>;

const CadastroPedido = () => {
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [mensagemSucesso, setMensagemSucesso] = useState<boolean | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});


  // Carregar clientes ao montar o componente
  useEffect(() => {
    async function fetchSetores() {
      try {
        const response = await PessoaService.getListarDados();
        setClientes(response);
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
        alert("Não foi possível carregar os setores.");
      }
    }
    fetchSetores();
  }, []);


  const campos: Campo<PedidoForm>[] = [
    {
      id: "cliente", label: "Setor", type: "select", placeholder: "Selecione um setor",
      options: clientes.map((cliente) => ({
        value: cliente.id,
        label: cliente.nome,
      }))
    },
  ];

  return (
    <PageLayout titulo="Cadastro de Pedidos" rota="/listagem-pedidos" >
      <Formulario campos={campos} onSubmit={(data) => handleSubmit(data)} erros={erros} />
      {mensagem && (
        <div
          className={`mt-4 p-4 rounded-lg ${mensagemSucesso ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
        >
          {mensagem}
        </div>
      )}
    </PageLayout >
  );
}

export default CadastroPedido;
