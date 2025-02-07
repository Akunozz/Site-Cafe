import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TabelaProps {
  colunas: string[];
  dados?: any[];
  itensTabela: (item: any) => React.ReactNode;
  itensPorPagina?: number;
  paginaAtual: number;
  setPaginaAtual: (pagina: number) => void;
}

const Tabela: React.FC<TabelaProps> = ({
  colunas,
  dados = [],
  itensTabela,
  itensPorPagina = 10,
  paginaAtual,
  setPaginaAtual,
}) => {
  const [paginaPesquisa, setPaginaPesquisa] = useState("")
  const totalPaginas = Math.ceil(dados.length / itensPorPagina);

  // Garante que a página atual não fique fora do limite após exclusões
  useEffect(() => {
    if (paginaAtual > totalPaginas && totalPaginas > 0) {
      setPaginaAtual(totalPaginas);
    }
  }, [dados, paginaAtual, totalPaginas, setPaginaAtual]);

  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const dadosPaginados = dados.slice(indiceInicial, indiceFinal);

  const handleIrParaPagina = () => {
    const pagina = parseInt(paginaPesquisa);
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaAtual(pagina);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-2 font-medium h-max-screen">
      <Table className="text-center border-gray-300 text-laranjajava">
        <TableHeader>
          <TableRow>
            {colunas.map((coluna, index) => (
              <TableHead key={index} className="text-center text-lg text-azuljava">
                {coluna}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dadosPaginados.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-100">
              {itensTabela(item)}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginação */}
      <div className="mt-4 flex items-center gap-4">
        <Button
          className="bg-azuljava hover:bg-laranjajava text-white hover:text-white"
          variant="outline"
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
        >
          Anterior
        </Button>

        <span className="text-lg font-semibold">
          Página {paginaAtual} de {totalPaginas || 1}
        </span>

        <Button
          className="bg-azuljava hover:bg-laranjajava text-white hover:text-white"
          variant="outline"
          disabled={paginaAtual === totalPaginas || totalPaginas === 0}
          onClick={() => setPaginaAtual(paginaAtual + 1)}
        >
          Próximo
        </Button>

        {/* Campo de Pesquisa de Página */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="1"
          max={totalPaginas}
          value={paginaPesquisa}
          onChange={(e) => setPaginaPesquisa(e.target.value)}
          className="border p-2 rounded-md text-center w-36"
          placeholder="Ir para página"
        />
        <Button
          className="bg-azuljava hover:bg-laranjajava text-white hover:text-white"
          variant="outline"
          onClick={handleIrParaPagina}
          disabled={!paginaPesquisa || parseInt(paginaPesquisa) > totalPaginas}
        >
          Ir
        </Button>
      </div>
      </div>
    </div>
  );
};

export default Tabela;
