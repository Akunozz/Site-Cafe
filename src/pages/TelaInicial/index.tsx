import NavBar from "../../components/NavBar";
import DashboardCard from "../../components/DashBoards";

function TelaInicial() {
  return (
    <div className="navbar">
      {/* NavBar */}
      <NavBar />

      {/* Conteúdo Principal */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Dashboard 1 */}
          <DashboardCard
            title="Clientes que mais compraram bebidas"
            content="gráfico"
          />

          {/* Dashboard 2 */}
          <DashboardCard
            title="Bebidas mais vendidas"
            content="gráfico"
          />

          {/* Dashboard 3 */}
          <DashboardCard
            title="Quantidade de pedidos dos últimos 6 meses"
            content="gráfico"
          />
        </div>
      </div>
    </div>
  );
}

export default TelaInicial;
