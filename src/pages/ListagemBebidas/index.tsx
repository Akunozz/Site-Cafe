import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Filtro from "../../components/Filtro";
import bebidaService from "../../services/BebidaService";
import IBebida from "../../interfaces/IBebida";

function ListagemBebidas() {
  const [bebidas, setBebidas] = useState<IBebida[]>([]);
  const [bebidasFiltradas, setBebidasFiltradas] = useState<IBebida[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBebidas() {
      try {
        const response = await bebidaService.getListarDados();
        setBebidas(response);
        setBebidasFiltradas(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar bebidas:", error);
        setError("Erro ao carregar bebidas.");
        setIsLoading(false);
      }
    }

    fetchBebidas();
  }, []);

  // Função para atualizar a lista filtrada
  const handleFilterChange = (text: string) => {
    const filtro = text.toLowerCase(); // Normaliza o texto para comparação
    const resultadosFiltrados = bebidas.filter((bebida) =>
      bebida.nome.toLowerCase().includes(filtro)
    );
    setBebidasFiltradas(resultadosFiltrados);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="navbar">
      <NavBar />
      <div className="flex-1 flex flex-col p-8 bg-preto">
        <h1 className="text-4xl font-bold text-white mb-4">Listagem de Bebidas</h1>
        <div className="mt-5 mb-2 w-1/5">
          <Filtro onFilterChange={handleFilterChange} />
        </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <table className="table-auto w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="item-lista-header">Imagem</th>
                <th className="item-lista-header">Nome</th>
                <th className="item-lista-header">Preço</th>
                <th className="item-lista-header">ID</th>
                <th className="item-lista-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {bebidasFiltradas.map((bebida) => (
                <tr key={bebida.id} className="hover:bg-slate-100">
                  <td className="item-lista">{bebida.imagem}</td>
                  <td className="item-lista">{bebida.nome}</td>
                  <td className="item-lista">R$ {bebida.preco}</td>
                  <td className="item-lista">{bebida.id}</td>
                  <td className="item-lista">
                    <span
                      className={`${
                        bebida.status === "ATIVO"
                          ? "text-red-500"
                          : "text-green-500"
                      } font-bold`}
                    >
                      {bebida.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default ListagemBebidas;