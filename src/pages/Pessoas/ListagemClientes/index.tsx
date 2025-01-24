import { useEffect, useState } from "react";
import ListagemLayout from "../../../components/ListagemLayout";
import Tabela from "../../../components/Tabela";
import pessoaService from "../../../services/PessoaService";
import IPessoa from "../../../interfaces/IPessoa";
import Alterar from "../../../components/Alterar";

function ListagemClientes() {
  const [clientes, setClientes] = useState<IPessoa[]>([]);
  const [clientesFiltrados, setClientesFiltrados] = useState<IPessoa[]>([]);

  useEffect(() => {
    async function fetchClientes() {
      const response = await pessoaService.getListarDados();
      setClientes(response);
      setClientesFiltrados(response);
    }
    fetchClientes();
  }, []);

    // Função para excluir um cliente
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
  
  // Função para atualizar a lista filtrada
  const handleFilterChange = (text: string) => {
    const filtro = text.toLowerCase();
    const resultadosFiltrados = clientes.filter((cliente) =>
      cliente.nome.toLowerCase().includes(filtro)
    );
    setClientesFiltrados(resultadosFiltrados);
  };

  const colunas = ["ID", "Foto", "Nome", "Setor", "Alterar"];
  const renderLinha = (cliente: IPessoa) => (
    <>
      <td className="item-lista">{cliente.id}</td>
      <td className="item-lista">{cliente.imagem}</td>
      <td className="item-lista">{cliente.nome}</td>
      <td className="item-lista">{cliente.setor.nome}</td>
      <td className="item-lista">
        <Alterar enderecoAdicionar="/cadastro-cliente"
         rotaEdicao="/pessoas"
         idItem={cliente.id}
       onExcluir={() => excluirCliente(cliente)} /> 
       </td>
    </>
  );

  return (
    <ListagemLayout titulo="Listagem de Clientes" onFilterChange={handleFilterChange}>
      <Tabela colunas={colunas} dados={clientesFiltrados} renderLinha={renderLinha} />
    </ListagemLayout>
  );
}

export default ListagemClientes;