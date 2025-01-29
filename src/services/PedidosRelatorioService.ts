import api from "./api";
import IPedidoRelatorio from "../interfaces/IPedidoRelatorio";

class PedidoRelatorioService {
    async getListarDados(mesInicial: string, mesFinal: string): Promise<IPedidoRelatorio[]> {
        try {
            const resultado = await api.get<IPedidoRelatorio[]>(
                `/pedidos/listarPedidosPorMes?mesInicial=${mesInicial}&mesFinal=${mesFinal}`
            );
            return resultado.data;
        } catch (error) {
            console.error("Erro ao buscar dados do relatório:", error);
            return [];
        }
    }
}

export default new PedidoRelatorioService();
