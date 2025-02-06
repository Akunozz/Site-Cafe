import ILogin from "../interfaces/ILogin";
import api from "./api";

class AuthService {
  async login(dados: Pick<ILogin, "usuario" | "senha">) {
    try {
      const response = await api.post<ILogin>("/auth/login", dados);
      return response.data;
    } catch (error) {
      throw new Error("Falha na autenticação. Verifique suas credenciais.");
    }
  }
}

export default new AuthService();
