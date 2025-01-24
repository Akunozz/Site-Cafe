import React from "react";
import addIcon from "../../assets/svg/add.svg";
import trashIcon from "../../assets/svg/trash.svg";
import lapis from "../../assets/svg/lapis.svg";

interface AlterarProps {
  enderecoAdicionar: string; // Rota para adicionar
  onExcluir: () => void; // Função para excluir
  rotaEdicao: string; // Base da rota para edição
  idItem: string | number; // ID do item para editar
}

const Alterar: React.FC<AlterarProps> = ({
  enderecoAdicionar,
  onExcluir,
  rotaEdicao,
  idItem,
}) => {
  return (
    <div className="flex justify-center space-x-5">
      {/* Botão de Adicionar */}
      <a href={enderecoAdicionar}>
        <img
          src={addIcon}
          alt="ícone de adicionar"
          className="w-6 h-6 cursor-pointer hover:opacity-70"
        />
      </a>

      {/* Botão de Alterar */}
      <a href={`${rotaEdicao}/${idItem}`}>
        <img
          src={lapis}
          alt="ícone de alterar"
          className="w-6 h-6 cursor-pointer hover:opacity-70"
        />
      </a>

      {/* Botão de Excluir */}
      <img
        src={trashIcon}
        alt="ícone de excluir"
        className="w-6 h-6 cursor-pointer hover:opacity-70"
        onClick={onExcluir}
      />
    </div>
  );
};

export default Alterar;
