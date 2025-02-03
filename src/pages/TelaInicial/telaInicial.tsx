import { useState, useEffect } from "react";
import { GraficoPB } from "@/components/GráficoClientesCompras/graficoPB";
import { GraficoBV } from "@/components/GráficoBebidasVendidas/graficoBV";
import { GraficoQP } from "@/components/GráficoPedidosRealizados/graficoQP";
import NavBar from "@/components/NavBar/navbar";
import { logout } from "@/contexts/authUtils";

function TelaInicial() {
  const [loginData, setLoginData] = useState<any>(null);

  useEffect(() => {
    // Recupera os dados do usuário armazenados no localStorage
    const data = localStorage.getItem("loginData");
    if (data) {
      setLoginData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="navbar">
      <NavBar />

      <main className="flex-1 p-8">
        <div className="w-full flex">
        <h1>Café Java</h1>
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
            Sair
          </button>
        </div>
        <h1 className="flex text-4xl font-bold text-white mb-6">Tela Inicial</h1>

        {loginData && loginData.pessoa && (
          <div className="mb-4 text-white text-lg">
            Bem-vindo, <strong>{loginData.pessoa.nome}</strong>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <GraficoPB />
          <GraficoBV />
          <GraficoQP />
        </div>
      </main>
    </div>
  );
}

export default TelaInicial;
