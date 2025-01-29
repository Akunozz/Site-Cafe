import api from "./api";
import IBebidaRelatorio from "../interfaces/IBebidaRelatorio";

class BebidaRelatorioService {
    async getListarDados(): Promise<IBebidaRelatorio[]> {
        try {
            const resultado = await api.get<IBebidaRelatorio[]>("/bebidas/maisvendidas");
            return resultado.data;
        } catch (error) {
            console.error("Erro ao buscar dados do relatório:", error);
            return [];
        }
    }
}

export default new BebidaRelatorioService();