import React from "react";
import NavBar from "../NavBar";

interface PageLayoutProps {
  titulo: string; // O título que será exibido na página
  children: React.ReactNode; // O conteúdo da página (formulário, tabelas, etc.)
}

const PageLayout: React.FC<PageLayoutProps> = ({ titulo, children }) => {
  return (
    <div className="navbar">
    <NavBar />
    <div className="flex-1 flex justify-center items-center bg-preto p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl mr-16">
        <h1 className="text-2xl font-bold mb-6 text-center text-azuljava">
          {titulo}
        </h1>
        {children}
      </div>
    </div>
    </div>
  );
};

export default PageLayout;