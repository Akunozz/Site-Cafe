import React from "react";
import { Button } from "@/components/ui/button";
import { ClipboardPlus } from "lucide-react";

interface AdicionarProps {
  enderecoAdicionar: string; // link para cadastro
  textAdicionar: string; // texto do botão
}

const Adicionar: React.FC<AdicionarProps> = ({ enderecoAdicionar, textAdicionar }) => {
  return (
    <div>

      {/* Botão de Cadastro */}
      <a href={enderecoAdicionar}>
        <Button className="bg-azuljava hover:bg-laranjajava transition-all duration-300
         p-5 text-base">
          <ClipboardPlus className="mr-1" />
          {textAdicionar}
        </Button>
      </a>

    </div>
  )
};

export default Adicionar;