import api from "./api"

class ApiService<T> {  //T é um tipo genérico para ser definido posteriormente como (Pessoa, Bebida, etc)
    protected recurso: string //Rota da API que será acessada
    
    constructor(recurso: string) {
        this.recurso = recurso
    }
    
    async getListarDados(): Promise<T[]>{
        try {
            const resultado = await api.get<T[]>(this.recurso);
            return resultado.data;
        } catch (error) {
            console.error("Erro ao buscar dados", error);
            return [];
        }
    }

    async postAdicionarDados(dados: Partial<T>): Promise<T | null> {
        try {
            const resultado = await api.post<T>(`/${this.recurso}`, dados)
            return resultado.data
        } catch (error) {
            console.error("Erro ao adicionar dados", error)
            return null
        }
    }

    async getIdDados(id: string): Promise<T | null> {
        try {
            const resultado = await api.get<T>(`/${this.recurso}/${id}`)
            return resultado.data
        } catch (error) {
            console.error("Erro ao buscar dados", error)
            return null
        }
    }

    async putEditarDados(id: string, dadosAtualizados: Partial<T>): Promise<T | null> {
        try {
            const resultado = await api.put<T>(`/${this.recurso}/${id}`, dadosAtualizados)
            return resultado.data
        } catch (error) {
            console.error("Erro ao editar dados", error)
            return null
        }
    }

    async deleteDados(id: string): Promise<T | null> {
        try {
            const resultado = await api.delete<T>(`/${this.recurso}/${id}`)
            return resultado.data
        } catch (error) {
            console.error("Erro ao deletar dados", error)
            return null
        }
    }

}

export default ApiService