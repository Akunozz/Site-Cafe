import { useEffect, useState } from "react";
import ListagemLayout from "../../../components/ListagemLayout";
import Tabela from "../../../components/Tabela";
import bebidaService from "../../../services/BebidaService";
import IBebida from "../../../interfaces/IBebida";
import Alterar from "../../../components/Alterar";

function ListagemBebidas() {
  const [bebidas, setBebidas] = useState<IBebida[]>([]);
  const [bebidasFiltradas, setBebidasFiltradas] = useState<IBebida[]>([]);
  const [textoFiltro, setTextoFiltro] = useState(""); // Estado para armazenar o texto do filtro

  useEffect(() => {
    async function fetchBebidas() {
      try {
        const response = await bebidaService.getListarDados();
        setBebidas(response);
        aplicarFiltro(response, textoFiltro); // Aplica o filtro inicial
      } catch (error) {
        console.error("Erro ao buscar bebidas:", error);
      }
    }
    fetchBebidas();
  }, []);

  // Função para excluir uma bebida
  const excluirBebida = async (bebida: IBebida) => {
    if (window.confirm("Tem certeza que deseja excluir esta bebida?")) {
      try {
        const bebidaDeletada = await bebidaService.deleteDados(bebida.id);
        if (bebidaDeletada) {
          // Atualiza os estados após a exclusão
          const bebidaAtualizadas = bebidas.filter((c) => c.id !== bebida.id);
          setBebidas(bebidaAtualizadas);
          aplicarFiltro(bebidaAtualizadas, textoFiltro); // Recalcula a lista filtrada com o texto atual
        } else {
          alert("Erro ao deletar bebida.");
        }
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao deletar.");
      }
    }
  };

  // Aplica o filtro com base no texto e na lista de bebidas
  const aplicarFiltro = (lista: IBebida[], filtro: string) => {
    const filtroNormalizado = filtro.toLowerCase();
    const resultadosFiltrados = lista.filter((bebida) =>
      bebida.nome.toLowerCase().includes(filtroNormalizado)
    );
    setBebidasFiltradas(resultadosFiltrados);
  };

  // Função para atualizar a lista filtrada ao digitar no campo de filtro
  const handleFilterChange = (text: string) => {
    setTextoFiltro(text); // Atualiza o texto do filtro
    aplicarFiltro(bebidas, text); // Aplica o filtro com base no texto atualizado
  };

  const colunas = ["Imagem", "Nome", "Preço", "ID", "Status", "Alterar"];
  const renderLinha = (bebida: IBebida) => (
    <>
      <td className="item-lista">{bebida.imagem}</td>
      <td className="item-lista">{bebida.nome}</td>
      <td className="item-lista">R$ {bebida.preco}</td>
      <td className="item-lista">{bebida.id}</td>
      <td className="item-lista">
        <span
          className={`${
            bebida.status === "Ativo" ? "text-green-500" : "text-red-500"
          } font-bold`}
        >
          {bebida.status}
        </span>
      </td>
      <td className="item-lista">
        <Alterar
          enderecoAdicionar="/cadastro-bebidas"
          rotaEdicao="/bebidas/"
          idItem={bebida.id}
          onExcluir={() => excluirBebida(bebida)}
        />
      </td>
    </>
  );

  return (
    <ListagemLayout
      titulo="Listagem de Bebidas"
      onFilterChange={handleFilterChange}
    >
      <Tabela
        colunas={colunas}
        dados={bebidasFiltradas}
        renderLinha={renderLinha}
      />
    </ListagemLayout>
  );
}

export default ListagemBebidas;
