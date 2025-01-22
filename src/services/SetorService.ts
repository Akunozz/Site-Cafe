import ISetor from "../interfaces/ISetores";
import ApiService from "./ApiService";
import api from "./api";

class SetorService extends ApiService<ISetor> {
    constructor() {
        super("setores")
    }

    async getID(id: string): Promise<ISetor | null> {
        try {
            const resultado = await api.get<ISetor>(`/${this}/${id}`)
            return resultado.data
        } catch (error) {
            console.error("Erro ao buscar dados", error)
            return null
        }
    }

    async putEditarDados(id: string, dadosAtualizados: Partial<ISetor>): Promise<ISetor | null> {
        try {
            const resultado = await api.put<ISetor>(`/${this.recurso}/${id}`, dadosAtualizados)
            return resultado.data
        } catch (error) {
            console.error("Erro ao editar dados", error)
            return null
        }
    }

    async postAdicionarDados(dados: Partial<ISetor>): Promise<ISetor | null> {
        try {
            const resultado = await api.post<ISetor>(`/${this.recurso}`, dados)
            return resultado.data
        } catch (error) {
            console.error("Erro ao adicionar dados", error)
            return null
        }
    }

    async deleteDados(id: string): Promise<ISetor | null> {
        try {
            const resultado = await api.delete<ISetor>(`/${this.recurso}/${id}`)
            return resultado.data
        } catch (error) {
            console.error("Erro ao deletar dados", error)
            return null
        }
    }

}

export const setorService = new SetorService();