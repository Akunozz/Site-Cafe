import { Input } from "@/components/ui/input";

interface FiltroProps {
  onFilterChange: (text: string) => void;
}

function Filtro({ onFilterChange }: FiltroProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex items-center w-1/4 mr-auto">
      <Input
        type="text"
        placeholder="Digite para filtrar 🔎"
        className="w-full bg-gray-50 border-2 border-azuljava focus:ring-azuljava focus:border-azuljava"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Filtro;
