import { useState } from "react";
import { useRouter } from "@tanstack/react-router";

interface NavBarListagemProps {
  onToggle: (isOpen: boolean) => void;
}

function NavBarListagem({ onToggle }: NavBarListagemProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const handleMouseEnter = () => {
    setIsNavOpen(true);
    onToggle(true); // Informa ao layout que a navbar está aberta
  };

  const handleMouseLeave = () => {
    setIsNavOpen(false);
    onToggle(false); // Informa ao layout que a navbar está fechada
  };

  return (
    <div
      className={`${
        isNavOpen ? "w-64" : "w-16"
      } fixed top-0 left-0 h-full bg-azuljava text-white transition-all duration-500 rounded-r-lg`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <a
          href="/inicial"
          className="p-4 flex justify-center text-2xl font-bold"
        >
          {isNavOpen ? "☕Cafeteria" : "☕"}
        </a>

        {/* Menu */}
        <nav className="flex flex-col gap-4 mt-6">
          {/* Clientes */}
          <div>
            <a className="flex mt-3 gap-2 px-4 py-2 font-bold text-lg">
              {isNavOpen && "Clientes"}
            </a>
            {isNavOpen && (
              <div className="pl-6 transition-opacity duration-500 opacity-100">
                <a 
                onClick={() => router.navigate({ to: "/listagem-clientes" })}
                className="block mt-1 px-4 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Listagem
                </a>
                <a 
                onClick={() => router.navigate({ to: "/cadastro-cliente" })} 
                className="block mt-1 px-4 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Cadastro
                </a>
              </div>
            )}
          </div>

          {/* Bebidas */}
          <div>
            <a className="flex mt-3 gap-2 px-4 py-2 font-bold text-lg">
              {isNavOpen && "Bebidas"}
            </a>
            {isNavOpen && (
              <div className="pl-6">
                <a 
                onClick={() => router.navigate({ to: "/listagem-bebidas" })} 
                className="block mt-1 px-4 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Listagem
                </a>
                <a 
                onClick={() => router.navigate({ to: "/cadastro-bebidas" })} 
                className="block mt-1 px-4 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Cadastro
                </a>
              </div>
            )}
          </div>

          {/* Pedidos */}
          <div>
            <a className="flex mt-3 gap-2 px-4 py-2 font-bold text-lg">
              {isNavOpen && "Pedidos"}
            </a>
            {isNavOpen && (
              <div className="pl-6">
                <a 
                onClick={() => router.navigate({ to: "/listagem-pedidos" })}
                className="block mt-1 px-4 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Listagem
                </a>
                <a
                onClick={() => router.navigate({ to: "/cadastro-pedidos" })}
                className="block mt-1 px-4 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Cadastro
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavBarListagem;