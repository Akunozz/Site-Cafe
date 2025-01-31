import { Button } from "@/components/ui/button";

interface BotaoProps {
  text: string;
}

export function Botao({ text }: BotaoProps) {
  return (
    <div className="flex justify-center">
      <Button 
        size="lg"
        type="submit" 
        className="w-1/2 bg-azuljava text-white py-3 font-medium rounded-lg hover:bg-laranjajava transition duration-300"
      >
        {text}
      </Button>
    </div>
  );
}

export default Botao;
