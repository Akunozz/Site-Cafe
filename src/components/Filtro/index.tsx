import React from "react";
import search from "../../assets/svg/search.svg";

interface FiltroProps {
  onFilterChange: (text: string) => void; // Callback para enviar o texto filtrado ao componente pai
}

function Filtro({ onFilterChange }: FiltroProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.value); // Envia o valor para o componente pai
  };

  return (
    <div className="flex items-center border p-2 rounded-lg bg-white">
      <img src={search} alt="ícone da lupa" className="w-7 h-5" />
      <input
        type="text"
        placeholder="Digite para filtrar"
        className="ml-2 w-full focus:outline-none"
        onChange={handleInputChange} // Dispara o evento ao digitar
      />
    </div>
  );
}

export default Filtro;
