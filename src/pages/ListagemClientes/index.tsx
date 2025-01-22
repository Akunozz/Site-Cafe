import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Filtro from "../../components/Filtro";
import pessoaService from "../../services/PessoaService";
import IPessoa from "../../interfaces/IPessoa";

function ListagemClientes() {
  const [clientes, setClientes] = useState<IPessoa[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<IPessoa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar clientes ao montar o componente
  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await pessoaService.getListarDados();
        setClientes(response);
        setClientesFiltrados(response); // Inicialmente, exibir todos os clientes
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        setError("Erro ao carregar clientes.");
        setIsLoading(false);
      }
    }

    fetchClientes();
  }, []);

  // Função para atualizar a lista filtrada
  const handleFilterChange = (text: string) => {
    const filtro = text.toLowerCase(); // Normaliza o texto para comparação
    const resultadosFiltrados = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(filtro)
    );
    setClientesFiltrados(resultadosFiltrados);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="navbar">
      <NavBar />
      <div className="flex-1 flex flex-col p-8 bg-preto">
        <h1 className="text-4xl font-bold text-white mb-4">Listagem de Clientes</h1>
        <div className="mt-5 mb-2 w-1/5"> <Filtro onFilterChange={handleFilterChange} /> </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <table className="table-auto w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="item-lista-header">ID</th>
                <th className="item-lista-header">Foto</th>
                <th className="item-lista-header">Nome</th>
                <th className="item-lista-header">Setor</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-slate-100">
                  <td className="item-lista">{cliente.id}</td>
                  <td className="item-lista">
                    <img
                      src={`http://localhost:3000/uploads/${cliente.nome}.jpg`}
                      alt={cliente.nome}
                      className=""
                    />
                  </td>
                  <td className="item-lista">{cliente.nome}</td>
                  <td className="item-lista">{cliente.setor.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListagemClientes;
