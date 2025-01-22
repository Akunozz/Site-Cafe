import { pessoaSchema } from "../schemas/pessoaSchema";
import ApiService from "./ApiService";
import IPessoa from "../interfaces/IPessoa";

class PessoaService extends ApiService<IPessoa> {
  constructor() {
    super("pessoas");
  }

  async listarClientes(): Promise<IPessoa[]> {
    try {
      const clientes = await this.getListarDados();
      const validacao = clientes.map((cliente) =>
        pessoaSchema.safeParse(cliente)
    );
    
    const clientesValidos = validacao
    .filter((result) => result.success)
    .map((result) => (result as any).data);
    
    const erros = validacao
    .filter((result) => !result.success)
    .map((result) => (result as any).error.errors.map((err: any) => err.message).join("\n"));
    
    if (erros.length > 0) {
      console.error("Erros de validação em clientes:", erros);
    }
    
    return clientesValidos;
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    return [];
  }
}

async cadastrarCliente(dados: Partial<IPessoa>): Promise<IPessoa | null> {
  try {
    const resultado = await this.postAdicionarDados(dados);
    return resultado;
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    return null;
  }
}

}

export default new PessoaService();
