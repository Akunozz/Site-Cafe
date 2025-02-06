//componente de tabela utilizado nas telas de listagens
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TabelaProps {
  colunas: string[];  //colunas
  dados?: any[];      //array de dados
  itensTabela: (item: any) => React.ReactNode; //intens da tabela
  itensPorPagina?: number;  //define quantos itens são exibidos por página 
  children?: React.ReactNode; //children
}

//criação da tabela
const Tabela: React.FC<TabelaProps> = ({
  colunas,
  dados = [],
  itensTabela,
  itensPorPagina = 10,
}) => {
  const [paginaAtual, setPaginaAtual] = useState(1); //define a página atual

  //reinicia tabela se sofrer alteração
  useEffect(() => {
    setPaginaAtual(1);
  }, [dados]);

  //calculo páginas para exibir toda a tabela
  const totalPaginas = Math.ceil(dados.length / itensPorPagina);

  // Itens da página atual
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const dadosPaginados = dados.slice(indiceInicial, indiceFinal);

  return (
    <div className="flex flex-col items-center w-full p-2 font-medium">
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
          className="bg-azuljava hover:bg-laranjajava text-white"
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
          className="bg-azuljava hover:bg-laranjajava text-white"
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

export default Tabela
