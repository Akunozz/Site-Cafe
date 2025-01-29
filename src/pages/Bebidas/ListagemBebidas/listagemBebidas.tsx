import { useEffect, useState } from "react";
import ListagemLayout from "../../../components/ListagemLayout/listagemLayout";
import Tabela from "../../../components/Tabela/tabela";
import BebidaService from "../../../services/BebidaService";
import IBebida from "../../../interfaces/IBebida";
import Alterar from "../../../components/Alterar/alterar";

function ListagemBebidas() {
  const [bebidas, setBebidas] = useState<IBebida[]>([]);
  const [bebidasFiltradas, setBebidasFiltradas] = useState<IBebida[]>([]);

  // busca as bebidas
  useEffect(() => {
    async function fetchBebidas() {
      try {
        const response = await BebidaService.getListarDados();
        setBebidas(response);
        setBebidasFiltradas(response);
      } catch (error) {
        console.error("Erro ao buscar bebidas:", error);
      }
    }
    fetchBebidas();
  }, []);

  // exclui uma bebida
  const excluirBebida = async (bebida: IBebida) => {
    if (window.confirm("Tem certeza que deseja excluir esta bebida?")) {
      try {
        const bebidaDeletada = await BebidaService.deleteDados(bebida.id);
        if (bebidaDeletada) {
          const bebidaAtualizadas = bebidas.filter((c) => c.id !== bebida.id);
          setBebidas(bebidaAtualizadas);
          setBebidasFiltradas(bebidaAtualizadas);
        } else {
          alert("Erro ao deletar bebida.");
        }
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao deletar.");
      }
    }
  };

  // atualiza a lista filtrada
  const handleFilterChange = (text: string) => {
    const filtro = text.toLowerCase();
    const resultadosFiltrados = bebidas.filter((bebida) =>
    bebida.nome.toLowerCase().includes(filtro));
    setBebidasFiltradas(resultadosFiltrados);
  };

  //campos da listagem
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
      enderecoAdicionar="/cadastro-bebidas"
      textAdicionar="Cadastrar Nova"
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
