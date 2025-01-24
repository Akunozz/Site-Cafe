import { z } from "zod";

export const pessoaSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  usuario: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres."),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});