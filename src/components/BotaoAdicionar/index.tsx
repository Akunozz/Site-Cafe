import React from "react";

interface AdicionarProps {
    enderecoAdicionar: string; // link para cadastro
    textAdicionar: string; // texto do botão
  }

const Adicionar: React.FC<AdicionarProps> = ({ enderecoAdicionar, textAdicionar }) => {
  return (
    <div>

      {/* Botão de Cadastro */}
      <a href={enderecoAdicionar}>
        <button className="p-5 rounded-lg bg-azuljava text-white
         hover:bg-laranjajava transition-all duration-300">
        {textAdicionar}
        </button>
      </a>

    </div>
  )
};

export default Adicionar;