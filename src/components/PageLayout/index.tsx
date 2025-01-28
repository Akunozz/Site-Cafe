import React from "react";
import NavBar from "../NavBar";
import Back from "../Back"

interface PageLayoutProps {
  titulo: string;
  children: React.ReactNode;
  rota?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ titulo, children, rota }) => {
  return (
    <div className="navbar">
    <NavBar />
    <div className="flex-1 flex justify-center items-center bg-preto p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mr-16">
                 {rota && (
            <div className="float-left absolute">
              <Back rota={rota} />
            </div>
          )}
        <h1 className="text-2xl font-bold mb-6 text-center mr-8 text-azuljava">
          {titulo}
        </h1>
        {children}
      </div>
    </div>
    </div>
  );
};

export default PageLayout;