import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Home, Users, Coffee, ClipboardList, ChevronDown } from "lucide-react"

function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`${isNavOpen ? "w-64" : "w-16"} bg-azuljava text-white transition-all 
      duration-300 rounded-r-lg`}
      onMouseEnter={() => setIsNavOpen(true)}
      onMouseLeave={() => setIsNavOpen(false)}
    >
      <div className="flex flex-col h-full">
        
        {/* Logo */}
        <div className="px-4 py-5 flex justify-center text-2xl font-bold">
          {isNavOpen ? "☕ Cafeteria" : "☕"}
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-4 mt-4 pt-2">

          <Accordion type="single">
            <AccordionItem value="inicial">
            <AccordionTrigger className="flex items-center justify-between px-5 py-5 font-bold text-lg">
                <div className="flex items-center gap-2"
                onClick={() => router.navigate({ to: "/inicial" })}>
                <Home className="w-5 h-5" /> {isNavOpen && "Tela Inicial"}
                </div>
              </AccordionTrigger>
            </AccordionItem>
          </Accordion>
          
          {/* Accordion para Clientes */}
          <Accordion type="single" collapsible>
            <AccordionItem value="clientes">
              <AccordionTrigger className="flex items-center justify-between px-5 py-5 font-bold text-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" /> {isNavOpen && "Clientes"}
                </div>
                {isNavOpen && <ChevronDown className="w-4 h-4" />} {/* Seta para baixo */}
              </AccordionTrigger>
              <AccordionContent>
                <a onClick={() => router.navigate({ to: "/listagem-clientes" })}
                  className="block mt-1 px-6 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Listagem
                </a>
                <a onClick={() => router.navigate({ to: "/cadastro-cliente" })}
                  className="block mt-1 px-6 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Cadastro
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Accordion para Bebidas */}
          <Accordion type="single" collapsible>
            <AccordionItem value="bebidas">
              <AccordionTrigger className="flex items-center justify-between px-5 py-5 font-bold text-lg">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5" /> {isNavOpen && "Bebidas"}
                </div>
                {isNavOpen && <ChevronDown className="w-4 h-4" />}
              </AccordionTrigger>
              <AccordionContent>
                <a onClick={() => router.navigate({ to: "/listagem-bebidas" })}
                  className="block mt-1 px-6 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Listagem
                </a>
                <a onClick={() => router.navigate({ to: "/cadastro-bebidas" })}
                  className="block mt-1 px-6 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Cadastro
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Accordion para Pedidos */}
          <Accordion type="single" collapsible>
            <AccordionItem value="pedidos">
              <AccordionTrigger className="flex items-center justify-between px-5 py-5 font-bold text-lg">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" /> {isNavOpen && "Pedidos"}
                </div>
                {isNavOpen && <ChevronDown className="w-4 h-4" />}
              </AccordionTrigger>
              <AccordionContent>
                <a onClick={() => router.navigate({ to: "/listagem-pedidos" })}
                  className="block mt-1 px-6 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Listagem
                </a>
                <a onClick={() => router.navigate({ to: "/cadastro-pedidos" })}
                  className="block mt-1 px-6 py-2 text-base hover:text-laranjajava cursor-pointer">
                  Cadastro
                </a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </nav>
      </div>
    </div>
  );
}

export default NavBar;
