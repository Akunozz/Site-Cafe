import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Filtro from "../../components/Filtro";
import PedidoService from "../../services/PedidoService";
import PessoaService from "../../services/PessoaService";
import BebidaService from "../../services/BebidaService";
import IPedido from "../../interfaces/IPedido";
import IPessoa from "../../interfaces/IPessoa";
import IBebida from "../../interfaces/IBebida";

function ListagemPedido() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState<IPedido[]>([]);
  const [pessoas, setPessoas] = useState<IPessoa[]>([]);
  const [bebidas, setBebidas] = useState<IBebida[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Erro ao carregar os dados.");
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Função para obter o nome da pessoa a partir do cliente_id
  const getPessoaNome = (clienteId: string | number) => {
    const pessoa = pessoas.find((p) => String(p.id) === String(clienteId));
    return pessoa ? pessoa.nome : "Desconhecido";
  };
  

  // Função para obter o nome da bebida a partir do bebida_id
  const getBebidaNome = (bebidaId: string | number) => {
    const bebida = bebidas.find((b) => b.id === bebidaId);
    return bebida ? bebida.nome : "Desconhecida";
  };

  // Função para atualizar a lista filtrada com base no nome do cliente
  const handleFilterChange = (text: string) => {
    const filtro = text.toLowerCase();
    const resultadosFiltrados = pedidos.filter((pedido) =>
      getPessoaNome(pedido.cliente_id).toLowerCase().includes(filtro)
    );
    setPedidosFiltrados(resultadosFiltrados);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="navbar">
      <NavBar />
      <div className="flex-1 flex flex-col p-8 bg-preto">
        <h1 className="text-4xl font-bold text-white mb-4">Listagem de Pedidos</h1>
        <div className="mt-5 mb-2 w-1/5">
          <Filtro onFilterChange={handleFilterChange} />
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <table className="table-auto w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="item-lista-header">Pedido ID</th>
                <th className="item-lista-header">Cliente</th>
                <th className="item-lista-header">Bebida</th>
                <th className="item-lista-header">Total</th>
                <th className="item-lista-header">Unitario</th>
                <th className="item-lista-header">Quantidade</th>
                <th className="item-lista-header">Data de Compra</th>
              </tr>
            </thead>
            <tbody>
              {pedidosFiltrados.map((pedido) => (
                <tr key={pedido.id} className="hover:bg-slate-100">
                  <td className="item-lista">{pedido.id}</td>
                  <td className="item-lista">{getPessoaNome(pedido.cliente_id)}</td>
                  <td className="item-lista">{getBebidaNome(pedido.bebida_id)}</td>
                  <td className="item-lista">{pedido.total}</td>
                  <td className="item-lista">{pedido.unitario}</td>
                  <td className="item-lista">{pedido.quantidade}</td>
                  <td className="item-lista">{pedido.data_compra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListagemPedido;
