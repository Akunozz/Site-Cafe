import api from "./api";
import IPessoaRelatorio from "../interfaces/IPessoaRelatorio";

class PessoaRelatorioService {
    async getListarDados(): Promise<IPessoaRelatorio[]> {
        try {
            const resultado = await api.get<IPessoaRelatorio[]>("/pessoas/tomamMaisCafe");
            return resultado.data;
        } catch (error) {
            console.error("Erro ao buscar dados do relatório:", error);
            return [];
        }
    }
}

export default new PessoaRelatorioService(); // Exportando uma instância única
