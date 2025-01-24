import { z } from "zod";

export const pessoaEditarSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório"),
  usuario: z.string().min(3, "O usuário é obrigatório"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});