import React from "react";
import trashIcon from "../../assets/svg/trash.svg";
import lapis from "../../assets/svg/lapis.svg";


interface AlterarProps {
  onExcluir: () => void; // função para excluir
  rotaEdicao: string; // link para formulário de edição
  idItem: string | number; // ID do item para editar
}

const Alterar: React.FC<AlterarProps> = ({ onExcluir, rotaEdicao, idItem }) => {
  return (
    <div className="flex justify-center space-x-5">
      
      {/* Botão de Alterar */}
      <a href={`${rotaEdicao}/${idItem}`}>
        <img
          src={lapis}
          alt="ícone de alterar"
          className="w-6 h-6 cursor-pointer hover:opacity-70"
        />
      </a>

      {/* Botão de Excluir */}
      <a>
        <img
          src={trashIcon}
          alt="ícone de excluir"
          className="w-6 h-6 cursor-pointer hover:opacity-70"
          onClick={onExcluir}
        />
      </a>
      
    </div>
  );
};

export default Alterar;