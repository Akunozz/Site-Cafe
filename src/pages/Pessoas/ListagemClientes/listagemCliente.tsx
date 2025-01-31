import { useEffect, useState } from "react";
import ListagemLayout from "../../../components/ListagemLayout/listagemLayout";
import Tabela from "../../../components/Tabela/tabela";
import pessoaService from "../../../services/PessoaService";
import IPessoa from "../../../interfaces/IPessoa";
import Alterar from "../../../components/Alterar/alterar";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleUserRound } from "lucide-react";

function ListagemClientes() {
  const [clientes, setClientes] = useState<IPessoa[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<IPessoa[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca os clientes
  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await pessoaService.getListarDados();
        setClientes(response);
        setClientesFiltrados(response);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento após buscar os dados
      }
    }
    fetchClientes();
  }, []);

  // Excluir um cliente
  const excluirCliente = async (cliente: IPessoa) => {
    if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
      try {
        const clienteDeletado = await pessoaService.deleteDados(cliente.id);
        if (clienteDeletado) {
          // Atualiza os estados após a exclusão
          const clientesAtualizados = clientes.filter(
            (c) => c.id !== cliente.id
          );
          setClientes(clientesAtualizados);
          setClientesFiltrados(clientesAtualizados);
        } else {
          alert("Erro ao deletar cliente.");
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
    const resultadosFiltrados = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(filtro)
    );
    setClientesFiltrados(resultadosFiltrados);
  };

  // Campos da listagem
  const colunas = ["ID", "Foto", "Nome", "Setor", "Status", "Alterar"];
  const renderLinha = (cliente: IPessoa) => (
    <>
      <td className="p-5">{cliente.id}</td>
      <td className="text-center">
        {cliente.imagem ? (
          <img
            className="mx-auto rounded-full"
            src={cliente.imagem}
            alt="Foto do cliente"
            style={{ width: "50px", height: "50px" }}
          />
        ) : (
          <CircleUserRound className="w-[50px] h-[50px] text-azuljava mx-auto" />
        )}
      </td>
      <td>{cliente.nome}</td>
      <td>{cliente.setor.nome}</td>
      <td>
        <span
          className={`${
            cliente.status === "Ativo" ? "text-green-500" : "text-red-500"
          }`}
        >
          {cliente.status}
        </span>
      </td>
      <td>
        <Alterar
          rotaEdicao="/pessoas"
          idItem={cliente.id}
          onExcluir={() => excluirCliente(cliente)}
        />
      </td>
    </>
  );

  return (
    <ListagemLayout
      titulo="Listagem de Clientes"
      onFilterChange={handleFilterChange}
      textAdicionar="Cadastrar Novo Cliente"
      enderecoAdicionar="/cadastro-cliente"
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
        <Tabela colunas={colunas} dados={clientesFiltrados} renderLinha={renderLinha} />
      )}
    </ListagemLayout>
  );
}

export default ListagemClientes;
