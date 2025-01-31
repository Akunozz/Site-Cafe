import { CircleArrowLeft } from "lucide-react";

interface BackProps {
  rota: string; // link para voltar para listagem
}

const Back: React.FC<BackProps> = ({ rota }) => {

  return (
    <a href={rota}>
      <CircleArrowLeft 
      size={36}
      className="text-azuljava hover:size-10" />
      </a>
  );
};

export default Back;
