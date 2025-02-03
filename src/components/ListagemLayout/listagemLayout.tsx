import NavBar from "../NavBar/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipboardPlus } from "lucide-react";

interface ListagemLayoutProps {
  titulo: string;                           // h1 da página
  onFilterChange: (text: string) => void;   // função de alterar o filtro
  children: React.ReactNode;                // children
  enderecoAdicionar: string;                // link para cadastro
  textAdicionar: string;                    // texto do botão de cadastro
}

const ListagemLayout: React.FC<ListagemLayoutProps> = ({
  titulo,
  onFilterChange,
  children,
  enderecoAdicionar,
  textAdicionar,
}) => {
  return (
    <div className="flex bg-preto h-screen">
      <NavBar />
      <div className="flex-1 flex flex-col p-8">
        <h1 className="text-4xl font-bold text-white mb-4">{titulo}</h1>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
          <div className="flex p-2">
            {/* Filtro */}
            <div className="flex items-center w-1/4 mr-auto">
              <Input
                type="text"
                placeholder="Digite para filtrar 🔎"
                className="border-2 border-azuljava focus:bg-gray-50"
                onChange={(e) => onFilterChange(e.target.value)}
              />
            </div>
            
            {/* Botão de Adicionar */}
            <div>
              <a href={enderecoAdicionar}>
                <Button
                  className="bg-azuljava hover:bg-laranjajava transition-all duration-300 p-5 text-base"
                >
                  <ClipboardPlus className="mr-1" />
                  {textAdicionar}
                </Button>
              </a>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ListagemLayout;