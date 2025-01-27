import { useEffect, useState } from "react";
import ListagemLayout from "../../../components/ListagemLayout";
import Tabela from "../../../components/Tabela";
import PedidoService from "../../../services/PedidoService";
import PessoaService from "../../../services/PessoaService";
import BebidaService from "../../../services/BebidaService";
import IPedido from "../../../interfaces/IPedido";
import IPessoa from "../../../interfaces/IPessoa";
import IBebida from "../../../interfaces/IBebida";
import Alterar from "../../../components/Alterar";
import Adicionar from "../../../components/BotaoAdicionar";

function ListagemPedido() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState<IPedido[]>([]);
  const [pessoas, setPessoas] = useState<IPessoa[]>([]);
  const [bebidas, setBebidas] = useState<IBebida[]>([]);
  const [textoFiltro, setTextoFiltro] = useState(""); // Estado para armazenar o texto do filtro

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscar pedidos
        const pedidosResponse = await PedidoService.getListarDados();
        setPedidos(pedidosResponse);
        setPedidosFiltrados(pedidosResponse);
        // Buscar pessoas
        const pessoasResponse = await PessoaService.getListarDados();
        setPessoas(pessoasResponse);
        // Buscar bebidas
        const bebidasResponse = await BebidaService.getListarDados();
        setBebidas(bebidasResponse);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  // Função para excluir um pedido
  const excluirPedido = async (pedido: IPedido) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      try {
        const pedidoDeletado = await PedidoService.deleteDados(pedido.id);
        if (pedidoDeletado) {
          // Atualiza os estados após a exclusão
          const pedidosAtualizados = pedidos.filter((c) => c.id !== pedido.id);
          setPedidos(pedidosAtualizados);
          aplicarFiltro(pedidosAtualizados, textoFiltro); // Reaplica o filtro após a exclusão
        } else {
          alert("Erro ao deletar pedido.");
        }
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao deletar.");
      }
    }
  };

  // Função para obter o nome da pessoa a partir do cliente_id
  const getPessoaNome = (clienteId: string | number) => {
    const pessoa = pessoas.find((p) => String(p.id) === String(clienteId));
    return pessoa ? pessoa.nome : "Desconhecido";
  };

  // Função para obter o nome da bebida a partir do bebida_id
  const getBebidaNome = (bebidaId: string | number) => {
    const bebida = bebidas.find((b) => String(b.id) === String(bebidaId));
    return bebida ? bebida.nome : "Desconhecida";
  };

  // Função para aplicar o filtro
  const aplicarFiltro = (lista: IPedido[], filtro: string) => {
    const filtroNormalizado = filtro.toLowerCase();
    const resultadosFiltrados = lista.filter((pedido) =>
      getPessoaNome(pedido.cliente_id).toLowerCase().includes(filtroNormalizado)
    );
    setPedidosFiltrados(resultadosFiltrados);
  };

  // Função para atualizar o texto do filtro e aplicar o filtro
  const handleFilterChange = (text: string) => {
    setTextoFiltro(text); // Atualiza o texto do filtro
    aplicarFiltro(pedidos, text); // Aplica o filtro com base no texto
  };

  if (pessoas.length === 0 || bebidas.length === 0) {
    return <p>Carregando dados...</p>;
  }

  const colunas = [
    "Pedido ID", "Cliente", "Bebida", "Valor Unitário", "Quantidade", "Total", "Data de Compra", "Alterar", "Adicioanr"
  ];
  const renderLinha = (pedido: IPedido) => (
    <>
      <td className="item-lista">{pedido.id}</td>
      <td className="item-lista">{getPessoaNome(pedido.cliente_id)}</td>
      <td className="item-lista">{getBebidaNome(pedido.bebida_id)}</td>
      <td className="item-lista">R${pedido.unitario}</td>
      <td className="item-lista">{pedido.quantidade}</td>
      <td className="item-lista">R${pedido.total}</td>
      <td className="item-lista">{pedido.data_compra}</td>
      <td className="item-lista">
        <Alterar
          rotaEdicao="/pedidos"
          idItem={pedido.id} 
          onExcluir={() => excluirPedido(pedido)}
        />
      </td>
      <td className="item-lista">
        <Adicionar
        enderecoAdicionar="/cadastro-pedidos"
        />
      </td>
    </>
  );

  return (
    <ListagemLayout
      titulo="Listagem de Pedidos"
      onFilterChange={handleFilterChange}
    >
      <Tabela
        colunas={colunas}
        dados={pedidosFiltrados}
        renderLinha={renderLinha}
      />
    </ListagemLayout>
  );
}

export default ListagemPedido;