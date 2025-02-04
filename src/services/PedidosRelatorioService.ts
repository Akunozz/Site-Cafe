import api from "./api";
import IPedidoRelatorio from "../interfaces/IPedidoRelatorio";
import IPedidoPorMes from "@/interfaces/IPedidoPorMes";

class PedidoRelatorioService {
    async getListarDados(mesInicial: string, mesFinal: string): Promise<IPedidoPorMes[]> {
        try {
            const resultado = await api.get<IPedidoPorMes[]>(
                `/pedidos/listarPedidosPorMes?mesInicial=${mesInicial}&mesFinal=${mesFinal}`
            );
            return resultado.data;
        } catch (error) {
            console.error("Erro ao buscar dados do relatório:", error);
            return [];
        }
    }
    async getRelatorio(mes: string, ano: string): Promise<IPedidoRelatorio[]> {
        try {
            const resultado = await api.get<IPedidoRelatorio[]>(
                `/pedidos/relatorio?mes=${mes}&ano=${ano}`
            );
            return resultado.data;
        } catch (error) {
            console.error("Erro ao buscar dados do relatório:", error);
            return [];
        }
    }
}

export default new PedidoRelatorioService();
