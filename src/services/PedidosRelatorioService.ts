import api from "./api";
import IPedidoRelatorio from "../interfaces/IPedidoRelatorio";

class PedidoRelatorioService {
    async getListarDados(): Promise<IPedidoRelatorio[]> {
        try {
            const resultado = await api.get<IPedidoRelatorio[]>("/pedidos/listarPedidosPorMes");
            return resultado.data;
        } catch (error) {
            console.error("Erro ao buscar dados do relatório:", error);
            return [];
        }
    }
}

export default new PedidoRelatorioService();
