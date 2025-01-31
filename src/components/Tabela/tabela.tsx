import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TabelaProps {
  colunas: string[]; // Vetor de colunas
  dados: any[]; // Vetor de dados da tabela
  renderLinha: (item: any) => React.ReactNode; // Função para renderizar cada linha
  itensPorPagina?: number; // Número de itens por página (padrão: 10)
}

const Tabela: React.FC<TabelaProps> = ({ colunas, dados, renderLinha, itensPorPagina = 10 }) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(dados.length / itensPorPagina);

  // Obtém os itens da página atual
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const dadosPaginados = dados.slice(indiceInicial, indiceFinal);

  return (
    <div className="flex flex-col items-center w-full p-2 font-medium">
      {/* Tabela */}
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
              {renderLinha(item)}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Controles de Paginação */}
      <div className="mt-4 flex items-center gap-4">
        <Button
          className="hover:bg-azuljava hover:text-white"
          variant="outline"
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
        >
          Anterior
        </Button>

        <span className="text-lg font-semibold">
          Página {paginaAtual} de {totalPaginas}
        </span>

        <Button
          className="hover:bg-azuljava hover:text-white"
          variant="outline"
          disabled={paginaAtual === totalPaginas}
          onClick={() => setPaginaAtual(paginaAtual + 1)}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
};

export default Tabela;
