import React from "react";

interface TabelaProps {
  colunas: string[];
  dados: any[];
  renderLinha: (item: any) => React.ReactNode;
}

const Tabela: React.FC<TabelaProps> = ({
  colunas,
  dados,
  renderLinha,
}) => {
  return (
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
