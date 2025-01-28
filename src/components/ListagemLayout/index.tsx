import React, {useState} from "react";
import NavBarListagem from "../NavBarListagem";
import Filtro from "../Filtro";
import Adicionar from "../BotaoAdicionar";


interface ListagemLayoutProps {
  titulo: string;
  onFilterChange: (text: string) => void;
  children: React.ReactNode;
  enderecoAdicionar: string;
  textAdicionar: string;
}

const ListagemLayout: React.FC<ListagemLayoutProps> = ({
  titulo,
  onFilterChange,
  children,
  enderecoAdicionar,
  textAdicionar,
}) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="flex bg-preto">
      <NavBarListagem onToggle={setIsNavOpen}/>
      <div
        className={`flex-1 flex flex-col p-8 ${
          isNavOpen ? "ml-64" : "ml-16"
        }`}>
        <h1 className="text-4xl font-bold text-white mb-4">{titulo}</h1>
        <div className="flex mb-0">
          <Filtro onFilterChange={onFilterChange} />
          <Adicionar enderecoAdicionar={enderecoAdicionar} textAdicionar={textAdicionar}/>
          </div>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ListagemLayout;