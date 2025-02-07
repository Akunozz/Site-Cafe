import { useEffect, useState } from "react"
import ListagemLayout from "../../components/ListagemLayout/listagemLayout"
import Tabela from "../../components/Tabela/tabela"
import PedidoService from "../../services/PedidoService"
import PessoaService from "../../services/PessoaService"
import BebidaService from "../../services/BebidaService"
import IPedido from "../../interfaces/IPedido"
import IPessoa from "../../interfaces/IPessoa"
import IBebida from "../../interfaces/IBebida"
import Alterar from "../../components/Alterar/alterar"
import { Skeleton } from "@/components/ui/skeleton"
import BotaoPedido from "@/components/BotaoRelatorio/botaoRelatorio"
import { toast } from "sonner"

function ListagemPedido() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState<IPedido[]>([]);
  const [pessoas, setPessoas] = useState<IPessoa[]>([]);
  const [bebidas, setBebidas] = useState<IBebida[]>([]);
  const [loading, setLoading] = useState(true);
  const [userPermission, setUserPermission] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);

  // busca os pedidos
  useEffect(() => {
    async function fetchData() {
      try {

        const pedidosResponse = await PedidoService.getListarDados();
        const pedidosOrdenados = pedidosResponse.sort((a, b) => Number(a.id) - Number(b.id))
        setPedidos(pedidosOrdenados);
        setPedidosFiltrados(pedidosOrdenados);

        const pessoasResponse = await PessoaService.getListarDados();
        setPessoas(pessoasResponse);

        const bebidasResponse = await BebidaService.getListarDados();
        setBebidas(bebidasResponse);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    const perm = localStorage.getItem("permissao");
    setUserPermission(perm);
    fetchData();
  }, []);

  const excluirPedido = async (pedido: IPedido) => {
    if (window.confirm("Tem certeza que deseja excluir este pedido?")) {
      try {
        const pedidoDeletado = await PedidoService.deleteDados(pedido.id);
        if (pedidoDeletado) {
          const pedidosAtualizados = pedidos.filter((c) => c.id !== pedido.id);
          setPedidos(pedidosAtualizados);
          setPedidosFiltrados(pedidosAtualizados);
          toast.success("Pedido excluido com sucesso")
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

  const handleFilterChange = (text: string) => {
    const filtro = text.toLowerCase();
    const resultadosFiltrados = pedidos.filter((pedido) =>
      getPessoaNome(pedido.cliente_id).toLowerCase().includes(filtro)
    );
    setPedidosFiltrados(resultadosFiltrados);
  };

  if (pessoas.length === 0 || bebidas.length === 0) {
    <Skeleton className="w-[100px] h-[20px] rounded-full" />
  }

  const colunas = [
    "Cliente", "Bebida", "Valor Unitário", "Quantidade", "Total", "Data de Compra", "Alterar"
  ];
  const itensTabela = (pedido: IPedido) => (
    <>
      <td className="p-5">{getPessoaNome(pedido.cliente_id)}</td>
      <td>{getBebidaNome(pedido.bebida_id)}</td>
      <td>R${pedido.unitario}</td>
      <td>{pedido.quantidade}</td>
      <td>R${pedido.total}</td>
      <td>{pedido.data_compra}</td>
      <td>
        <Alterar
          rotaEdicao="/pedidos"
          idItem={pedido.id}
          onExcluir={
            userPermission === "ADMIN" || userPermission === "AUX"
              ? () => excluirPedido(pedido)
              : () => alert("Você não tem permissão para excluir este pedido.")
          }
        />
      </td>
    </>
  );

  return (
    <ListagemLayout
      titulo="Listagem de Pedidos"
      onFilterChange={handleFilterChange}
      enderecoAdicionar="/cadastro-pedidos"
      textAdicionar="Cadastrar Novo Pedido"
      botaoRelatorio={<BotaoPedido />}
    >
      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(13)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[40px] rounded-md" />
          ))}
        </div>
      ) : (
        <Tabela colunas={colunas}
          dados={pedidosFiltrados}
          itensTabela={itensTabela}
          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual} />
      )}
    </ListagemLayout>
  );
}

export default ListagemPedido;