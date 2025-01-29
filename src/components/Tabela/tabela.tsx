import React from "react";

interface TabelaProps {
  colunas: string[];  // vetor de colunas
  dados: any[];  // vetor de dados da tabela
  renderLinha: (item: any) => React.ReactNode; // função para rederizar o conteúdo de cada linha
}

const Tabela: React.FC<TabelaProps> = ({ colunas, dados, renderLinha }) => {
  return (

    // cabeçalho da tabela
    <table className="tabela">
      <thead>
        <tr>
          {colunas.map((coluna, index) => (
            <th key={index} className="item-lista-header">
              {coluna}
            </th>
          ))}
        </tr>
      </thead>

      {/* corpo da tabela */}
      <tbody>
        {dados.map((item, index) => (
          <tr key={index} className="hover:bg-slate-100">
            {renderLinha(item)}
          </tr>
        ))}
      </tbody>
      
    </table>
  );
};

export default Tabela;