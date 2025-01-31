import { GraficoPB } from "@/components/GráficoClientesCompras/graficoPB";
import { GraficoBV } from "@/components/GráficoBebidasVendidas/graficoBV";
import { GraficoQP } from "@/components/GráficoPedidosRealizados/graficoQP";
import NavBar from "@/components/NavBar/navbar";

function TelaInicial() {
  return (
    <div className="navbar">
      {/* Barra de navegação */}
      <NavBar />

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <h1 className="flex text-4xl font-bold text-white mb-6">Tela Inicial</h1>
        
        {/* Grid de gráficos */}
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
