//layout de página para telas de cadastros
import React from "react"
import NavBar from "../NavBar/navbar"
import Back from "../Back/back"
import { Toaster } from "sonner"

interface PageLayoutProps {
  titulo: string;             // h1 da página
  children: React.ReactNode;  // children
  rota?: string;              // link voltar para listagem
}

const PageLayout: React.FC<PageLayoutProps> = ({ titulo, children, rota }) => {
  return (
    <>
      <Toaster position="top-right" richColors duration={5000}/>
      <div className="navbar">
        <NavBar />

        <div className="flex-1 flex justify-center items-center bg-preto p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mr-16">
            {rota && (
              <div className="float-left absolute">

                <Back rota={rota} />

              </div>)}
            <h1 className="text-2xl font-bold mb-6 text-center text-azuljava">

              {titulo}

            </h1>

            {children}

          </div>
        </div>
      </div>
    </>
  );
};

export default PageLayout;