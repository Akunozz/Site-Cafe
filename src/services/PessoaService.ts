import ApiService from "./ApiService";
import IPessoa from "../interfaces/IPessoa";

class PessoaService extends ApiService<IPessoa> {
  constructor() {
    super("pessoas");
  }
}

export default new PessoaService();