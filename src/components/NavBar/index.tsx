import { useState } from "react";
import { useRouter } from "@tanstack/react-router";

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`${
        isNavOpen ? "w-64" : "w-16"
      } bg-azuljava text-white transition-all duration-500 rounded-md`}
      onMouseEnter={() => setIsNavOpen(true)}
      onMouseLeave={() => setIsNavOpen(false)}
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
              <div className="pl-6">
                <a 
                onClick={() => router.navigate({ to: "/ListagemClientes" })}
                className="block mt-1 px-4 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Listagem
                </a>
                <a 
                onClick={() => router.navigate({ to: "/CadastroCliente" })} 
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
                onClick={() => router.navigate({ to: "/ListagemBebidas" })} 
                className="block mt-1 px-4 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Listagem
                </a>
                <a 
                onClick={() => router.navigate({ to: "/CadastroBebidas" })} 
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
                onClick={() => router.navigate({ to: "/ListagemPedidos" })}
                className="block mt-1 px-4 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Listagem
                </a>
                <a
                onClick={() => router.navigate({ to: "/CadastroPedidos" })}
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

export default NavBar;