import { useEffect, useState } from "react";
import ListagemLayout from "../../../components/ListagemLayout/listagemLayout";
import Tabela from "../../../components/Tabela/tabela";
import BebidaService from "../../../services/BebidaService";
import IBebida from "../../../interfaces/IBebida";
import Alterar from "../../../components/Alterar/alterar";
import { Skeleton } from "@/components/ui/skeleton";
import { Coffee } from "lucide-react";

function ListagemBebidas() {
  const [bebidas, setBebidas] = useState<IBebida[]>([]);
  const [bebidasFiltradas, setBebidasFiltradas] = useState<IBebida[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca as bebidas
  useEffect(() => {
    async function fetchBebidas() {
      try {
        const response = await BebidaService.getListarDados();
        setBebidas(response);
        setBebidasFiltradas(response);
      } catch (error) {
        console.error("Erro ao buscar bebidas:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento após buscar os dados
      }
    }
    fetchBebidas();
  }, []);

  // Excluir uma bebida
  const excluirBebida = async (bebida: IBebida) => {
    if (window.confirm("Tem certeza que deseja excluir esta bebida?")) {
      try {
        const bebidaDeletada = await BebidaService.deleteDados(bebida.id);
        if (bebidaDeletada) {
          const bebidasAtualizadas = bebidas.filter((c) => c.id !== bebida.id);
          setBebidas(bebidasAtualizadas);
          setBebidasFiltradas(bebidasAtualizadas);
        } else {
          alert("Erro ao deletar bebida.");
        }
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao deletar.");
      }
    }
  };

  // Atualiza a lista filtrada
  const handleFilterChange = (text: string) => {
    const filtro = text.toLowerCase();
    const resultadosFiltrados = bebidas.filter((bebida) =>
      bebida.nome.toLowerCase().includes(filtro)
    );
    setBebidasFiltradas(resultadosFiltrados);
  };

  // Campos da listagem
  const colunas = ["Imagem", "Nome", "Descrição", "Preço", "ID", "Status", "Alterar"];
  const renderLinha = (bebida: IBebida) => (
    <>
      <td>
        {bebida.imagem ? (
          <img
            className="mx-auto rounded-md"
            src={bebida.imagem}
            alt="Imagem da bebida"
            style={{ width: "50px", height: "50px" }}
          />
        ) : (
          <Coffee className="w-[50px] h-[50px] text-azuljava mx-auto" />
        )}
      </td>
      <td>{bebida.nome}</td>
      <td>{bebida.descricao}</td>
      <td>R$ {bebida.preco}</td>
      <td>{bebida.id}</td>
      <td>
        <span
          className={`${
            bebida.status === "Ativo" ? "text-green-500" : "text-red-500"
          }`}
        >
          {bebida.status}
        </span>
      </td>
      <td className="p-4">
        <Alterar
          rotaEdicao="/bebidas"
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
      textAdicionar="Cadastrar Nova Bebida"
    >
      {loading ? (
        // Mostra Skeleton enquanto os dados carregam
        <div className="flex flex-col gap-4">
          {[...Array(13)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[40px] rounded-md" />
          ))}
        </div>
      ) : (
        // Mostra a tabela quando os dados forem carregados
        <Tabela colunas={colunas} dados={bebidasFiltradas} renderLinha={renderLinha} />
      )}
    </ListagemLayout>
  );
}

export default ListagemBebidas;
