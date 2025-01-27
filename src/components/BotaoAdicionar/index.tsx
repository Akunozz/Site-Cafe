import React from "react";

interface AdicionarProps {
    enderecoAdicionar: string; // Rota para adicionar
  }

const Adicionar: React.FC<AdicionarProps> = ({
  enderecoAdicionar,
}) => {
  return (
    <div className="">
      <a href={enderecoAdicionar}>
        Cadastar
      </a>
    </div>
  )
};

export default Adicionar;
