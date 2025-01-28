import React from "react";
import back from "../../assets/svg/back.svg"



interface BackProps {
  rota: string; // link para voltar para listagem
}

const Back: React.FC<BackProps> = ({ rota }) => {
  return (
    <div>

      {/* Botão de Adicionar */}
      <a href={rota}>
        <img
          src={back}
          alt="ícone de voltar"
          className="w-8 h-8 cursor-pointer hover:opacity-70"
        />
      </a>

    </div>
  );
};

export default Back;