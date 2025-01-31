import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";


interface AlterarProps {
  onExcluir: () => void; // função para excluir
  rotaEdicao: string; // link para formulário de edição
  idItem: string | number; // ID do item para editar
}

const Alterar: React.FC<AlterarProps> = ({ onExcluir, rotaEdicao, idItem }) => {
  return (
    <div className="flex justify-center space-x-2">
      
      {/* Botão de Alterar */}
      <a href={`${rotaEdicao}/${idItem}`}>
      <Button variant="ghost" size="icon" className="hover:bg-orange-200">
          <Pencil className="text-amber-950" />
        </Button>
      </a>

      {/* Botão de Excluir */}
      <a>
      <Button 
        variant="ghost" 
        size="icon" 
        className="hover:bg-red-100" 
        onClick={onExcluir}
      >
        <Trash2 className="text-red-600" />
      </Button>
      </a>
      
    </div>
  );
};

export default Alterar;