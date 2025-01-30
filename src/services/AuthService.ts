import ILogin from "../interfaces/ILogin";
import api from "./api";

class AuthService {
  async login(data: { usuario: string; senha: string }): Promise<ILogin> {
    try {
      const response = await api.post<ILogin>("/auth/login", data);
      return response.data;
    } catch (error) {
      throw new Error("Falha na autenticação. Verifique suas credenciais.");
    }
  }
}

export default new AuthService();
