import api from "./api";
import IPessoaRelatorio from "../interfaces/IPessoaRelatorio";

class PessoaRelatorioService {
    async getListarDados(mesSelecionado: number, anoSelecionado: number): Promise<IPessoaRelatorio[]> {
        try {
            const resultado = await api.get<IPessoaRelatorio[]>(
                `/pessoas/tomamMaisCafe?mes=${mesSelecionado}&ano=${anoSelecionado}`
            );
            return resultado.data;
        } catch (error) {
            console.error("Erro ao buscar dados do relatório:", error);
            return [];
        }
    }
}

export default new PessoaRelatorioService();