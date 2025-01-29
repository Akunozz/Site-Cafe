import { GraficoPB } from "@/components/GráficoClientesCompras/pieChart";
import { GraficoBV } from "@/components/GráficoBebidasVendidas/bebibasMaisVendidas";
import { GraficoQP } from "@/components/GráficoPedidosRealizados/graficoPedidos";
import NavBar from "@/components/NavBar/navbar";

function TelaInicial() {
  return (
    <div className="navbar">
      {/* Barra de navegação */}
      <NavBar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <h1 className="mr-16 items-center justify-center flex text-6xl font-bold text-white mb-6">Tela Inicial</h1>
        
        {/* Grid de gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GraficoPB />
          <GraficoBV />
          <GraficoQP />
        </div>
      </main>
    </div>
  );
}

export default TelaInicial;
