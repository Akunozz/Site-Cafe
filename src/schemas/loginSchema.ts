import { z } from "zod";

export const loginSchema = z.object({
  usuario: z.string().nonempty("Por favor, insira um usuário"),
  senha: z.string().nonempty("Por favor, insiria uma senha")
});
