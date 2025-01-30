import { z } from "zod";

export const loginSchema = z.object({
  usuario: z.string().min(1, "O usuário é obrigatório"),
  senha: z.string().min(1, "A senha é obrigatória")
});
