import { z } from "zod";

export const pessoaSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  setor: z.object({
    id: z.string(),
    nome: z.string(),
  }),
  usuario: z.string().min(1, "O usuário é obrigatório"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  permissao: z.enum(["ADMIN", "USER", "AUX"]),
});