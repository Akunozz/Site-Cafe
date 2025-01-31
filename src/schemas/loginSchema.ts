import { z } from "zod";

export const loginSchema = z.object({
  usuario: z.string().min(1, "Por favor, insira um usuário"),
  senha: z.string().min(1, "Por favor, insiria uma senha")
});
