import { useState, useEffect } from "react";
import NavBar from "../../../components/NavBar";
import FormularioCadastroPedidos from "../../../components/FormularioCadastroPedidos";

const CadastroPedidos = () => {
  const [clientes, setClientes] = useState<any[]>([]); // Dados dos clientes
  const [bebidas, setBebidas] = useState<any[]>([]); // Dados das bebidas

  useEffect(() => {
    // Supondo que você já tenha esses dados disponíveis em algum lugar ou API
    setClientes([
      { id: 1, nome: "João Silva" },
      { id: 2, nome: "Maria Oliveira" },
    ]);
    setBebidas([
      { id: 1, nome: "Coca-Cola", preco: 5.0 },
      { id: 2, nome: "Água Mineral", preco: 2.5 },
    ]);
  }, []);

  const handleFormSubmit = (data: any) => {
    console.log("Dados do pedido:", data);
    alert("Pedido realizado com sucesso!");
  };

  return (
    <div className="navbar">
      {/* NavBar */}
      <NavBar />

      {/* Conteúdo da página */}
      <div className="flex-1 flex justify-center items-center bg-preto p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl sm:max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-azuljava">
            Cadastro de Pedido
          </h1>

          {/* Formulário de Cadastro de Pedido */}
          <FormularioCadastroPedidos
            clientes={clientes}
            bebidas={bebidas}
            onSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CadastroPedidos;
