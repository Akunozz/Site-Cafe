import api from "./api";
import ICriarPessoa from "../interfaces/ICriarPessoa";

class CriarPessoaService {
  async criarPessoa(dados: FormData): Promise<void> {
    try {
      await api.post("/pessoas", dados, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);
      throw error;
    }
  }
}

export const criarPessoaService = new CriarPessoaService();
