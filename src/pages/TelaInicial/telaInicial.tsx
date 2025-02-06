import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

function TelaInicial() {

  return (
    <div className="flex justify-center h-screen items-center">
      <Link to="/">
      <Button>
      <ExternalLink />
          Voltar página
      </Button>
      </Link>
    </div>
  );
}

export default TelaInicial
